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

  public static isString(obj) {
    // 判断对象是否是字符串
    return Object.prototype.toString.call(obj) === '[object String]';
  }

  /**
   * 数据类型转换
   * @param value 
   * @param dataType 
   */
  public static getResultByDataType(value, dataType): any {
    if (value) {
      switch (dataType) {
        case 'string':
          return value.toString();
        case 'int':
          return Number.parseInt(value, 10);
        case 'float':
          return Number.parseFloat(value);
        case 'date':
          return new Date(value).toDateString();
        case 'datetime':
          return new Date(value).toTimeString();
        case 'nullable':
          return null;
      }
    } else {
        return value;
    }

  }
}