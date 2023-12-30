const axios = require('axios');
const FormData = require('form-data');

// Replace with your Pinata JWT token
const JWT = 'YOUR_JWT_TOKEN';

let selectedFile = null;

function selectFile() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style.display = 'none';
  fileInput.addEventListener('change', (event) => {
    selectedFile = event.target.files[0];
    console.log('Selected File:', selectedFile.name);
  });
  document.body.appendChild(fileInput);
  fileInput.click();
}

async function uploadFile() {
  if (!selectedFile) {
    alert('Please select a file first.');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  const pinataMetadata = JSON.stringify({
    name: selectedFile.name,
  });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', pinataOptions);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${JWT}`
      }
    });
    console.log(res.data);
    alert('File uploaded successfully!');
  } catch (error) {
    console.log(error);
    alert('File upload failed.');
  }
}

export { selectFile, uploadFile };
