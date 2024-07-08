import { FC, useEffect } from 'react';
import {
    ListProps,
    Create,
    SimpleForm,
    TextInput,
    required,
    BooleanInput,
    PasswordInput,
    AutocompleteArrayInput,
    SelectInput,
    useNotify,
    useRedirect,
    ImageInput,
    ImageField,
    useCreate,
    NumberInput,
    FormDataConsumer,
    useCreateController,
    useCreateContext
} from 'react-admin';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FieldValues, useFormContext } from 'react-hook-form';
import { activityScopes, currency, type } from '../constants/artists';
import { Controller, useForm } from "react-hook-form";


const ArtistsCreate: FC<ListProps> = (props) => {
    const record = useCreateController();
    const context = useCreateContext();
    const formContext = useFormContext();

    const transform = (data: FieldValues) => ({
        name: data?.name,
        phoneNumber: data?.phoneNumber,
        password: data?.password,
        email: data?.email,
        isHiddenEmail: data?.isHiddenEmail,
        description: data?.description,
        activityScopes: data?.activityScopes,
        services: [
            {
                amount: +data?.amount,
                currency: data?.currency,
                limitDays: +data?.limitDays,
                type: +data?.type,
            }
        ],
        socialNetworksLinks: {
            instagram: data?.instagram,
            facebook: data?.facebook,
            telegram: data?.telegram,
            tiktok: data?.tiktok,
            youtube: data?.youtube,
        }

    });
    const initialValues: any = {
        amount: 100,
        currency: "UZS",
        limitDays: 3,
        type: 1

    };
    return (
        <Create
            title="Create an artist"
            transform={transform}
            redirect={"edit"}
        >
            <SimpleForm sx={{ maxWidth: { lg: '500' } }} defaultValues={initialValues}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Общий
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="name"
                                label="имя"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="phoneNumber"
                                label="Номер телефона"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <PasswordInput
                                source="password"
                                label="Пароль"
                                inputProps={{ minLength: 6 }}
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                type="email"
                                source="email"
                                label="Электронная почта"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <BooleanInput
                                source="isHiddenEmail"
                                label="Скрытый адрес электронной почты"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="description"
                                label="Описание"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <AutocompleteArrayInput
                                source="activityScopes"
                                label="Области деятельности"
                                validate={required()}
                                choices={activityScopes}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        {/* <Grid item xs={4}>
                            <ImageInput source="Avatar" onChange={(data: any) => {
                                create("uploadImage", { data: { name: "" } })
                            }} >
                                <ImageField source="src" title="title" />
                            </ImageInput>
                        </Grid> */}
                        {/* <Grid item xs={4}>
                            <TextInput source="avatarCroppedKey" label="Avatar cropped key" validate={required()} style={{ width: "100%" }} />
                        </Grid> */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Услуга
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <NumberInput
                                source="amount"
                                label="Количество"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <SelectInput
                                source="currency"
                                label="валюта"
                                choices={currency}
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <SelectInput
                                source="type"
                                label="тип"
                                choices={type}
                                validate={required()}
                                style={{ width: "100%" }}
                            // onChange={() => {
                            //     console.log("formContext", formContext)
                            //     formContext.setValue("limitDays", 3)
                            // }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormDataConsumer>
                                {({ formData }) => (
                                    <NumberInput
                                        source="limitDays"
                                        label="Ограничить дни"
                                        max={(+formData?.type === 1 || +formData?.type === 3) ? 7 : 1}
                                        min={(+formData?.type === 1 || +formData?.type === 3) ? 2 : 1}
                                        validate={required()}
                                        style={{ width: "100%" }}
                                        helperText={formData?.type ? `Вы должны написать ${(+formData?.type === 1 || +formData?.type === 3) ? "мин: 2, Макс: 7" : 1}` : ""}
                                    />)}
                            </FormDataConsumer>
                            {/* <NumberInput
                                source="limitDays"
                                label="Limit Days"
                                max={30}
                                min={1}
                                validate={required()}
                                style={{ width: "100%" }}
                            /> */}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Ссылки на социальные сети
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="instagram"
                                label="Instagram"
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="facebook"
                                label="Facebook"
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="telegram"
                                label="Telegram"
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="tiktok"
                                label="Tiktok"
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="youtube"
                                label="Youtube"
                                style={{ width: "100%" }}
                            />
                        </Grid>

                    </Grid>
                </Box>
            </SimpleForm>
        </Create>
    );
};

export default ArtistsCreate;
