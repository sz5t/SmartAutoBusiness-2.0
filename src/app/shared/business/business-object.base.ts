export enum BUSINESS_OBJECT_STATE {
    NEW = 'new',
    EDIT = 'edit',
    DELETEED = 'deleted'
}

export class BusinessObjectBase {

    private _state: BUSINESS_OBJECT_STATE;
    public get state(): BUSINESS_OBJECT_STATE {
        return this._state;
    }
    public set state(value: BUSINESS_OBJECT_STATE) {
        this._state = value;
    }


    constructor(initObject?: any) {
        if (initObject) {
            this.initBusinessObjectBase(initObject);
        }
        this.state = BUSINESS_OBJECT_STATE.NEW;
    }

    /**
     * 初始化业务对象
     * @param initObject 被转化对象 
     */
    private initBusinessObjectBase(initObject) {
        for (const p in initObject) {
            if (initObject.hasOwnProperty(p)) {
                this[p] = initObject[p];
            }
        }
    }


    /**
     * 业务对象解析
     * @param objConfig 对象配置 
     */
    public resolver(objConfig) {
        const obj = new BusinessObjectBase();
        if (objConfig) {
            for (const p of objConfig.properties) {
                this.buildProperties(p, obj);
            }

            if (Array.isArray(objConfig.children) && objConfig.children.length > 0) {
                for (const childProperty of objConfig.children) {
                    this.buildChildren(childProperty, obj);
                }
            }
            objConfig.state = BUSINESS_OBJECT_STATE.NEW;
        }
        return obj;
    }

    /**
     * 构建业务对象属性
     * @param property 属性名称 
     * @param obj 属性值
     */
    public buildProperties(property, obj) {
        if (property.hasOwnProperty('name') && property.hasOwnProperty('value')) {
            obj[property.name] = property.value;
        }
    }


    /**
     * 构建业务子对象
     * @param childProperty 子对象配置 
     * @param obj 父对象
     */
    public buildChildren(childProperty, obj) {
        obj[childProperty.entity] = [];
        obj[childProperty.entity].push(this.resolver(childProperty));
    }


    /**
     * 编辑对象属性
     * @param propertyName 目标属性名称 
     * @param targetValue 目标属性值
     */
    public editProperty(propertyName: string, targetValue: any) {
        if (this.hasOwnProperty(propertyName)) {
            this[propertyName] = targetValue;
            // tslint:disable-next-line:no-string-literal
            this.state = BUSINESS_OBJECT_STATE.EDIT;
        }
    }

    /**
     * 添加对象属性
     * @param propertyName 目标属性名称 
     * @param targetValue 目标属性值
     */
    public addProperty(propertyName: string, targetValue: any) {
        this[propertyName] = targetValue;
        // tslint:disable-next-line:no-string-literal
        this.state = BUSINESS_OBJECT_STATE.EDIT;
    }

    /**
     * 删除对象的一个属性
     * @param propertyName 属性名称 
     */
    public removeProperty(propertyName: string) {
        if (this.hasOwnProperty(propertyName)) {
            delete this[propertyName];
        }
    }

    /**
     * 添加子对象
     * @param childrenName 子对象属性名称 
     * @param childObjs 子对象或者子对象数组
     */
    public addChildren(childrenName: string, childObjs: any | any[]) {
        if (this[childrenName] && Array.isArray(this[childrenName]) && Array.isArray(childObjs)) {
            childObjs.map(c => {
                const cObj = new BusinessObjectBase(c);
                this[childrenName].push(cObj);
            });

        } else if (this[childrenName]) {
            const cObj = new BusinessObjectBase(childObjs);
            this[childrenName].push(cObj);
        }
    }

    /**
     * 删除子对象
     * @param childrenName 子对象属性名称 
     * @param childObjs 子对象或者对象数组
     */
    public removeChildren(childrenName: string, childObjs: any | any[]) {
        if (this[childrenName] && Array.isArray(this[childrenName]) && this[childrenName].length > 0) {
            return this[childrenName].filter(item => {
                return childObjs.findIndex(item) === -1;
            });
        } else if (this[childrenName]) {
            this[childrenName].splice(childObjs, 1);
            return this[childrenName];
        }

        /**
         * 是否有必要做逻辑性的删除???
         * 逻辑性删除就是标记记录的状态,使用的过程中,通过状态判断显示和操作结果.
         */
    }

    /**
     * 对调两个对象的顺序位置
     * @param obj1 对象1
     * @param obj2 对象2
     * @param childrenName 子对象属性名称 
     */
    public orderChange(obj1, obj2, childrenName) {
        if (Array.isArray(this[childrenName]) && this[childrenName].length > 0) {
            const arr: any[] = this[childrenName];
            const index_f = arr.findIndex(s => s.id === obj1.id);
            const index_s = arr.findIndex(s => s.id === obj2.id);
            if (index_f < index_s) {
                this[childrenName].splice(index_f, 1, ...this[childrenName].splice(index_s, 1, this[childrenName][index_f]));
            } else {
                this[childrenName].splice(index_s, 1, ...this[childrenName].splice(index_f, 1, this[childrenName][index_s]));
            }

        }
    }
}

