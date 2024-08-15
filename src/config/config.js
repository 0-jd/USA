import dotenv from 'dotenv';
dotenv.config();

export const apiId = process.env.apiId;
export const apiHash = process.env.apiHash;
export const stringSession = process.env.StringSession || "";

export const clientOptions = {
  systemLanguage: "en",
  systemVersion: "Windows 10",
  deviceType: "Desktop",
  appVersion: "5.3.2",
};

export const port = process.env.PORT || 4000;

export const channels = [1001923634336, 1002149233822];
export const monthRegex = new RegExp(
  '\\b(' +
  'Sept(?:ember)?|' +
  'Sep(?:tember)?|' +
  'Oct(?:ober)?|' +
  'Nov(?:ember)?|' +
  'Dec(?:ember)?' +
  ')\\b',
  'i'
);
