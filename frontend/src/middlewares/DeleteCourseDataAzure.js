import {
    BlobServiceClient,
    AnonymousCredential,
    newPipeline,
  } from "@azure/storage-blob";

export const deleteVideosFromAzure = async (videoDivsArray) => {
    const storageAccountName = "elearningplateform";
    const containerName = "courses-videos";
    const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-04-03T08:22:38Z&st=2024-03-11T00:22:38Z&spr=https,http&sig=7qqNArRh8%2B5JS48YXTtOE62xcw9PGTvGJA9czS3diuA%3D";
  
  
    try {
        for (const week of videoDivsArray) {
            const updatedWeek = { ...week };
            updatedWeek.videos = [];
        
            for (const video of week.videos) {
        
        
                const oldVideoName = video.oldUrl.split('/').pop();
                const blobService = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`, newPipeline(new AnonymousCredential()));
                const container = blobService.getContainerClient(containerName);
                const blobClient = container.getBlockBlobClient(oldVideoName);
                await blobClient.deleteIfExists();
        

                console.log('video deleted')
        
            }
        
          }
    } catch (error) {
        console.log(error);
    }
  
};



export const deleteImageFromAzure = async (imgUrl) => {

    const storageAccountName = "elearningplateform";
    const containerName = "courses-thumnials";
    const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-04-03T08:22:38Z&st=2024-03-11T00:22:38Z&spr=https,http&sig=7qqNArRh8%2B5JS48YXTtOE62xcw9PGTvGJA9czS3diuA%3D";

   try {

      const oldImageName = imgUrl.split('/').pop();
      const blobService = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`, newPipeline(new AnonymousCredential()));
      const container = blobService.getContainerClient(containerName);
      const blobClient = container.getBlockBlobClient(oldImageName);
      await blobClient.deleteIfExists();

      console.log('Image deleted')

   } catch (error) {
      console.log(error);
   }

    
}