export enum CallStatusEnum {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export enum CallStatusActionsEnum {
  FETCH_ONE = 'Fetch One',
  FETCH_ONE_SUCCESS = 'Fetch One Success',
  FETCH_ONE_ERROR = 'Fetch One Error',
}

export interface CallStatusErrorState {
  errorMessage: string;
}

export type CallStatusState = CallStatusEnum | CallStatusErrorState;
