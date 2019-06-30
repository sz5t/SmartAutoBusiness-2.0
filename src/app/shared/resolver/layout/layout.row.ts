import { LayoutBase, ILayout } from './layout.base';
import { LayoutColumn } from './layout.column';
export class LayoutRow extends LayoutBase {
    constructor(
        _id: string,
        _type: string,
        _title: string
    ) {
        super();
        this.id = _id;
        this.type = _type;
        this.title = _title
    }
    private _cols: LayoutColumn[];
    public get cols() {
        return this._cols ? this._cols : [];
    }

    public set cols(value) {
        this._cols = value;
    }

    public add(col: any) {
        this.cols.push(col as LayoutColumn);
    }

    public delete(row: any) {

    }

    public edit(row: any) {

    }


}