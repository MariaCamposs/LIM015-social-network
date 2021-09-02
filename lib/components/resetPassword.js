import { sendPasswordReset } from '../firebase/functions.js';
import { formValidation } from './validation.js';
import { sendPasswordResetEmailModal, userNotRegisterModal } from './modal.js';

const resetPasswordFirebase = (container) => {
  const resetBtn = container.querySelector('#resetPasswordButton');
  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = container.querySelector('#resetEmail');
    if (email.value !== '') {
      sendPasswordReset(email.value)
        .then(() => {
          container.appendChild(sendPasswordResetEmailModal(email.value));
        }).catch((error) => {
          if (error.code === 'auth/user-not-found') {
            container.appendChild(userNotRegisterModal(email.value));
          }
        });
    }
  });
};

export const resetPassword = () => {
  const container = document.createElement('section');
  container.classList.add('resetPasswordContainer');
  const element = document.createElement('section');
  element.classList.add('resetPasswordSection');
  element.innerHTML = `
    <form id="passwordForm" class="resetPasswordForm">
      <img class="desktop-logo" src="./assets/img/logo.svg" alt="petstagram"/>
      <img class="icon icon-lock" src="./assets/img/lock.svg"/>
      <label class="formText formText-bold formText-medium">¿Tienes problemas para iniciar sesión?</label>
      <label class="formText resetText">Ingresa tu correo y te enviaremos un enlace para que recuperes el acceso a tu cuenta</label>
      <label class="formText">El correo ha sido enviado, por favor verifícalo</label>
      <input id="resetEmail" class="formBox" name="emailReset" type="email" placeholder="correo@example.com" pattern="^\\S+@\\S+\\.\\S+$" title="Ejemplo: correo@example.com" required/>
      <span id="emailReset" class="form-error none">Ejemplo: correo@example.com</span>
      <button id="resetPasswordButton" class="formButton">Recuperar contraseña</button>
      <a href="#/signup" id="signUp" class="formText formText-bold">Crear cuenta nueva</a>
      <a href="#/login" id="signIn" class="formText formText-bold">Volver a inicio de sesión</a>
    </form>
  `;
  container.appendChild(element);
  resetPasswordFirebase(container);
  formValidation(element);
  return container;
};
