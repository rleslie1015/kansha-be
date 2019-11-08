const port = process.env.PORT || 6660;
const server = require('./server.js');

server.listen(port,() => {
    console.log(`\n Listening on ${port} \n`);
});