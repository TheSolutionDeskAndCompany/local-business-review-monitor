const logger = {
  info: (message, meta = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO] ${message}`, meta);
    }
  },
  
  error: (message, error = null, meta = {}) => {
    console.error(`[ERROR] ${message}`, error ? error.message : '', meta);
  },
  
  warn: (message, meta = {}) => {
    console.warn(`[WARN] ${message}`, meta);
  },
  
  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, meta);
    }
  }
};

module.exports = logger;
