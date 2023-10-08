const fs = require('fs');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.Promise = global.Promise;
// connect to Mongo
mongoose.connect(process.env.DB_URL, {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connection error when connecting mongo
mongoose.connection.on('error', (err) => {
  if (err) {
    console.error(`Unable to connect to database: ${err.toString()}`);

    mongoose.connect(process.env.DB_URL, {
      autoIndex: false,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }
});

const app = require('./config/express');
const routes = require('./src/modules/routers');

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  const dir = './logs';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  app.use(morgan('combined', {
    stream: fs.createWriteStream(`${__dirname}/logs/access.log`, { flags: 'a' }),
  }));
} else {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.info(`🚀 Server running on http://${process.env.HOST}:${PORT}`);
});
