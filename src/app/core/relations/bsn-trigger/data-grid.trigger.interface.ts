
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
    SET_SELECT_ROW: string,

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
    // state
    ADD_ROW: 'ADD_ROW',
    ADD_CHILD_ROW: 'ADD_CHILD_ROW',
    EDIT_ROW: 'EDIT_ROW',
    CANCEL: 'CANCEL',
    SEARCH_ROW: 'SEARCH_ROW',
    CANCEL_SEARCH_ROW: 'CANCEL_SEARCH_ROW',

    // action
    DIALOG: 'DIALOG',
    WINDOW: 'WINDOW',
    UPLOAD: 'UPLOAD',
    DIALOG_BATCH: 'DIALOG_BATCH',

    // behavior
    REFRESH: 'REFRESH',
    REFRESH_AS_CHILD: 'REFRESH_AS_CHILD',
    HIDDEN: 'HIDDEN',
    SHOW: 'SHOW',
    EXPORT: 'EXPORT',
    IMPORT: 'IMPORT',
    DOWNLOAD: 'DOWNLOAD',
    SELECT_ROW: 'SELECT_ROW',
    SET_SELECT_ROW: 'SET_SELECT_ROW',
    CHECK_ROW: 'CHECK_ROW',

    LINK: 'LINK',
    LINK_TO: 'LINK_TO',

    // operation
    SAVE_ROW: 'SAVE_ROW',
    DELETE_ROW: 'DELETE_ROW',
    EXECUTE_SELECTED_ROW: 'EXECUTE_SELECTED_ROW',
    EXECUTE_CHECKED_ROWS: 'EXECUTE_CHECKED_ROWS',
    EXECUTE_CHECKED_ROWS_IDS: 'EXECUTE_CHECKED_ROWS_IDS'
}