import { IContainersTrigger } from '../bsn-trigger/containers.trigger.interface';

export const CN_CONTAINERS_METHOD: IContainersTrigger = {
    // state
    REFRESH_AS_CHILD: 'load',
    REFRESH_CONTAINE:'switchContaineload',
    VALIDATE: 'validate',
    EXECUTE_MODAL: 'executeModal',
    VALUE_CHANGE: 'valueChange',
    MESSAGE: 'showMessage',
    WINDOW: 'showWindow',
    TRANSFER_VALUE:'transferValue',
    // link
    LINK: 'link',
    LINK_TO: 'linkTo'
}