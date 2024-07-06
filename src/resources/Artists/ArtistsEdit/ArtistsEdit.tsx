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
    useCreate
} from 'react-admin';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FieldValues, useFormContext } from 'react-hook-form';
import { activityScopes } from '../constants/artists';
import axios from 'axios';



const ArtistsCreate: FC<ListProps> = (props) => {
    const { record } = useEditController();
    const [createFullKey, jsonFullKey] = useCreate();
    const [createCroppedKey, jsonCroppedKey] = useCreate();
    const [fullImageFile, setFullImageFile] = useState()
    const [binaryData, setBinaryData] = useState<any>(null);
    const [file, setFile] = useState<any>(null);


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
        avatarFullKey: jsonFullKey?.data?.presignedUrl,
        avatarCroppedKey: jsonCroppedKey?.data?.presignedUrl

    });
    console.log(jsonFullKey?.data)
    const initialValues: any = {
        name: record?.artistProfile?.name,
        phoneNumber: record?.phoneNumber,
        description: record?.artistProfile?.description,
        isHiddenEmail: record?.artistProfile?.isHiddenEmail,
        // activi: record?.artistProfile?.isHiddenEmail,
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


    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', "avatar");
            formData.append('fileExtension', "jpeg");
            formData.append('bucketFolder', "client_avatars");
            formData.append('clientId', "dc7a893b-9131-40e4-8e0f-bf680be9f4cc");
            const data = Object.fromEntries(formData)
            console.log("formData", data)

            try {
                createFullKey("uploadImage",
                    {
                        data: formData
                    }
                )
                // axios.post("https://staging.api.shougram.uz/v1/admin-panel/artist-profiles/bucket/image/upload-image", formData)
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }, [file])




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
                        <Grid item xs={4}>
                            <input type="file" onChange={handleFileChange} />
                            {/* <input type="file" onChange={(e: any) => {
                                // const formdata = new FormData();
                                // formdata.append("fileName", "avatar");
                                // formdata.append("file", e?.target?.files?.[0]);
                                // formdata.append("fileExtension", "jpeg");
                                // formdata.append("bucketFolder", "client_avatars");
                                // formdata.append("clientId", "dc7a893b-9131-40e4-8e0f-bf680be9f4cc");
                                // let fileData;
                                // for (const [key, value] of formdata.entries()) {
                                //     // @ts-ignore
                                //     fileData = value?.name
                                // }
                                const formData = new FormData();
                                const blob = new Blob([e?.target?.files?.[0]], { type: 'application/octet-stream' });
                                // formData.append('swimArea', new Blob([JSON.stringify(swimArea)], { type: "application/json" }));
                                formData.append("file", blob);
                                console.log(blob)
                                console.log(formData)
                                createFullKey("uploadImage",
                                    {
                                        data:
                                        {
                                            fileName: "avatar",
                                            fileExtension: "jpeg",
                                            bucketFolder: "client_avatars",
                                            clientId: record?.artistProfile?.clientId,
                                            file: new Blob([e?.target?.files?.[0]], { type: 'application/octet-stream' })
                                        }
                                    }
                                )
                                // // axios({
                                //     method: "POST",
                                //     body: formdata,
                                //     headers: {
                                //         "Content-Type": "application/octet-stream"
                                //     },
                                //     url: 
                                // })
                                // createFullKey("uploadImage", { data: { ...formdata } })
                            }} /> */}
                            {/* <ImageInput source="avatarFullKey" onChange={(file: any) => {
                                const formData = new FormData()
                                formData.append("file", file)
                                console.log(file)
                                console.log({ ...formData })
                                const functionX = async () => {
                                    function readFileDataAsBase64() {
                                        return new Promise((resolve, reject) => {
                                            const reader = new FileReader();

                                            reader.onload = (event: any) => {
                                                resolve(event.target.result);
                                            };

                                            reader.onerror = (err) => {
                                                reject(err);
                                            };
                                            // @ts-ignore
                                            reader.readAsText(file);
                                        });
                                    }
                                    const binaryFile = await readFileDataAsBase64()
                                    return binaryFile
                                }
                                functionX().then((data: any) => {
                                    console.log(data)
                                    // createFullKey("uploadImage",
                                    //     {
                                    //         data:
                                    //         {
                                    //             fileName: "avatar",
                                    //             fileExtension: file?.type?.split("/")[1],
                                    //             bucketFolder: "client_avatars",
                                    //             clientId: record?.artistProfile?.clientId,
                                    //             file: data
                                    //         }
                                    //     }
                                    // )
                                })

                                const arrayBufferToBinaryString = (buffer: any) => {
                                    let binary = '';
                                    const bytes = new Uint8Array(buffer);
                                    const len = bytes.byteLength;
                                    for (let i = 0; i < len; i++) {
                                        binary += String.fromCharCode(bytes[i]);
                                    }
                                    return binary;
                                };
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    const arrayBuffer = reader.result;
                                    // @ts-ignore
                                    const binaryString = arrayBufferToBinaryString(arrayBuffer);
                                    // @ts-ignore

                                    setBinaryData(binaryString);
                                };
                                reader.readAsArrayBuffer(file);
                                createFullKey("uploadImage",
                                    {
                                        data:
                                        {
                                            fileName: "avatar",
                                            fileExtension: file?.type?.split("/")[1],
                                            bucketFolder: "client_avatars",
                                            clientId: record?.artistProfile?.clientId,
                                            file: binaryData
                                        }
                                    }
                                )
                                console.log(binaryData)
                            }} >
                                <ImageField source="src" title="title" />
                            </ImageInput> */}
                        </Grid>
                        <Grid item xs={4}>
                            <ImageInput source="avatarCroppedKey" onChange={(file: any) => {
                                createCroppedKey("uploadImage", { data: { fileName: "avatar", fileExtension: file?.type?.split("/")[1], bucketFolder: "client_avatars", clientId: record?.artistProfile?.clientId } })
                            }} >
                                <ImageField source="src" title="title" />
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
        </Edit >
    );
};

export default ArtistsCreate;
