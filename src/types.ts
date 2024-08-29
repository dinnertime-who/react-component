import { useSignalState } from '@dinnertime/react-state';

export type DefineComponentState = <S>(
  initialState: S,
) => ReturnType<typeof useSignalState<S>>;

export type DefineComponentConstant = <C>(value: C) => C;

export type DefineComponentTransaction = <F extends (...args: any[]) => any>(
  callback: F,
) => {
  isProcessing: boolean;
  executor: (
    ...args: Parameters<typeof callback>
  ) => ReturnType<typeof callback>;
};

export type DefineComponentEffect = <
  D extends readonly unknown[] | [], //
  R,
>(
  callback: (dependancies: {
    -readonly [P in keyof D]: D[P];
  }) => R,
  dependancies: D,
) => void;

export type DefineComponentCompute = <
  D extends readonly unknown[] | [], //
  R,
>(
  callback: (dependancies: {
    -readonly [P in keyof D]: D[P];
  }) => R,
  dependancies: D,
) => ReturnType<typeof callback>;

export type DefineComponentOnMounted = <R>(
  callback: () => R | Promise<R>,
) => void;

export type DefineComponentOnUnmounted = <R>(
  callback: () => R | Promise<R>,
) => void;

export type DefineComponentProps = {
  isMounted: boolean;
  state: DefineComponentState;
  constant: DefineComponentConstant;
  defineEffect: DefineComponentEffect;
  defineCompute: DefineComponentCompute;
  onMounted: DefineComponentOnMounted;
  onUnmounted: DefineComponentOnUnmounted;
};
