import { FC } from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import {
    ListProps,
    Create,
    SimpleForm,
    TextInput,
    required,
    PasswordInput,

} from 'react-admin';
import { FieldValues } from 'react-hook-form';
import { crudProvider } from "providers"
import { Typography } from '@mui/material';

const ServicesCreate: FC<ListProps> = (props) => {
    // const transform = (data: FieldValues) => ({
    //     count: +data?.count,
    //     phoneNumber: data?.phoneNumber,
    //     artist_client_id: data?.artist_client_id,
    //     type: data?.type,
    //     value: +data?.value,
    //     from_date: data?.from_date,
    //     to_date: data?.to_date,
    //     prefix: data?.prefix,
    // });
    return (
        <Create
            title="Create Service"
        // transform={transform}
        >
            <SimpleForm>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Overall
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                source="login"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <PasswordInput
                                source="password"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="email"
                                type="email"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                source="url"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                    </Grid>
                </Box>

            </SimpleForm>
        </Create>
    );
};

export default ServicesCreate;
