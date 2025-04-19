import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import SessionsCollection from '../db/models/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/auth.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';

export const findSession = (query) => SessionsCollection.findOne(query);
export const findUser = (query) => UsersCollection.findOne(query);

export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = Date.now() + FIFTEEN_MINUTES;
  const refreshTokenValidUntil = Date.now() + THIRTY_DAY;
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  return await UsersCollection.create({ ...payload, password: hashPassword });
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.findOneAndDelete({ userId: user._id });

  const session = createSession();

  return SessionsCollection.create({
    userId: user._id,
    ...session,
  });
};

export const refreshUser = async ({ refreshToken, sessionId }) => {
  const session = await findSession({ refreshToken, _id: sessionId });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  if (Date.now() > session.refreshTokenValidUntil) {
    await SessionsCollection.findOneAndDelete({ _id: session._id });
    throw createHttpError(401, 'Session token expired');
  }

  await SessionsCollection.findOneAndDelete({ _id: session._id });
  const newSession = createSession();
  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) =>
  await SessionsCollection.deleteOne({ _id: sessionId });
