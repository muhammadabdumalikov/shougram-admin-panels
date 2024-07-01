import {
  Button,
  Confirm,
  useNotify,
  useRecordContext,
  useRefresh,
} from 'react-admin';

import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import api from 'api';
import styled from 'styled-components';
import { FC, useState } from 'react';
import {
  AdminUpdateArtistProfileDtoStatusEnum,
  ClientTypeOrmEntity,
} from 'api/generated';

interface UpdateArtistStatusButtonProps {
  isBlock: boolean;
}

export const UpdateArtistStatusButton: FC<UpdateArtistStatusButtonProps> = ({
  isBlock,
}) => {
  const record = useRecordContext<ClientTypeOrmEntity>();
  const refresh = useRefresh();
  const notify = useNotify();
  const [open, setOpen] = useState(false);

  const handleBlockCustomer = async () => {
    try {
      if (!isBlock) {
        record.artistProfile?.id &&
          (await api.AdminArtistProfile.updateOneBaseAdminPanelArtistProfilesControllerArtistProfileTypeOrmEntity(
            record.artistProfile?.id,
            {
              status: AdminUpdateArtistProfileDtoStatusEnum.Blocked,
            },
          ));
        notify(`Артист заблокирован`);
      } else {
        record.artistProfile?.id &&
          (await api.AdminArtistProfile.updateOneBaseAdminPanelArtistProfilesControllerArtistProfileTypeOrmEntity(
            record.artistProfile.id,
            {
              status: AdminUpdateArtistProfileDtoStatusEnum.Active,
            },
          ));
        notify(`Артист одобрен`);
      }
      refresh();
    } catch (error: any) {
      notify(error?.message);
    }
  };

  const handleClick = () => setOpen(true);
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
        label={isBlock ? 'Одобрить' : 'Заблокировать'}
        startIcon={isBlock ? <PersonIcon /> : <PersonOffIcon />}
        $banned={isBlock}
      />
      <Confirm
        isOpen={open}
        title={`${isBlock ? 'Одобрить' : 'Заблокировать'} артиста ${
          record && record.id
        }`}
        content={`Вы действительно хотите ${
          isBlock ? 'одобрить' : 'заблокировать'
        } артиста?`}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

const StyledButton = styled(Button)<{ $banned: boolean }>`
  color: ${({ $banned }) => ($banned ? '#3CB371' : '#FF8C00')};
`;
