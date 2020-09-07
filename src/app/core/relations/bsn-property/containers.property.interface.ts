import { BASE_PROPERTY } from '@core/relations/bsn-property/base-property';

export interface IContainersProperty {
   
    INIT_VALUE: any;
    TEMP_VALUE: any;
}

// tslint:disable-next-line: one-variable-per-declaration
export const CN_CONTAINERS_PROPERTY: IContainersProperty = {
    ...BASE_PROPERTY
}