const addBackground = (footer) => {
  switch (window.location.hash.toLowerCase()) {
    case '#/home':
      footer.querySelector('a.home-icon').classList.add('active');
      break;
    case '#/home/createpost':
      footer.querySelector('a.createpost-icon').classList.add('active');
      break;
    case '#/home/profile':
      footer.querySelector('a.profile-icon').classList.add('active');
      break;
    default:
      footer.querySelectorAll('a').classList.remove('active');
  }
};

export const mobileFooter = () => {
  const fragment = document.createDocumentFragment();
  const footer = document.createElement('footer');
  footer.classList.add('mobileFooter');
  footer.innerHTML = `
        <nav class="navMobile">
          <a href="#/home" class= "home-icon"><img class="icon menu" src="./assets/img/home.svg" alt="home icon"/></a>
          <a href="#/home/createpost" class= "createpost-icon"><img class="icon menu" src="./assets/img/addpost.svg" alt="add post icon"/></a>
          <a href="#/home/profile" class= "profile-icon"><img class="icon menu" src="./assets/img/profile.svg" alt="profile icon"/></a>
        </nav>`;
  fragment.appendChild(footer);
  addBackground(footer);
  return fragment;
};

export const desktopFooter = () => {
  const fragment = document.createDocumentFragment();
  const footer = document.createElement('footer');
  footer.classList.add('desktopFooter');
  footer.innerHTML = `
  <p>© 2021 Todos los derechos reservados</p>`;
  fragment.appendChild(footer);
  return fragment;
};
