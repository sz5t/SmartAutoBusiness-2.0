import { IReportGridTrigger } from '../bsn-trigger/report-grid.trigger.interface';

export const CN_REPORTGRID_METHOD: IReportGridTrigger = {
    // state
    REFRESH_AS_CHILD: 'load',
    REFRESH_CONTAINE:'switchContaineload',
    VALIDATE: 'validate',
    EXECUTE_MODAL: 'executeModal',
    VALUE_CHANGE: 'valueChange',
    MESSAGE: 'showMessage',
    WINDOW: 'showWindow',
    TRANSFER_VALUE:'transferValue',
    // link
    LINK: 'link',
    LINK_TO: 'linkTo' 
}