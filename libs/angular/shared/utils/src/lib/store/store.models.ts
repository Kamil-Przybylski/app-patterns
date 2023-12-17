export enum CallStatusEnum {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface CallStatusErrorState {
  errorMessage: string;
}

export type CallStatusState = CallStatusEnum | CallStatusErrorState;
