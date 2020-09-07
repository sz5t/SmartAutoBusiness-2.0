
import { IDataTagTrigger } from '@core/relations/bsn-trigger/data-tag.trigger.interface';

export const CN_DATA_TAG_METHOD: IDataTagTrigger = {
    // state
    ADD_FORM: 'addForm',
    EDIT_FORM: 'editForm',
    CANCEL: 'cancel',
    EXECUTE: 'execute',
    REFRESH_AS_CHILD: 'load',
    VALIDATE: 'validate',
    EXECUTE_MODAL: 'executeModal',
    VALUE_CHANGE: 'valueChange',
    LOAD_REFRESH_DATA:'load',

    // link
    LINK: 'link',
    LINK_TO: 'linkTo',

   ADD_MULTIPLE_NODE: 'addMultipleNode',
   ADD_SINGLE_NODE:'addSingleNode'
}