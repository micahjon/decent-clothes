const logLevel = 1;

const log = (...args) => {
  if (logLevel > 1) console.log(...args);
};

const logError = (...args) => {
  if (logLevel > 0) console.error(...args);
};

export { log, logError };
