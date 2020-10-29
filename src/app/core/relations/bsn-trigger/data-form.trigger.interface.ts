
export interface IDataFormTrigger {
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
    MESSAGE: string,
    WINDOW: string,
    TRANSFER_VALUE:string,
    FORM_STATE_SWITCH:string,
    LOAD_REFRESH_DATA:string,
    EXECUTE_POPUP_CLOSE:string
}

/**
 * 表单功能触发器
 */
export const BSN_DATAFORM_TRIGGER: IDataFormTrigger = {
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
    MESSAGE:'MESSAGE',
    WINDOW: 'WINDOW',
    TRANSFER_VALUE:'TRANSFER_VALUE' ,
    FORM_STATE_SWITCH:'FORM_STATE_SWITCH',
    LOAD_REFRESH_DATA:'LOAD_REFRESH_DATA',
    EXECUTE_POPUP_CLOSE:'EXECUTE_POPUP_CLOSE'
}