const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const name = document.querySelector('#usernameInput').value.trim();
    const password = document.querySelector('#passwordInput').value;

    if (name && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');
        } else {
            alert((await response.json()).message);
        }
    }
};

document
    .querySelector('.account-form')
    .addEventListener('submit', loginFormHandler);
