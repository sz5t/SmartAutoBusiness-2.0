import { ITreeGridTrigger } from '../bsn-trigger/tree-grid.trigger.interface';


export const CN_TREE_GRID_METHOD: ITreeGridTrigger = {
    // state
    ADD_ROOT_ROW: 'addRootRow',
    ADD_CHILD_ROW: 'addChildRow',
    EDIT_ROW: 'editRow',
    EDIT_ROWS: 'editRows',
    CANCEL_NEW_ROW: 'cancelNewRow',
    CANCEL_NEW_ROWS: 'cancelNewRows',
    CANCEL_EDIT_ROW: 'cancelEditRow',
    CANCEL_EDIT_ROWS: 'cancelEditRows',
    SEARCH_ROW: 'searchRow',
    CANCEL_SEARCH_ROW: 'cancelSearchRow',
    CHANGE_ADDED_ROWS_TO_TEXT: 'changeAddedRowsToText',
    CHANGE_EDITED_ROWS_TO_TEXT: 'changeEditedRowsToText',
    SHOW_INVALIDATE_ADDED_ROWS: 'showInvalidateAddedRows',
    SHOW_INVALIDATE_EDITED_ROWS: 'showInvalidateEditedRows',
    // action
    DIALOG: 'showDialog',
    WINDOW: 'showWindow',
    UPLOAD: 'showUpload',
    DIALOG_BATCH: 'showBatchDialog',
    CONFIRM: 'showConfirm',
    LAYOUT_DIALOG: 'showLayoutDialog',
    MESSAGE: 'showMessage',
    LOAD_REFRESH_DATA: 'loadRefreshData',
    LOAD_REFRESH_CHILDREN_DATA: 'loadRefreshChildrenData',



    // behavior
    REFRESH: 'load',
    HIDDEN: 'hidden',
    SHOW: 'show',
    EXPORT: 'export',
    IMPORT: 'import',
    DOWNLOAD: 'download',
    SELECT_ROW: 'selectRow',
    SET_SELECT_ROW: 'setSelectRow',
    CHECK_ROW: 'checkRow',
    REFRESH_AS_CHILD: 'load',
    REPLACE_ROW_DATA: 'replaceRowData',

    // link
    LINK: 'link',
    LINK_TO: 'linkTo',

    // operation
    SAVE_ROW: 'saveRow',
    SAVE_ROWS: 'saveRows',
    DELETE_CURRENT_ROW: 'deleteCurrentRow',
    EXECUTE_CURRENT_ROW: 'executeCurrentRow',
    EXECUTE_SELECTED_ROW: 'executeSelectRow',
    EXECUTE_CHECKED_ROWS: 'executeCheckedRows',
    EXECUTE_CHECKED_ROWS_IDS: 'executeCheckedRowsIds',
    DELETE_CHECKED_ROWS: 'deleteCheckedRows'
}