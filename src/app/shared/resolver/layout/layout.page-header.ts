import { LayoutBase, ILayout } from './layout.base';


export class LayoutPageHeader extends LayoutBase implements ILayout {
    // private _title: string;
    private _subTitle: string;
    public get subTitle(): string {
        return this._subTitle;
    }
    public set subTitle(value: string) {
        this._subTitle = value;
    }
    private _tagColor: string;
    public get tagColor(): string {
        return this._tagColor;
    }
    public set tagColor(value: string) {
        this._tagColor = value;
    }
    private _tagText: string;
    public get tagText(): string {
        return this._tagText;
    }
    public set tagText(value: string) {
        this._tagText = value;
    }
    private _descColumnsCount: number;
    public get descColumnsCount(): number {
        return this._descColumnsCount;
    }
    public set descColumnsCount(value: number) {
        this._descColumnsCount = value;
    }
    private _operations: any[];
    public get operations(): any[] {
        return this._operations;
    }
    public set operations(value: any[]) {
        this._operations = value;
    }

    private _ajaxConfig: any[];
    public get ajaxConfig(): any[] {
        return this._ajaxConfig;
    }
    public set ajaxConfig(value: any[]) {
        this._ajaxConfig = value;
    }
    private _cascade: any;
    public get cascade(): any {
        return this._cascade;
    }
    public set cascade(value: any) {
        this._cascade = value;
    }

    private _headerMapping;
    public get headerMapping() {
        return this._headerMapping;
    }
    public set headerMapping(value) {
        this._headerMapping = value;
    }

    private _contentMapping;
    public get contentMapping() {
        return this._contentMapping;
    }
    public set contentMapping(value) {
        this._contentMapping = value;
    }

    private _footMapping;
    public get footMapping() {
        return this._footMapping;
    }
    public set footMapping(value) {
        this._footMapping = value;
    }

    private _extraMapping;
    public get extraMapping() {
        return this._extraMapping;
    }
    public set extraMapping(value) {
        this._extraMapping = value;
    }

    private _contentItems;
    public get contentItems() {
        return this._contentItems;
    }
    public set contentItems(value) {
        this._contentItems = value;
    }

    private _extraItems;
    public get extraItems() {
        return this._extraItems;
    }
    public set extraItems(value) {
        this._extraItems = value;
    }

    private _defaultLoading;
    public get defaultLoading() {
        return this._defaultLoading;
    }
    public set defaultLoading(value) {
        this._defaultLoading = value;
    }

    private _initLoading;
    public get initLoading() {
        return this._initLoading;
    }
    public set initLoading(value) {
        this._initLoading = value;
    }
    // private _layout: any;

}