import React from 'react';
import { TopToolbar, useRecordContext } from 'react-admin';
import { OrderStatusButton } from '../../../components';
import { ORDERSTATUS, OrderTypeOrmEntity } from 'api/generated';

const ShowActions = () => {
  const record = useRecordContext<OrderTypeOrmEntity>();

  return (
    <TopToolbar>
      {record?.status === ORDERSTATUS.UnderConsideration && (
        <>
          <OrderStatusButton nextStatus={ORDERSTATUS.DoneAfterConsideration} />
          <OrderStatusButton nextStatus={ORDERSTATUS.WaitingForRework} />
          <OrderStatusButton
            nextStatus={ORDERSTATUS.RejectAfterConsideration}
          />
        </>
      )}
    </TopToolbar>
  );
};

export default ShowActions;
