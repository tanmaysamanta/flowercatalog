const getHeader = (line, seperatorIndex) => {
  return line.slice(0, seperatorIndex).toLowerCase().trim()
};

const getValue = (line, seperatorIndex) => {
  return line.slice(seperatorIndex + 1).trim();
};

const parseHeader = (line) => {
  const indexOfSeperator = line.indexOf(':');
  const header = getHeader(line, indexOfSeperator);
  const value = getValue(line, indexOfSeperator);
  return { header, value };
};

const parseHeaders = (lines) => {
  const headers = {};
  let index = 0;
  while (index < lines.length && lines[index].length > 0) {
    const line = lines[index];
    const { header, value } = parseHeader(line);
    headers[header] = value;
    index++;
  }
  return headers;
};

const parseUri = (rawUri) => {
  const params = {};
  const [uri, queryString] = rawUri.split('?');
  if (queryString) {
    const queryParams = queryString.split('&');
    queryParams.forEach(queryParam => {
      const [param, value] = queryParam.split('=');
      params[param] = value;
    });
  }
  return { uri, params }
};

const parseRequestLine = (line) => {
  const [method, rawUri, httpVersion] = line.split(' ');
  const { uri, params } = parseUri(rawUri);
  return { method, uri, params, httpVersion };
};

const parseRequest = (chunk) => {
  const request = chunk.toString().split('\r\n');
  const requestLine = parseRequestLine(request[0]);
  const headers = parseHeaders(request.slice(1))
  return { ...requestLine, headers };
};

module.exports = { parseRequest };
