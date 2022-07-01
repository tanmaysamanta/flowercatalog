class Guestbook {
  constructor(comments) {
    this.comments = comments;
  }

  addComment(comment) {
    this.comments.unshift(comment);
  }

  toString() {
    return JSON.stringify(this.comments);
  }
}

module.exports = { Guestbook }