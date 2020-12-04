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
        case 'number':
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

  public static compareValueByRegular(nValue, regStr): boolean {
    const reg = new RegExp(regStr);
    return reg.test(nValue);
  }

  // 构建匹配参数
  public static compareValueByMethod(nValue, cValue, method) {
    let result;
    if (!method) {
      return true;
    }
    switch (method) {
      case 'eq': // =
        result = nValue === cValue;
        break;
      case 'neq': // !==
        result = nValue !== cValue;
        break;
      case 'ctn': // like
        // result = nValue.test(\^cValue$\);
        break;
      case 'nctn': // not like
        //  strQ = `${strQ}!ctn(%${value}%)`;
        break;
      case 'in': // in  如果是input 是这样取值，其他则是多选取值
        // strQ = strQ + 'in( + value + )';
        //  strQ = `${strQ}in(${value})`;
        break;
      case 'nin': // not in  如果是input 是这样取值，其他则是多选取值
        // strQ = strQ + '!in( + value + )';
        //  strQ = `${strQ}!in(${value})`;
        break;
      case 'btn': // between
        //  strQ = strQ + 'btn( + value + )';
        //  strQ = `${strQ}btn(${value})`;
        break;
      case 'ge': // >=
        // strQ = strQ + 'ge(' + value + ')';
        //   strQ = `${strQ}ge(${value})`;
        break;
      case 'gt': // >
        // strQ = strQ + 'gt(' + value + ')';
        //  strQ = `${strQ}gt(${value})`;
        break;
      case 'le': // <=
        // strQ = strQ + 'le(' + value + ')';
        //  strQ = `${strQ}le(${value})`;
        break;
      case 'lt': // <
        // strQ = strQ + 'lt(' + value + ')';
        //  strQ = `${strQ}lt(${value})`;
        break;
      default:
        //  strQ = value;
        return true;
    }

    return result;
  }

  public static checkCompareResult(result, prevent): boolean {
    if(prevent) { // 阻止
     return !result; 
    }
    else { // 通过
      return result;
    }
  }
}
