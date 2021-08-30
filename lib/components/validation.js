export const formValidation = (element) => {
  const inputs = element.querySelectorAll('input[required]');
  inputs.forEach((input) => {
    const span = element.querySelector(`span[id="${input.name}"]`);
    input.addEventListener('keyup', () => {
      const pattern = input.pattern || input.dataset.pattern;
      if (input.value === '') {
        span.classList.add('is-active');
      }
      if (pattern && input.value !== '') {
        const regex = new RegExp(pattern);
        if (!regex.exec(input.value)) {
          span.classList.add('is-active');
        } else {
          span.classList.remove('is-active');
        }
      }
      if (!pattern) {
        if (input.value === '') {
          span.classList.add('is-active');
        } else {
          span.classList.remove('is-active');
        }
      }
    });
  });
};
export const showAndHidePassword = (container) => {
  /* Hide and show password */
  const togglePassword = container.querySelector('#togglePassword');
  const passwordInput = container.querySelector('input[name="password"]');
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('ai-eye-open');
  });
};
