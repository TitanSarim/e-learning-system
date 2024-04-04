import React, { useRef, useState, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonLoader from '../Utils/ButtonLoader'
import { ConfigApplicationFormData } from '../../actions/Config';


const ProfileAvatar = ({setEditorOpen,  avatar, setAvatar }) => {

    const imageRef = useRef(null);
    const [cropper, setCropper] = useState(null);

    const [newPhoto, setNewPhoto] = useState(avatar);
    const [newAvatar, setNewAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (imageRef.current && cropper) {
            cropper.destroy();
        }
    }, [newPhoto]);

    const BASE_URL = "http://localhost:3900"


    const dataURLToBlob = (dataURL) => {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const blobToFile = (blob, fileName) => {
        const file = new File([blob], fileName, { type: blob.type });
        return file;
    };

    const handleCrop = () => {
        if (cropper) {
            const croppedDataUrl = cropper?.getCroppedCanvas()?.toDataURL();
            setNewAvatar(croppedDataUrl);
        }
    };

    const handleSave = async () =>{

        setIsLoading(true)
        let fileFormData = new FormData();

        if (cropper) {
            const croppedDataUrl = cropper?.getCroppedCanvas()?.toDataURL();
            setNewAvatar(croppedDataUrl);

            // Revert to file
            const blob = dataURLToBlob(croppedDataUrl);
            const file = blobToFile(blob, "cropped-image.png");
            console.log('file', file)

            fileFormData.append('avatar', file);
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/v1/upload-avatar`, fileFormData, ConfigApplicationFormData);
            console.log("response?.data.", response?.data?.avatarUrl)
            if(response?.data.success === true) {
                toast.success("Image Uploaded")
                setAvatar(response?.data.avatarUrl)
            }else if(response?.data.success === false){
                toast.error("Error, Please try again later")
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }finally{
            console.log('File uploaded successfully');
            setIsLoading(false)
            setEditorOpen(false)
        }

    }

    const initCropper = () => {
        const newCropper = new Cropper(imageRef.current, {
            aspectRatio: 1, // You can adjust this as per your requirement
            viewMode: 2,
            autoCropArea: 1,
            crop(event) {
                // You can add any custom cropping event handlers here
            },
        });
        setCropper(newCropper);
    };

    return (
        <div className='general-profile-detail-container-upload-avatar'>

            <div className='general-profile-detail-container-upload-avatar-rendered'>
                <img
                    ref={imageRef}
                    alt="Avatar"
                    src={newPhoto}
                    onLoad={initCropper}
                    style={{ maxWidth: '100%' }}
                />

                <div>
                    <label htmlFor='uplaodImage'><IoCloudUploadOutline size={30} /></label>
                    <input
                        id='uplaodImage'
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    // Set the src of the image to the selected file
                                    imageRef.current.src = event.target.result;
                                    setNewPhoto(event.target.result); 
                                    setNewAvatar(null);
                                };
                                reader.readAsDataURL(e.target.files[0]);
                            }
                        }}
                    />
                </div>
            </div>

            <div className='general-profile-detail-container-upload-avatar-wrapper'>

               <div className='general-profile-detail-container-upload-avatar-wrapper-container'>
                {newAvatar ? (
                        <div className='general-profile-detail-container-upload-avatar-wrapper-images-preview'>
                            <img src={newAvatar} alt='rendered' />
                            <img src={newAvatar} alt='rendered' />
                        </div>
                    ) : (
                        ''
                    )}

                    <button onClick={handleCrop}>Click to Preview</button>
               </div>
               <div className='general-profile-detail-container-upload-avatar-save-uploadbtns'>
                    {isLoading ? (
                        <p><span><ButtonLoader/></span></p>
                    ) : (
                        <button onClick={handleSave}>Save</button>
                    )}
                    <button onClick={() => setEditorOpen(false)}>Close</button>
               </div>
            </div>


        </div>
    )
}

export default ProfileAvatar;
