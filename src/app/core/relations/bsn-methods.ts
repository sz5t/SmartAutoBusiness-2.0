import { IDataGridTrigger } from './bsn-trigger/data-grid.trigger.interface';
import { IToolbarTrigger } from './bsn-trigger/toolbar.trigger.interface';

export const CN_DATA_GRID_METHOD: IDataGridTrigger = {
    // state
    ADD_ROW: 'addRow',
    ADD_CHILD_ROW: 'addChildRow',
    EDIT_ROW: 'editRow',
    EDIT_ROWS: 'editRows',
    DELETE_ROW: 'deleteRow',
    CANCEL_NEW_ROW: 'cancelNewRow',
    CANCEL_NEW_ROWS: 'cancelNewRows',
    CANCEL_EDIT_ROW: 'cancelEditRow',
    CANCEL_EDIT_ROWS: 'cancelEditRows',
    SEARCH_ROW: 'searchRow',
    CANCEL_SEARCH_ROW: 'cancelSearchRow',

    // action
    DIALOG: 'showDialog',
    WINDOW: 'showWindow',
    UPLOAD: 'showUpload',
    DIALOG_BATCH: 'showBatchDialog',

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

    // link
    LINK: 'link',
    LINK_TO: 'linkTo',

    // operation
    SAVE_ROW: 'saveRow',
    SAVE_ROWS: 'saveRows',
    EXECUTE_SELECTED_ROW: 'executeSelectRow',
    EXECUTE_CHECKED_ROWS: 'executeCheckedRows',
    EXECUTE_CHECKED_ROWS_IDS: 'executeCheckedRowsIds'
}

export const CN_TOOLBAR_METHOD: IToolbarTrigger = {
    STATE_TO_TEXT: 'stateToText',
    STATE_TO_EDIT: 'stateToEdit',
    EXECUTE_NONE: 'executeNone',
    EXECUTE_NONE_EDIT: 'executeNoneEdit'
}