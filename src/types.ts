import { useSignalState } from '@dinnertime/react-state';

export type DefineComponentState = <S>(
  initialState: S,
) => ReturnType<typeof useSignalState<S>>;

export type DefineComponentConstant = <C>(value: C) => C;

export type DefineComponentElementRef = <
  E extends HTMLElement,
>() => React.RefObject<E>;

export type DefineComponentFunction = <F extends (...args: any[]) => any>(
  callback: F,
  option?: { transaction: boolean },
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
  state: DefineComponentState;
  constant: DefineComponentConstant;
  defineEffect: DefineComponentEffect;
  defineCompute: DefineComponentCompute;
  defineFunction: DefineComponentFunction;
  onMounted: DefineComponentOnMounted;
  onUnmounted: DefineComponentOnUnmounted;
  elementRef: DefineComponentElementRef;
};
