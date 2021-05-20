import mongoose, { ConnectionOptions } from 'mongoose';

const DB_STRING = process.env.DB_STRING || '';
const connectionOptions: ConnectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(DB_STRING, connectionOptions)
  .then(() => console.info('Mongdb Connected in Dev Mode'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
