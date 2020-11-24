import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';


export class CustomValidator {

    /**
     * 重复校验
     * @param _config 
     */
    static repeat(_config?) {
        return (control: FormControl): { [s: string]: boolean } => {
            // console.log('校验配置[重复]==》》》', _config, control);
            let comValue;
            if (_config.data) {
                if (_config.data['type'] === 'componentValue') {
                    let formObj = control['_parent'];
                    if (formObj) {
                        if (_config.data['valueName']) {
                            comValue = formObj['value'][_config.data['valueName']];
                        } else {
                            comValue = null;
                        }

                    } else {
                        comValue = null;
                    }
                } else {
                    if (_config.data.hasOwnProperty('value')) {
                        comValue = _config.data.value;
                    } else {
                        comValue = null;
                    }
                }

            } else {
                return {};
            }
            //  根据配置，取值，做其他操作， 远程校验
            if (!control.value) {
                return { error: true, required: true };
            } else if (control.value === comValue) {
                return { repeat: true };
            }
            return {};
        };
    }

    /**
     * 一致校验
     * @param _config 
     */
    static confirmCompare(_config?) {
        return (control: FormControl): { [s: string]: boolean } => {
            // console.log('校验配置[确认比较]==》》》', _config, control);
            let comValue;
            if (_config.data) {
                if (_config.data['type'] === 'componentValue') {
                    let formObj = control['_parent'];
                    if (formObj) {
                        if (_config.data['valueName']) {
                            comValue = formObj['value'][_config.data['valueName']];
                        } else {
                            comValue = null;
                        }

                    } else {
                        comValue = null;
                    }
                } else {
                    if (_config.data.hasOwnProperty('value')) {
                        comValue = _config.data.value;
                    } else {
                        comValue = null;
                    }
                }

            } else {
                return {};
            }

            // console.log('=====>====>', comValue)
            //  根据配置，取值，做其他操作， 远程校验
            if (!control.value) {
                return { error: true, required: true };
            } else if (control.value !== comValue) {
                return { confirmCompare: true };
            }
            return {};
        };
    }

    /**
     * 复杂度
     * @param _config 
     */
    static complexity(_config?) {
        return (control: FormControl): { [s: string]: boolean } => {
            // console.log('校验配置[确认比较]==》》》', _config, control);
            let comValue;
            if (_config.data) {
                if (_config.data['type'] === 'regular') {

                    if (_config.data.hasOwnProperty('regularContent')) {
                        comValue = _config.data['regularContent'];
                    }

                } else {
                    return {};
                }

            } else {
                return {};
            }
            //  根据配置，取值，做其他操作， 远程校验
            if (!control.value) {
                return { error: true, required: true };
            } else {
                if (this.ComplexityRegular(control.value, comValue)) {

                    return { complexity: true };
                } else {
                    return {};
                }

            }
            return {};
        };
    }

    /**
     * 最小长度
     * @param _config 
     */
    static minLength(_config?) {
        return (control: FormControl): { [s: string]: boolean } => {
            // console.log('校验配置[确认比较]==》》》', _config, control);
            let comValue;
            if (_config.hasOwnProperty['length']) {
                comValue = _config['length'];

            } else {
                return {};
            }

            // console.log('=====>====>', comValue)
            //  根据配置，取值，做其他操作， 远程校验
            if (!control.value) {
                return { error: true, required: true };
            } else if (control.value.length < comValue) {
                return { minLength: true };
            }
            return {};
        };
    }

    /**
     * 最大长度
     * @param _config 
     */
    static maxLength(_config?) {
        return (control: FormControl): { [s: string]: boolean } => {
            // console.log('校验配置[确认比较]==》》》', _config, control);
            let comValue;
            if (_config.hasOwnProperty['length']) {
                comValue = _config['length'];

            } else {
                return {};
            }

            // console.log('=====>====>', comValue)
            //  根据配置，取值，做其他操作， 远程校验
            if (!control.value) {
                return { error: true, required: true };
            } else if (control.value.length > comValue) {
                return { maxLength: true };
            }
            return {};
        };
    }

    /**
     * 远程校验
     * @param _config 
     * @param that 
     */
    static remote(_config?, that?) {

        return (control: FormControl) =>
            new Observable((observer: Observer<ValidationErrors | null>) => {
                setTimeout(async () => {

                    // console.log('校验配置[确认比较]==》》》', _config, control, that);
                    let obj = { "value": control.value, "currentValue": control.value };
                    if (!_config.data.remoteAjaxConfig) {
                        return {};
                    }
                    const backValue = await that.remoteExecute(_config.data.remoteAjaxConfig, obj);
                    // console.log('===remote==>====>', backValue)
                    //  根据配置，取值，做其他操作， 远程校验
                    if (!control.value) {
                    } else if (!backValue) {
                        observer.next({ remote: true });
                    } else {
                        observer.next(null);
                    }
                    observer.complete();
                }, 1000);
            });
    }


    public static ComplexityRegular(value?, regularContent?): boolean {

        let ls = 0;

        let rl = regularContent.length;
        regularContent.forEach(element => {
            const reg1 = new RegExp(element.regular);
            const regularflag = reg1.test(value);
            if (regularflag) {
                ls++;
            }

            // if (value.match(element.regular)) { ls++; }

        });
        // console.log('<<<<<<<<<<<<<ls<<<rl', ls, rl)
        return ls !== rl;
    }






    static validating(_config?) {
        // return (control: FormControl): { [s: string]: boolean } => {
        //     console.log('远程校验配置==》》》', _config);
        //     const ss = _config.data.value;
        //     //  根据配置，取值，做其他操作， 远程校验
        //     if (!control.value) {
        //         return { error: true, required: true };
        //     } else if (control.value === ss) {
        //         return { repeat: true };
        //     }
        //     return {};
        // };

        return (control: FormControl) =>
            new Observable((observer: Observer<ValidationErrors | null>) => {
                setTimeout(() => {
                    const ss = _config.data.value;
                    if (control.value === ss) {
                        // you have to return `{error: true}` to mark it as an error event
                        observer.next({ validating: true });
                    } else {
                        observer.next(null);
                    }
                    observer.complete();
                }, 1000);
            });
    }


}