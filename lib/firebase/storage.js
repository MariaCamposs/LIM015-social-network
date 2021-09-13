// const storageRef = firebase.storage().ref();
// export const imagesProfileRef = (fileName) => firebase.storage().ref(`images/${fileName}`);
export const putImageFile = (namePhoto, photoFile) => firebase.storage()
  .ref().child(`images/${namePhoto}`).put(photoFile);
// export const gsReference = (imageProfileRef) => firebase.storage().refFromURL(`gs://lab-petstagram.appspot.com/${imageProfileRef}`);
export const getPhotoURL = (dir, namePhoto) => firebase.storage()
  .refFromURL(`gs://lab-petstagram.appspot.com/${dir}/${namePhoto}`).getDownloadURL();
