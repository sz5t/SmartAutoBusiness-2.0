import { LayoutBase, ILayout } from './layout.base';


export class LayoutTabs extends LayoutBase implements ILayout {
    private _tabContent: LayoutTab[];
    public get tabContent(): LayoutTab[] {
        return this._tabContent;
    }
    public set tabContent(value: LayoutTab[]) {
        this._tabContent = value;
    }
    private _tabActiveMapping;
    public get tabActiveMapping() {
        return this._tabActiveMapping;
    }
    public set tabActiveMapping(value) {
        this._tabActiveMapping = value;
    }

    add(tab: LayoutTab) {
        this._tabContent.push(tab);
    }
    delete(child: LayoutTab) {
        throw new Error("Method not implemented.");
    }
    edit(child: LayoutTab) {
        throw new Error("Method not implemented.");
    }
}

export class LayoutTab extends LayoutBase {

    private _active: boolean;
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }

}