exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://localhost/crudj';
exports.PORT = process.env.PORT || 3001;
