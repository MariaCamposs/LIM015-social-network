import {
  addUserInFirestore,
  updateDocDatainFirestore,
  getUser,
  getUserWithOnSnapshot,
} from '../lib/firebase/firestore.js';

const firebaseMock = require('firebase-mock');

const mockauth = new firebaseMock.MockAuthentication();
const mockfirestore = new firebaseMock.MockFirestore();
mockauth.autoFlush();
mockfirestore.autoFlush();

global.firebase = new firebaseMock.MockFirebaseSdk(
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('addUserInFirestore', () => {
  it('addUserInFirestore debería ser una función', () => {
    expect(typeof addUserInFirestore).toBe('function');
  });
  it('debe agregar el usuario', () => {
    addUserInFirestore(1, { name: 'Ben' }).then((doc) => {
      const result = doc.data();
      expect(result.name).toBe('Ben');
      expect(mockfirestore).toHaveBeenCalled();
    });
  });
});

describe('updateDocDatainFirestore', () => {
  it('updateDocDatainFirestore debería ser una función', () => {
    expect(typeof updateDocDatainFirestore).toBe('function');
  });
  it('debe actualizar el usuario', () => {
    updateDocDatainFirestore(1, { name: 'Bea' }).then((doc) => {
      const result = doc.data();
      expect(result.name).toBe('Bea');
      expect(mockfirestore).toHaveBeenCalled();
    });
  });
});

describe('getUser', () => {
  it('getUser debería ser una función', () => {
    expect(typeof getUser).toBe('function');
  });
  it('debe obtener el usuario', () => {
    getUser(1).then((doc) => {
      const result = doc.data();
      expect(result).toEqual({ name: 'Bea' });
      expect(mockfirestore).toHaveBeenCalled();
    });
  });
});

describe('getUserWithOnSnapshot', () => {
  it('getUserWithOnSnapshot debería ser una función', () => {
    expect(typeof getUserWithOnSnapshot).toBe('function');
  });
  it('debe obtener el usuario observado', () => {
    getUserWithOnSnapshot(1, (doc) => {
      expect(doc.data()).toEqual({ name: 'Bea' });
    });
  });
});
