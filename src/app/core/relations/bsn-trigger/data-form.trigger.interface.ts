
export interface IDataFormTrigger {
    ADD_FORM: string,
    EDIT_FORM: string,
    CANCEL: string,
    EXECUTE : string
}

/**
 * 表单功能触发器
 */
export const BSN_DATAGRID_TRIGGER: IDataFormTrigger = {
    // state
    ADD_FORM: 'ADD_FORM',
    EDIT_FORM: 'EDIT_FORM',
    CANCEL: 'CANCEL',
    EXECUTE:'EXECUTE'
}