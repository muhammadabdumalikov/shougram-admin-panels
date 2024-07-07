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
} from 'react-admin';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FieldValues, useFormContext } from 'react-hook-form';
import { activityScopes } from '../constants/artists';
import axios from 'axios';
import { Resources } from 'types';
import { StorageKeys, StorageService } from 'services';
import { AppConfig } from 'config';

const ArtistsCreate: FC<ListProps> = (props) => {
    const { record } = useEditController();
    const [avatarFullKey, setAvatarFullKey] = useState<any>(null);
    const [avatarCroppedKey, setAvatarCroppedKey] = useState<any>(null);

    const token = StorageService.getItem(StorageKeys.ACCESS_TOKEN)

    const transform = (data: FieldValues) => ({
        artistClientId: data?.artistClientId,
        name: data?.name,
        phoneNumber: data?.phoneNumber,
        isHiddenEmail: data?.isHiddenEmail,
        description: data?.description,
        activityScopes: data?.activityScopes,
        socialNetworksLinks: {
            instagram: data?.instagram,
            facebook: data?.facebook,
            telegram: data?.telegram,
            tiktok: data?.tiktok,
            youtube: data?.youtube,
        },
        avatarFullKey: avatarFullKey || data?.avatarFullKey,
        avatarCroppedKey: avatarCroppedKey || data?.avatarCroppedKey,
    });

    const initialValues: any = {
        name: record?.artistProfile?.name,
        phoneNumber: record?.phoneNumber,
        description: record?.artistProfile?.description,
        isHiddenEmail: record?.artistProfile?.isHiddenEmail,
        instagram: record?.artistProfile?.socialNetworksLinks?.instagram,
        facebook: record?.artistProfile?.socialNetworksLinks?.facebook,
        tiktok: record?.artistProfile?.socialNetworksLinks?.tiktok,
        telegram: record?.artistProfile?.socialNetworksLinks?.telegram,
        youtube: record?.artistProfile?.socialNetworksLinks?.youtube,
        artistClientId: record?.artistProfile?.clientId,
        avatarFullKey: record?.artistProfile?.avatarFullKey,
        avatarCroppedKey: record?.artistProfile?.avatarCroppedKey,
        activityScopes: record?.artistProfile?.activityScopes?.map((item: any) => {
            return item?.title;
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
            formData.append('clientId', record?.artistProfile?.clientId);
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
                    .then((data: any) => setAvatarFullKey(data?.data?.key));
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
            formData.append('clientId', record?.artistProfile?.clientId);
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
                    .then((data: any) => setAvatarCroppedKey(data?.data?.key));
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }

    return (
        <Edit
            title={`Edit "${record?.artistProfile?.name}" information`}
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
                                Overall
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="name"
                                label="Name"
                                validate={required()}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="phoneNumber"
                                label="Phone number"
                                validate={required()}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        {/* <Grid item xs={4}>
                            <PasswordInput disabled source="password" label="Password" validate={required()} style={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput source="email" label="Email" validate={required()} style={{ width: "100%" }} />
                        </Grid> */}
                        <Grid item xs={4}>
                            <BooleanInput source="isHiddenEmail" label="Is hidden email" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="description"
                                label="Description"
                                validate={required()}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <AutocompleteArrayInput
                                source="activityScopes"
                                validate={required()}
                                choices={activityScopes}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4} />
                        <Grid item xs={6}>
                            <ImageInput
                                source="avatarFullKey"
                                onChange={(file: any) => {
                                    uploadAvatarFullFile(file)
                                }}
                                validate={required()}
                            >
                                {
                                    (record?.artistProfile?.avatarFullUrl && !avatarFullKey)
                                        ?
                                        <ImageField source="artistProfile.avatarFullUrl" record={record} title="title" />
                                        :
                                        <ImageField source="src" title="title" />
                                }

                            </ImageInput>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageInput
                                source="avatarCroppedKey"
                                onChange={(file: any) => {
                                    uploadAvatarCroppedFile(file)
                                }}
                                validate={required()}
                            >
                                {
                                    (record?.artistProfile?.avatarCroppedUrl && !avatarCroppedKey)
                                        ?
                                        <ImageField source="artistProfile.avatarCroppedUrl" record={record} title="title" />
                                        :
                                        <ImageField source="src" title="title" />
                                }
                            </ImageInput>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Social networks links
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
