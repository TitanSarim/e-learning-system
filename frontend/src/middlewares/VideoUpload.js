import { BlobServiceClient } from '@azure/storage-blob';


export const VideoUploadToAzureContainer = async (file) => {
    const storageAccountName = "elearningplateform";
    const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwlacupiytfx&se=2026-04-01T23:48:46Z&st=2024-03-08T15:48:46Z&spr=https,http&sig=6rkt5tO2fGiunogJXADewkfjMNCk2GcOyH%2FK5M1g5ws%3D";
    const containerName = "courses-videos";

    const blobService = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`);
    const container = blobService.getContainerClient(containerName);
    const blobClient = container.getBlockBlobClient(file.name);

    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    await blobClient.uploadBrowserData(file, options);

    return blobClient.url;
};


export const uploadVideosToAzure = async (videoDivsArray) => {
    const uploadedVideoUrls = [];
    const storageAccountName = "elearningplateform";
    const containerName = "courses-videos";

    for (const week of videoDivsArray) {
        for (const video of week.videos) {
            await VideoUploadToAzureContainer(video.videoFile);

            const uploadedVideoUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${Date.now()}_${video.videoFile.name}`;
            uploadedVideoUrls.push(uploadedVideoUrl);
        }
    }

    return uploadedVideoUrls;
};

