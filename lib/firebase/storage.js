export const putImageFile = (namePhoto, photoFile) => firebase.storage()
  .ref().child(`images/${namePhoto}`).put(photoFile);
export const getPhotoURL = (dir, namePhoto) => firebase.storage()
  .refFromURL(`gs://lab-petstagram.appspot.com/${dir}/${namePhoto}`).getDownloadURL();
