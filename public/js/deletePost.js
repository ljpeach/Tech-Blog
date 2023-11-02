const deletePost = async (event) => {
    event.preventDefault();
    const id = document.getElementById('post-form').getAttribute('data-id');
    const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
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
        alert('Failed to delete post.');
    }
};

document.querySelector('#delete').addEventListener('click', deletePost);