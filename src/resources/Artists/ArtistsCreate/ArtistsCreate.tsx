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
    console.log("context", context)
    useEffect(() => {
        console.log("formContext", formContext)
        // formContext.setValue("limitDays", 3)
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
                                source="type"
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
                                        label="Limit Days"
                                        max={(+formData?.type === 1 || +formData?.type === 3) ? 7 : 1}
                                        min={(+formData?.type === 1 || +formData?.type === 3) ? 2 : 1}
                                        validate={required()}
                                        style={{ width: "100%" }}
                                        helperText={formData?.type ? `You should write ${(+formData?.type === 1 || +formData?.type === 3) ? "min: 2, max: 7" : console.log("formData", formData)}` : ""}
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
                                Social networks links
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
