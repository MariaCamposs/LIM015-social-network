import { onAuthStateChanged, signOut } from '../firebase/functions.js';
import { getCollection } from '../firebase/firestore.js';
// import { getPhotoURL } from '../firebase/storage.js';

const userState = () => {
  onAuthStateChanged((user) => {
    if (user === null || user === undefined) window.location.hash = '#/login';
  });
};

const viewPost = (idPost, dataPost) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const post = document.createElement('section');
  post.classList.add('post');
  post.id = idPost;
  post.innerHTML = `
  <section class="postHeader">
    <img class="photoProfile" src="${dataPost.photo}"/>
    <div class="postAuthor">
      <h3>${dataPost.name}</h3>
      <h6>${dataPost.namePet} - ${dataPost.ubication}</h6>
    </div>
    <i class="ai-more-horizontal-fill"></i>
  </section>
  <section class="postContent">
    <p class="postDescription">
      ${dataPost.post}
    </p>
  </section>
  <section class="postFooter">
    <div class="postInline">
      <i class="ai-heart" ${dataPost.likes.includes(user.uid) ? 'red-heart' : ''}></i>
      <p class="postCount">${dataPost.likes.length}</p>
    </div>
    <div class="postInline">
      <i class="ai-chat-bubble"></i>
      <p class="postCount">${dataPost.comments.length}</p>
      </div>
    <div class="postInline">
      <i class="ai-telegram-fill"></i>
      <p class="postCount">0</p>
    </div>
  </section>
  `;
  return post;
};

const viewMuro = () => {
  const posts = document.createElement('section');
  posts.classList.add('posts');
  getCollection('posts')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {
        posts.appendChild(viewPost(post.id, post.data()));
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  return posts;
};

const userProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const element = document.createElement('section');
  element.innerHTML = `
    <section class="userProfile">
      <img class="userPhotoBackground" src="${user.photoURL}"/>
      <img class="userPhoto" src="${user.photoURL}"/>
      <div class="userName">
        <h3>${user.displayName}</h3>
        <h6>Nombre de mascota - ubicación</h6>
      </div>
    </section>
  `;
  return element;
};

const userFollow = (user) => {
  const element = document.createElement('section');
  element.classList.add('userFollow');
  element.innerHTML = `
    <img class="userPhotoToFollow" src="${user.photoURL}"/>
    <div class="userNameToFollow">
      <h3>${user.name}</h3>
      <h6>Nombre de mascota - ubicación</h6>
    </div>
    <button class="buttonFollow">Seguir</button>
  `;
  return element;
};

const suggestionToFollow = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const element = document.createElement('section');
  element.classList.add('usersToFollow');
  getCollection('users')
    .where('uid', '!=', user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((userToFollow) => {
        element.appendChild(userFollow(userToFollow.data()));
      });
    })
    .catch((error) => {
      element.appendChild(error);
      // console.log('Error getting documents: ', error);
    });
  return element;
};

const logOut = (container) => {
  container.querySelector('#cerrar').addEventListener('click', () => {
    localStorage.removeItem('user');
    signOut();
    window.location.hash = '#/login';
  });
};

/* const updateDataLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  getUserWithOnSnapshot(user.uid, (doc) => {
    // const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
    localStorage.setItem('user', JSON.stringify({ ...user, ...doc.data() }));
    // console.log(source, ' data: ', doc.data());
  });
}; */

export const home = () => {
  userState();
  const container = document.createElement('section');
  // const user = JSON.parse(localStorage.getItem('user'));
  container.innerHTML = `
    <button id="cerrar">Cerrar</button>`;
  container.appendChild(viewMuro());
  container.appendChild(userProfile());
  container.appendChild(suggestionToFollow());
  // container.appendChild(mobileHeader());
  // descarga urls
  /* getPhotoURL('images/imagen.png')
    .then((url) => {
      console.log(url);
    }); */
  // container.appendChild(mobileFooter());
  logOut(container);
  // updateDataLocalStorage();
  return container;
};
