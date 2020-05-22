
export interface ITreeGridProperty {
    ROWS_ADDED: any;
    ROWS_EDITED: any;
    ROW_SELECTED: any;
    ROWS_CHECKED: any;
    COMPONENT_VALUE: any;
    ROW_CURRENT:any; 

}

// tslint:disable-next-line: one-variable-per-declaration
export const CN_TREE_GRID_PROPERTY: ITreeGridProperty = {
    ROWS_ADDED: 'ROWS_ADDED',
    ROWS_EDITED: 'ROWS_EDITED',
    ROW_SELECTED: 'ROW_SELECTED',
    ROWS_CHECKED: 'ROWS_CHECKED',
    COMPONENT_VALUE: 'COMPONENT_VALUE',
    ROW_CURRENT:'ROW_CURRENT'
}