import { LayoutTab } from './layout.tabs';
import { ILayout } from './layout.base';
import { LayoutRow } from './layout.row';
import { LayoutCustom } from './layout.custom';

export interface ILayout {
    add(child: any);
    delete(child: any);
    edit(child: any);
}

export class LayoutSize {
    nzXs?: number;
    nzSm?: number;
    nzMd?: number;
    nzLg?: number;
    nzXXL?: number;
    constructor({ nzXs, nzSm, nzMd, nzLg, nzXXL }) {
        this.nzXs = nzXs;
        this.nzSm = nzSm;
        this.nzMd = nzMd;
        this.nzLg = nzLg;
        this.nzXXL = nzXXL;

    }
}

export class LayoutBase implements ILayout {
    private _id: string;
    private _type: string;
    private _container: string;
    private _title: string;
    private _noBorder: boolean;
    private _span: number;
    private _size: LayoutSize;
    private _hidden: boolean;
    private _layout: any;
    private _layoutType: string;
    private _rows: LayoutRow[];
    private _tabs: LayoutRow[];
    private _customLayout: any[];
    private _bodyStyle: any;
    public get bodyStyle(): any {
        return this._bodyStyle;
    }
    public set bodyStyle(value: any) {
        this._bodyStyle = value;
    }

    public get noBorder(): boolean {
        return this._noBorder;
    }
    public set noBorder(value: boolean) {
        this._noBorder = value;
    }

    public get customLayout(): any[] {
        return this._customLayout;
    }
    public set customLayout(value: any[]) {
        this._customLayout = value;
    }
    public get tabs(): LayoutRow[] {
        return this._tabs ? this._tabs : [];
    }
    public set tabs(value: LayoutRow[]) {
        this._tabs = value;
    }
    public get rows(): LayoutRow[] {
        return this._rows ? this._rows : [];
    }
    public set rows(value: LayoutRow[]) {
        this._rows = value;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }

    public get container(): string {
        return this._container;
    }
    public set container(value: string) {
        this._container = value;
    }

    public get layoutType(): string {
        return this._layoutType;
    }
    public set layoutType(value: string) {
        this._layoutType = value;
    }

    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    public get span(): number {
        return this._span;
    }
    public set span(value: number) {
        this._span = value;
    }

    public get hidden(): boolean {
        return this._hidden;
    }
    public set hidden(value: boolean) {
        this._hidden = value;
    }

    public get size(): LayoutSize {
        return this._size;
    }
    public set size(value: LayoutSize) {
        this._size = value;
    }

    public get layout(): LayoutBase {
        return this._layout;
    }
    public set layout(value: LayoutBase) {
        this._layout = value;
    }

    public add(row: any) {
        switch (this.container) {
            case 'rows':
                this.rows.push(row as LayoutRow);
                break;
            case 'tabs':
                this.tabs.push(row as LayoutRow);
                break;
            case 'customLayout':
                this.customLayout.push(row as LayoutRow);
                break;
        }
        // this.rows.push(row);
    }
    delete(row: any) {
        throw new Error("Method not implemented.");
    }
    edit(row: any) {
        throw new Error("Method not implemented.");
    }

}