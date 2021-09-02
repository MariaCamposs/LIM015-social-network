const db = firebase.firestore();

export const addUser = (docRef, data) => db.collection('users').doc(docRef).set(data);
// export const addPost = (data) => db.collection('posts').doc(data);

export const getUser = () => db.collection('users').get();
