import { CommonUtils } from '@core/utils/common-utils';

export class PageStructure {

    constructor() {

    }

    nodes = [];
    ts_new = [];
    tsc_new = [];
    page_config: any;
    page_id: any;

    public getPageStructure() {

        if (!this.page_config) {
            return true;
        }
        this.ts_new = [];
        this.tsc_new = [];
        this.jxlayout(this.page_config['layoutJson'], null);
        this.jxcomponent(this.page_config['componentsJson']);

        this.tsc_new.forEach(n => {
            n.hasOwnProperty('toolbar');
            n['toolbar'].forEach(element => {
                element['title'] = element['text'];
            });
            n['columns'].forEach(element => {
                if(element['field']){
                    element['title'] = element['title'] +'_【'+ element['field']+'】_'+element['container'];;
                }
              
            });
            this.ts_new = [...this.ts_new, ...n['toolbar'], ...n['columns']];
        });


        const _node_parameter = CommonUtils.deepCopy(this.ts_new);
        this.nodes = this.listToTree(_node_parameter);
        console.log('文本', JSON.stringify(this.ts_new));
        console.log('当前页面结构[数组]', this.ts_new, this.tsc_new);
        console.log('当前页面结构树', this.nodes);
    }

    public jxlayout(layoutconfig?, parentid?) {
        // console.log('xxx:',layoutconfig);
        // "header": {
        //     "title": "功能分类",
        //     "icon": "",
        //     "id": "button_01"
        // },
        if (layoutconfig instanceof Array) { // 数组
            layoutconfig.forEach(item => {
                if (item.hasOwnProperty('container')) {

                    this.ts_new.push({ id: item['id'], type: item['type'], title: item['title'], parentId: parentid, container: item['container'] });
                    if (item.hasOwnProperty('header') && item['header']['id']) {
                        this.ts_new.push({ id: item['header']['id'], type: 'cnToolbar', title: item['header']['title'], parentId: item['id'], container: 'cnToolbar' });
                    }
                    if (item['container'] !== '')
                        this.jxlayout(item[item['container']], item['id']);
                }
            });
        }
        else {
            // 第一步判断是否存在container
            if (layoutconfig.hasOwnProperty('container')) {
                // 下一层布局
                if (layoutconfig['container'] === 'pageHeader') {
                    layoutconfig['pageHeader']['container'] = 'layout';
                    layoutconfig['pageHeader']['type'] = 'pageHeader';
                }

                this.ts_new.push({ id: layoutconfig['id'], type: layoutconfig['type'], title: layoutconfig['title'], parentId: parentid, container: layoutconfig['container'] });
                if (layoutconfig['container'] !== '' && layoutconfig[layoutconfig['container']])
                    this.jxlayout(layoutconfig[layoutconfig['container']], layoutconfig['id']);
            }
        }




    }


    // 解析组件信息
    public jxcomponent(componentconfig) {

        if (componentconfig instanceof Array) {
            componentconfig.forEach(item => {
                this.jxcomponent(item);
            });
        } else {

            let _toolbar = [];
            let _columns = [];
            if (componentconfig['component'] === 'cnToolbar') {
                const _base_button = {};
                _base_button['id'] = componentconfig['id'] + '_' + 'option';
                _base_button['text'] = '操作';
                _base_button['type'] = 'option';
                _base_button['parentId'] = componentconfig['id'];

                _toolbar = this.jxtoolbar(componentconfig, _base_button['id']);
                _toolbar = [...[_base_button], ..._toolbar];
            }
            if (componentconfig['component'] === 'cnDataTable') {

                _columns = this.jxtable(componentconfig, componentconfig['id']);

            }
            this.tsc_new.push({ id: componentconfig['id'], type: 'component', title: componentconfig['title'], parentId: null, container: componentconfig['component'], toolbar: _toolbar, columns: _columns });


        }


    }

