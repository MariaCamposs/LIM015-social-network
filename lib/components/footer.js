export const mobileFooter = () => {
  const fragment = document.createDocumentFragment();
  const footer = document.createElement('footer');
  footer.classList.add('mobileFooter');
  footer.innerHTML = `
        <nav class="navMobile">
          <ul>
              <li><a href="#/home"><i class="ai-home icon menu"></i></a></li>
              <li><a href="#/createpost"><img class="icon menu" src="./assets/img/addpost.svg" alt="add post icon"/></a></li>
              <li><a href="#/profile"><img class="icon menu" src="./assets/img/profile.svg" alt="profile icon"/></a></li>
          </ul>
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
