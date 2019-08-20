import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';


export class CustomValidator {

    static repeat(_config?) {
        return (control: FormControl): { [s: string]: boolean } => {
            console.log('校验配置==》》》', _config);
            const ss = _config.data.value;
            //  根据配置，取值，做其他操作， 远程校验
            if (!control.value) {
                return { error: true, required: true };
            } else if (control.value === ss) {
                return { repeat: true };
            }
            return {};
        };
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