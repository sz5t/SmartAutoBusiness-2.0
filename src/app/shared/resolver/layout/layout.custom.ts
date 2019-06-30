import { LayoutBase, ILayout } from './layout.base';
import { LayoutColumn } from './layout.column';
export class LayoutCustom extends LayoutBase {
    constructor(
        _id: string,
        _type: string,
        _title: string,
        _layoutType: string
    ) {
        super();
        this.id = _id;
        this.type = _type;
        this.title = _title;
        this.layoutType = _layoutType;
    }
}