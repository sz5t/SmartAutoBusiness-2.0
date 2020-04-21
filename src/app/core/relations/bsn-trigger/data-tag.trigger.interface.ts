
export interface IDataTagTrigger {
    ADD_FORM: string,
    EDIT_FORM: string,
    CANCEL: string,
    EXECUTE: string,
    REFRESH_AS_CHILD: string,
    VALIDATE: string,
    EXECUTE_MODAL: string,
    VALUE_CHANGE: string,
    LINK: string,
    LINK_TO: string,
    ADD_MULTIPLE_NODE: string,
   ADD_SINGLE_NODE:string  
}

/**
 * 表单功能触发器
 */
export const BSN_DATATAG_TRIGGER: IDataTagTrigger = {
    // state
    ADD_FORM: 'ADD_FORM',
    EDIT_FORM: 'EDIT_FORM',
    CANCEL: 'CANCEL',
    EXECUTE: 'EXECUTE',
    REFRESH_AS_CHILD: 'REFRESH_AS_CHILD',
    VALIDATE: 'VALIDATE',
    EXECUTE_MODAL: 'EXECUTE_MODAL',
    VALUE_CHANGE: 'VALUE_CHANGE',
    LINK: 'LINK',
    LINK_TO: 'LINK_TO',
    ADD_MULTIPLE_NODE: 'ADD_MULTIPLE_NODE',
    ADD_SINGLE_NODE:'ADD_SINGLE_NODE'
}