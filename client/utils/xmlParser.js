import { parseString } from 'react-native-xml2js';


export const parseXml = (xml) => {
  return new Promise((resolve, reject) => {
    const parserOptions = {
      trim: true,
      explicitArray: false
    }

    parseString(xml, parserOptions, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}