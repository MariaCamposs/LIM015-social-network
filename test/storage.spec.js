import mockFirebase from '../_mocks_/mock-storage.js';
import { getPhotoURL, putImageFile } from '../lib/firebase/storage.js';

global.firebase = mockFirebase();

/*
describe('imagesProfileRef', () => {
  it('Deberia retornar imagesProfileRef', () => {
    expect(imagesProfileRef('user01')).toBe('Se obtuvo archivo de la carpeta images/user01');
  });
});
*/

describe('putImageFile', () => {
  it('Deberia retornar putImageFile', () => putImageFile('user01', 'profile.jpg').then((data) => {
    expect(data).toBe('El file profile.jpg fue agregado a la carpeta images/user01');
  }));
});

describe('getPhotoURL', () => {
  it('Deberia retornar getPhotoURL', () => getPhotoURL('images', 'profile.jpg').then((data) => {
    expect(data).toBe('Se obtuvo el archivo de gs://lab-petstagram.appspot.com/images/profile.jpg/undefined');
  }));
});
