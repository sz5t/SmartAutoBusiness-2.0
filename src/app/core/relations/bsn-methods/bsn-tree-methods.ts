import { ITreeTrigger } from '../bsn-trigger/tree.trigger.interface';

export const CN_TREE_METHOD: ITreeTrigger = {
    // state
    ADD_ROW: 'addRow',
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
    MESSAGE: 'showMessage',
    LOAD_REFRESH_DATA: 'loadRefreshData',
    APPEND_CHILD_TO_SELECTED_NODE: 'appendChildToSelectedNode',
    APPEND_CHILDS_TO_SELECTED_NODE:'appendChildsToSelectedNode',
    APPEND_CHILD_TO_ROOT_NODE: 'appendChildToRootNode',
    UPDATE_SELECTED_NODE: 'updateSelectedNode',
    DELETE_SELECTED_NODE: 'deleteSelectedNode',
    DELETE_CHECKED_NODES: 'deleteCheckedNodes',
    ANALYSIS_BUILTIN:'analysisBuiltin',
    CHANGE_CHECKED_NODE_DATA:'changeCheckedNodeData',


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
    CLICK_NODE: 'clickNode',
    TRANSFER_VALUE:'transferValue',

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
    EXECUTE_SELECTED_NODE: 'executeSelectedNode',
    EXECUTE_CHECKED_NODES: 'executeCheckedNodes',
    EXECUTE_CHECKED_NODES_BY_ID: 'executeCheckedNodesByID',       
    EXECUTE_DELETE_CHECKED_NODES_BY_ID: 'executeDeleteCheckedNodesByID',
    EXECUTE_POPUP_CLOSE: 'executePopupClose',
    EXECUTE_CHECKED_TREEDATA_BY_STRING:'executeCheckedTreeDataByString',
    EXECUTE_TREEDATA_BY_STRING:'executeTreeDataByString'
}