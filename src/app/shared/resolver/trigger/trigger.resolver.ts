import { BsnRelativesMessageModel } from './../../../core/relations/bsn-relatives';
import { BSN_TRIGGER_TYPE } from './../../../core/relations/bsn-status';
import { CN_DATA_GRID_METHOD } from '@core/relations/bsn-methods';
export class GridTrigger {
    constructor(
        private _triggerMsg: BsnRelativesMessageModel,
        private _componentInstance
    ) {

    }
    public resolve() {
        switch (this._triggerMsg.trigger.triggerType) {
            case BSN_TRIGGER_TYPE.STATE:
                this.handleStateType();
                break;
            case BSN_TRIGGER_TYPE.BEHAVIOR:
                this.handleBehaviorType();
                break;
            case BSN_TRIGGER_TYPE.ACTION:
                this.handleActionType();
                break;
            case BSN_TRIGGER_TYPE.OPERATION:
                this.handleOperationType();
                break;
            case BSN_TRIGGER_TYPE.LINK:
                this.handleLinkType();
                break;
        }
    }

    handleStateType() {
        // 前置条件判断

        // 执行组件具体方法
        this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]]();
    }

    handleBehaviorType() {
        // 前置条件判断

        // 该功能不由组件实现
        this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);
    }

    handleOperationType() {
        // 前置条件判断

        // 执行操作, 该功能不由组件实现
        this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);
    }

    handleActionType() {
        // 前置条件判断

        // 该功能不由组件实现
        this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]]();
    }

    handleLinkType() {
        // 前置条件判断

        // 执行跳转功能, 该功能不由组件实现
        this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);
    }
}

export class FormTrigger {
    constructor(private _triggerMsg: any, private _componentInstance) { }
    public resolve() {

    }
}

export class TreeTrigger {
    constructor(private _triggerMsg: any, private _componentInstance) { }
    public resolve() {

    }
}

export class AsyncTreeTrigger {
    constructor(private _triggerMsg: any, private _componentInstance) { }
    public resolve() {

    }
}

export class TreeGridTrigger {
    constructor(private _triggerMsg: any, private _componentInstance) { }
    public resolve() {

    }
}


export class TriggerResolver {
    constructor(private _triggerMsg: any, private _componentInstance: any) {

    }

    public resolve() {
        switch (this._triggerMsg.trigger.triggerType) {
            case BSN_TRIGGER_TYPE.STATE:
                this.handleStateType();
                break;
            case BSN_TRIGGER_TYPE.BEHAVIOR:
                this.handleBehaviorType();
                break;
            case BSN_TRIGGER_TYPE.ACTION:
                this.handleActionType();
                break;
            case BSN_TRIGGER_TYPE.OPERATION:
                this.handleOperationType();
                break;
            case BSN_TRIGGER_TYPE.LINK:
                this.handleLinkType();
                break;
        }
    }

    handleStateType() {
        // 前置条件判断

        // 执行组件具体方法
        const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
        this._componentInstance[method]();
    }

    handleBehaviorType() {
        // 前置条件判断

        // 该功能不由组件实现
        const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
        this._componentInstance[method](this._triggerMsg.options);
    }

    handleOperationType() {
        debugger;
        // 前置条件判断

        // 执行操作, 该功能不由组件实现
        const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
        this._componentInstance[method](this._triggerMsg.options);
        // this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);
    }

    handleActionType() {
        // 前置条件判断

        // 该功能不由组件实现
        const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
        this._componentInstance[method]();
        // this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]]();
    }

    handleLinkType() {
        // 前置条件判断

        // 执行跳转功能, 该功能不由组件实现
        const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
        this._componentInstance[method](this._triggerMsg.options);
        // this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);

    }
    // public resolver() {
    //     return this[this._componentInstance.triggerName](this._triggerMsg)
    // }

    // private gridTrigger() {
    //     return new GridTrigger(this._triggerMsg, this._componentInstance);
    // }

    // private formTrigger() {
    //     return new FormTrigger(this._triggerMsg, this._componentInstance);
    // }

    // private treeTrigger() {
    //     return new TreeTrigger(this._triggerMsg, this._componentInstance);
    // }

    // private asyncTreeTrigger() {
    //     return new AsyncTreeTrigger(this._triggerMsg, this._componentInstance);
    // }

    // private TreeGridTrigger() {
    //     return new TreeGridTrigger(this._triggerMsg, this._componentInstance);
    // }
}

