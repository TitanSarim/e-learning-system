import React, { useRef, useState, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { IoCloudUploadOutline } from "react-icons/io5";

const ProfileAvatar = ({ setEditorOpen, setAvatar, avatar }) => {

    const imageRef = useRef(null);
    const [cropper, setCropper] = useState(null);
    const [newAvatar, setNewAvatar] = useState(null);

    useEffect(() => {
        if (imageRef.current && cropper) {
            cropper.destroy(); // Destroy previous Cropper instance
            initCropper(); // Initialize a new Cropper instance
        }
    }, [avatar]); // Re-initialize Cropper when avatar changes

    const handleCrop = () => {
        if (cropper) {
            const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
            setNewAvatar(croppedDataUrl);
        }
    };

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
                    // src={avatar}
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
                                    setAvatar(event.target.result); 
                                    setNewAvatar(null);
                                };
                                reader.readAsDataURL(e.target.files[0]);
                            }
                        }}
                    />
                </div>
            </div>

            <div className='general-profile-detail-container-upload-avatar-wrapper'>

                {newAvatar ? (
                    <div className='general-profile-detail-container-upload-avatar-wrapper-images-preview'>
                        <img src={newAvatar} alt='rendered' />
                        <img src={newAvatar} alt='rendered' />
                    </div>
                ) : (
                    <p>Save To Preview</p>
                )}

                <button onClick={handleCrop}>Save</button>
            </div>


        </div>
    )
}

export default ProfileAvatar;
