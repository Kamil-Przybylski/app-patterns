import { assign, isFunction, isObject } from 'lodash';
import { CallStatusErrorState, CallStatusState } from './store.models';

export abstract class StoreUtils {
  static patchState<S, A, K extends Partial<S>>(arg: K | ((ac: A, st: S) => K)): (s: S, a: A) => S {
    return (state: S, action: A) => {
      let partial = {};
      if (isFunction(arg)) partial = arg(action, state);
      else if (isObject(arg)) partial = arg;
      return assign({}, state, partial);
    };
  }

  static isCallStateError(callState: CallStatusState): callState is CallStatusErrorState {
    return (callState as CallStatusErrorState)?.errorMessage !== undefined;
  }

  static getCallStateError(callState: CallStatusState): string | undefined {
    if (this.isCallStateError(callState)) {
      return callState.errorMessage;
    }
    return undefined;
  }
}
