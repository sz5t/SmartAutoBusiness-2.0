
import { IDataFormTrigger } from '@core/relations/bsn-trigger/data-form.trigger.interface';

export const CN_DATA_FORM_METHOD: IDataFormTrigger = {
    // state
    ADD_FORM: 'addForm',
    EDIT_FORM: 'editForm',
    CANCEL: 'cancel',
    EXECUTE: 'execute',
    REFRESH_AS_CHILD: 'load',
    VALIDATE: 'validate',
    EXECUTE_MODAL: 'executeModal',
    VALUE_CHANGE: 'valueChange',
    MESSAGE: 'showMessage',
    WINDOW: 'showWindow',
    // link
    LINK: 'link',
    LINK_TO: 'linkTo'
}