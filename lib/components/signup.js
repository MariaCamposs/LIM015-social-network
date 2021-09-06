import { addUser, sendEmail } from '../firebase/functions.js';
import { formValidation, showAndHidePassword } from './validation.js';
import { emailAlreadyExistsModal, succesfulSignUpModal } from './modal.js';

const signUpWithFirebase = (nameInput, emailInput, passwordInput, container) => {
  const signUpForm = container.querySelector('#signUp');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // registro correcto
    addUser(emailInput.value, passwordInput.value)
      .then((userCredential) => {
        const user = userCredential.user;
        user.updateProfile({
          displayName: nameInput.value,
          photoUrl: '../assets/img/user.svg',
        });
        return sendEmail();
      })
      .then(() => {
        // mensaje de registro solicitando validar el correo
        container.appendChild(succesfulSignUpModal(emailInput.value));
        // TODO quitar el reenvio porque firebase lo bloquea(envio masivo)
        container.querySelector('#resendEmail').addEventListener('click', () => {
          sendEmail();
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          // mensaje en caso ya existe una cuenta registrada
          container.appendChild(emailAlreadyExistsModal(emailInput.value));
        }
      });
  });
};

export const signUp = () => {
  const container = document.createElement('section');
  container.classList.add('signUpContainer');
  const element = document.createElement('section');
  element.classList.add('signUpSection');
  element.innerHTML = `
    <form id="signUp"  class="signUpForm">
      <img class="mobil-logo" src="./assets/img/logo-mobile.svg" alt="petstagram"/>
      <img class="desktop-logo" src="./assets/img/logo.svg" alt="petstagram" display="none"/>
      <input id="signUpUserName" class="formBox" name="user" type="text" placeholder="nombre de usuario" pattern="^([a-zA-Z0-9-_\\.]+)$" title="Solo puede contener letras, puntos y guiones." required/>
      <span id="user" class="form-error none">Solo puede contener letras, puntos y guiones.</span>
      <input id="signUpEmail" class="formBox" name="email" type="email" placeholder="correo@example.com" pattern="^\\S+@\\S+\\.\\S+$" title="Ejemplo: correo@example.com" required/>
      <span id="email" class="form-error none">Ejemplo: correo@example.com</span>
      <label class="passwordContainer">
        <input id="signUpPassword" class="formBox" name="password" type="password" placeholder="contraseña" pattern="^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$" title="La contraseña debe tener al menos entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos." required/>
        <i class="icon icon-gray icon-eye ai-eye-closed" id="togglePassword"></i>
      </label>
      <span id="password" class="form-error none">La contraseña debe tener al menos entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos.</span>
      <div class="checkbox">
        <label class="container-checkBox">
          <input type="checkbox" name="term" title="Debe aceptar términos y condiciones" required/><span class="checkmark"></span>
          </label>
        <label class="formText">Acepto términos y condiciones</label>
      </div>
      <span id="term" class="form-error none"></span>
      <button id="signUpButton" class="formButton">Registrarte</button>
      <label class="formText question">¿Ya tienes una cuenta?<a href="#/login"><span id="loginRedirect"><b>Inicia sesión</b></span></a></label>
    </form>
  `;
  container.appendChild(element);
  const [nameInput, emailInput, passwordInput] = container.querySelectorAll('input[required]');
  showAndHidePassword(container);
  signUpWithFirebase(nameInput, emailInput, passwordInput, container);
  formValidation(element);
  return container;
};
