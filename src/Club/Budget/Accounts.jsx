import React, { useState, useEffect } from "react";
import styled from "styled-components";
import securedAPI from "../../Axios/SecuredAPI";
import { useParams } from "react-router-dom";

const kakaoBankLogoSvg = "https://upload.wikimedia.org/wikipedia/commons/4/48/KakaoBank_logo.svg";

const AccountList = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
`;

const AccountCard = styled.div`
  flex: 0 0 auto;
  width: 300px;
  height: 160px;
  background: #FEE500; /* ✅ 카카오뱅크 노란색 */
  color: black;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: ${(props) => (props.selected ? "4px solid #222" : "none")}; /* ✅ 선택된 경우 검은색 테두리 */
  
  &:hover {
    transform: scale(1.08);
    box-shadow: ${(props) => (props.selected ? "0px 6px 20px rgba(0, 0, 0, 0.4)" : "0px 4px 15px rgba(0, 0, 0, 0.2)")}; /* ✅ 선택된 경우 그림자 더 강하게 */
  }
`;

const BankLogo = styled.img`
  width: 80px; /* ✅ 로고 크기 증가 */
  height: auto;
`;

const BankName = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

const AccountName = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: #444;
  margin-top: 2px;
`;

const CardNumber = styled.div`
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: bold;
`;


const Accounts = ({ onSelectAccount }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const {clubId} = useParams();
  useEffect(() => {
    fetchAccounts();
    console.log('clubId: ',clubId);
  },[]);

  const fetchAccounts = async () => {
    try {
      const response = await securedAPI.get(`/api/account/get-all_accounts?clubId=${clubId}`);
      console.log(response);
      setAccounts(response.data);
    } catch (error) {
      console.error("❌ 계좌 목록을 불러오는데 실패했습니다.", error);
    }
  };

  const handleSelectAccount = (accountId) => {
    setSelectedAccount(accountId);
    console.log(`✅ 선택한 계좌: ${accountId}`);
    onSelectAccount(accountId);
  };

  return (
    <AccountList>
      {accounts.map((account) => (
        <AccountCard
          key={account.accountId}
          selected={selectedAccount === account.accountId}
          onClick={() => handleSelectAccount(account.accountId)}
        >
          <BankLogo src={kakaoBankLogoSvg} alt="KakaoBank Logo" />
          <div>
            <BankName>{account.bankName}</BankName>
            <AccountName>{account.accountName}</AccountName> {/* ✅ 추가된 계좌명 */}
          </div>
          <CardNumber>계좌번호 {account.accountNumber}</CardNumber>
        </AccountCard>
      ))}
    </AccountList>
  );
};

export default Accounts;
