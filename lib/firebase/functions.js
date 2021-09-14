export const addUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);
export const loginUser = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);
export const googleLogin = () => {
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  const loginwithGoogle = firebase.auth().signInWithPopup(providerGoogle);
  return loginwithGoogle;
};
export const sendPasswordReset = (email) => firebase.auth().sendPasswordResetEmail(email);
export const sendEmail = () => firebase.auth().currentUser.sendEmailVerification();
export const onAuthStateChanged = (callback) => firebase.auth().onAuthStateChanged(callback);
export const signOut = () => firebase.auth().signOut();
// export const getAdditionalUserInfo = () => firebase.auth().getAdditionalUserInfo();
// export const currentUser = firebase.auth().currentUser;
