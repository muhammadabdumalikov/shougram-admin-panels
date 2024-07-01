import { FC, useEffect, useState } from 'react';
import {
    ListProps,
    Create,
    SimpleForm,
    TextInput,
    required,
    SelectInput,
    useNotify,
    useRedirect,
    DateInput,
    AutocompleteInput,
    useDataProvider,
} from 'react-admin';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FieldValues } from 'react-hook-form';
import { type } from '../constants/promocode';


const PromocodeCreate: FC<ListProps> = (props) => {
    const dataProvider = useDataProvider();
    const [data, setData] = useState<any>()

    const transform = (data: FieldValues) => ({
        count: +data?.count,
        phoneNumber: data?.phoneNumber,
        artist_client_id: data?.artist_client_id,
        type: data?.type,
        value: +data?.value,
        from_date: data?.from_date,
        to_date: data?.to_date,
        prefix: data?.prefix,
    });

    useEffect(() => {
        dataProvider.getList("artists", {
            pagination: { page: 1, perPage: 10 },
            sort: { field: "id", order: "ASC" },
            filter: {}
        }).then(({ data }: any) => {
            setData(data);
        })
    }, [])

    return (
        <Create
            title="Create a promocode"
            transform={transform}
            redirect={"show"}
        >
            <SimpleForm sx={{ maxWidth: { lg: '500' } }}>
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
                                    dataProvider?.getList("artists", {
                                        pagination: { page: 1, perPage: 10 },
                                        sort: { field: "id", order: "ASC" },
                                        filter: { [`ap.name`]: data, type: "ARTIST" },
                                    }).then(({ data }: any) => {
                                        setData(data);
                                    })
                                }}
                                source="artist_client_id"
                                validate={required()}
                                choices={data?.map((item: any) => { return { id: item?.artistProfile?.clientId, name: item?.artistProfile?.name || "No name" } })}
                            ></AutocompleteInput>
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="count"
                                type="number"
                                label="Count"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectInput
                                source="type"
                                validate={required()}
                                choices={type}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="value"
                                type="number"
                                label="Value"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <DateInput
                                source="from_date"
                                label="Value"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <DateInput
                                source="to_date"
                                label="Value"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="prefix"
                                label="Prefix"
                                inputProps={{ maxLength: 6 }}
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

export default PromocodeCreate;
