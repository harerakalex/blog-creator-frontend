/* eslint-disable no-param-reassign */
/* istanbul ignore file */
import axios from 'axios';

async function getCloudinaryImageUrl(file) {
  try {
    const formData = new FormData();
    formData.append('upload_preset', 'qmci19m2');
    formData.append('file', file);
    const result = await axios.post(
      'https://api.cloudinary.com/v1_1/jkadhuwa/upload',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      }
    );
    return { default: result.data.url };
  } catch (error) {
    return error;
  }
}

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(file => getCloudinaryImageUrl(file));
  }
}

function UploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = loader =>
    new UploadAdapter(loader);
}

const editorConfigs = {
  toolbar: [
    'heading',
    'bold',
    'italic',
    'link',
    'blockQuote',
    'imageUpload',
    'undo',
    'redo',
    'bulletedList',
    'numberedList'
  ],
  blockToolbar: ['heading', 'blockQuote', 'imageUpload', 'ImageStyle'],
  removePlugins: ['Table', 'TableToolbar', 'MediaEmbed'],
  extraPlugins: [UploadAdapterPlugin]
};

export default editorConfigs;
