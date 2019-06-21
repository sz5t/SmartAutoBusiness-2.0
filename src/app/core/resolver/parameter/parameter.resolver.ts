import { CommonUtils } from './../../utils/common-utils';
import { ActivatedRoute } from '@angular/router';
import { getISOYear, getISOWeek, getMonth, getDate } from 'date-fns';

export interface ParametersResolverModel {
  params: any[];
  tempValue?: any;
  item?: any;
  componentValue?: any;
  initValue?: any;
  cacheValue?: any;
  cascadeValue?: any;
  returnValue?: any;
  router?: ActivatedRoute;
}

export interface IParameter {
  buildParameter(): any;
}

export class ParameterResolver {
  public static resolve(model: ParametersResolverModel) {
    const result = {};
    if (Array.isArray(model.params)) {
      for (const param of model.params) {
        const paramType = param.type;
        if (paramType) {
          this[paramType](result, param, model);
        }
      }
    }
    return result;
  }

  private tempValue(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new TempValueParameter(result, param, model).buildParameter();
  }

  private value(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ValueParamParameter(result, param, model).buildParameter();
  }

  private GUID(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new GUIDParameter(result, param, model).buildParameter();
  }

  private item(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ItemParameter(result, param, model).buildParameter();
  }

  private componentValue(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ComponentValueParameter(result, param, model).buildParameter();
  }

  private checkedRow(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new CheckedRowParameter(result, param, model).buildParameter();
  }

  private selectedRow(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new SelectedRowParameter(result, param, model).buildParameter();
  }

  private checked(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new CheckedParameter(result, param, model).buildParameter();
  }

  private selected(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new SelectedParameter(result, param, model).buildParameter();
  }

  private checkedId(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new CheckedIdParameter(result, param, model).buildParameter();
  }

  private cacheValue(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new CacheValueParameter(result, param, model).buildParameter();
  }

  private initValue(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new InitValueParameter(result, param, model).buildParameter();
  }

  private cascadeValue(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new CascadeValueParameter(result, param, model).buildParameter();
  }

  private returnValue(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ReturnValueParameter(result, param, model).buildParameter();
  }

  private defaultWeek(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ItemParameter(result, param, model).buildParameter();
  }

  //   private defaultDay(result, param) {
  //     // tslint:disable-next-line: no-use-before-declare
  //     return new ItemParameter(result, param, model).buildParameter();
  //   }

  //   private defaultMonth(result, param) {
  //     // tslint:disable-next-line: no-use-before-declare
  //     return new ItemParameter(result, param, model).buildParameter();
  //   }

  private router(result, param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new RouterParameter(result, param, model).buildParameter();
  }
}

class BaseParameter {
  public getParameter(dataType, value) {
    let strQ = '';
    if (!value) {
      // return strQ;
    }
    switch (dataType) {
      case 'eq': // =
        strQ = strQ + 'eq(' + value + ')';
        break;
      case 'neq': // !=
        strQ = strQ + '!eq(' + value + ')';
        break;
      case 'ctn': // like
        strQ = strQ + "ctn('%" + value + "%')";
        break;
      case 'nctn': // not like
        strQ = strQ + "!ctn('%" + value + "%')";
        break;
      case 'in': // in  如果是input 是这样取值，其他则是多选取值
        strQ = strQ + 'in(' + value + ')';
        break;
      case 'nin': // not in  如果是input 是这样取值，其他则是多选取值
        strQ = strQ + '!in(' + value + ')';
        break;
      case 'btn': // between
        strQ = strQ + 'btn(' + value + ')';
        break;
      case 'ge': // >=
        strQ = strQ + 'ge(' + value + ')';
        break;
      case 'gt': // >
        strQ = strQ + 'gt(' + value + ')';
        break;
      case 'le': // <=
        strQ = strQ + 'le(' + value + ')';
        break;
      case 'lt': // <
        strQ = strQ + 'lt(' + value + ')';
        break;
      default:
        strQ = value;
        break;
    }

    if (!value) {
      strQ = null;
    }
    return strQ;
  }
  public getDefaultDate(dataType) {
    let dValue;
    switch (dataType) {
      case 'defaultWeek':
        dValue = `${getISOYear(Date.now())}-${getISOWeek(Date.now())}`;
        break;
      case 'defaultDay':
        dValue = `${getISOYear(Date.now())}-${getMonth(Date.now()) + 1}-${getDate(Date.now())}`;
        break;
      case 'defaultMonth':
        dValue = `${getISOYear(Date.now())}-${getMonth(Date.now()) + 1}`;
        break;
      case 'defaultYear':
        dValue = `${getISOYear(Date.now())}`;
        break;
    }
    return dValue;
  }
}

class TempValueParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.tempValue && this._model.tempValue[this._param.valueName]) {
      if (this._param.dataType) {
        this._result[this._param.name] = this.getParameter(
          this._param.dataType,
          this._model.tempValue[this._param.valueName],
        );
      } else {
        this._result[this._param.name] = this._model.tempValue[this._param.valueName];
      }
    } else {
      if (this._param.value === null || this._param.value === '' || this._param.value === 0) {
        if (this._param.dataType) {
          this._result[this._param.name] = this.getParameter(this._param.dataType, this._param.value);
        } else {
          this._result[this._param.name] = this._param.value;
        }
      } else if (this._param.defaultDate) {
        const dataType = this._param.defaultDate;
        const dValue = this.getDefaultDate(dataType);
        if (this._param.dataType) {
          this._result[this._param.name] = this.getParameter(this._param.dataType, dValue);
        } else {
          this._result[this._param.name] = dValue;
        }
      }
    }
    return this._result;
  }
}

class ValueParamParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._param.value === 'null') {
      this._param.value = null;
    }
    // result[param['name']] = param.value;
    if (this._param.dataType) {
      this._result[this._param.name] = this.getParameter(this._param.dataType, this._param.value);
    } else {
      this._result[this._param.name] = this._param.value;
    }
    return this._result;
  }
}

class ItemParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      // 判断组件取值是否为null
      if (this._model.item[this._param.valueName] === null || this._model.item[this._param.valueName] === undefined) {
        if (this._param.value !== undefined) {
          if (this._param.dataType) {
            this._result[this._param.name] = this.getParameter(this._param.dataType, this._param.value);
          } else if (this._param.defaultDate) {
            const dataType = this._param.defaultDate;
            this._result[this._param.name] = this.getDefaultDate(dataType);
          } else {
            this._result[this._param.name] = this._param.value;
          }
        }
      } else {
        if (this._param.dataType) {
          this._result[this._param.name] = this.getParameter(
            this._param.dataType,
            this._model.item[this._param.valueName],
          );
        } else {
          this._result[this._param.name] = this._model.item[this._param.valueName];
        }
      }
    }

    return this._result;
  }
}

class ComponentValueParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.componentValue) {
      // 判断组件取值是否为null
      if (
        this._model.componentValue[this._param.valueName] === null ||
        this._model.componentValue[this._param.valueName] === undefined
      ) {
        if (this._param.value !== undefined) {
          if (this._param.dataType) {
            this._result[this._param.name] = this.getParameter(this._param.dataType, this._param.value);
          } else if (this._param.defaultDate) {
            const dataType = this._param.defaultDate;
            this._result[this._param.name] = this.getDefaultDate(dataType);
          } else {
            this._result[this._param.name] = this._param.value;
          }
        }
      } else {
        if (this._param.dataType) {
          this._result[this._param.name] = this.getParameter(
            this._param.dataType,
            this._model.componentValue[this._param.valueName],
          );
        } else {
          this._result[this._param.name] = this._model.componentValue[this._param.valueName];
        }
      }
    }
    return this._result;
  }
}

class GUIDParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._param.dataType) {
      this._result[this._param.name] = this.getParameter(this._param.dataType, CommonUtils.uuID(32));
    } else {
      this._result[this._param.name] = CommonUtils.uuID(32);
    }
    return this._result;
  }
}

class CheckedParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      this._result[this._param.name] = this.getParameter(this._param.dataType, this._model.item[this._param.valueName]);
    } else {
      this._result[this._param.name] = this._model.item[this._param.valueName];
    }
    return this._result;
  }
}

class SelectedParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      //  result[param['name']] = model.item[param['valueName']];
      if (this._param.dataType) {
        this._result[this._param.name] = this.getParameter(
          this._param.dataType,
          this._model.this._item[this._param.valueName],
        );
      } else {
        this._result[this._param.name] = this._model.item[this._param.valueName];
      }
    }
    return this._result;
  }
}

class CheckedIdParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      // result[param['name']] = model.item;
      if (this._param.dataType) {
        this._result[this._param.name] = this.getParameter(this._param.dataType, this._model.item);
      } else {
        this._result[this._param.name] = this._model.item;
      }
    }
    return this._result;
  }
}

class CheckedRowParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      if (this._param.dataType) {
        this._result[this._param.name] = this.getParameter(
          this._param.dataType,
          this._model.item[this._param.valueName],
        );
      } else {
        this._result[this._param.name] = this._model.item[this._param.valueName];
      }
    }
    return this._result;
  }
}

class SelectedRowParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      this._result[this._param.name] = this._model.item[this._param.valueName];
    }
    return this._result;
  }
}

class InitValueParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.initValue) {
      if (
        this._model.initValue[this._param.valueName] === null ||
        this._model.initValue[this._param.valueName] === undefined
      ) {
        if (this._param.value !== undefined) {
          if (this._param.dataType) {
            this._result[this._param.name] = this.getParameter(this._param.dataType, this._model.initValue.value);
          } else if (this._param.defaultDate) {
            const dataType = this._param.defaultDate;
            this._result[this._param.name] = this.getDefaultDate(dataType);
          } else {
            this._result[this._param.name] = this._param.value;
          }
        }
      } else {
        if (this._param.dataType) {
          this._result[this._param.name] = this.getParameter(
            this._param.dataType,
            this._model.initValue[this._param.valueName],
          );
        } else {
          this._result[this._param.name] = this._model.initValue[this._param.valueName];
        }
      }
    }
    return this._result;
  }
}

class CacheValueParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.cacheValue) {
      const cache = this._model.cacheValue.getNone('userInfo');
      if (this._param.dataType) {
        this._result[this._param.name] = this.getParameter(this._param.dataType, cache[this._param.valueName]);
      } else {
        this._result[this._param.name] = cache[this._param.valueName];
      }
    }
    return this._result;
  }
}

class CascadeValueParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.cascadeValue) {
      if (this._param.dataType) {
        this._result[this._param.name] = this.getParameter(
          this._param.dataType,
          this._model.cascadeValue[this._param.valueName],
        );
      } else {
        this._result[this._param.name] = this._model.cascadeValue[this._param.valueName];
      }
    }
    return this._result;
  }
}

class ReturnValueParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.returnValue) {
      this._result[this._param.name] = this._model.returnValue[this._param.valueName];
    }
    return this._result;
  }
}

class RouterParameter extends BaseParameter implements IParameter {
  constructor(private _result: any, private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.router) {
      if (this._param.dataType) {
        this._model.router.params.subscribe(r => {
          this._result[this._param.name] = this.getParameter(this._param.dataType, r.name);
        });
      } else {
        this._model.router.params.subscribe(r => {
          this._result[this._param.name] = r.name;
        });
      }
    }
    return this._result;
  }
}
