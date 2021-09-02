export const createPost = () => {
  const container = document.createElement('section');
  container.classList.add('createPostContainer');
  const element = document.createElement('section');
  element.classList.add('createPostSection');
  element.innerHTML = `
    <form id="login" class="loginForm">
      <label class="createPostSection">Crear publicación</label>
      <img class="userPhoto" src=""/>
      <label class="userName">Firulais</label>
      <label>Amigos
        <i class="ai-people-multiple"></i>
        <i class="ai-toggle-off"></i>
        <i class="ai-globe"></i>
        Público
      </label>
      <input id="inputPost" placeholder="¿Qué está haciendo tu mascota?" required/>
      <span class="characters">0/300 caracteres</span>
      <input id="inputUbication"placeholder="Ubicación" required/>
      <input id="inputNamePet" placeholder="Nombre de mascota" required/>
      <button id="photoButton" class="formButton">Subir foto <i class="ai-image"></i></button>
      <button id="postButton" class="formButton">Publlicar</button>
    </form>
  `;
  container.appendChild(element);
  return container;
};
