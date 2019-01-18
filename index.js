const express = require('express');
const helmet = require('helmet');

const server = express();

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const actionRoutes = require('./routes/actionRoutes');
const projectRoutes = require('./routes/projectRoutes');

server.use(helmet());
server.use(express.json());

server.use('/action', actionRoutes);
server.use('/project', projectRoutes);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.listen(9000, () => console.log('API Running!'));

module.exports = server;
