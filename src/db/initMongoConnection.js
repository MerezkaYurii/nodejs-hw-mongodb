import { getEnvVar } from '../utils/getEnvVar.js';
import mongoose from 'mongoose';
export const initMongoConnection = async () => {
  try {
    const password = getEnvVar('MONGODB_PASSWORD');
    const user = getEnvVar('MONGODB_USER');
    const url = getEnvVar('MONGODB_UR');
    const nameDB = getEnvVar('MONGODB_DB');
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${nameDB}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
