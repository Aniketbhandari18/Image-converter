
document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const formData = new FormData();
  const fileInput = document.getElementById('select-img');
  const formatInput = document.getElementById('desired-format');

  // Check if the user has selected a file
  if (!fileInput.files[0]) {
    alert('Please select an image file.');
    return;
  }

  // Append the image file and selected format to FormData
  formData.append('image', fileInput.files[0]);
  formData.append('format', formatInput.value);

  try {
    // Send the FormData to the backend
    const response = await fetch('/convert', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a download link for the converted image
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `converted-image.${formatInput.value.toLowerCase()}`;
      downloadLink.textContent = 'Click here to download the converted image';
      document.body.appendChild(downloadLink);
    } else {
      alert('Error converting image. Please try again later.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong! Please try again.');
  }
});