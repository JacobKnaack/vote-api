'use strict';

const app = require('./lib/app');
const { sequelize } = require('./lib/models');
const PORT = process.env.PORT || 3001;

sequelize.sync()
.then(() => app.listen(PORT))
.then(() => console.log(`App is running on port:: ${PORT}`))
.catch(e => {
  console.log('server error'. e);
});