import { Injectable } from '@angular/core';
import { SHA1, AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  key = 'jcq&BTBVr*=1nUh7KQ:Z($!bJ2{w0(';
  setItem(key: string, value: string) {
    const ciphertext = AES.encrypt(value, this.key);
    localStorage.setItem(key, ciphertext.toString());
  }

  getItem(key: string) {
    if (localStorage.getItem(key) !== null) {
      let encryptedValue = localStorage.getItem(key);
      const bytes = AES.decrypt(encryptedValue, this.key);
      return bytes.toString(enc.Utf8);
    } else {
      return null;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
