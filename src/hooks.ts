'use client';
import { createSignalState, useSignalState } from '@dinnertime/react-state';
import {
  DefineComponentCompute,
  DefineComponentConstant,
  DefineComponentEffect,
  DefineComponentOnMounted,
  DefineComponentState,
} from './types';
import React from 'react';

export const defineComponentConstant: DefineComponentConstant = (value) => {
  return value;
};

export const defineComponentState: DefineComponentState = (value) => {
  const signalState = React.useRef(createSignalState(value));
  return useSignalState(signalState.current);
};

export const defineComponentOnMounted = (
  isMounted: boolean,
): DefineComponentOnMounted => {
  return (callback) => {
    React.useEffect(() => {
      callback();
    }, [isMounted]);
  };
};

export const defineComponentOnUnmounted = (
  isMounted: boolean,
): DefineComponentOnMounted => {
  return (callback) => {
    React.useEffect(() => {
      return () => {
        callback();
      };
    }, [isMounted]);
  };
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

// export const defineComponentTransaction: DefineComponentTransaction = (
//   callback,
// ) => {
//   const processiongState = React.useRef(createSignalState(false));
//   const {
//     value: isProcessing,
//     dispatch,
//     isDispatching,
//   } = useSignalState(processiongState.current);

//   const executor = React.useCallback(
//     (...args: Parameters<typeof callback>) => {
//       try {
//         console.log(isProcessing, isDispatching);
//         if (isProcessing) return;
//         dispatch(true);
//         return callback(...args);
//       } catch (error) {
//         throw error;
//       } finally {
//         dispatch(false);
//       }
//     },
//     [callback],
//   );

//   return {
//     executor,
//     isProcessing,
//   };
// };
