import React from 'react';
import { DefineComponentProps } from './types';
import {
  defineComponentCompute,
  defineComponentConstant,
  defineComponentEffect,
  defineComponentElementRef,
  defineComponentOnMounted,
  defineComponentOnUnmounted,
  defineComponentState,
  defineComponentFunction,
  RUN_ON_CLIENT,
} from './hooks';

// HOC가 반환하는 컴포넌트 타입을 명확하게 지정합니다.
export function defineComponent<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T & DefineComponentProps>,
) {
  const Component = (props: T) => {
    if (RUN_ON_CLIENT !== true) {
      const errorMessage = `defineComponent는 server component로 사용할 수 없습니다. 'use client' 지시어를 확인해주시기 바랍니다.
      defineComponent cannot be used as a server component. Please check the 'use client' directive.`;
      throw new Error(errorMessage);
    }

    return (
      <WrappedComponent
        {...props}
        constant={defineComponentConstant}
        state={defineComponentState}
        onMounted={defineComponentOnMounted}
        onUnmounted={defineComponentOnUnmounted}
        defineEffect={defineComponentEffect}
        defineCompute={defineComponentCompute}
        defineFunction={defineComponentFunction}
        elementRef={defineComponentElementRef}
      />
    );
  };
  return Component;
}
