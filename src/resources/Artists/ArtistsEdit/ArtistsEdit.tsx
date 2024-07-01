import { FC } from 'react';
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
    useCreate
} from 'react-admin';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FieldValues, useFormContext } from 'react-hook-form';
import { activityScopes } from '../constants/artists';


const ArtistsCreate: FC<ListProps> = (props) => {
    const { record } = useEditController();
    const [createFullKey, jsonFullKey] = useCreate();
    const [createCroppedKey, jsonCroppedKey] = useCreate();


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
        // avatarFullKey: "client_avatars/001e22da-753c-432b-a816-dcf08c7a0ddf/d637abd9-50ce-40bf-94d7-aedb856f9f2c_Gaybulla.jpeg",
        // avatarCroppedKey: "client_avatars/001e22da-753c-432b-a816-dcf08c7a0ddf/d637abd9-50ce-40bf-94d7-aedb856f9f2c_Gaybulla.jpeg"

    });
    const initialValues: any = {
        name: record?.artistProfile?.name,
        phoneNumber: record?.phoneNumber,
        description: record?.artistProfile?.description,
        isHiddenEmail: record?.artistProfile?.isHiddenEmail,
        activi: record?.artistProfile?.isHiddenEmail,
        instagram: record?.artistProfile?.socialNetworksLinks?.instagram,
        facebook: record?.artistProfile?.socialNetworksLinks?.facebook,
        tiktok: record?.artistProfile?.socialNetworksLinks?.tiktok,
        telegram: record?.artistProfile?.socialNetworksLinks?.telegram,
        youtube: record?.artistProfile?.socialNetworksLinks?.youtube,
        artistClientId: record?.artistProfile?.clientId,
        activityScopes: record?.artistProfile?.activityScopes?.map((item: any) => {
            return item?.title
        })
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

    return (
        <Edit
            title={`Edit "${record?.artistProfile?.name}" information`}
            transform={transform}
            redirect={"show"}
            mutationMode={"pessimistic"}
        >
            <SimpleForm
                sx={{ maxWidth: { lg: '500' } }}
                defaultValues={initialValues}
                toolbar={<CustomToolbar />}>
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
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="phoneNumber"
                                label="Phone number"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        {/* <Grid item xs={4}>
                            <PasswordInput disabled source="password" label="Password" validate={required()} style={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput source="email" label="Email" validate={required()} style={{ width: "100%" }} />
                        </Grid> */}
                        <Grid item xs={4}>
                            <BooleanInput
                                source="isHiddenEmail"
                                label="Is hidden email"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="description"
                                label="Description"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <AutocompleteArrayInput
                                source="activityScopes"
                                validate={required()}
                                choices={activityScopes}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        {/* <Grid item xs={4}>
                            <ImageInput source="avatarFullKey" onChange={(file: any) => {
                                createFullKey("uploadImage", { data: { fileName: file?.name, fileExtension: file?.type?.split("/")[1], bucketFolder: "client_avatars", clientId: record?.artistProfile?.clientId } })
                            }} >
                                <ImageField source="src" title="title" />
                            </ImageInput>
                        </Grid>
                        <Grid item xs={4}>
                            <ImageInput source="avatarCroppedKey" onChange={(file: any) => {
                                createCroppedKey("uploadImage", { data: { fileName: file?.name, fileExtension: file?.type?.split("/")[1], bucketFolder: "client_avatars", clientId: record?.artistProfile?.clientId } })
                            }} >
                                <ImageField source="src" title="title" />
                            </ImageInput>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Social networks links
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="instagram"
                                label="Instagram"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="facebook"
                                label="Facebook"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="telegram"
                                label="Telegram"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="tiktok"
                                label="Tiktok"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                source="youtube"
                                label="Youtube"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </SimpleForm>
        </Edit >
    );
};

export default ArtistsCreate;
