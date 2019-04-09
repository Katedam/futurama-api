/* eslint-disable no-console*/
require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

app.listen(process.env.PORT || 7890, () => {
  console.log('running');
});
