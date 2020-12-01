import { BASE_PROPERTY } from '@core/relations/bsn-property/base-property';

export interface IReportGridProperty {
   
    INIT_VALUE: any;
    TEMP_VALUE: any;
}

// tslint:disable-next-line: one-variable-per-declaration
export const CN_REPORTGRID_PROPERTY: IReportGridProperty = {
    ...BASE_PROPERTY
}