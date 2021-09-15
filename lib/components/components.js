import { login } from './login.js';
import { signUp } from './signup.js';
import { home } from './home.js';
import { resetPassword } from './resetPassword.js';
import { noFound } from './noFound.js';
import { createPost } from './createpost.js';
import { profile, editProfile } from './profile.js';
import { mobileFooter, desktopFooter } from './footer.js';
import { mobileHeader, desktopHeader } from './header.js';

export const components = {
  login,
  signUp,
  home,
  resetPassword,
  noFound,
  createPost,
  profile,
  editProfile,
  mobileHeader,
  desktopHeader,
  mobileFooter,
  desktopFooter,
};
