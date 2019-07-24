
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
