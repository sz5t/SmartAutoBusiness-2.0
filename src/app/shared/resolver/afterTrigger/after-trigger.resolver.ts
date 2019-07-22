import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export class AfterTrigger {
    constructor() {

    }

    resolve(afterCfg) {
        const after_sender$ = from(afterCfg);
        const after_subscribe$ = after_sender$.pipe(map(cfg => {
            // 根据配置的类型,决定发送什么样的消息,异步、消息、组件行为
        }))
    }




}