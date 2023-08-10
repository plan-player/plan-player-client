import { useState, useEffect } from 'react';
import { ErrorInform } from './EmailForm';

const EmailAuthTimer = () => {
  const [time, setTime] = useState(180);
  const [timeover, setTimeover] = useState(false);

  let minutes = '0' + Math.floor(time / 60);
  let seconds = (time % 60).toString().padStart(2, '0');

  useEffect(() => {
    let interval: number;
    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeover(true);
    }
    return () => clearInterval(interval);
  }, [time]);
  return (
    <>
      {!timeover ? (
        <span>
          {minutes}:{seconds}
        </span>
      ) : (
        <ErrorInform>인증코드 유효기간 초과</ErrorInform>
      )}
    </>
  );
};

export default EmailAuthTimer;
