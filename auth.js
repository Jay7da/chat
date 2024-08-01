document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const authForm = document.getElementById('authForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageElement = document.getElementById('message');

    let isSignup = true;

    // Toggle between login and signup
    loginBtn.addEventListener('click', () => {
        isSignup = false;
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
        authForm.querySelector('button').textContent = 'Login';
        messageElement.textContent = '';
    });

    signupBtn.addEventListener('click', () => {
        isSignup = true;
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
        authForm.querySelector('button').textContent = 'Signup';
        messageElement.textContent = '';
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (isSignup) {
            handleSignup(email, password);
        } else {
            handleLogin(email, password);
        }
    });

    function handleSignup(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.email === email);

        if (userExists) {
            messageElement.textContent = 'Email already exists!';
        } else {
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            messageElement.textContent = 'Signup successful!';
            setTimeout(() => {
                emailInput.value = '';
                passwordInput.value = '';
                messageElement.textContent = '';
            }, 2000);
        }
    }

    function handleLogin(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            messageElement.textContent = 'Login successful!';
            setTimeout(() => {
                emailInput.value = '';
                passwordInput.value = '';
                messageElement.textContent = '';
            }, 2000);
        } else {
            messageElement.textContent = 'Invalid email or password!';
        }
    }
});
