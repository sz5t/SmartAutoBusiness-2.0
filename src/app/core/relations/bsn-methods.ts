import { IDataGridTrigger } from './bsn-trigger/data-grid.trigger.interface';

export const CN_DATA_GRID_METHOD: IDataGridTrigger = {
    // state
    ADD_ROW: 'addRow',
    ADD_CHILD_ROW: 'addChildRow',
    EDIT_ROW: 'editRow',
    DELETE_ROW: 'deleteRow',
    CANCEL: 'cancelRow',
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
    EXECUTE_SELECTED_ROW: 'executeSelectRow',
    EXECUTE_CHECKED_ROWS: 'executeCheckedRows',
    EXECUTE_CHECKED_ROWS_IDS: 'executeCheckedRowsIds'
}