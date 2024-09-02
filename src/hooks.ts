'use client';

import { createSignalState, useSignalState } from '@dinnertime/react-state';
import {
  DefineComponentCompute,
  DefineComponentConstant,
  DefineComponentEffect,
  DefineComponentElementRef,
  DefineComponentOnMounted,
  DefineComponentState,
  DefineComponentFunction,
} from './types';
import React from 'react';

export const RUN_ON_CLIENT = true;

export const defineComponentConstant: DefineComponentConstant = (value) => {
  return value;
};

export const defineComponentState: DefineComponentState = (value) => {
  const signalState = React.useRef(createSignalState(value));
  return useSignalState(signalState.current);
};

export const defineComponentElementRef: DefineComponentElementRef = <
  E extends HTMLElement,
>() => {
  return React.useRef<E>(null);
};

export const defineComponentOnMounted: DefineComponentOnMounted = (
  callback,
) => {
  React.useEffect(() => {
    callback();
  }, []);
};

export const defineComponentOnUnmounted: DefineComponentOnMounted = (
  callback,
) => {
  React.useEffect(() => {
    return () => {
      callback();
    };
  }, []);
};
export const defineComponentEffect: DefineComponentEffect = (
  callback,
  dependancies,
) => {
  React.useEffect(() => {
    callback(dependancies);
  }, dependancies);
};

export const defineComponentCompute: DefineComponentCompute = (
  callback,
  dependancies,
) => {
  return React.useMemo(() => callback(dependancies), dependancies);
};

export const defineComponentFunction: DefineComponentFunction = (
  callback,
  option = { transaction: false },
) => {
  const transactionRef = React.useRef(false);
  const [transactionState, setTransactionState] = React.useState(false);

  const executor: ReturnType<DefineComponentFunction>['executor'] =
    React.useCallback(async (...args) => {
      if (transactionRef.current) return;

      if (option.transaction === true) {
        transactionRef.current = true;
        setTransactionState(true);
      }

      try {
        return await callback(...args);
      } catch (error) {
        throw error;
      } finally {
        transactionRef.current = false;
        setTransactionState(false);
      }
    }, []);

  return {
    isProcessing: transactionState,
    executor,
  };
};
