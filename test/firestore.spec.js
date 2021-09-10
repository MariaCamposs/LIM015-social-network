import {
  addUserInFirestore,
  updateDocDatainFirestore,
  getUser,
  getUserWithOnSnapshot,
  addPost,
  updatePost,
  deletePost,
  getPosts,
  getUserToFollow,
  getPostsWithOnSnapshot,
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
  it('debe agregar el usuario 2', () => {
    addUserInFirestore(2, { name: 'Pedro' }).then((doc) => {
      const result = doc.data();
      expect(result.name).toBe('Pedro');
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

describe('getUserToFollow', () => {
  it('getUserToFollow debería ser una función', () => {
    expect(typeof getUserToFollow).toBe('function');
  });
  it('debe obtener los usuarios a seguir', () => {
    getUserToFollow(1, (result) => {
      expect(Array.isArray(result.docs)).toBe(true);
      expect(result.data).not.toBeUndefined();
    });
  });
});

const post = {
  uid: '3',
  name: 'Carlos',
  photo: '',
  post: '',
  ubication: '',
  namePet: '',
  photoPost: '',
  timestamp: 'December 10, 1815',
  likes: [],
  comments: [],
};
describe('addPost', () => {
  it('addPost debería ser una función', () => {
    expect(typeof addPost).toBe('function');
  });
  it('debe agregar un post', () => {
    addPost(post).then((doc) => {
      const docData = doc.data();
      expect(docData.uid).toBe('3');
      expect(docData.name).toBe('Carlos');
      expect(docData.timestamp).toBe('December 10, 1815');
      expect(mockfirestore).toHaveBeenCalled();
    });
  });
});

describe('updatePost', () => {
  it('updatePost debería ser una función', () => {
    expect(typeof updatePost).toBe('function');
  });
  it('debe actualizar el post', () => {
    updatePost('3', { name: 'Ana' }).then((doc) => {
      const docData = doc.data();
      expect(docData.name).toBe('Ana');
      expect(mockfirestore).toHaveBeenCalled();
    });
  });
});
describe('deletePost', () => {
  it('deletePost debería ser una función', () => {
    expect(typeof deletePost).toBe('function');
  });
  it('debe eliminar el post', () => {
    deletePost('3').then(() => {
      expect(mockfirestore).toHaveBeenCalled();
    });
  });
});

describe('getPosts', () => {
  it('getPosts debería ser una función', () => {
    expect(typeof getPosts).toBe('function');
  });
  it('el resultado de los posts observados no debe ser null ni undefined', () => {
    getPosts((doc) => {
      expect(Array.isArray(doc.docs)).toBe(true);
      expect(doc.data).not.toBeUndefined();
      expect(doc.data).not.toBeNull();
    });
  });
});

describe('getPostsWithOnSnapshot', () => {
  it('getPostsWithOnSnapshot, debería ser una función', () => {
    expect(typeof getPostsWithOnSnapshot).toBe('function');
  });
  it('debe obtener los posts observados', () => {
    getPostsWithOnSnapshot('3', (doc) => {
      expect(Array.isArray(doc.docs)).toBe(true);
      expect(doc.data).not.toBeNull();
    });
  });
});
