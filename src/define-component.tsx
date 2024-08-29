import React, { useEffect } from 'react';
import { DefineComponentProps } from './types';
import {
  defineComponentCompute,
  defineComponentConstant,
  defineComponentEffect,
  defineComponentOnMounted,
  defineComponentOnUnmounted,
  defineComponentState,
} from './hooks';
import { createSignalState, useSignalState } from '@dinnertime/react-state';

// HOC가 반환하는 컴포넌트 타입을 명확하게 지정합니다.
export function defineComponent<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T & DefineComponentProps>,
) {
  const Component = (props: T) => {
    const moutedSignal = createSignalState(false);
    const { value: isMounted, dispatch } = useSignalState(moutedSignal);

    useEffect(() => {
      dispatch(true);
      return () => dispatch(false);
    }, []);

    return (
      <WrappedComponent
        {...props}
        isMounted={isMounted}
        constant={defineComponentConstant}
        state={defineComponentState}
        onMounted={defineComponentOnMounted(isMounted)}
        onUnmounted={defineComponentOnUnmounted(isMounted)}
        defineEffect={defineComponentEffect}
        defineCompute={defineComponentCompute}
      />
    );
  };
  return Component;
}
