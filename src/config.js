import path from 'path';

export default {
  // environment
  env: process.env.NODE_ENV || 'development',
  // port on which to listen
  port: process.env.PORT || 3000,
  // path to root directory of this app
  root: path.normalize(__dirname),
  elasticsearch: {
    node: process.env.ELASTICSEARCH_HOST || 'localhost:9200'
  }
};
