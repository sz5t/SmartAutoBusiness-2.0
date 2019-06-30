import { LayoutBase, ILayout } from './layout.base';
export class LayoutColumn extends LayoutBase implements ILayout {
    private _cols: LayoutBase[];
    public get cols(): LayoutBase[] {
        return this._cols ? this._cols : [];
    }
    public set cols(value: LayoutBase[]) {
        this._cols = value;
    }

    add(col: LayoutBase): LayoutColumn {
        // 向布局添加列组件
        this.cols.push(col);
        return this;
    }
    delete(col: LayoutBase): LayoutColumn {
        return this;
    }
    edit(col: LayoutBase): LayoutColumn {
        return this;
    }
}