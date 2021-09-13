/* eslint-disable max-len */
import { onAuthStateChanged, signOut } from '../firebase/functions.js';
import {
  addUserInFirestore, updateDocDatainFirestore, getUser, getUserWithOnSnapshot,
  getPostsWithOnSnapshot,
} from '../firebase/firestore.js';
import { putImageFile, getPhotoURL } from '../firebase/storage.js';
import { dataUploadedModal } from './modal.js';

const userState = () => {
  onAuthStateChanged((user) => {
    if (user === null || user === undefined || !user.emailVerified) window.location.hash = '#/login';
  });
};

const logOut = (container) => {
  container.querySelector('#close').addEventListener('click', () => {
    signOut();
    window.location.hash = '#/login';
    window.localStorage.removeItem('user');
  });
};

const initialAddUserInFirestore = () => {
// se coloca el uid como docRef para crear cada documento en users
  onAuthStateChanged(({ uid, displayName, email }) => {
    getUser(uid)
      .then((doc) => {
        if (!doc.exists) { // si el doc no existe se crea uno
          addUserInFirestore(uid, {
            uid, name: displayName, email, photoURL: '', coverPhotoURL: '',
          })
            .then(() => console.log('Document successfully written!'))
            .catch((error) => console.error('Error writing document: ', error));
        } else { // si el documento existe se muestra la data
          // console.log('Document data:', doc.data());
        }
      });
  });
};

const putImageInFirebaseStorage = (photoFile, key) => {
  const namePhoto = `${new Date(Date.now()).toISOString()}-${photoFile.name}`;
  const user = JSON.parse(window.localStorage.getItem('user'));
  const dir = 'images';
  putImageFile(namePhoto, photoFile)
    .then(() => getPhotoURL(dir, namePhoto))
    .then((imageURL) => {
      console.log(imageURL);
      console.log('imagen cargada');
      return updateDocDatainFirestore(user.uid, { [key]: imageURL });
    })
    .then(() => console.log('imagen cargada ok'))
    .catch((err) => console.log(err));
};

const updateDataUser = (nameI, photoFileI, coverPhotoI, petNameI, descriptionI, breedI, locationI, profileForm) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // sólo si existe una nueva imagen en el formulario
    if (photoFileI.files[0]) putImageInFirebaseStorage(photoFileI.files[0], 'photoURL');
    if (coverPhotoI.files[0]) putImageInFirebaseStorage(coverPhotoI.files[0], 'coverPhotoURL');
    onAuthStateChanged((currentUser) => { // se actualiza el nombre de usuario en la autenticación
      currentUser.updateProfile({ displayName: nameI.value });
    });
    const docData = {
      name: nameI.value,
      petName: petNameI.value,
      breed: breedI.value,
      profileDescription: descriptionI.value,
      location: locationI.value,
    };
    updateDocDatainFirestore(user.uid, docData) // se actualiza los datos doc, colección users
      .then(() => console.log('data actualizada en users!!!'))
      .catch((error) => console.error('Error updating document: ', error));
  });
};

const userDocDataInRealTime = (callback) => {
  const user = JSON.parse(localStorage.getItem('user'));
  getUserWithOnSnapshot(user.uid, (doc) => {
    // const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
    // console.log(source);
    localStorage.setItem('user', JSON.stringify({ ...user, ...doc.data() }));
    callback(doc.data());
  });
};

