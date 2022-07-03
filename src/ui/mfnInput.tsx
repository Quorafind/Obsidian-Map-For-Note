import React, { useEffect, useRef } from 'react';
import { FileSuggest } from './file-suggest';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

export function MfnInput(props) {
  const el = useRef(null);
  const { onChange, onFocus, onBlur, value, defaultValue, ...attrs } = props;
  const _value = 'value' in props ? value : 'defaultValue' in props ? defaultValue : null;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };
  const forceSetValue = () => {
    if ('value' in props && el.current) {
      const input = el.current;
      input.value = value;
      input.setAttribute('value', value);
    }
  };

  let inputing = false;

  return (
    <input
      {...attrs}
      defaultValue={_value}
      ref={(input) => {
        if (!input) {
          return;
        }

        el.current = input;
        forceSetValue();
      }}
      // react 在focus/blur时会重新设值，如果没有下面的操作，会导致focus/blur之后，变空
      // TODO 由于是异步操作，会导致文字闪动，光标定位到最末尾
      onFocus={(e) => {
        setTimeout(forceSetValue, 10);
        onFocus && onFocus(e);
      }}
      onBlur={(e) => {
        setTimeout(forceSetValue, 150);
        onBlur && onBlur(e);
      }}
      onCompositionStart={() => {
        inputing = true;
      }}
      onCompositionEnd={(e) => {
        inputing = false;
        handleChange(e);
      }}
      onChange={(e) => {
        if (!inputing) {
          handleChange(e);
        }
      }}
    />
  );
}

export default MfnInput;
