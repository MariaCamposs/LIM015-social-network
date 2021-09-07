export const mobileFooter = () => {
  const fragment = document.createDocumentFragment();
  const footer = document.createElement('footer');
  footer.classList.add('mobileFooter');
  footer.innerHTML = `
        <nav class="navMobile">
          <a href="#/home"><img class="icon menu" src="./assets/img/home.svg" alt="home icon"/></a>
          <a href="#/createpost"><img class="icon menu" src="./assets/img/addpost.svg" alt="add post icon"/></a>
          <a href="#/profile"><img class="icon menu" src="./assets/img/profile.svg" alt="profile icon"/></a>
        </nav>`;
  fragment.appendChild(footer);
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
