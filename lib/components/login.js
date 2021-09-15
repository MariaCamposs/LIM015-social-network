import {
  loginUser, googleLogin, onAuthStateChanged, sendEmail,
} from '../firebase/functions.js';
import { formValidation, showAndHidePassword } from './validation.js';
import { userNotRegisterModal, wrongPasswordModal, verifiedEmailModal } from './modal.js';

const loginFirstTime = (user) => {
  if (user.metadata.creationTime === user.metadata.lastSignInTime) {
    window.location.hash = '#/home/profile/editprofile';
  } else {
    window.location.hash = '#/home';
  }
};

const userState = () => {
  onAuthStateChanged((user) => {
    if (user !== null && user.emailVerified
      && (user.metadata.creationTime !== user.metadata.lastSignInTime)) {
      window.location.hash = '#/home';
    }
  });
};

const validateIfEmailVerified = (container) => {
  onAuthStateChanged((user) => {
    if (user) {
      if (!user.emailVerified) {
        // mensaje cuando el email no está validado
        container.appendChild(verifiedEmailModal(user.email));
        container.querySelector('#resendEmail').addEventListener('click', () => {
          sendEmail();
        });
      } else { // email validado
        loginFirstTime(user);
        localStorage.setItem('user', JSON.stringify(user));
        // window.location.hash = '/home';
      }
    }
  });
};

// * Login
const loginWithFirebase = (container) => {
  const loginForm = container.querySelector('#login');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const [email, password] = container.querySelectorAll('input[required]');
    loginUser(email.value, password.value)
      .then(() => validateIfEmailVerified(container))
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          // mensaje cuando no existe un usuario registrado
          container.appendChild(userNotRegisterModal(email.value));
        } else if (error.code === 'auth/wrong-password') {
          // mensaje cuando la contraseña es incorrecta
          container.appendChild(wrongPasswordModal());
        }
      });
  });
};

const redirectGoogle = (container) => {
  const googleBtn = container.querySelector('.google');
  googleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    googleLogin()
      .then((userCredential) => {
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        loginFirstTime(userCredential.user);
      });
  });
};

export const login = () => {
  userState();
  const container = document.createElement('section');
  container.classList.add('loginContainer');
  const element = document.createElement('section');
  element.classList.add('loginSection');
  element.innerHTML = `
    <form id="login" class="loginForm">
      <img class="mobil-logo" src="./assets/img/logo-mobile.svg" alt="petstagram"/>
      <img class="desktop-logo" src="./assets/img/logo.svg" alt="petstagram" display="none"/>
      <input id="loginEmail" class="formBox" name="email" type="email" placeholder="correo@example.com" pattern="^\\S+@\\S+\\.\\S+$" title="Ejemplo: correo@example.com" required/>
      <span id="email" class="form-error none">Ejemplo: correo@example.com</span>
      <label class="passwordContainer">
        <input id="loginPassword" class="formBox" name="password" type="password" placeholder="contraseña" pattern="^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$" title="La contraseña debe tener al menos entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos." required/>
        <i class="icon icon-gray icon-eye ai-eye-closed" id="togglePassword"></i>
      </label>
      <span id="password" class="form-error none">La contraseña debe tener al menos entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos.</span>
      <a class="linkLogin" href="#/resetPassword" id="loginReset" class="formText">Olvidé la contraseña</a>
      <button id="signInButton" class="formButton">Iniciar Sesión</button>
      <label class="formText"> O ingresa con...</label>
      <label class="formText">
        <a class="linkLogin"><i class="icon ai-google-contained-fill google"></i></a>
      </label>
      <label class="formText">¿No tienes una cuenta?<a href="#/signup" class="linkLogin"><span id="signUpRedirect"><b>Crear una cuenta</b></span></a></label>
    </form>
  `;
  container.appendChild(element);
  showAndHidePassword(container);
  loginWithFirebase(container);
  redirectGoogle(container);
  formValidation(element);
  return container;
};
