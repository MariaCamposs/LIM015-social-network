import { components } from '../components/components.js';

export const changeViews = () => {
  const main = document.querySelector('#main');
  main.innerHTML = '';
  switch (window.location.hash.toLowerCase()) {
    case '': case '#/': case '#/login':
      main.appendChild(components.login());
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
    default:
      main.appendChild(components.noFound());
  }
};