    // 解析操作
    public jxtoolbar(toolbarconfig, parent_id?) {

        let _button_list = [];
        if (toolbarconfig && toolbarconfig['toolbar']) {

            const _toolbar = toolbarconfig['toolbar'];

            if (_toolbar && Array.isArray(_toolbar)) {
                _toolbar.forEach(item => {
                    if (item.group) {

                        let targetViewId = item['targetViewId'];
                        item.group.forEach(g => {
                            if (g.dropdown) {
                                if (!g['id']) {
                                    g['id'] = CommonUtils.uuID(36);
                                }
                                const dropdown_button = {};
                                dropdown_button['id'] = g['id'];
                                dropdown_button['text'] = g['text'];
                                dropdown_button['targetViewId'] = targetViewId;
                                dropdown_button['parentId'] = parent_id;
                                dropdown_button['type'] = 'dropdown';
                                _button_list.push(dropdown_button);

                                g.dropdown.forEach(b => {
                                    b['targetViewId'] = targetViewId;
                                    b['parentId'] = g['id'];
                                    b['type'] = 'button';
                                    if(b['execute']){
                                        delete b['execute'];
                                    }
                                    _button_list.push(b);
                                });
                            } else {
                                g['targetViewId'] = targetViewId;
                                g['parentId'] = parent_id;
                                g['type'] = 'button';
                                if(g['execute']){
                                    delete g['execute'];
                                }
                                _button_list.push(g);
                            }
                        });
                    } else if (item.dropdown) {
                        let targetViewId = item['targetViewId'];
                        if (!item['id']) {
                            item['id'] = CommonUtils.uuID(36);
                        }
                        const dropdown_button = {};
                        dropdown_button['id'] = item['id'];
                        dropdown_button['text'] = item['text'];
                        dropdown_button['targetViewId'] = targetViewId;
                        dropdown_button['parentId'] = parent_id;
                        dropdown_button['type'] = 'dropdown';
                        _button_list.push(dropdown_button);
                        item.dropdown.forEach(b => {
                            b['targetViewId'] = targetViewId;
                            b['parentId'] = item['id'];
                            b['type'] = 'button';
                            if(b['execute']){
                                delete b['execute'];
                            }
                            _button_list.push(b);
                        });
                    }
                });
            }
            // console.log('按钮统计', _button_list);

        }
        return _button_list;


    }


    // 解析表格类型
    public jxtable(componentconfig, parent_id) {

        // columns
        // "title": "布局名称",
        // "type": "field",
        // "field": "NAME",
        // "hidden": false,
        // "editor": {
        //   "type": "input",
        //   "field": "descName"
        // }

        // 文本，编辑  两种状态

        // feild:'', title:'',
        if (!componentconfig['columns']) {
            return null;
        }
        let columns = [];
        const columns_id = CommonUtils.uuID(36);
        const text_id = CommonUtils.uuID(36);
        const editor_id = CommonUtils.uuID(36);

        const columns_state = [
            { id: columns_id, type: 'columns', title: '字段信息', parentId: parent_id, container: 'columns' },
            { id: text_id, type: 'state', title: '文本状态', parentId: columns_id, container: 'text' },
            { id: editor_id, type: 'state', title: '编辑状态', parentId: columns_id, container: 'editor' }
        ];

        let text_columns = [];
        let edit_columns = [];

        componentconfig['columns'].forEach(element => {

            if (element['type'] === 'field') {
                text_columns.push({ field:element['field'], id: element['field'] + '_' + 'text' + '_' + CommonUtils.uuID(36), type: element['type'], title: element['title'], parentId: text_id, container: 'text' });
                if (element.hasOwnProperty('editor')) {
                    edit_columns.push({ field:element['editor']['field'],id: element['editor']['field'] + '_' + 'editor' + '_' + CommonUtils.uuID(36), type: element['type'], title: element['title'], parentId: editor_id, container: 'editor' });

                } else {
                    edit_columns.push({field:element['field'], id: element['field'] + '_' + 'editor_text' + '_' + CommonUtils.uuID(36), type: element['type'], title: element['title'], parentId: editor_id, container: 'editor_text' });
                }
            }


        });

        columns = [...columns_state, ...text_columns, ...edit_columns];

        console.log('表格字段分析', columns);
        return columns;


    }

    // 行内操作
    jxrowActions(config?,actionId?){
        config.rowActions.find(action => actionId === action.id);
    }


    public listToTree(oldArr) {
        oldArr.forEach(element => {
            element['key'] = element['id'];
            let structureName = '[组件]';
            switch (element['type']) {
                case "pageHeader":
                    structureName = "[布局]";
                    break;
                case "layout":
                    structureName = "[布局]";
                    break;
                case "row":
                    structureName = "[布局]";
                    break;
                case "col":
                    structureName = "[布局]";
                    break;
                case "tabs":
                    structureName = "[布局组件]";
                    break;
                case "option":
                    structureName = "[操作]";
                case "columns":
                    structureName = "[字段信息]";
                case "state":
                    structureName = "[状态]";
                case "column":
                    structureName = "[字段]";
                case "field":
                    structureName = "[字段]";
                    break;
                case "button":
                    structureName = "[按钮]";
                    break;
                case "dropdown":
                    structureName = "[下拉按钮]";
                    break;

                default:
                    break;

            }
            element['title'] = element['title'] + '_' + element['type'] + structureName;
            element['expanded'] = true;
            element['isLeaf'] = true;

            let parentId = element.parentId;
            if (parentId) { // 不等于根节点标识
                oldArr.forEach(ele => {
                    if (ele.id == parentId) { //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
                        if (!ele.children) {
                            ele.children = [];
                        }
                        ele['isLeaf'] = false;
                        ele.children.push(element);
                    }
                });
            }
        });
        // console.log(oldArr) //此时的数组是在原基础上补充了children;
        oldArr = oldArr.filter(ele => ele.parentId === null); //这一步是过滤，按树展开，将多余的数组剔除；
        //  console.log(oldArr)
        return oldArr;
    }


}