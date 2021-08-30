// importamos la funcion que vamos a testear
import { sendEmail } from '../lib/firebase/functions.js';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof sendEmail).toBe('function');
  });
});
