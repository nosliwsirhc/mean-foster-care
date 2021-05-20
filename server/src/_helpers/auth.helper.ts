import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { createClient } from 'redis';

interface Token {
  sub: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

const client = createClient({
  host: process.env.REDIS_URL || '192.168.100.40',
  port: 12747,
});
client.auth(process.env.REDIS_PASS || 'chrisw1234');

const PRIV_ACCESS_KEY = fs.readFileSync(
  path.join(__dirname, '..', '..', '/ec_access_private.pem'),
  'utf-8'
);
const PRIV_REFRESH_KEY = fs.readFileSync(
  path.join(__dirname, '..', '..', '/ec_refresh_private.pem'),
  'utf-8'
);

const PUB_REFRESH_KEY = fs.readFileSync(
  path.join(__dirname, '..', '..', '/ec_refresh_public.pem')
);

const ACCESS_EXPIRESIN = 60;
const REFRESH_EXPIRESIN = 60 * 60 * 24 * 7;

export const issueAccessJwt = (userId: string) => {
  const accessJwt = jwt.sign({ sub: userId }, PRIV_ACCESS_KEY, {
    algorithm: 'ES256',
    audience: 'http://localhost:4200/',
    expiresIn: ACCESS_EXPIRESIN,
    issuer: 'http://localhost:3000/',
  });
  return { accessJwt, accessExp: Date.now() + ACCESS_EXPIRESIN * 1000 };
};

export const issueRefreshJwt = (userId: string) => {
  const refreshJwt = jwt.sign({ sub: userId }, PRIV_REFRESH_KEY, {
    algorithm: 'ES256',
    audience: 'http://localhost:4200/',
    expiresIn: REFRESH_EXPIRESIN,
    issuer: 'http://localhost:3000/',
  });
  client.set(userId, refreshJwt);
  client.expire(userId, REFRESH_EXPIRESIN);
  return { refreshJwt, refreshExp: Date.now() + REFRESH_EXPIRESIN * 1000 };
};

export const revokeRefreshTokenByToken = (
  refreshToken: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const decodedToken = decodeRefreshToken(refreshToken);
    if (!decodedToken || typeof decodedToken === 'boolean') {
      reject(false);
    } else {
      client.del(decodedToken.sub, (error, response) => {
        if (error) {
          reject();
        } else {
          resolve();
        }
      });
    }
  });
};

export const revokeRefreshTokenByUserId = (userId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    client.del(userId, (error, response) => {
      if (error) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

export const refreshAuthJwts = (refreshToken: string) => {
  const decodedToken = decodeRefreshToken(refreshToken);
  if (
    !decodedToken ||
    typeof decodedToken === 'boolean' ||
    Date.now() >= decodedToken.exp * 1000
  ) {
    return false;
  }
  const newRefreshToken = issueRefreshJwt(decodedToken.sub);
  const newAccessToken = issueAccessJwt(decodedToken.sub);
  return { userId: decodedToken.sub, newAccessToken, newRefreshToken };
};

const decodeRefreshToken = (token: string): Token | boolean => {
  const decoded = jwt.verify(token, PUB_REFRESH_KEY, {
    algorithms: ['ES256'],
    audience: 'http://localhost:4200/',
    issuer: 'http://localhost:3000/',
  });
  if (typeof decoded === 'string') {
    return false;
  } else {
    return decoded as Token;
  }
};

export const retrieveIdFromJwt = (token: string) => {
  const decoded = jwt.verify(token, PUB_REFRESH_KEY, {
    algorithms: ['ES256'],
    audience: 'http://localhost:4200/',
    issuer: 'http://localhost:3000/',
  }) as Token;
  if (typeof decoded === 'string') {
    return false;
  } else {
    return decoded.sub;
  }
};
