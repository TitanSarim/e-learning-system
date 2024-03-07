const multer = require('multer');
const {MulterAzureStorage } = require('multer-azure-blob-storage');
const path = require('path');


const resolveBlobName = (req, file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return `${file.fieldname}_${uniqueSuffix}${path.extname(file.originalname)}`;
};

const resolveMetadata = (req, file) => {
    return { fieldName: file.fieldname };
};

const resolveContentSettings = (req, file) => {
    return { contentType: file.mimetype };
};

const azureStorageConfig = {
    connectionString: `DefaultEndpointsProtocol=${process.env.AZURE_STORAGE_DEFAULT_ENDPOINTS_PROTOCOL};AccountName=${process.env.AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${process.env.AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=${process.env.AZURE_STORAGE_ENDPOINT_SUFFIX}`,
    accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
    containerName: process.env.AZURE_STORAGE_IMAGE_CONTAINER_NAME,
    containerAccessLevel: 'blob',
    blobName: resolveBlobName,
    metadata: resolveMetadata,
    contentSettings: resolveContentSettings,
    urlExpirationTime: 60,
};


const avatarAzureConfig = new MulterAzureStorage(azureStorageConfig);

exports.imageUpload = multer({
    storage: avatarAzureConfig,
});
