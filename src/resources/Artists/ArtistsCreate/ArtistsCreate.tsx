import { FC } from 'react';
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
    NumberInput
} from 'react-admin';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FieldValues } from 'react-hook-form';
import { activityScopes, currency } from '../constants/artists';


const ArtistsCreate: FC<ListProps> = (props) => {

    const transform = (data: FieldValues) => ({
        name: data?.name,
        phoneNumber: data?.phoneNumber,
        password: data?.password,
        email: data?.email,
        isHiddenEmail: data?.isHiddenEmail,
        description: data?.description,
        activityScopes: data?.activityScopes,
        // avatarFullKey: data?.avatarFullKey,
        // avatarCroppedKey: data?.avatarCroppedKey,
        service: {
            amount: +data?.amount,
            currency: data?.currency,
            limitDays: +data?.limitDays
        },
        socialNetworksLinks: {
            instagram: data?.instagram,
            facebook: data?.facebook,
            telegram: data?.telegram,
            tiktok: data?.tiktok,
            youtube: data?.youtube,
        }

    });

    return (
        <Create
            title="Create an artist"
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
                        <Grid item xs={4}>
                            <PasswordInput
                                source="password"
                                label="Password"
                                inputProps={{ minLength: 6 }}
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                type="email"
                                source="email"
                                label="Email"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
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
                                Service
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <NumberInput
                                source="amount"
                                label="Amount"
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectInput
                                source="currency"
                                choices={currency}
                                validate={required()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <NumberInput
                                source="limitDays"
                                label="Limit Days"
                                max={30}
                                min={1}
                                validate={required()}
                                style={{ width: "100%" }}
                            />
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
        </Create>
    );
};

export default ArtistsCreate;
