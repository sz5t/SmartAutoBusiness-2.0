
export interface IStepsTrigger {
    REFRESH_AS_CHILD: string
    NEXT: string,
    CLICK_STEP_NODE: string,
    TRANSFER_VALUE: string,
    NEXT_STEP:string
}

/**
 * 表单功能触发器
 */
export const BSN_DESCRIPTION_TRIGGER: IStepsTrigger = {
    // state
    REFRESH_AS_CHILD: 'REFRESH_AS_CHILD',
    NEXT: 'NEXT',
    CLICK_STEP_NODE:'CLICK_STEP_NODE',
    TRANSFER_VALUE:'TRANSFER_VALUE',
    NEXT_STEP:'NEXT_STEP'
}