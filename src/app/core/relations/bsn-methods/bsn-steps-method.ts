import { IStepsTrigger } from '../bsn-trigger/steps.trigger.interface';

export const CN_STEPS_METHOD: IStepsTrigger = {
    // state
    REFRESH_AS_CHILD: 'load',
    // behavior
    NEXT: 'nextStep',
    CLICK_STEP_NODE:'onlyStepOnIndexChange',
    TRANSFER_VALUE: 'transferValue',
    NEXT_STEP:'onlyNextStep'
}