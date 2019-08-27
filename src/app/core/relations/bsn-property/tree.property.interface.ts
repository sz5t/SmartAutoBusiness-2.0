export interface ITreeProperty {
    NODES_ADDED: any;
    NODES_EDITED: any;
    NODE_SELECTED: any;
    NODES_CHECKED: any;
    COMPONENT_VALUE: any;

}

// tslint:disable-next-line: one-variable-per-declaration
export const CN_TREE_PROPERTY: ITreeProperty = {
    NODES_ADDED: 'NODES_ADDED',
    NODES_EDITED: 'NODES_EDITED',
    NODE_SELECTED: 'NODE_SELECTED',
    NODES_CHECKED: 'NODES_CHECKED',
    COMPONENT_VALUE: 'COMPONENT_VALUE'
}