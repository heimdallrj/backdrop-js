import path from 'path';
import bcrypt from 'bcrypt';

require('dotenv').config();

export const baseUrl = process.env.BASE_URL;
export const port = process.env.PORT || 5000;
export const mediaDir = process.env.MEDIA_DIR;
export const mediaPath = path.join(__dirname, '..', mediaDir);

export const filesToBeIgnored = ['.DS_Store'];
export const reservedResourceNames = ['config', 'resources', 'users'];

export const dbConnection = process.env.DB_CONNECTION;
export const dbConfig = null;
export const jsonDbPath = path.join(__dirname, '..');

export const oAuthGitHubClientId = process.env.OAUTH_GITHUB_CLIENT_ID;
export const oAuthGitHubClientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

export const jwtSecret = process.env.JWT_SECRET;

const saltRounds = 10;
export const salt = bcrypt.genSaltSync(saltRounds);

export const smtpHost = process.env.SMTP_HOST;
export const smtpPort = process.env.SMTP_PORT;
export const smtpUser = process.env.SMTP_USER;
export const smtpPass = process.env.SMTP_PASS;
export const smtpFrom = process.env.SMTP_FROM;
