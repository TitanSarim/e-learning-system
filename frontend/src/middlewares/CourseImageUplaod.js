import { BlobServiceClient, AnonymousCredential, newPipeline } from '@azure/storage-blob';
import { v4 } from 'uuid';


export const ImageUploadToAzureContainer = async (file) => {
    const storageAccountName = "elearningplateform";
    const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-04-03T08:22:38Z&st=2024-03-11T00:22:38Z&spr=https,http&sig=7qqNArRh8%2B5JS48YXTtOE62xcw9PGTvGJA9czS3diuA%3D";
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