export const editProfile = () => {
  userState();
  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.classList.add('editProfile');
  userDocDataInRealTime((docData) => {
    section.innerHTML = `
    <form id="profileForm" class="profileForm">
      <section class="formProfileBox">
        <div class="photoSection cover">
          <div class="coverPhotoContent" ><img class="photo" src="${(docData.coverPhotoURL || './assets/img/backgroung-mobile.svg')}"></div>
          <label class="profileLabel textPhoto"> Foto de portada</label>
        </div>
        <div class="photoSection">
          <div class="circle profilePhoto"><img id="photo" src="${(docData.photoURL || './assets/img/perrito.jpg')}"></div>
          <label class="profileLabel textPhoto"> Foto de perfil
          <span class="spanProfile">${(docData.name || '')}</span></label>
        </div>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Correo electrónico
          <span class="spanProfile" >${docData.email}</span>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Nombre de usuario
          <input class="formBox inputProfile inputs" id="profileUserName" value="${(docData.name || '')}"/>
        </label>
      </section>
      <section class="formProfileBox">
        <h2>Información de tu mascota</h2>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Cambiar foto de perfil
            <input class="inputProfilePhoto inputs" id="photoFile" type="file" name="photo"/>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Cambiar foto de portada
          <input class="inputProfilePhoto inputs" id="coverPhoto" type="file" name="photo"/>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel" for="petName"> Nombre de mascota
          <input class="formBox inputProfile inputs" id="petName" value="${(docData.petName || '')}" placeholder="Firulais"/>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Presentación de Mascota
          <textarea class="formBox inputProfile textArea inputs" id="description" name="Presentación de Mascota" rows="4" maxlength="300" placeholder="Hola bienvenidxs a mi perfil....">${(docData.profileDescription || '')}</textarea>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Raza
          <input class="formBox inputProfile inputs" id="breed" value="${(docData.breed || '')}" placeholder="Mestizx"/>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Ubicación
          <input class="formBox inputProfile inputs" id="location" value="${(docData.location || '')}" placeholder="Ciudad, País">
        </label>
      </section>
      <section class="formProfileBox buttonProfile">
      <button class="formButton"id="updateProfile">Editar Perfil</button>
      </section>
    </form>`;
    const [nameI, photoFileI, coverPhotoI, petNameI, descriptionI, breedI, locationI] = section.querySelectorAll('.inputs');
    const profileForm = section.querySelector('#profileForm');
    updateDataUser(nameI, photoFileI, coverPhotoI, petNameI, descriptionI, breedI, locationI, profileForm);
    section.appendChild(dataUploadedModal());
  });
  fragment.appendChild(section);
  return fragment;
};

const postsDocDataInRealTime = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const posts = document.createElement('section');
  posts.classList.add('posts');
  posts.classList.add('profilePosts');
  getPostsWithOnSnapshot(user.uid, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      posts.innerHTML += `
      <section id="post" class="post">
        <section class="postHeader">
          <div class="postAuthor">
            <img class="photoProfile" src="${(docData.photo || './assets/img/perrito.jpg')}"/>
            <div class="postUserDescription">
              <h3 class="postUserName">${(docData.name)}</h3>
              <h6 class="postOthers">${docData.namePet} - ${docData.ubication}</h6>
            </div>
          </div>
          <img class="postIcon" src="./assets/img/puntos.svg"/>
        </section>
        <section class="postContent">
          ${(docData.photoPost !== '')
    ? `<img class="postPhoto" src="${docData.photoPost}"/>` : ''}
          <p class="postDescription">
          ${docData.post}
          </p>
        </section>
        <section class="postFooter">
          <div class="postInline">
            <i class="ai-heart postIcon ${docData.likes.includes(user.uid) ? 'postIcon-yellow' : ''}"></i>
            <p class="postCount">${docData.likes.length}</p>
          </div>
          <div class="postInline">
            <i class="ai-chat-bubble postIcon ${docData.comments.includes(user.uid) ? 'postIcon-yellow' : ''}"></i>
            <p class="postCount">${docData.comments.length}</p>
          </div>
          <div class="postInline">
            <svg width="14" height="12" xmlns="http://www.w3.org/2000/svg">
              <path class="postIcon" d="M12.0376 0.0011956C11.877 0.0128762 11.7194 0.0505411 11.571 0.112721H11.569C11.4264 0.169234 10.7488 0.454299 9.71855 0.886399L6.0267 2.44126C3.37759 3.55651 0.773493 4.65476 0.773493 4.65476L0.8045 4.64276C0.8045 4.64276 0.624959 4.70178 0.437416 4.8303C0.321553 4.90403 0.221853 5.0005 0.144348 5.11387C0.0523272 5.2489 -0.0216898 5.45545 0.00581656 5.669C0.0508269 6.03008 0.284881 6.24663 0.452919 6.36616C0.622958 6.48718 0.784995 6.5437 0.784995 6.5437H0.788997L3.23106 7.36639C3.34058 7.71797 3.97523 9.80445 4.12776 10.2851C4.21778 10.5721 4.3053 10.7517 4.41483 10.8887C4.46784 10.9587 4.52986 11.0172 4.60437 11.0642C4.64311 11.0868 4.68442 11.1046 4.7274 11.1172L4.7024 11.1112C4.7099 11.1132 4.7159 11.1192 4.7214 11.1213C4.7414 11.1268 4.75491 11.1288 4.78041 11.1328C5.167 11.2498 5.47757 11.0097 5.47757 11.0097L5.49508 10.9957L6.93691 9.68292L9.35346 11.5368L9.40848 11.5604C9.91209 11.7814 10.4222 11.6584 10.6918 11.4413C10.9633 11.2228 11.0689 10.9432 11.0689 10.9432L11.0864 10.8982L12.9538 1.3315C13.0068 1.09545 13.0203 0.874396 12.9618 0.659847C12.9014 0.44271 12.7621 0.255958 12.5712 0.136226C12.4109 0.0387617 12.225 -0.00828231 12.0376 0.0011956V0.0011956ZM11.9871 1.02643C11.9851 1.05794 11.9911 1.05444 11.9771 1.11495V1.12045L10.1271 10.5876C10.1191 10.6011 10.1056 10.6306 10.0686 10.6601C10.0296 10.6912 9.99861 10.7107 9.83607 10.6461L6.8804 8.38012L5.09499 10.0075L5.47007 7.61194L10.2992 3.11091C10.4982 2.92587 10.4317 2.88686 10.4317 2.88686C10.4457 2.65981 10.1311 2.82034 10.1311 2.82034L4.04174 6.59271L4.03974 6.58271L1.12107 5.59998V5.59798L1.11357 5.59648C1.11869 5.59478 1.1237 5.59278 1.12857 5.59048L1.14458 5.58248L1.16008 5.57698C1.16008 5.57698 3.76618 4.47872 6.41529 3.36347C7.74159 2.80484 9.0779 2.24221 10.1056 1.80811C11.1334 1.37651 11.893 1.05994 11.9361 1.04293C11.9771 1.02693 11.9576 1.02693 11.9871 1.02693V1.02643Z" fill="#A1A5AC"/>
            </svg>
            <p class="postCount">0</p>
          </div>
        </section>
      </section>
        `;
    });
  });
  return posts;
};

