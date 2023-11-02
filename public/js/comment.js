const createComment = async (event) => {
    event.preventDefault();

    const comment_body = document.getElementById('comment-input').value.trim();
    const id = document.getElementById('post-view').getAttribute('data-id');

    if (comment_body) {
        const response = await fetch(`/api/blog/comment/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment_body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        }
        else if (response.status == 440) {
            alert('Session expired. Please log in again');
            document.location.replace('/login');
        }
        else {
            console.log(response);
            alert('Failed to create post.');
        }
    }
};

const toggleDisplay = () => {
    const commentButton = document.getElementById('comment-button');
    const commentForm = document.getElementById('comment-form');
    if (commentButton.getAttribute('data-visible') == 'true') {
        commentButton.setAttribute('data-visible', 'false');
        commentButton.className = 'd-none';
        commentForm.className = 'card col-12 border-secondary border-5 mb-3 d-flex flex-column justify-content-between bg-primary-subtle';
    }
    else {
        commentButton.setAttribute('data-visible', 'true');
        commentButton.className = 'btn rounded-3 bg-success text-light mb-2 mx-3';
        commentForm.className = 'd-none';
    }
}

document.querySelector('#comment-button').addEventListener('click', toggleDisplay);

document.querySelector('#comment-form').addEventListener('submit', createComment);