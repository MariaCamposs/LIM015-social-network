export const addPost = (uid, displayName, photoURL, post, ubication, namePet, photoPost) => firebase.firestore().collection('posts').doc().set({
  uid,
  name: displayName,
  photo: photoURL,
  post,
  ubication,
  namePet,
  photoPost,
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  likes: [],
  comments: [],
});
export const getPost = (id) => firebase.firestore().collection('posts').doc(id).get();
export const addUserInFirestore = (docRef, docData) => firebase.firestore().collection('users').doc(docRef).set(docData);
export const updateDocDatainFirestore = (docRef, docData) => firebase.firestore().collection('users').doc(docRef).update(docData);
export const getUser = (docRef) => firebase.firestore().collection('users').doc(docRef).get();
export const getUserWithOnSnapshot = (docRef, callback) => firebase.firestore().collection('users').doc(docRef).onSnapshot(callback);
export const getPostsWithOnSnapshot = (uid, callback) => firebase.firestore().collection('posts').where('uid', '==', uid).onSnapshot(callback);
// export const addPost = (data) => db.collection('posts').doc(data);

// export const getUser = () => db.collection('users').get();
