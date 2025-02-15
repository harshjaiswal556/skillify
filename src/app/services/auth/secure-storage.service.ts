import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class SecureStorageService {
  private secretKey = 'your_secret_key'; 

  constructor() {}

  setItem(key: string, value: any): void {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    // localStorage.removeItem(key);
    localStorage.clear();
  }

  clear(): void {
    localStorage.clear();
  }
}
