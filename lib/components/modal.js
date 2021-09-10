const closeModal = (element) => {
  const section = element;
  const closeButton = section.querySelector('.close');
  closeButton.addEventListener('click', () => {
    section.style.display = 'none';
    if (closeButton.id === 'emailModal') window.location.hash = '#/login';
    if (closeButton.id === 'postConfirmation') window.location.reload();
  });
  window.addEventListener('click', (e) => {
    if (e.target === section) {
      section.style.display = 'none';
      if (closeButton.id === 'emailModal') window.location.hash = '#/login';
      if (closeButton.id === 'postConfirmation') window.location.reload();
    }
  });
};

export const succesfulSignUpModal = (email) => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
  <section class="modal-content">
    <header class="modal-header">
        <span class="close" id="emailModal">&times;</span>
        <h2>¡Ya casi está listo!</h2>
    </header>
    <main class="modal-body">
        <p>Hemos enviado un correo a: <span class="modalEmail"><b>${email}</b></span></p></br>
        <p>Por favor verifique su correo haciendo click en el enlace dentro del mensaje.</p>
    </main>
    <footer class="modal-footer">
        <span>¿No recibió el correo?</span>
        <span class="modal-redirect" id="resendEmail"><b>Reenviar correo</b></span>
    </footer>
  </section>
  `;
  closeModal(section);
  return section;
};

export const emailAlreadyExistsModal = (email) => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
    <section class="modal-content">
      <header class="modal-header">
          <span class="close">&times;</span>
          <h2>¡Esta Cuenta ya existe!</h2>
      </header>
      <main class="modal-body">
          <p>El correo: <span class="modalEmail">
          <b>${email}</b></span> ya tiene una cuenta afiliada
          </p></br>
          <p>Por favor ingrese otro correo.</p>
      </main>
      <footer class="modal-footer">
        <span>¿Ya tienes una cuenta?</span>
        <a href="#/login">
        <span class="modal-redirect" id="loginRedirectModal"><b>Inicia sesión</b></span>
        </a>
      </footer>
    </section>
    `;
  closeModal(section);
  return section;
};

export const userNotRegisterModal = (email) => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
      <section class="modal-content">
        <header class="modal-header">
            <span class="close">&times;</span>
            <h2>¡UPS!</h2>
        </header>
        <main class="modal-body">
            <p>No existe una cuenta registrada con el correo: <span class="modalEmail">
            <b>${email}</b></span>
            </p></br>
            <p>Intentelo de nuevo.</p>
        </main>
        <footer class="modal-footer">
            <span>¿No tienes una cuenta?</span>
            <a href="#/signup">
            <span class="modal-redirect" id="signUpRedirectModal"><b>Crear una cuenta</b></span>
            </a>
        </footer>
      </section>`;
  closeModal(section);
  return section;
};

export const wrongPasswordModal = () => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
      <section class="modal-content">
        <header class="modal-header">
            <span class="close">&times;</span>
            <h2>¡UPS!</h2>
        </header>
        <main class="modal-body">
            <p>La contraseña es inválida.</br>
            <p>Intentelo de nuevo.</p>
        </main>
        <footer class="modal-footer">
        </footer>
      </section>`;
  closeModal(section);
  return section;
};

export const verifiedEmailModal = (email) => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
  <section class="modal-content">
    <header class="modal-header">
        <span class="close">&times;</span>
        <h2>¡Correo no verificado!</h2>
    </header>
    <main class="modal-body">
        <p>Por favor verifique su correo antes de iniciar sesión </p>
        <p>Hemos enviado con anterioridad un correo a: <span class="modalEmail"><b>${email}</b></span></br>
        Revise su buzón de correo o spam y haga click en el enlace dentro del mensaje</p></br>
    </main>
    <footer class="modal-footer">
        <span>¿No recibió el correo?</span>
        <span class="modal-redirect" id="resendEmail"><b>Reenviar correo.</b></span>
    </footer>
  </section>
  `;
  closeModal(section);
  return section;
};

export const sendPasswordResetEmailModal = (email) => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
      <section class="modal-content">
        <header class="modal-header">
            <span class="close">&times;</span>
            <h2>¡Correo enviado!</h2>
        </header>
        <main class="modal-body">
            <p>Hemos enviado un link de restablecimiento de contraseña al correo: <span class="modalEmail"><b>${email}</b></span></br>
            <br>Por favor revise su buzón de correo o spam.</p></br>
        </main>
        <footer class="modal-footer">
        </footer>
      </section>`;
  closeModal(section);
  return section;
};

export const postConfirmationModal = () => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
      <section class="modal-content">
        <header class="modal-header">
            <span class="close" id="postConfirmation">&times;</span>
            <h2>¡Tu post ha sido publicado!</h2>
        </header>
        <main class="modal-body">
          <a href="#/home/profile" class="formButton">Ir a mi perfil</a>
        </main>
        <footer class="modal-footer">
        </footer>
      </section>`;
  closeModal(section);
  return section;
};

export const emptyPostModal = () => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
      <section class="modal-content">
        <header class="modal-header">
            <span class="close">&times;</span>
            <h2>¡UPS!</h2>
        </header>
        <main class="modal-body">
          <p>Tu publicación está vacía</br>
          <br>Por favor asegurate de escribir algo.</p></br>
        </main>
        <footer class="modal-footer">
        </footer>
      </section>`;
  closeModal(section);
  return section;
};

export const dataUploadedModal = () => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
      <section class="modal-content">
        <header class="modal-header">
            <span class="close">&times;</span>
            <h2>¡Listo!</h2>
        </header>
        <main class="modal-body">
          <p>Se actualizaron con éxito tus datos</p>
          <a href="#/home/profile" class="formButton">Ir a mi perfil</a>
        </main>
        <footer class="modal-footer">
        </footer>
      </section>`;
  closeModal(section);
  return section;
};

export const preventDeleteModal = () => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
      <section class="modal-content">
        <header class="modal-header">
            <span class="close">&times;</span>
            <h2>¿Está seguro de eliminar este post?</h2>
        </header>
        <main class="modal-body">
          <p>Presione sobre "continuar" para confirmar.</p>
          <button id="postButton" class="formButton">Continuar</button>
        </main>
        <footer class="modal-footer">
        </footer>
      </section>`;
  closeModal(section);
  return section;
};

export const postRemovedModal = () => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
      <section class="modal-content">
        <header class="modal-header">
            <span class="close">&times;</span>
            <h2>¡Publicación eliminada!</h2>
        </header>
        <main class="modal-body">
            <p>Hemos eliminado tu publicación</p>
        </main>
        <footer class="modal-footer">
        </footer>
      </section>`;
  closeModal(section);
  return section;
};

export const updatedPostModal = () => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
      <section class="modal-content">
        <header class="modal-header">
            <span class="close">&times;</span>
            <h2>¡Listo!</h2>
        </header>
        <main class="modal-body">
            <p>Tu publicación ha sido actualizada con éxito</p>
        </main>
        <footer class="modal-footer">
        </footer>
      </section>`;
  closeModal(section);
  return section;
};
