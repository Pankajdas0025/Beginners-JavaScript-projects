

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showLogin = document.getElementById('show-login');
    const showSignup = document.getElementById('show-signup');

    showLogin.addEventListener('click', () => {
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      showLogin.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
      showSignup.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
      showSignup.classList.add('text-gray-500');
    });

    showSignup.addEventListener('click', () => {
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      showSignup.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
      showLogin.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
      showLogin.classList.add('text-gray-500');
    });
