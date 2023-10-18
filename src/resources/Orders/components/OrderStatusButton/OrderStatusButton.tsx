import {
  Button,
  Confirm,
  useNotify,
  useRecordContext,
  useRefresh,
} from 'react-admin';

import api from 'api';
import { FC, MouseEventHandler, useState } from 'react';
import { ClientTypeOrmEntity, ORDERSTATUS } from 'api/generated';
import styled from 'styled-components';
import BlockIcon from '@mui/icons-material/Block';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

interface OrderStatusButtonProps {
  nextStatus: ORDERSTATUS;
}

export const OrderStatusButton: FC<OrderStatusButtonProps> = ({
  nextStatus,
}) => {
  const record = useRecordContext<ClientTypeOrmEntity>();
  const refresh = useRefresh();
  const notify = useNotify();
  const [open, setOpen] = useState(false);
  const isReject = nextStatus === ORDERSTATUS.RejectAfterConsideration;
  const isDone = nextStatus === ORDERSTATUS.DoneAfterConsideration;
  const isRework = nextStatus === ORDERSTATUS.WaitingForRework;

  const handleBlockCustomer = async () => {
    try {
      await api.AdminOrders.updateOneBaseAdminPanelOrdersControllerOrderTypeOrmEntity(
        record?.id,
        {
          status: nextStatus,
        },
      );
      notify(
        isReject
          ? 'Заявка отклонена'
          : isDone
          ? 'Заявка одобрена'
          : 'Заявка отправлена на доработку',
      );
      refresh();
    } catch (error: any) {
      notify(error?.message);
    }
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    handleBlockCustomer();
    setOpen(false);
  };

  return (
    <>
      <StyledButton
        sx={{ height: 30 }}
        onClick={handleClick}
        label={
          isReject
            ? 'Отклонить'
            : isDone
            ? 'Одобрить'
            : 'Отправить на доработку'
        }
        startIcon={
          isReject ? (
            <BlockIcon />
          ) : isDone ? (
            <TaskAltIcon />
          ) : (
            <BuildCircleIcon />
          )
        }
        $reject={isReject}
        $done={isDone}
        $rework={isRework}
      />
      <Confirm
        isOpen={open}
        title={`${
          isReject
            ? 'Отклонить заявку'
            : isDone
            ? 'Одобрить заявку'
            : 'Отправить заявку на доработку'
        }`}
        content={`Вы уверены, что хотите ${
          isReject
            ? 'отклонить заявку'
            : isDone
            ? 'одобрить заявку'
            : 'отправить заявку на доработку'
        }?`}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

interface StyledButtonProps {
  $reject: boolean;
  $done: boolean;
  $rework: boolean;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  color: ${({ $reject, $done }) =>
    $reject ? '#de0046' : $done ? '#3CB371' : '#FF8C00'};
`;
