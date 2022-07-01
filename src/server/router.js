// const createRouter = (handlers) => {
//   return (request, response) => {
//     for (const handler of handlers) {
//       if (handler(request, response)) {
//         return true;
//       }
//     }
//     return false;
//   };
// };

const createNext = handlers => {
  let index = -1;
  const callNextHandler = (req, res) => {
    index++;
    const currentHandler = handlers[index];
    if (currentHandler) {
      currentHandler(req, res, () => callNextHandler(req, res));
    }
  };
  return callNextHandler;
};

const createRouter = (...handlers) => {
  return (req, res) => {
    const next = createNext(handlers);
    next(req, res);
  };
};

module.exports = { createRouter };
