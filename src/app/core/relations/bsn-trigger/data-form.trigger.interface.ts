
export interface IDataFormTrigger {
    ADD_FORM: string,
    EDIT_FORM: string,
    CANCEL: string,
    EXECUTE : string,
    REFRESH_AS_CHILD:string,
    VALIDATE:string,
}

/**
 * 表单功能触发器
 */
export const BSN_DATAGRID_TRIGGER: IDataFormTrigger = {
    // state
    ADD_FORM: 'ADD_FORM',
    EDIT_FORM: 'EDIT_FORM',
    CANCEL: 'CANCEL',
    EXECUTE:'EXECUTE',
    REFRESH_AS_CHILD :'REFRESH_AS_CHILD',
    VALIDATE:'VALIDATE'
}