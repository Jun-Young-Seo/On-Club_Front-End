import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #4947FF 0%, #8271FF 100%);
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    padding: 40px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #4947FF;
    margin-bottom: 10px;
`;

const Subtitle = styled.div`
    font-size: 14px;
    color: #555;
    margin-bottom: 20px;
`;

const InputField = styled.div`
    width: 100%;
    margin-bottom: 20px;
    position: relative;
`;

const InputLabel = styled.label`
    position: absolute;
    top: -10px;
    left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #4947FF;
    background: #fff;
    padding: 0 5px;
`;

const Input = styled.input`
    width: 93%;
    padding: 12px;
    border: 2.5px solid #4947FF;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    background: #fff;
    color: #333;
    &:focus {
        border-color: #8271FF;
    }
`;

const PhoneInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 5px;
`;

const PhoneInput = styled(Input)`
    width: 30%;
    text-align: center;
`;

const Dash = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: #4947FF;
`;

const Select = styled.select`
    width: 100%;
    padding: 12px;
    border: 2.5px solid #4947FF;
    border-radius: 8px;
    font-size: 16px;
    background: #fff;
    color: #333;
    outline: none;
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #4947FF;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: #8271FF;
    }
`;

const Signup = () => {
    const navigate = useNavigate();
    const phoneRef2 = useRef(null);
    const phoneRef3 = useRef(null);

    const handlePhoneInput = (e, nextRef) => {
        if (e.target.value.length >= e.target.maxLength) {
            nextRef?.current?.focus();
        }
    };

    return (
        <PageContainer>
            <FormWrapper>
                <Title>On-club</Title>
                <Subtitle>회원가입</Subtitle>
                <InputField>
                    <InputLabel>전화번호</InputLabel>
                    <PhoneInputContainer>
                        <PhoneInput type="text" maxLength="3" placeholder="010" onInput={(e) => handlePhoneInput(e, phoneRef2)} />
                        <Dash>-</Dash>
                        <PhoneInput type="text" maxLength="4" placeholder="1234" ref={phoneRef2} onInput={(e) => handlePhoneInput(e, phoneRef3)} />
                        <Dash>-</Dash>
                        <PhoneInput type="text" maxLength="4" placeholder="5678" ref={phoneRef3} />
                    </PhoneInputContainer>
                </InputField>
                <InputField>
                    <InputLabel>비밀번호</InputLabel>
                    <Input type="password" placeholder="비밀번호" required />
                </InputField>
                <InputField>
                    <InputLabel>비밀번호 확인</InputLabel>
                    <Input type="password" placeholder="비밀번호 확인" required />
                </InputField>
                <InputField>
                    <InputLabel>지역</InputLabel>
                    <Select>
                        <option value="">지역 선택</option>
                        <option value="seoul">서울</option>
                        <option value="busan">부산</option>
                        <option value="daegu">대구</option>
                        <option value="incheon">인천</option>
                    </Select>
                </InputField>
                <InputField>
                    <InputLabel>구력 (년)</InputLabel>
                    <Input type="number" placeholder="구력 입력" min="0" required />
                </InputField>
                <Button>회원가입</Button>
            </FormWrapper>
        </PageContainer>
    );
};

export default Signup;
