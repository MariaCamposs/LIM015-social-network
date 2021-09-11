const storage = () => ({
  ref: () => ({
    child: (fileName) => new Promise((resolve) => {
      resolve(`Se obtuvo archivo de la carpeta ${fileName}`);
    }), /*
    put: (photoFile) => new Promise((resolve) => {
      resolve(`El file ${photoFile} fue agregado a la carpeta`);
    }), */
  }),
});

const firebase = {
  storage,
};

export default jest.fn(() => firebase);
