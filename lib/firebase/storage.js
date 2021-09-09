const storageRef = firebase.storage().ref();
export const imagesProfileRef = (fileName) => storageRef.child(`images/${fileName}`);
export const putImageFile = (namePhoto, photoFile) => imagesProfileRef(namePhoto).put(photoFile);
export const gsReference = (imageProfileRef) => firebase.storage().refFromURL(`gs://lab-petstagram.appspot.com/${imageProfileRef}`);
export const getPhotoURL = (imageProfileRef) => gsReference(imageProfileRef).getDownloadURL();
