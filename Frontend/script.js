const form = document.querySelector('form');

form.addEventListener('submit', (event) =>{
  const fileInput = document.querySelector('#select-img');
  
  const formData = new FormData(form);

  uploadFile(formData);

  async function uploadFile(formData) {
    await fetch('/uploads', {
      method: 'POST',
      body: formData
    });

    fileInput.value = '';
  }
})