export const profile = () => {
  userState();
  initialAddUserInFirestore();
  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.classList.add('profile');
  userDocDataInRealTime((docData) => {
    section.innerHTML = `
      <section class="header">
        <section class="headerProfile">
        <img id="mainImgProfile" class="mainImgProfile" src=${(docData.coverPhotoURL || './assets/img/backgroung-mobile.svg')}>
        <a id="toEditProfile" href="#/home/profile/editprofile"><img class="icon pen" src="./assets/img/pen.svg" alt="pen icon"/></i></a>
        <a><img id="close" class="icon signOut" src="./assets/img/signout.svg" alt="signout icon"/></i></a>
        <div class="circleContent"><div class="circle"><img id="circleImgProfile" src="${(docData.photoURL || './assets/img/perrito.jpg')}"></div>
        </div>
        <h1 class="petNameDesktop">${(docData.name || '')}</h1>
        </section>
        <section class="profileDescription">
            <h1 class="petNameMobile profileDescriptionBox" id="petName">${(docData.petName || '')}</h1>
            <label class="followSection profileDescriptionBox">
                <span id="numberFollowers" class="profileNumbers">100</span><span class="textProfile">Seguidores</span>
                <span id="numberFollowing" class="profileNumbers">120</span><span class="textProfile">Siguiendo</span>
            </label>
            <p id="profileDescription" class="textProfile profileDescriptionBox">${(docData.profileDescription || '')}</p>
            <span class="textProfile profileDescriptionBox">Sigue mis aventuras en este perfil</span>
            <p id="profileUbication" class="textProfile">${(docData.location || '')}</p>
            <a href="#/home/profile/editprofile" class="formButton">Editar Perfil</a>
        </section>
      </section>
        <section id="mainProfile" class="mainProfile">
      </section>`;
    logOut(section);
    section.querySelector('#mainProfile').appendChild(postsDocDataInRealTime());
  });
  fragment.appendChild(section);
  return fragment;
};
