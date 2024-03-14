import {
  BlobServiceClient,
  AnonymousCredential,
  newPipeline,
} from "@azure/storage-blob";
import md5 from "js-md5";
import { v4 } from "uuid";

const calculateMD5 = async (data) => {
  const arrayBuffer = new Uint8Array(data);
  const hashArray = md5.arrayBuffer(arrayBuffer);
  const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hashArray)));
  return hashBase64;
};

export const VideoUploadToAzureContainer = async (file, onProgress) => {
  const storageAccountName = "elearningplateform";
  const sasToken =
    "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwlacupiytfx&se=2026-04-01T23:48:46Z&st=2024-03-08T15:48:46Z&spr=https,http&sig=6rkt5tO2fGiunogJXADewkfjMNCk2GcOyH%2FK5M1g5ws%3D";
  const containerName = "courses-videos";

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,
    newPipeline(new AnonymousCredential())
  );
  const container = blobService.getContainerClient(containerName);
  const blobClient = container.getBlockBlobClient(file.name);

  // const options = { blobHTTPHeaders: { blobContentType: file.type } };

  const chunkSize = 2 * 1024 * 1024;
  const totalChunks = Math.ceil(file.size / chunkSize);

  let completedChunks = 0;

  const concurrency = 4;
  const uploadPromises = [];

  for (let i = 0; i < totalChunks; i += concurrency) {
    const chunkPromises = [];

    for (let j = 0; j < concurrency && i + j < totalChunks; j++) {
      const start = (i + j) * chunkSize;
      const end = Math.min((i + j + 1) * chunkSize, file.size);
      const chunk = file.slice(start, end);

      const base64Md5 = await calculateMD5(await chunk.arrayBuffer());

      const abortController = new AbortController();
      const signal = abortController.signal;

      let uploadedChunks = 0;

      const uploadPromise = fetch(
        blobClient.url +
          `&comp=block&blockid=${btoa(String(i + j).padStart(6, "0"))}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-MD5": base64Md5,
            "x-ms-blob-type": "BlockBlob",
          },
          body: chunk,
          signal,
        }
      );

      // Add progress event listener to the promise
      uploadPromise.then(() => {
        completedChunks++;
        onProgress(completedChunks);
      });

      // Add progress event listener to the promise
      uploadPromise.then((response) => {
        uploadedChunks++;
        const progress = (uploadedChunks / totalChunks) * 100;
        console.log("progress123", progress);
        onProgress(progress);
      });

      chunkPromises.push({ promise: uploadPromise, abortController });
    }

    try {
      await Promise.all(chunkPromises.map((upload) => upload.promise));
    } catch (error) {
      console.error("Upload batch failed:", error);
      chunkPromises.forEach((upload) => upload.abortController.abort());
      throw error;
    }

    uploadPromises.push(...chunkPromises);
  }

  const blockList = Array.from({ length: totalChunks }, (_, i) =>
    btoa(String(i).padStart(6, "0"))
  );
  await blobClient.commitBlockList(blockList);

  return blobClient.url;
};

export const uploadVideosToAzure = async (videoDivsArray, onProgress) => {
  const storageAccountName = "elearningplateform";
  const containerName = "courses-videos";

  let totalVideos = 0;
  let totalChunks = 0;
  let completedChunks = 0;

  const updatedVideoDivsArray = [];

  for (const week of videoDivsArray) {
    totalVideos += week.videos.length;
    for (const video of week.videos) {
      const fileSize = video.videoFile.size;
      const chunkSize = 2 * 1024 * 1024;
      const chunks = Math.ceil(fileSize / chunkSize);
      totalChunks += chunks;
    }
  }

  console.log("totalChunks", totalChunks);

  for (const week of videoDivsArray) {
    const updatedWeek = { ...week };
    updatedWeek.videos = [];

    for (const video of week.videos) {
      const originalFileName = video.videoFile.name;
      const sanitizedFileName = originalFileName.replace(/ /g, "_");
      const newFileName = `${Date.now()}_${v4()}_${sanitizedFileName}`;

      const renamedFile = new File([video.videoFile], newFileName, {
        type: video.videoFile.type,
      });

      await VideoUploadToAzureContainer(renamedFile, () => {
        completedChunks++;
        console.log("completedChunks", completedChunks);
        onProgress({
          videoProgress: (completedChunks / totalChunks) * 100,
          totalVideos,
        });
      });

      const uploadedVideoUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${renamedFile.name}`;

      const updatedVideo = {
        ...video,
        videoFile: uploadedVideoUrl,
      };

      updatedWeek.videos.push(updatedVideo);
    }

    updatedVideoDivsArray.push(updatedWeek);
  }

  return updatedVideoDivsArray;
};
