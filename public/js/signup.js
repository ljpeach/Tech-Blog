const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#usernameInput').value.trim();
    const password = document.querySelector('#passwordInput').value;

    if (name && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.account-form')
    .addEventListener('submit', signupFormHandler);
