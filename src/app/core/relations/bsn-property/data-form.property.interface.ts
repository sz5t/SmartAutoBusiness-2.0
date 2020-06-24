import { BASE_PROPERTY } from '@core/relations/bsn-property/base-property';

export interface IDataFormProperty {
    FORM_VALUE: any;
    FORM_STATE:any;
    FORM_VALID:any;
    INIT_VALUE: any;
    TEMP_VALUE: any;
}

// tslint:disable-next-line: one-variable-per-declaration
export const CN_DATA_FORM_PROPERTY: IDataFormProperty = {
    ...BASE_PROPERTY,
    FORM_VALUE: 'FORM_VALUE',
    FORM_STATE: 'FORM_STATE',
    FORM_VALID:'FORM_VALID'
}