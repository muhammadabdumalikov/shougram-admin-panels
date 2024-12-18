import { FC, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import {
  ListProps,
  Create,
  SimpleForm,
  TextInput,
  required,
  PasswordInput,
  AutocompleteInput,
  useDataProvider,
  NumberInput,
  SelectInput,
  useCreateContext,
  useCreateController,
  useInput,
  FormDataConsumer,
  useStore,
} from 'react-admin';
import { crudProvider } from 'providers';
import { Typography } from '@mui/material';
import { currency } from 'resources/Artists/constants/artists';
import {
  FieldValues,
  useController,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { type } from '../constants/service';
import { log } from 'console';

const ServiceCreate: FC<ListProps> = (props) => {
  const dataProvider = useDataProvider();
  const [data, setData] = useState<any>();
  const context = useFormContext();

  const transform = (data: FieldValues) => ({
    artist_client_id: data?.artist_client_id,
    amount: +data?.amount,
    currency: data?.currency,
    limitDays: +data?.limitDays,
    type: +data?.type,
  });

  // console.log(context)

  useEffect(() => {
    dataProvider
      .getList('artists', {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'id', order: 'ASC' },
        filter: {},
      })
      .then(({ data }: any) => {
        setData(data);
      });
    // setValue("limitDays", 12)
    // reset({ limitDays: 12 })
  }, []);
  return (
    <Create title="Create Service" transform={transform}>
      <SimpleForm>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Overall
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <AutocompleteInput
                debounce={500}
                setFilter={(data: any) => {
                  dataProvider
                    ?.getList('artists', {
                      pagination: { page: 1, perPage: 10 },
                      sort: { field: 'id', order: 'ASC' },
                      filter: { [`ap.name`]: data, type: 'ARTIST' },
                    })
                    .then(({ data }: any) => {
                      setData(data);
                    });
                }}
                source="artist_client_id"
                validate={required()}
                choices={data?.map((item: any) => {
                  return {
                    id: item?.artistProfile?.clientId,
                    name: item?.artistProfile?.name || 'No name',
                  };
                })}
              />
            </Grid>
            <Grid item xs={4}>
              <NumberInput
                source="amount"
                label="Amount"
                validate={required()}
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectInput
                source="currency"
                choices={currency}
                validate={required()}
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectInput
                source="type"
                choices={type}
                validate={required()}
                style={{ width: '100%' }}
                // onChange={() => {
                //     setValue("limitDays", 12)
                // }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormDataConsumer>
                {({ formData }) => (
                  <NumberInput
                    source="limitDays"
                    label="Limit Days"
                    // value={formData?.type === 2 ? 1 : ""}
                    // max={(+formData?.type === 1 || +formData?.type === 3) ? 7 : 1}
                    // min={(+formData?.type === 1 || +formData?.type === 3) ? 2 : 1}
                    validate={required()}
                    style={{ width: '100%' }}
                    helperText={
                      formData?.type
                        ? `You should write ${
                            +formData?.type === 1 || +formData?.type === 3
                              ? 'min: 2, max: 7'
                              : console.log(formData)
                          }`
                        : ''
                    }
                  />
                )}
              </FormDataConsumer>
              {/* <Typography variant="h6">
                                Overall
                            </Typography> */}
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Create>
  );
};

export default ServiceCreate;
