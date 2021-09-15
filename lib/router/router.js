import { components } from '../components/components.js';
import { userState } from '../components/validation.js';

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
      userState();
      main.appendChild(components.mobileHeader());
      main.appendChild(components.desktopHeader());
      main.appendChild(components.home());
      main.appendChild(components.mobileFooter());
      main.appendChild(components.desktopFooter());
      break;
    case '#/home/createpost':
      userState();
      main.appendChild(components.mobileHeader());
      main.appendChild(components.desktopHeader());
      main.appendChild(components.createPost());
      main.appendChild(components.mobileFooter());
      main.appendChild(components.desktopFooter());
      break;
    case '#/home/profile':
      userState();
      main.appendChild(components.desktopHeader());
      main.appendChild(components.profile());
      main.appendChild(components.mobileFooter());
      main.appendChild(components.desktopFooter());
      break;
    case '#/home/profile/editprofile':
      userState();
      main.appendChild(components.desktopHeader());
      main.appendChild(components.editProfile());
      main.appendChild(components.mobileFooter());
      main.appendChild(components.desktopFooter());
      break;
    default:
      main.appendChild(components.noFound());
  }
};
