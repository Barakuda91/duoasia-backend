import * as CryptoJS from 'crypto-js';

export function hashUserPassword(password: string): string {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}