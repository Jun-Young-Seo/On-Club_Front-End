import React from 'react';
import balanceIcon from '../../assets/images/balance.png';
import incomeIcon from '../../assets/images/income.png';
import expenseIcon from '../../assets/images/expense.png';
import savingIcon from '../../assets/images/saving.png';
import styled from 'styled-components';

import { useEffect,useState } from 'react';
import securedAPI from '../../Axios/SecuredAPI';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const kakaoBankLogoSvg = "https://upload.wikimedia.org/wikipedia/commons/4/48/KakaoBank_logo.svg";

const Container = styled.div`
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background: #f7f9fc;
`;
const SectionTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;
const CardNumber = styled.div`
  font-size: 1rem;
  letter-spacing: 2px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
`;

  const CardGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

  const Card = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;  /* ✅ 부드러운 효과 */

    cursor: pointer; /* 마우스 포인터 변경 */

    &:hover {
      transform: scale(1.03); /* ✅ 약간 커짐 */
      box-shadow: 0 6px 16px rgba(0,0,0,0.12); /* ✅ 그림자 진하게 */
    }

    .card-header {
      display: flex;
      align-items: center;
    }
  `;


  const CardTitle = styled.div`
  color: #888;
  font-size: 0.9rem;
  padding-left : 1rem;
  margin-bottom: 0.5rem;
`;

  const CardValue = styled.div`
  padding-left : 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

  const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 3rem;
`;

  const DebitCredit = styled.div`
  flex: 1.5;
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

  const OverviewImage = styled.img`
  width: 100%;
  margin-top: 1rem;
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

const AccountCard = styled.div`
  flex: 1;
  width: 84%;
  height: 65%;
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

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;
const AccountName = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: #444;
  margin-top: 2px;
`;
const TransactionTable = styled.div`
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const TransactionRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.2fr 1.2fr 2fr 2fr 1.5fr 1.2fr;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
  font-size: 1.0rem;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TitleCell = styled(Cell)`
  font-weight: 600;
`;

const AmountCell = styled(Cell)`
  font-weight: 600;
  text-align: right;
  color: ${(props) => (props.$positive ? "#2e8b57" : "#e74c3c")};
`;

const DateCell = styled(Cell)`
  color: #5c6c8a;
`;

const LightCell = styled(Cell)`
  color: #6e7c91;
`;

const Gap = styled.div`
  width : 100%;
  height : 2rem;
`;

const ColoredCell = styled(LightCell)`
  color: ${(props) =>
    props.$type === '입금' ? '#2e8b57' : 
    props.$type === '출금' ? '#e74c3c' : '#6e7c91'};
  
    font-weight : 700;
    `;

const Dashboard = () => {
  const navigate = useNavigate();

  const {clubId} = useParams();
  const [budgetInfo, setBudgetInfo] = useState({
    balance: 0,
    monthlyExpense: 0,
    monthlyIncome: 0,
    monthlySurplus: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [account, setAccount] = useState([]);
  useEffect(() => {
    const fetchBudgetInfo = async () => {
      try {
        const response = await securedAPI.get(`/api/budget/get/budget-info?clubId=${clubId}`);
        console.log(response);
        setBudgetInfo(response.data);
        console.log("✅ 대시보드 데이터:", response.data);

        const txResponse = await securedAPI.get(`/api/budget/get/latest-three?clubId=${clubId}`);
        setTransactions(txResponse.data);
        console.log("✅ 최근 거래 데이터:", txResponse.data);

        const accountResponse = await securedAPI.get(`/api/club/get/main-account?clubId=${clubId}`);
        setAccount(accountResponse.data);
        console.log('account data : ',accountResponse.data);

      } catch (error) {
        console.error("❌ 대시보드 데이터 가져오기 실패:", error);
      }
    };

    fetchBudgetInfo();
  }, [clubId]);

  return (
    <Container>
      {/* 상단 카드들 */}
      <CardGroup>
        <Card onClick={()=> navigate(`/clubs/${clubId}/budget_detail`)}>
            <CardHeader>
                <img src={balanceIcon} alt="잔액 아이콘" />
            <div>
                <CardTitle>잔액</CardTitle>
                <CardValue>{budgetInfo.balance}원</CardValue>
            </div>
            </CardHeader>
        </Card>

        <Card onClick={()=> navigate(`/clubs/${clubId}/budget_detail`)}>
            <CardHeader>
                <img src={expenseIcon} alt="지출 아이콘" />
            <div>
                <CardTitle>지출</CardTitle>
                <CardValue>{budgetInfo.monthlyExpense}원</CardValue>
            </div>
            </CardHeader>
        </Card>

        <Card onClick={()=> navigate(`/clubs/${clubId}/budget_detail`)}>
            <CardHeader>
                <img src={incomeIcon} alt="수입 아이콘" />
            <div>
                <CardTitle>수입</CardTitle>
                <CardValue>{budgetInfo.monthlyIncome}원</CardValue>
            </div>
            </CardHeader>
        </Card>

        <Card onClick={()=> navigate(`/clubs/${clubId}/budget_detail`)}>
            <CardHeader>
                <img src={savingIcon} alt="수입 아이콘" />
            <div>
                <CardTitle>이월금</CardTitle>
                <CardValue>{budgetInfo.monthlySurplus}원</CardValue>
            </div>
            </CardHeader>
        </Card>
        </CardGroup>

        <Gap/>

        <Section>
  <div style={{ flex: 3.5 }}>
    <SectionTitle>최근 거래내역</SectionTitle>
    <TransactionTable onClick={()=> navigate(`/clubs/${clubId}/budget_detail`)}>
      {transactions.map((tx, idx) => (
        <TransactionRow key={idx}>
          <TitleCell>{tx.transactionDescription}</TitleCell>
          <DateCell>
            {new Date(tx.transactionDate).toLocaleDateString("en-GB", {
              year: "numeric", month: "short", day: "numeric"
            })}
          </DateCell>
          <LightCell>{tx.transactionCategory}</LightCell>
          <ColoredCell $type={tx.transactionType}>{tx.transactionType}</ColoredCell>
          <LightCell>{tx.transactionDetail}</LightCell>
          <LightCell>{tx.transactionMemo}</LightCell>
          <LightCell>{tx.transactionBalance}원</LightCell>
          <AmountCell $positive={tx.transactionAmount > 0}>
            {tx.transactionAmount > 0 ? "+" : "-"}{Math.abs(tx.transactionAmount)}원
          </AmountCell>
        </TransactionRow>
      ))}
    </TransactionTable>
  </div>

  <div style={{ flex: 1.0 }}>
    <SectionTitle>통장</SectionTitle>
    <AccountCard>
      <BankLogo src={kakaoBankLogoSvg} alt="KakaoBank Logo" />
      <div>
        <BankName>{account.bankName}</BankName>
        <AccountName>{account.accountOwner}</AccountName>
        <AccountName>{account.accountName}</AccountName>
      </div>
      <CardNumber>{account.accountNumber}</CardNumber>
    </AccountCard>
  </div>
</Section>
<Gap/>
<Section>
  <div style={{ flex: 1.5 }}>
    <SectionTitle>월별 모아보기</SectionTitle>
    <DebitCredit>
      <OverviewImage src="https://yourserver.com/graph-image.png" alt="Debit Credit Chart" />
    </DebitCredit>
  </div>
</Section>


</Container>
  );
};

export default Dashboard;
