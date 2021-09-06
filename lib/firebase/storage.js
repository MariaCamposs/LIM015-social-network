const storageRef = firebase.storage().ref();
export const imagesProfileRef = (fileName) => storageRef.child(`images/${fileName}`);
export const putImageFile = (photoFile) => imagesProfileRef(photoFile.name).put(photoFile);
// export const gsReference = (imageProfileRef) => firebase.storage().refFromURL(`gs://bucket/${imageProfileRef}`);
