import { onAuthStateChanged } from '../firebase/functions.js';
import {
  getPosts, getUserToFollow, getUserWithOnSnapshot, updatePost,
} from '../firebase/firestore.js';

const userState = () => {
  onAuthStateChanged((user) => {
    if (user === null || user === undefined || !user.emailVerified) window.location.hash = '#/login';
  });
};

<<<<<<< HEAD
=======
const templateMore = () => `
  <div class="more">
    <img class="postIcon dotMore" src="./assets/img/puntos.svg"/>
    <div class="moreActions none">
      <div class="actions edit">
        <span><i class="ai-pencil iconMore"></i>Edit</span>
      </div>
      <div class="actions delete">
        <span><i class="ai-trash-can iconMore"></i>Delete</span>
      </div>
    </div>
  </div>
`;
>>>>>>> dd684cf654a472d80a105a66f2ddbb146740d644
/* ---------------------- template post ----------------------- */
const templatePost = (user, dataPost) => `
  <section class="postHeader">
    <div class="postAuthor">
      <img class="photoProfile" src="${dataPost.photo}"/>
      <div class="postUserDescription">
        <h3 class="postUserName">${(dataPost.name || '')}</h3>
        <h6 class="postOthers">${(dataPost.namePet || '')} - ${dataPost.ubication}</h6>
      </div>
    </div>
    ${user.uid === dataPost.uid ? templateMore() : ''}
  </section>
  <section class="postContent">
    ${(dataPost.photoPost !== '')
    ? `<img class="postPhoto" src="${dataPost.photoPost}"/>`
    : ''}
    <p class="postDescription">
    ${dataPost.post}
    </p>
  </section>
  <section class="postFooter">
    <div class="postInline">
      <i class="ai-heart postIcon ${dataPost.likes.includes(user.uid) ? 'postIcon-yellow' : ''}"></i>
      <p class="heartCount postCount">${dataPost.likes.length}</p>
    </div>
    <div class="postInline">
      <i class="ai-chat-bubble postIcon ${dataPost.comments.includes(user.uid) ? 'postIcon-yellow' : ''}"></i>
      <p class="commentsCount postCount">${dataPost.comments.length}</p>
    </div>
    <div class="postInline">
      <svg width="14" height="12" xmlns="http://www.w3.org/2000/svg">
        <path class="postIcon" d="M12.0376 0.0011956C11.877 0.0128762 11.7194 0.0505411 11.571 0.112721H11.569C11.4264 0.169234 10.7488 0.454299 9.71855 0.886399L6.0267 2.44126C3.37759 3.55651 0.773493 4.65476 0.773493 4.65476L0.8045 4.64276C0.8045 4.64276 0.624959 4.70178 0.437416 4.8303C0.321553 4.90403 0.221853 5.0005 0.144348 5.11387C0.0523272 5.2489 -0.0216898 5.45545 0.00581656 5.669C0.0508269 6.03008 0.284881 6.24663 0.452919 6.36616C0.622958 6.48718 0.784995 6.5437 0.784995 6.5437H0.788997L3.23106 7.36639C3.34058 7.71797 3.97523 9.80445 4.12776 10.2851C4.21778 10.5721 4.3053 10.7517 4.41483 10.8887C4.46784 10.9587 4.52986 11.0172 4.60437 11.0642C4.64311 11.0868 4.68442 11.1046 4.7274 11.1172L4.7024 11.1112C4.7099 11.1132 4.7159 11.1192 4.7214 11.1213C4.7414 11.1268 4.75491 11.1288 4.78041 11.1328C5.167 11.2498 5.47757 11.0097 5.47757 11.0097L5.49508 10.9957L6.93691 9.68292L9.35346 11.5368L9.40848 11.5604C9.91209 11.7814 10.4222 11.6584 10.6918 11.4413C10.9633 11.2228 11.0689 10.9432 11.0689 10.9432L11.0864 10.8982L12.9538 1.3315C13.0068 1.09545 13.0203 0.874396 12.9618 0.659847C12.9014 0.44271 12.7621 0.255958 12.5712 0.136226C12.4109 0.0387617 12.225 -0.00828231 12.0376 0.0011956V0.0011956ZM11.9871 1.02643C11.9851 1.05794 11.9911 1.05444 11.9771 1.11495V1.12045L10.1271 10.5876C10.1191 10.6011 10.1056 10.6306 10.0686 10.6601C10.0296 10.6912 9.99861 10.7107 9.83607 10.6461L6.8804 8.38012L5.09499 10.0075L5.47007 7.61194L10.2992 3.11091C10.4982 2.92587 10.4317 2.88686 10.4317 2.88686C10.4457 2.65981 10.1311 2.82034 10.1311 2.82034L4.04174 6.59271L4.03974 6.58271L1.12107 5.59998V5.59798L1.11357 5.59648C1.11869 5.59478 1.1237 5.59278 1.12857 5.59048L1.14458 5.58248L1.16008 5.57698C1.16008 5.57698 3.76618 4.47872 6.41529 3.36347C7.74159 2.80484 9.0779 2.24221 10.1056 1.80811C11.1334 1.37651 11.893 1.05994 11.9361 1.04293C11.9771 1.02693 11.9576 1.02693 11.9871 1.02693V1.02643Z" fill="#A1A5AC"/>
      </svg>
      <p class="postCount">0</p>
    </div>
  </section>
`;

const addViewPost = (idPost, dataPost, user) => {
  const post = document.createElement('section');
  post.classList.add('post');
  post.id = idPost;
  post.innerHTML = templatePost(user, dataPost);
  return post;
};

const likePost = (idPost, dataPost, user) => {
  const post = document.getElementById(idPost);
  const heart = post.querySelector('.ai-heart');
  heart.addEventListener('click', () => {
    if (dataPost.likes.includes(user.uid)) {
      updatePost(idPost, { likes: dataPost.likes.filter((item) => item !== user.uid) });
    } else {
      updatePost(idPost, { likes: [...dataPost.likes, user.uid] });
    }
  });
};

const addMoreActions = (idPost, dataPost, user) => {
  const post = document.getElementById(idPost);
  const more = post.querySelector('.more');
  const moreActions = more.querySelector('.moreActions');
  const editPostButton = more.querySelector('.edit');
  const deletePostButton = more.querySelector('.delete');
  more.addEventListener('click', () => {
    moreActions.classList.toggle('none');
  });
  editPostButton.addEventListener('click', () => {
    const postDescription = post.querySelector('.postDescription');
    postDescription.innerHTML = `
      <textarea class="inputPost" id ="post" rows="3" maxlength="300" style="resize: none;" placeholder="¿Qué está haciendo tu mascota?">${dataPost.post}</textarea>
      <button class="formButton editDescription">Editar</button>
    `;
    console.log(user.uid);
  });
  deletePostButton.addEventListener('click', () => {
    console.log('borrar Post');
  });
};

const viewMuro = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const posts = document.createElement('section');
  posts.classList.add('posts');
  getPosts((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        posts.appendChild(addViewPost(change.doc.id, change.doc.data(), user));
        likePost(change.doc.id, change.doc.data(), user);
        if (user.uid === change.doc.data().uid) {
          addMoreActions(change.doc.id, change.doc.data(), user);
        }
      }
      if (change.type === 'modified') {
        const idPost = document.getElementById(change.doc.id);
        idPost.innerHTML = templatePost(user, change.doc.data());
        likePost(change.doc.id, change.doc.data(), user);
        if (user.uid === change.doc.data().uid) {
          addMoreActions(change.doc.id, change.doc.data(), user);
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
