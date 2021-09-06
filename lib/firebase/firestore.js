const db = firebase.firestore();

export const addPost = (uid, displayName, photoURL, post, ubication, namePet, photoPost) => db.collection('posts').doc().set({
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
// export const addPost = (data) => db.collection('posts').doc(data);

// export const getUser = () => db.collection('users').get();
