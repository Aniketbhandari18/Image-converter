const form = document.querySelector('form');

form.addEventListener('submit', (event) =>{
  const fileInput = document.querySelector('#select-img');
  console.log(fileInput.files.length);
  
  const file = fileInput.files[0];
  
  const fileName = file.name;
  console.log(fileName);
})