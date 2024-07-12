import { FC, useEffect, useState } from 'react';
import {
    ListProps,
    Edit,
    SimpleForm,
    TextInput,
    required,
    BooleanInput,
    PasswordInput,
    AutocompleteArrayInput,
    SelectInput,
    useEditContext,
    useEditController,
    ImageInput,
    ImageField,
    Toolbar,
    SaveButton,
    DeleteWithConfirmButton,
    useCreate,
    FormDataConsumer,
    NumberInput,
    Button,
    useDelete,
    useRedirect,
} from 'react-admin';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FieldValues, useFormContext } from 'react-hook-form';
import { activityScopes, currency, type } from '../constants/artists';
import axios from 'axios';
import { Resources } from 'types';
import { StorageKeys, StorageService } from 'services';
import { AppConfig } from 'config';
import { useNotify } from 'react-admin';
import { PutBucketInventoryConfigurationRequestFilterSensitiveLog } from '@aws-sdk/client-s3';

const ArtistsCreate: FC<ListProps> = (props) => {
    const { record } = useEditController();
    const [createService, createServiceData] = useCreate()
    const [deleteServiceRequest, deleteServiceData] = useDelete()
    const redirect = useRedirect();

    const [initialValues, setInitialValues] = useState<any>();
    const [avatarFullKey, setAvatarFullKey] = useState<any>(null);
    const [avatarCroppedKey, setAvatarCroppedKey] = useState<any>(null);
    const [amountOrdinary, setAmountOrdinary] = useState<any>()
    const [currencyOrdinary, setCurrencyOrdinary] = useState<any>()
    const [limitDaysOrdinary, setLimitDaysOrdinary] = useState<any>()
    const [amountUrgently, setAmountUrgently] = useState<any>()
    const [currencyUrgently, setCurrencyUrgently] = useState<any>()
    const [limitDaysUrgently, setLimitDaysUrgently] = useState<any>()
    const [amountCOmmercial, setAmountCOmmercial] = useState<any>()
    const [currencyCOmmercial, setCurrencyCOmmercial] = useState<any>()
    const [limitDaysCOmmercial, setLimitDaysCOmmercial] = useState<any>()
    const [clientId, setClientId] = useState<any>()


    const token = StorageService.getItem(StorageKeys.ACCESS_TOKEN)
    const notify = useNotify();

    const transform = (data: FieldValues) => ({
        artistClientId: data?.artistClientId,
        name: data?.name,
        phoneNumber: data?.phoneNumber,
        isHiddenEmail: data?.isHiddenEmail,
        email: data?.email,
        description: data?.description,
        activityScopes: data?.activityScopes,
        socialNetworksLinks: {
            instagram: data?.instagram,
            facebook: data?.facebook,
            telegram: data?.telegram,
            tiktok: data?.tiktok,
            youtube: data?.youtube,
        },
        // services: [
        //     {
        //         amount: +data?.amount,
        //         currency: data?.currency,
        //         limitDays: +data?.limitDays,
        //         type: +data?.serviceType,
        //     }
        // ],
        avatarFullKey: avatarFullKey || data?.avatarFullKey,
        avatarCroppedKey: avatarCroppedKey || data?.avatarCroppedKey,

    });

    const CustomToolbar = () => (
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <SaveButton />
            <DeleteWithConfirmButton
                confirmContent="You will not be able to recover this record. Are you sure?"
                confirmColor="warning"
            />
        </Toolbar>
    );

    const uploadAvatarFullFile = (file: any) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', 'avatar');
            formData.append('fileExtension', file?.type?.split("/")[1]);
            formData.append('bucketFolder', 'client_avatars');
            formData.append('clientId', record?.profile?.clientId);
            try {
                axios
                    .post(
                        `${AppConfig.BASE_API_URL}/${Resources.UPLOADIMAGE}`,
                        formData,
                        {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    )
                    .then((data: any) => setAvatarFullKey(data?.data?.key))
                    .catch((error: any) => {
                        notify(error?.message, { type: 'error' });
                    })
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }

    const uploadAvatarCroppedFile = (file: any) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', 'avatar');
            formData.append('fileExtension', file?.type?.split("/")[1]);
            formData.append('bucketFolder', 'client_avatars');
            formData.append('clientId', record?.profile?.clientId);
            try {
                axios
                    .post(
                        `${AppConfig.BASE_API_URL}/${Resources.UPLOADIMAGE}`,
                        formData,
                        {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    )
                    .then((data: any) => setAvatarCroppedKey(data?.data?.key))
                    .catch((error: any) => {
                        notify(error?.message, { type: 'error' });
                    })
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }

    const setService = (type: string) => {
        let data: any;
        let requiredValue: any;
        if (type === "ordinary") {
            requiredValue = amountOrdinary && currencyOrdinary && limitDaysOrdinary
            data = {
                amount: +amountOrdinary,
                currency: currencyOrdinary,
                limitDays: +limitDaysOrdinary,
                type: 1,
                artist_client_id: clientId
            }
        }
        if (type === "urgently") {
            requiredValue = amountUrgently && currencyUrgently && limitDaysUrgently
            data = {
                amount: +amountUrgently,
                currency: currencyUrgently,
                limitDays: 1,
                type: 2,
                artist_client_id: clientId
            }
        }
        if (type === "commercial") {
            requiredValue = amountCOmmercial && currencyCOmmercial && limitDaysCOmmercial
            data = {
                amount: +amountCOmmercial,
                currency: currencyCOmmercial,
                limitDays: +limitDaysCOmmercial,
                type: 3,
                artist_client_id: clientId
            }
        }
        if (requiredValue) {
            createService("set-service", { data: data })
        } else {
            notify(`You should write`, { type: 'warning' });
        }
    }

    const deleteService = (type: string) => {
        let data: any = {
            artist_client_id: clientId
        };
        if (type === "ordinary") {
            data.type = 1
        }
        if (type === "urgently") {
            data.type = 2
        }
        if (type === "commercial") {
            data.type = 3
        }
        let checkDeleteService = +Boolean(amountOrdinary) + +Boolean(amountUrgently) + +Boolean(amountCOmmercial)
        if (checkDeleteService === 1) {
            notify(`You can not delete`, { type: 'warning' });
        } else {
            deleteServiceRequest("del-service", { previousData: data })
        }
    }


    const disableSaveButton = (type: string) => {
        if (type === "ordinary") {
            return amountOrdinary === record?.profile?.services?.find((item: any) => item?.type === 1)?.amount && currencyOrdinary === record?.profile?.services?.find((item: any) => item?.type === 1)?.currency && limitDaysOrdinary === record?.profile?.services?.find((item: any) => item?.type === 1)?.limitDays
        }
        if (type === "urgently") {
            return amountUrgently === record?.profile?.services?.find((item: any) => item?.type === 2)?.amount && currencyUrgently === record?.profile?.services?.find((item: any) => item?.type === 2)?.currency && limitDaysUrgently === record?.profile?.services?.find((item: any) => item?.type === 2)?.limitDays
        }
        if (type === "commercial") {
            return amountCOmmercial === record?.profile?.services?.find((item: any) => item?.type === 3)?.amount && currencyCOmmercial === record?.profile?.services?.find((item: any) => item?.type === 3)?.currency && limitDaysCOmmercial === record?.profile?.services?.find((item: any) => item?.type === 3)?.limitDays
        }

    }

    useEffect(() => {
        if (record) {
            setAmountOrdinary(record?.profile?.services?.find((item: any) => item?.type === 1)?.amount)
            setAmountUrgently(record?.profile?.services?.find((item: any) => item?.type === 2)?.amount)
            setAmountCOmmercial(record?.profile?.services?.find((item: any) => item?.type === 3)?.amount)
            setCurrencyOrdinary(record?.profile?.services?.find((item: any) => item?.type === 1)?.currency)
            setCurrencyUrgently(record?.profile?.services?.find((item: any) => item?.type === 2)?.currency)
            setCurrencyCOmmercial(record?.profile?.services?.find((item: any) => item?.type === 3)?.currency)
            setLimitDaysOrdinary(record?.profile?.services?.find((item: any) => item?.type === 1)?.limitDays)
            setLimitDaysUrgently(1)
            setLimitDaysCOmmercial(record?.profile?.services?.find((item: any) => item?.type === 3)?.limitDays)
            setClientId(record?.profile?.clientId)
            setInitialValues({
                name: record?.profile?.name,
                phoneNumber: record?.phoneNumber,
                description: record?.profile?.description,
                isHiddenEmail: record?.profile?.isHiddenEmail,
                email: record?.profile?.email,
                instagram: record?.profile?.socialNetworksLinks?.instagram,
                facebook: record?.profile?.socialNetworksLinks?.facebook,
                tiktok: record?.profile?.socialNetworksLinks?.tiktok,
                telegram: record?.profile?.socialNetworksLinks?.telegram,
                youtube: record?.profile?.socialNetworksLinks?.youtube,
                artistClientId: record?.profile?.clientId,
                avatarFullKey: record?.profile?.avatarFullUrl ? `client_avatars${record?.profile?.avatarFullUrl?.split("client_avatars")[1]}` : null,
                avatarCroppedKey: record?.profile?.avatarCroppedUrl ? `client_avatars${record?.profile?.avatarCroppedUrl?.split("client_avatars")[1]}` : null,
                activityScopes: record?.profile?.activityScopes?.map((item: any) => {
                    return item;
                }),
                amountOrdinary: record?.profile?.services?.find((item: any) => item?.type === 1)?.amount,
                currencyOrdinary: record?.profile?.services?.find((item: any) => item?.type === 1)?.currency,
                limitDaysOrdinary: record?.profile?.services?.find((item: any) => item?.type === 1)?.limitDays,
                amountUrgently: record?.profile?.services?.find((item: any) => item?.type === 2)?.amount,
                currencyUrgently: record?.profile?.services?.find((item: any) => item?.type === 2)?.currency,
                limitDaysUrgently: 1,
                amountCommercial: record?.profile?.services?.find((item: any) => item?.type === 3)?.amount,
                currencyCommercial: record?.profile?.services?.find((item: any) => item?.type === 3)?.currency,
                limitDaysCommercial: record?.profile?.services?.find((item: any) => item?.type === 3)?.limitDays,

            })
        }
    }, [record])
    useEffect(() => {
        if (deleteServiceData?.data?.success) {
            notify(`Service has been deleted`, { type: 'warning' });
            if (deleteServiceData?.data?.params?.previousData?.type === 1) {
                setInitialValues((prev: any) => {
                    return {
                        ...prev,
                        amountOrdinary: null,
                        currencyOrdinary: null,
                        limitDaysOrdinary: null

                    }
                })
                setAmountOrdinary(null)
                setCurrencyOrdinary(null)
                setLimitDaysOrdinary(null)
            }
            if (deleteServiceData?.data?.params?.previousData?.type === 2) {
                setInitialValues((prev: any) => {
                    return {
                        ...prev,
                        amountUrgently: null,
                        currencyUrgently: null,
                    }
                })
                setAmountUrgently(null)
                setCurrencyUrgently(null)
            }
            if (deleteServiceData?.data?.params?.previousData?.type === 3) {
                setInitialValues((prev: any) => {
                    return {
                        ...prev,
                        amountCommercial: null,
                        currencyCommercial: null,
                        limitDaysCommercial: null

                    }
                })
                setAmountCOmmercial(null)
                setCurrencyCOmmercial(null)
                setLimitDaysCOmmercial(null)
            }
        }
    }, [deleteServiceData?.data])
    useEffect(() => {
        if (createServiceData?.data) {
            notify(`Service has been added`, { type: 'success' });
        }
    }, [createServiceData?.data])
    return (
        <Edit
            title={`Edit "${record?.profile?.name}" information`}
            transform={transform}
            redirect={'show'}
            mutationMode={'pessimistic'}
        >
            <SimpleForm
                sx={{ maxWidth: { lg: '500' } }}
                defaultValues={initialValues}
                toolbar={<CustomToolbar />}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Общий
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextInput
                                source="name"
                                label="имя"
                                validate={required()}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextInput
                                source="phoneNumber"
                                label="Номер телефона"
                                validate={required()}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextInput
                                type="email"
                                source="email"
                                label="Электронная почта"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <BooleanInput source="isHiddenEmail" label="Скрытый адрес электронной почты" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="description"
                                label="Описание"
                                validate={required()}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <AutocompleteArrayInput
                                source="activityScopes"
                                label="Области деятельности"
                                validate={required()}
                                choices={activityScopes}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4} />
                        <Grid item xs={6}>
                            <ImageInput
                                source="avatarFullKey"
                                label="полный ключ аватара"
                                onChange={(file: any) => {
                                    uploadAvatarFullFile(file)
                                }}
                                validate={required()}
                            >
                                {
                                    (record?.profile?.avatarFullUrl && !avatarFullKey)
                                        ?
                                        <ImageField source="profile.avatarFullUrl" record={record} title="title" />
                                        :
                                        <ImageField source="src" title="title" />
                                }

                            </ImageInput>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageInput
                                source="avatarCroppedKey"
                                label="обрезанный ключ аватара"
                                onChange={(file: any) => {
                                    uploadAvatarCroppedFile(file)
                                }}
                                validate={required()}
                            >
                                {
                                    (record?.profile?.avatarCroppedUrl && !avatarCroppedKey)
                                        ?
                                        <ImageField source="profile.avatarCroppedUrl" record={record} title="title" />
                                        :
                                        <ImageField source="src" title="title" />
                                }
                            </ImageInput>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Услуга
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                ОБЫЧНЫЙ
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <NumberInput
                                source="amountOrdinary"
                                label="Количество"
                                onChange={(amount: any) => setAmountOrdinary(amount?.target?.value)}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <SelectInput
                                source="currencyOrdinary"
                                label="валюта"
                                onChange={(currency: any) => setCurrencyOrdinary(currency?.target?.value)}
                                choices={currency}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        {/* <Grid item xs={3}>
                            <SelectInput
                                source="serviceType"
                                choices={type}
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid> */}
                        <Grid item xs={3}>
                            <FormDataConsumer>
                                {({ formData }) => (
                                    <NumberInput
                                        source="limitDaysOrdinary"
                                        label="Ограничить дни"
                                        onChange={(limitDays: any) => setLimitDaysOrdinary(limitDays?.target?.value)}
                                        max={7}
                                        min={2}
                                        style={{ width: "100%" }}
                                        helperText={`Вы должны написать мин: 2, Макс: 7`}
                                    />)}
                            </FormDataConsumer>
                        </Grid>
                        <Grid item xs={3} >
                            <Button
                                label="Сохранить"
                                style={{ marginTop: "20px" }}
                                onClick={() => setService("ordinary")}
                                disabled={disableSaveButton("ordinary")}
                            />
                            <Button
                                label="УДАЛИТЬ"
                                style={{ marginTop: "20px", color: "red" }}
                                onClick={() => deleteService("ordinary")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                СРОЧНО
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <NumberInput
                                source="amountUrgently"
                                label="Количество"
                                onChange={(amount: any) => setAmountUrgently(amount?.target?.value)}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <SelectInput
                                source="currencyUrgently"
                                label="валюта"
                                onChange={(currency: any) => setCurrencyUrgently(currency?.target?.value)}
                                choices={currency}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        {/* <Grid item xs={3}>
                            <SelectInput
                                source="serviceType"
                                choices={type}
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid> */}
                        <Grid item xs={3}>
                            <FormDataConsumer>
                                {({ formData }) => (
                                    <NumberInput
                                        source="limitDaysUrgently"
                                        label="Ограничить дни"
                                        onChange={(limitDays: any) => setLimitDaysUrgently(limitDays?.target?.value)}
                                        disabled={true}
                                        max={1}
                                        min={1}
                                        style={{ width: "100%" }}
                                        helperText={`Вы должны написать 1`}
                                    />)}
                            </FormDataConsumer>
                        </Grid>
                        <Grid item xs={3}>
                            <Button label="Сохранить" style={{ marginTop: "20px" }} onClick={() => setService("urgently")}
                                disabled={disableSaveButton("urgently")}
                            />
                            <Button label="УДАЛИТЬ" style={{ marginTop: "20px", color: "red" }} onClick={() => deleteService("urgently")} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                КОММЕРЧЕСКИЙ
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <NumberInput
                                source="amountCommercial"
                                label="Количество"
                                onChange={(amount: any) => setAmountCOmmercial(amount?.target?.value)}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <SelectInput
                                source="currencyCommercial"
                                label="валюта"
                                onChange={(currency: any) => setCurrencyCOmmercial(currency?.target?.value)}
                                choices={currency}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        {/* <Grid item xs={3}>
                            <SelectInput
                                source="serviceType"
                                choices={type}
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid> */}
                        <Grid item xs={3}>
                            <FormDataConsumer>
                                {({ formData }) => (
                                    <NumberInput
                                        source="limitDaysCommercial"
                                        label="Ограничить дни"
                                        onChange={(limitDays: any) => setLimitDaysCOmmercial(limitDays?.target?.value)}
                                        max={7}
                                        min={2}
                                        style={{ width: "100%" }}
                                        helperText={`Вы должны написать мин: 2, Макс: 7`}
                                    />)}
                            </FormDataConsumer>
                        </Grid>
                        <Grid item xs={3}>
                            <Button label="Сохранить" style={{ marginTop: "20px" }} onClick={() => setService("commercial")}
                                disabled={disableSaveButton("commercial")}
                            />
                            <Button label="УДАЛИТЬ" style={{ marginTop: "20px", color: "red" }} onClick={() => deleteService("commercial")} />
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
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="facebook"
                                label="Facebook"
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="telegram"
                                label="Telegram"
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="tiktok"
                                label="Tiktok"
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="youtube"
                                label="Youtube"
                                style={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </SimpleForm>
        </Edit >
    );
};

export default ArtistsCreate;
