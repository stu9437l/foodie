import * as CryptoJS from 'crypto-js';

const secretKey = `${process.env.NEXT_PUBLIC_CRYPTO_SECRETE_KEY}`;
const encryption = (data: any) => {
  console.log({ data });
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
};

const decryption = (ciphertext: string) => {
  var bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export { encryption, decryption };
