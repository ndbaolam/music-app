//Preview upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    console.log(e);
    if (e.target.files.length) {
      const image = URL.createObjectURL(e.target.files[0]);

      uploadImagePreview.src = image;
    }
  });
}
//End preview upload image

//Show alert
const showAlert = document.querySelector('[show-alert]');
if(showAlert){
    const time = parseInt(showAlert.getAttribute('data-time'));
    setTimeout(() => {
        showAlert.classList.add('alert-hidden');
    }, time);

    const closeAlert = document.querySelector('[close-alert]');
    closeAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden');
    });
}
//End Show alert

//Preview upload Image
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio) {
  const uploadAduioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  const source = uploadAudioPlay.querySelector("source");

  uploadAduioInput.addEventListener("change", (e) => {
    console.log(e);
    if (e.target.files.length) {
      const audio = URL.createObjectURL(e.target.files[0]);

      source.src = audio;
      uploadAudioPlay.load();
    }
  });
}
//End preview upload image