import React, { useEffect, useImperativeHandle, useState } from 'react';
import InputField from '../UI/input/InputField';

const CODE_LENGTH = 6;

interface CodeFieldProps {
  className?: string;
  iscodeVerified?: boolean;
}

export interface CodeHandle {
  value: () => string;
  clear: () => void;
  focus: () => void;
}

const CodeField = React.forwardRef<CodeHandle, CodeFieldProps>(
  ({ className, iscodeVerified }, ref) => {
    const [inputState, setInputState] = useState<NodeListOf<HTMLInputElement>>();

    useImperativeHandle(ref, () => {
      return {
        value: () => {
          let value = '';

          inputState?.forEach((input) => {
            value += input.value;
          });

          return value;
        },
        clear: () => {
          inputState?.forEach((input) => {
            input.value = '';
          });
        },
        focus: () => {
          const input = document.querySelector(
            '#register-code-inputs input'
          ) as HTMLInputElement;
          input && input.focus();
        },
      };
    });

    useEffect(() => {
      const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
        '#register-code-inputs input'
      );
      setInputState(inputs);
      inputs.forEach((input, inputIdx) => {
        input.addEventListener('input', () => {
          // strip non-numeric value
          const value = input.value.replace(/[^0-9]+/g, '');
          input.value = value;
          if (value.length < 1) {
            return;
          } else if (value.length === 1 && inputIdx + 1 < CODE_LENGTH) {
            inputs[inputIdx + 1].focus();
          } else {
            // input & paste -> focus next
            [...value].forEach((char, i) => {
              if (inputIdx + i < CODE_LENGTH) {
                inputs[inputIdx + i].focus();
                inputs[inputIdx + i].value = char;
              }
            });
          }
        });
        input.addEventListener('keyup', (event: KeyboardEvent) => {
          if (event.key === 'Backspace' && inputIdx !== 0) {
            if (input.value) input.value = '';
            inputs[inputIdx - 1].focus();
          }
        });
        input.addEventListener('click', () => {
          inputs[inputIdx].value = '';
        });
      });
    }, []);

    return (
      <InputField className={className}>
        <div id="register-code-inputs" className="flex gap-xs">
          {Array.from(new Array(CODE_LENGTH)).map((_, i) => (
            <input
              disabled={iscodeVerified ? true : false}
              key={i}
              type="number"
              className="text-center p-0"
            ></input>
          ))}
        </div>
        <p className="text-sm text-center mt-xs">
          {iscodeVerified
            ? '코드 인증이 완료되었습니다.'
            : '이메일로 보내드린 확인 코드 여섯 자리를 입력하세요.'}
        </p>
      </InputField>
    );
  }
);

export default CodeField;
