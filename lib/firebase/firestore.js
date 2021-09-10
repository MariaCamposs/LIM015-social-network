// --------------------------------- User ---------------------------
export const addUserInFirestore = (docRef, docData) => firebase.firestore().collection('users').doc(docRef).set(docData);
export const updateDocDatainFirestore = (docRef, docData) => firebase.firestore().collection('users').doc(docRef).update(docData);
export const getUser = (docRef) => firebase.firestore().collection('users').doc(docRef).get();
export const getUserWithOnSnapshot = (docRef, callback) => firebase.firestore().collection('users').doc(docRef).onSnapshot(callback);
export const getUserToFollow = (uid, callback) => firebase.firestore().collection('users').where('uid', '!=', uid).limit(5)
  .onSnapshot(callback);
// --------------------------------- Posts ---------------------------
// export const getPost = (id) => firebase.firestore().collection('posts').doc(id).get();
export const addPost = (uid, displayName, photoURL, post, ubication, namePet, photoPostURL) => firebase.firestore().collection('posts').doc().set({
  uid,
  name: displayName,
  photo: photoURL,
  post,
  ubication,
  namePet,
  photoPost: photoPostURL,
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  likes: [],
  comments: [],
});
export const updatePost = (idPost, dataPost) => firebase.firestore().collection('posts').doc(idPost).update(dataPost);
export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();
// ----------------------------- Post Observation ---------------------
export const getPosts = (callback) => firebase.firestore().collection('posts').orderBy('timestamp', 'desc').onSnapshot(callback);
export const getPostsWithOnSnapshot = (uid, callback) => firebase.firestore().collection('posts').where('uid', '==', uid).onSnapshot(callback);
