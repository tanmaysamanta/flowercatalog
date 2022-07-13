const fs = require('fs');

const generateTag = (tag, text) => {
  return `<${tag}>${text}</${tag}>`
};

const getTime = () => {
  const time = new Date();
  return time.toLocaleString();
};

const formatComments = (comments) => {
  let formatedComments = '';
  comments.forEach(comment => {
    const text = `${comment.time}  ${comment.name} : ${comment.comment}`
    formatedComments += generateTag('div', text);
  });
  return formatedComments;
};

const getFileContent = (fileName, newContent) => {
  const content = fs.readFileSync(fileName, 'utf8');
  return content.replace('__COMMENT__', newContent);
};

const getEntry = (request) => {
  const comment = {};
  const entries = request.bodyParams.entries();
  for (const entry of entries) {
    comment[entry[0]] = entry[1];
  }
  comment.time = getTime();
  return comment;
};

const persistDB = (guestBook, fileName) => {
  const content = guestBook.toString();
  fs.writeFileSync(fileName, content);
};

module.exports = { getEntry, getFileContent, persistDB, formatComments };
