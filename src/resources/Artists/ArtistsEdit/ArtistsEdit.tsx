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

const ArtistsCreate: FC<ListProps> = (props) => {
    const { record } = useEditController();
    const [avatarFullKey, setAvatarFullKey] = useState<any>(null);
    const [avatarCroppedKey, setAvatarCroppedKey] = useState<any>(null);

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

    const initialValues: any = {
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
        avatarFullKey: `client_avatars${record?.profile?.avatarFullUrl?.split("client_avatars")[1]}`,
        avatarCroppedKey: `client_avatars${record?.profile?.avatarCroppedUrl?.split("client_avatars")[1]}`,
        // amount: record?.profile?.services?.[0]?.amount,
        // limitDays: record?.profile?.services?.[0]?.limitDays,
        // serviceType: record?.profile?.services?.[0]?.type,
        // currency: record?.profile?.services?.[0]?.currency,
        activityScopes: record?.profile?.activityScopes?.map((item: any) => {
            return item;
        }),

    };

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
                        {/* <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Service
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <NumberInput
                                source="amount"
                                label="Amount"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <SelectInput
                                source="currency"
                                choices={currency}
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <SelectInput
                                source="serviceType"
                                choices={type}
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormDataConsumer>
                                {({ formData }) => (
                                    <NumberInput
                                        source="limitDays"
                                        label="Limit Days"
                                        value={formData?.serviceType === 2 ? 1 : ""}
                                        max={(+formData?.serviceType === 1 || +formData?.serviceType === 3) ? 7 : 1}
                                        min={(+formData?.serviceType === 1 || +formData?.serviceType === 3) ? 2 : 1}
                                        validate={required()}
                                        style={{ width: "100%" }}
                                        helperText={formData?.serviceType ? `You should write ${(+formData?.serviceType === 1 || +formData?.serviceType === 3) ? "min: 2, max: 7" : "1"}` : ""}
                                    />)}
                            </FormDataConsumer>
                        </Grid> */}
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
