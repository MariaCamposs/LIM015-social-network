import { onAuthStateChanged } from '../firebase/functions.js';
import {
  getPosts, getUserToFollow, getUserWithOnSnapshot,
} from '../firebase/firestore.js';
import {
  templatePost, addViewPost, likePost, addMoreActions,
} from './post.js';

const userState = () => {
  onAuthStateChanged((user) => {
    if (user === null || user === undefined || !user.emailVerified) window.location.hash = '#/login';
  });
};

const viewMuro = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  const user = firebase.auth().currentUser;
  const posts = document.createElement('section');
  posts.classList.add('posts');
  getPosts((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        posts.appendChild(addViewPost(change.doc.id, change.doc.data(), user));
        likePost(change.doc.id, change.doc.data(), user);
        if (user.uid === change.doc.data().uid) {
          addMoreActions(change.doc.id, change.doc.data());
        }
      }
      if (change.type === 'modified') {
        const idPost = document.getElementById(change.doc.id);
        idPost.innerHTML = templatePost(user, change.doc.data());
        likePost(change.doc.id, change.doc.data(), user);
        if (user.uid === change.doc.data().uid) {
          addMoreActions(change.doc.id, change.doc.data());
        }
      }
      if (change.type === 'removed') {
        document.getElementById(change.doc.id).remove();
      }
    });
  });
  return posts;
};

const userProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const element = document.createElement('section');
  element.classList.add('userHomeProfile');
  getUserWithOnSnapshot(user.uid, (querySnapshot) => {
    const dataUser = querySnapshot.data();
    localStorage.setItem('user', JSON.stringify({ ...user, ...dataUser }));
    element.innerHTML = `
    <section class="userProfile">
      <div class="homePhotoProfile">
        <img class="userPhotoBackground" src="${(dataUser.coverPhotoURL || './assets/img/backgroung-mobile.svg')}"/>
        <img class="userPhoto" src="${(dataUser.photoURL || './assets/img/perrito.jpg')}"/>
      </div>
      <div class="userHomeDescription">
        <h3 class="userHomeName">${(dataUser.petName || '')}</h3>
        <h6 class="userHomeOthers">${(dataUser.name || '')} - ${(dataUser.location || '')}</h6>
      </div>
    </section>
  `;
  });
  return element;
};
/* ------------------ template follow user ------------------ */
const userFollow = (user) => {
  const element = document.createElement('section');
  element.classList.add('userFollow');
  element.innerHTML = `
    <div class="userToFollow">
      <img class="userPhotoToFollow" src="${(user.photoURL || './assets/img/perrito.jpg')}"/>
      <div class="userToFollowDescription">
        <h3 class="userNameToFollow">${(user.petName || '')} - ${(user.breed || '')}</h3>
        <h6 class="userOthersToFollow">${(user.name || '')}</h6>
      </div>
    </div>
    <button class="buttonFollow">Seguir</button>
  `;
  return element;
};

const suggestionToFollow = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const container = document.createElement('section');
  container.classList.add('followContainer');
  container.appendChild(userProfile());
  const element = document.createElement('section');
  element.classList.add('usersToFollow');
  element.innerHTML = `
    <h3 class="suggestionSubtitle">Sugerencias para ti</h3>
  `;
  getUserToFollow(user.uid, (querySnapshot) => {
    querySnapshot.forEach((userToFollow) => {
      element.appendChild(userFollow(userToFollow.data()));
    });
  });
  container.appendChild(element);
  return container;
};

export const home = () => {
  userState();
  const container = document.createElement('section');
  container.classList.add('home');
  container.appendChild(viewMuro());
  container.appendChild(suggestionToFollow());
  return container;
};
