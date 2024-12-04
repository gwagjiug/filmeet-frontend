import styled from 'styled-components';
import { useEffect } from 'react';
import AuthInput from '../../components/features/auth/AuthInput';
import AuthButton from '../../components/features/auth/Authbutton';
import AuthTitle from '../../components/features/auth/AuthTitle';
import AuthMessage from '../../components/features/auth/AuthMessage';
import Authlink from '../../components/features/auth/Authlink';
import useAuthStore from '../../store/auth/authStore';
import { registerInput } from '../../data/auth/input';

function Register() {
  const { nickname, email, password, setEmail, setPassword, setNickname, resetAuthData } =
    useAuthStore();

  const userData = {
    nickname,
    username: email,
    password,
  };
  useEffect(() => {
    resetAuthData();
  }, []);
  return (
    <>
      <S.AuthBody>
        <AuthTitle value={registerInput.title} />
        <S.Container>
          <AuthInput
            type="nickname"
            placeholder="이름"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <AuthInput
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthButton value={registerInput.title} userData={userData} />
          <S.AuthWrapper>
            <AuthMessage value={registerInput.message} />
            <Authlink
              value={registerInput.title === '로그인' ? '회원가입' : '로그인'}
              link={registerInput.title === '로그인' ? '/register' : '/login'}
            />
          </S.AuthWrapper>
        </S.Container>
        <S.Divider>
          <S.Line />
          <S.Dividertext>OR</S.Dividertext>
          <S.Line />
        </S.Divider>
      </S.AuthBody>
    </>
  );
}

export default Register;
const S = {
  AuthBody: styled.div`
    width: 20rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    background-color: ${(props) => props.theme.color.mainColor};
    color: ${(props) => props.theme.color.fontBlack};
    border-radius: 0.5rem;
    box-shadow: ${(props) => props.theme.box.defaulBoxShadow};
    margin: 10rem auto;
  `,
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Divider: styled.section`
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
    width: 100%;
  `,

  Line: styled.div`
    flex: 1;
    height: 0.1rem;
    background-color: ${(props) => props.theme.color.fontGray};
  `,

  Dividertext: styled.div`
    margin: 0 1rem;
    font-size: 0.9rem;
    color: ${(props) => props.theme.color.fontGray};
    font-family: ${(props) => props.theme.font.fontSuitRegular};
  `,

  AuthWrapper: styled.section`
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  `,
};