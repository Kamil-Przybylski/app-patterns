import * as _ from 'lodash';
import { CallStatusErrorState, CallStatusState } from './store.models';

export abstract class StoreUtils {
  static patchState<S, A, K extends Partial<S>>(arg: K | ((ac: A, st: S) => K)): (s: S, a: A) => S {
    return (state: S, action: A) => {
      let partial = {};
      if (_.isFunction(arg)) partial = arg(action, state);
      else if (_.isObject(arg)) partial = arg;
      return _.assign({}, state, partial);
    };
  }

  static getCallStateError(callState: CallStatusState): string | undefined {
    if ((callState as CallStatusErrorState).errorMessage !== undefined) {
      return (callState as CallStatusErrorState).errorMessage;
    }
    return undefined;
  }
}
