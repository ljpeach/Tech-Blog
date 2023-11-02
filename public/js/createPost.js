const createPost = async (event) => {
    event.preventDefault();

    const title = document.getElementById('titleInput').value.trim();
    const post_body = document.getElementById('contentInput').value.trim();

    if (title && post_body) {
        const response = await fetch('/api/blog/', {
            method: 'POST',
            body: JSON.stringify({ title, post_body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else if (response.status == 440) {
            alert('Session expired. Please log in again');
            document.location.replace('/login');
        }
        else {
            alert('Failed to create post.');
        }
    }
};

document.querySelector('#post-form').addEventListener('submit', createPost);