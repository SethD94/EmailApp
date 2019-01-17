if (process.env.NODE_ENV === "production") {
   //we are in a production environment, return the production keys
   module.exports = require('./prod');
} else {
    // we are in a development environment, return the development keys
    module.exports = require('./dev');

}