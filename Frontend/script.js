const form = document.querySelector('form');
const selectImgSection = document.querySelector('.select-img-btn');
const fileInput = document.querySelector('#select-img');
const imgPreviewSection = document.querySelector('.img-preview');
const desiredFormat = document.querySelector('#desired-format');

// Image preview elements
const imgPreview = document.querySelector('.img img');
const imgPreviewName = document.querySelector('.img p');
const deleteBtn = document.querySelector('.delete-preview');


fileInput.addEventListener('change', (event) =>{
  if (event.target.value === '') return;

  const selectedImg = event.target.files[0];
  console.log(selectedImg);

  const img = URL.createObjectURL(selectedImg);
  console.log(img);

  imgPreview.src = img;
  imgPreviewName.innerText = selectedImg.name;

  imgPreviewSection.style.display = 'flex';
  selectImgSection.style.display = 'none';
})

deleteBtn.addEventListener('click', () =>{
  fileInput.value = '';

  imgPreview.src = '';
  imgPreviewName.innerText = 'preview.jpg';

  imgPreviewSection.style.display = 'none';
  selectImgSection.style.display = 'block';
  console.log(fileInput.value);
})


form.addEventListener('submit', (event) =>{
  const desiredExt = desiredFormat.value;
  const fileName = fileInput.files[0].name;
  const extName = fileName.split('.').pop();
  console.log(extName);
  console.log(desiredExt);

  if (desiredExt === extName){
    console.log('hi');
    event.preventDefault();
    alert(`Selected image file is already in ${desiredExt}`);
    return;
  }
  // const formData = new FormData(form);

  // uploadFile(formData);

  // async function uploadFile(formData) {
  //   await fetch('/uploads', {
  //     method: 'POST',
  //     body: formData
  //   });

  //   location.reload();
  //   fileInput.value = '';
  // }
})