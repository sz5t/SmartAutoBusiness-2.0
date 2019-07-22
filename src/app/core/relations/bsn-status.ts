
export const API_SERVICE_METHOD = {
    GET: 'doGet',
    POST: 'doPost',
    DELETE: 'doDelete',
    PUT: 'doPut',
    PROC: 'doPost'
}

/**
 * 定义功能触发类型
 */
export const BSN_TRIGGER_TYPE = {
    STATE: 'STATE',
    BEHAVIOR: 'BEHAVIOR',
    ACTION: 'ACTION',
    OPERATION: 'OPERATION',
    LINK: 'LINK'
}

export interface IDataGridTrigger {
    ADD_ROW: string,
    ADD_CHILD_ROW: string,
    EDIT_ROW: string,
    CANCEL: string,
    SEARCH_ROW: string,
    CANCEL_SEARCH_ROW: string,

    DIALOG: string,
    WINDOW: string,
    UPLOAD: string,
    DIALOG_BATCH: string,

    REFRESH: string,
    HIDDEN: string,
    SHOW: string,
    EXPORT: string,
    IMPORT: string,
    DOWNLOAD: string,
    SELECT_ROW: string,
    CHECK_ROW: string,
    REFRESH_AS_CHILD: string

    LINK: string,
    LINK_TO: string,

    SAVE_ROW: string,
    DELETE_ROW: string,
    EXECUTE_SELECTED_ROW: string,
    EXECUTE_CHECKED_ROWS: string,
    EXECUTE_CHECKED_ROWS_IDS: string
}

/**
 * 表格功能触发器
 */
export const BSN_DATAGRID_TRIGGER: IDataGridTrigger = {
    ADD_ROW: 'ADD_ROW',
    ADD_CHILD_ROW: 'ADD_CHILD_ROW',
    EDIT_ROW: 'EDIT_ROW',
    DELETE_ROW: 'DELETE_ROW',
    CANCEL: 'CANCEL',
    SEARCH_ROW: 'SEARCH_ROW',
    CANCEL_SEARCH_ROW: 'CANCEL_SEARCH_ROW',

    DIALOG: 'DIALOG',
    WINDOW: 'WINDOW',
    UPLOAD: 'UPLOAD',
    DIALOG_BATCH: 'DIALOG_BATCH',

    REFRESH: 'REFRESH',
    REFRESH_AS_CHILD: 'REFRESH_AS_CHILD',
    HIDDEN: 'HIDDEN',
    SHOW: 'SHOW',
    EXPORT: 'EXPORT',
    IMPORT: 'IMPORT',
    DOWNLOAD: 'DOWNLOAD',
    SELECT_ROW: 'SELECT_ROW',
    CHECK_ROW: 'CHECK_ROW',

    LINK: 'LINK',
    LINK_TO: 'LINK_TO',

    SAVE_ROW: 'SAVE_ROW',
    EXECUTE_SELECTED_ROW: 'EXECUTE_SELECTED_ROW',
    EXECUTE_CHECKED_ROWS: 'EXECUTE_CHECKED_ROWS',
    EXECUTE_CHECKED_ROWS_IDS: 'EXECUTE_CHECKED_ROWS_IDS'
}

/**
 * 表单功能触发器
 */
export const BSN_FORM_TRIGGER = {
    FORM_NEW: 'FORM_NEW',
    FORM_EDIT: 'FORM_EDIT',
    FORM_LOAD: 'FORM_LOAD',
    FORM_IMPORT_EXCEL: 'FORM_IMPORT_EXCEL'

}

/**
 * 树功能触发器
 */
export const BSN_TREE_TRIGGER = {
    ADD_NODE: 'ADD_NODE',
    EDIT_NODE: 'EDIT_NODE',
    DELETE_NODE: 'DELETE_NODE',
    SAVE_NODE: 'SAVE_NODE',
    EXECUTE_SELECTED_NODE: 'EXECUTE_SELECTED_NODE',
    EXECUTE_CHECKED_NODES: 'EXECUTE_CHECKED_NODES',
    EXECUTE_CHECKED_NDDES_IDS: 'EXECUTE_CHECKED_NDDES_IDS'
}

export class BsnStatus {
}
