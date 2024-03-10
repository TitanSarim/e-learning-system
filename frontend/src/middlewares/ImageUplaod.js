import { BlobServiceClient, AnonymousCredential, newPipeline } from '@azure/storage-blob';
import { v4 } from 'uuid';


export const ImageUploadToAzureContainer = async (file) => {
    const storageAccountName = "elearningplateform";
    const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwlacupiytfx&se=2026-04-01T23:48:46Z&st=2024-03-08T15:48:46Z&spr=https,http&sig=6rkt5tO2fGiunogJXADewkfjMNCk2GcOyH%2FK5M1g5ws%3D";
    const containerName = "courses-thumnials";

    const blobService = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,  newPipeline(new AnonymousCredential()));
    const container = blobService.getContainerClient(containerName);
    const blobClient = container.getBlockBlobClient(file.name);

    // const options = { blobHTTPHeaders: { blobContentType: file.type } };
    
    const response  = await blobClient.uploadBrowserData(file)

    return response

}



export const uploadImageToAzure = async (file) => {

    const storageAccountName = "elearningplateform";
    const containerName = "courses-thumnials";

    const originalFileName = file.name;
    const sanitizedFileName = originalFileName.replace(/ /g, '_');
    const newFileName = `${Date.now()}_${v4()}_${sanitizedFileName}`;

    const renamedFile = new File([file], newFileName, { type: file.type });

    await ImageUploadToAzureContainer(renamedFile);
    
    const uploadedImageUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${newFileName}`;

    return uploadedImageUrl;
}