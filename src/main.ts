import * as CryptoJS from 'crypto-js';

let message: string = 'Hello, World!';
console.log(CryptoJS.SHA256(message).toString());