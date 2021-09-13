const storage = () => ({
  ref: () => ({
    child: (namePhoto) => ({
      put: (photoFile) => new Promise((resolve) => {
        resolve(`El file ${photoFile} fue agregado a la carpeta ${namePhoto}`);
      }),
    }),
  }),
  refFromURL: (dir, namePhoto) => ({
    getDownloadURL: () => new Promise((resolve) => {
      resolve(`Se obtuvo el archivo de ${dir}/${namePhoto}`);
    }),

  }),
});

const firebase = {
  storage,
};

export default jest.fn(() => firebase);
