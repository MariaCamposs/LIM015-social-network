import mockFirebase from '../_mocks_/mock-storage.js';
import { imagesProfileRef } from '../lib/firebase/storage.js';

global.firebase = mockFirebase();

describe('imagesProfileRef', () => {
  it('Deberia retornar', () => imagesProfileRef('user001').then((data) => {
    expect(data).toBe('Se obtuvo archivo de la carpeta images/user001');
  }));
});
/*
describe('putImageFile', () => {
  it('Deberia retornar', () => putImageFile('user001', 'foto.jpg').then((data) => {
    expect(data).toBe('El file foto.jpg fue agregado a la carpeta images/user001');
  }));
});
*/
