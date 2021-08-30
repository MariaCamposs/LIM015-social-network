import {
  addUser,
  loginUser,
  googleLogin,
  sendPasswordReset,
  sendEmail,
  onAuthStateChanged,
  signOut,
} from '../lib/firebase/functions.js';

const firebaseMock = require('firebase-mock');

const mockauth = new firebaseMock.MockAuthentication();
mockauth.autoFlush();

global.firebase = new firebaseMock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);

const users = {
  email: 'ben@example.com',
  password: 'examplePass',
};

describe('addUser', () => {
  it('addUser debería ser una función', () => {
    expect(typeof addUser).toBe('function');
  });
  it('', () => {
    addUser(users.email, users.password)
      .then((user) => {
        expect(user).toEqual(users);
      });
  });
});

describe('loginUser', () => {
  it('loginUser debería ser una función', () => {
    expect(typeof loginUser).toBe('function');
  });
  it('', () => {
    loginUser(users.email, users.password)
      .then((user) => {
        expect(user).toEqual(users);
      });
  });
});

describe('googleLogin', () => {
  it('debería ser una función', () => {
    expect(typeof googleLogin).toBe('function');
  });
  it('', () => {
    googleLogin(users.email, users.password)
      .then((user) => {
        expect(user).toEqual(users);
      });
  });
});

describe('sendPasswordResetEmail', () => {
  it('debería ser una función', () => {
    expect(typeof sendPasswordReset).toBe('function');
  });
  it('', () => {
    const mocksendPasswordResetEmail = jest.fn();
    firebase.auth().sendPasswordResetEmail = mocksendPasswordResetEmail;
    sendPasswordReset(users.email);
    expect(mocksendPasswordResetEmail).toHaveBeenCalled();
    expect(mocksendPasswordResetEmail.mock.calls).toHaveLength(1);
    expect(mocksendPasswordResetEmail).toHaveBeenCalledWith(users.email);
  });
});

describe('sendEmail', () => {
  it('debería ser una función', () => {
    expect(typeof sendEmail).toBe('function');
  });
  it('', () => {
    const mocksendEmail = jest.fn();
    firebase.auth().currentUser.sendEmailVerification = mocksendEmail;
    sendEmail();
    expect(mocksendEmail).toHaveBeenCalled();
    expect(mocksendEmail.mock.calls).toHaveLength(1);
  });
});

describe('onAuthStateChanged', () => {
  it('debería ser una función', () => {
    expect(typeof onAuthStateChanged).toBe('function');
  });
  it('', () => {
    const callback = () => {};
    onAuthStateChanged(callback);
    expect(callback).toEqual(callback);
  });
});

describe('signOut', () => {
  it('deberia cerrar sesion', () => signOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});
