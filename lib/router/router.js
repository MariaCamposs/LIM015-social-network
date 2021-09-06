import { components } from '../components/components.js';

export const changeViews = () => {
  const main = document.querySelector('#main');
  main.innerHTML = '';
  switch (window.location.hash.toLowerCase()) {
    case '': case '#/': case '#/login':
      main.appendChild(components.login());
      // main.appendChild(components.headerMobile());
      break;
    case '#/resetpassword':
      main.appendChild(components.resetPassword());
      break;
    case '#/signup':
      main.appendChild(components.signUp());
      break;
    case '#/home':
      main.appendChild(components.home());
      break;
    case '#/createpost':
      main.appendChild(components.createPost());
      break;
    case '#/profile':
      main.appendChild(components.profile());
      break;
    case '#/editprofile':
      main.appendChild(components.editProfile());
      break;
    default:
      main.appendChild(components.noFound());
  }
};
