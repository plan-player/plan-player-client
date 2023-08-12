const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const registerValidate = {
  email: (value: string) => {
    if (!value) {
      return '이메일을 입력해주세요';
    } else if (!emailPattern.test(value)) {
      return '이메일 형식이 올바르지 않습니다';
    }
    return '';
  },
  password: (value: string) => {
    if (!value) {
      return '비밀번호를 입력해주세요';
    } else if (value.length < 8 || value.length > 24) {
      return '비밀번호는 8~24자이내 영문(대,소)/숫자/특수문자여야 합니다';
    }
    return '';
  },
  passwordVerify: (value: string) => {
    if (!value) {
      return '비밀번호 확인을 입력해주세요';
    }
  },
};
