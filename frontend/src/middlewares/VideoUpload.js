import { BlobServiceClient } from '@azure/storage-blob';
import md5 from 'js-md5';

const calculateMD5 = (data) => {
    const arrayBuffer = new TextEncoder().encode(data);
    const hashArray = md5.arrayBuffer(arrayBuffer);
    const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hashArray)));
    return hashBase64;
  };

export const VideoUploadToAzureContainer = async (file) => {
    const storageAccountName = "elearningplateform";
    const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwlacupiytfx&se=2026-04-01T23:48:46Z&st=2024-03-08T15:48:46Z&spr=https,http&sig=6rkt5tO2fGiunogJXADewkfjMNCk2GcOyH%2FK5M1g5ws%3D";
    const containerName = "courses-videos";

    const blobService = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`);
    const container = blobService.getContainerClient(containerName);
    const blobClient = container.getBlockBlobClient(file.name);

    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    const chunkSize = 2 * 1024 * 1024; // 2MB chunks
    const totalChunks = Math.ceil(file.size / chunkSize);
    console.log("totalChunks", totalChunks)

    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min((i + 1) * chunkSize, file.size);
        const chunk = file.slice(start, end);

        const base64Md5 = calculateMD5(await chunk.arrayBuffer());

        await blobClient.stageBlock(btoa(String(i).padStart(6, '0')), chunk, chunk.size, { contentMD5: base64Md5 });
    }

    const blockList = Array.from({ length: totalChunks }, (_, i) => btoa(String(i).padStart(6, '0')));
    console.log("blockList", blockList)
    await blobClient.commitBlockList(blockList);

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

