const createCommentsList = (comments) => {
  const details = document.createElement('div');
  JSON.parse(comments).forEach(comment => {
    const text = `${comment.time}  ${comment.name} : ${comment.comment}`
    const commentElement = document.createElement('div');
    commentElement.innerText = text;
    details.appendChild(commentElement);
  });
  return details;
};

const showComments = (xhr) => {
  const commentsList = document.getElementById('comments-list');
  const previousComments = document.getElementById('comments');

  const comments = JSON.parse(xhr.response);
  const details = createCommentsList(comments);
  commentsList.replaceChild(details, previousComments);
};

const parseFormData = (formData) => {
  const parsedFormData = new URLSearchParams(formData);
  return parsedFormData;
};

const addComment = (form) => {
  const formData = new FormData(form);
  const body = parseFormData(formData);
  const xhr = new XMLHttpRequest();
  xhr.onload = () => showComments(xhr);

  xhr.open("post", "/add-comment");
  xhr.send(body);
  form.reset();
};

const main = () => {
  const btn = document.querySelector('#button');
  const form = document.querySelector('#log');
  btn.addEventListener('click', () => addComment(form));
};

window.onload = main;
