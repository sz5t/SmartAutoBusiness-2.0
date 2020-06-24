
import { IUploadTrigger } from '@core/relations/bsn-trigger/upload.trigger.interface';

export const CN_UPLOAD_METHOD: IUploadTrigger = {
    // state
    ADD_FORM: 'addForm',
    EDIT_FORM: 'editForm',
    CANCEL: 'cancel',
    EXECUTE: 'execute',
    REFRESH_AS_CHILD: 'load',
    VALIDATE: 'validate',
    EXECUTE_MODAL: 'executeModal',
    VALUE_CHANGE: 'valueChange',

    // link
    LINK: 'link',
    LINK_TO: 'linkTo',

   ADD_MULTIPLE_NODE: 'addMultipleNode',
   ADD_SINGLE_NODE:'addSingleNode'
}