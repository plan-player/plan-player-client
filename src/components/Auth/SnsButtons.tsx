import { motion } from 'framer-motion';
import { styled } from 'styled-components';
const { PLOT_SERVER } = import.meta.env;

const SnsButtonsWrapper = styled(motion.div)`
  margin: 0.5rem auto;
  img {
    width: 90%;
  }
`;

// guideline: https://developers.google.com/identity/branding-guidelines?hl=ko
const GoogleLoginButton = () => (
  <button type="button">
    <img src="/svg/google_circle_logo.svg" alt="Google login button" />
  </button>
);

// guideline: https://developers.naver.com/docs/login/bi/bi.md
const NaverLoginButton = () => (
  <button type="button">
    <img src="/svg/naver_circle_logo.svg" alt="Naver login button" />
  </button>
);

// resource: https://developers.kakao.com/tool/resource/login
const KakaoLoginButton = () => (
  <button type="button">
    <img src={'/svg/kakao_circle_logo.svg'} alt="Kakao login button" />
  </button>
);

const SnsButtons = () => {
  return (
    <SnsButtonsWrapper layout className="flex w-85">
      <a
        href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${
          PLOT_SERVER as string
        }/login/oauth2/code/google&client_id=263122955347-olubk7ii1rkb82vku9k6cg1htcu89h5d.apps.googleusercontent.com&prompt=consent`}
      >
        <GoogleLoginButton />
      </a>
      <a href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=tTm1FDKctgJrgBiX1mfz&scope=name%20email%20profile_image&state=1234&redirect_uri=http://localhost:5173/login/oauth2/code/naver">
        <NaverLoginButton />
      </a>
      <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=884ecee4a5619a87b6568a77fafd27a2&redirect_uri=http://localhost:5173/login/oauth2/code/kakao">
        <KakaoLoginButton />
      </a>
    </SnsButtonsWrapper>
  );
};

export default SnsButtons;
