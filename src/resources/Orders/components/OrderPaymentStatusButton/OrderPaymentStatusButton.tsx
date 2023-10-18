import {
  Button,
  Confirm,
  useNotify,
  useRecordContext,
  useRefresh,
} from 'react-admin';

import api from 'api';
import { FC, MouseEventHandler, useState } from 'react';
import { ClientTypeOrmEntity } from 'api/generated';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

interface OrderPaymentStatusButtonProps {
  isFundsTransferredToArtist: boolean;
}

export const OrderPaymentStatusButton: FC<OrderPaymentStatusButtonProps> = ({
  isFundsTransferredToArtist,
}) => {
  const record = useRecordContext<ClientTypeOrmEntity>();
  const refresh = useRefresh();
  const notify = useNotify();
  const [open, setOpen] = useState(false);

  const handleBlockCustomer = async () => {
    try {
      if (isFundsTransferredToArtist) {
        await api.AdminOrders.updateOneBaseAdminPanelOrdersControllerOrderTypeOrmEntity(
          record.id,
          {
            fundsTransferredToArtist: false,
          },
        );
        notify('Заявка помечена как не выплаченная');
      } else {
        await api.AdminOrders.updateOneBaseAdminPanelOrdersControllerOrderTypeOrmEntity(
          record.id,
          {
            fundsTransferredToArtist: true,
          },
        );
        notify(`Заявка помечена как выплаченная`);
      }
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
      <Button onClick={handleClick} sx={{ height: 32 }}>
        {isFundsTransferredToArtist ? (
          <CheckBoxIcon sx={{ width: 24, height: 24 }} />
        ) : (
          <CheckBoxOutlineBlankIcon sx={{ width: 24, height: 24 }} />
        )}
      </Button>
      <Confirm
        isOpen={open}
        title={`${
          isFundsTransferredToArtist
            ? 'Пометить заявку как не выплаченную'
            : 'Пометить заявку как выплаченную'
        }`}
        content={`Вы действительно хотите пометить, что средства по заявке ${
          record && record.id
        } ${
          isFundsTransferredToArtist ? 'не выплачены' : 'выплачены'
        } артисту?`}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};
