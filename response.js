const CRLF = '\r\n';
const httpVersion = 'HTTP/1.1'

const responseMessage = {
  200: 'OK',
  404: 'Not found',
  301: 'Moved permanently'
};

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  setHeaders(header, value) {
    this.#headers[header] = value;
  }

  #writeHeaders() {
    Object.entries(this.#headers).forEach(
      ([header, value]) => this.#socket.write(`${header}:${value}${CRLF}`)
    );
  }

  statusLine() {
    const message = responseMessage[this.#statusCode];
    return `${httpVersion} ${this.#statusCode} ${message}${CRLF}`;
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  #write(content) {
    this.#socket.write(content);
  }

  send(body) {
    this.setHeaders('content-length', body.length)
    this.#write(this.statusLine());
    this.#writeHeaders();
    this.#write(CRLF);
    this.#write(body);
    this.#socket.end();
  }
}

module.exports = { Response };
