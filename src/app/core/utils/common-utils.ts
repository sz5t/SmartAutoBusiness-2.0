import { deepCopy } from '@delon/util';
export class CommonUtils {
  public static uuID(w) {
    let s = '';
    const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < w; i++) {
      s += str.charAt(Math.round(Math.random() * (str.length - 1)));
    }
    return s;
  }

  public static deepCopy(data) {
    return JSON.parse(JSON.stringify(data));
  }
}
