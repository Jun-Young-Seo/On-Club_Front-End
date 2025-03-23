import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import TransactionModal from "./TransactionModal";
import securedAPI from "../../Axios/SecuredAPI";
import TransactionPutModal from "./TrasnactionPutModal";
import Accounts from "./Accounts";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 90%;
  margin: 40px auto;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const MessageContainer = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #888;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

const PageButton = styled.button`
  background: ${(props) => (props.disabled ? "#ccc" : "#3498db")};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  
  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#2980b9")};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  font-size: 14px;
  color: #888;
  border-bottom: 1px solid #eee;
`;

const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
`;

const Amount = styled.span`
  font-weight: bold;
  color: ${(props) => (props.negative ? "red" : "#333")};
`;

const EditButton = styled.button`
  background-color: #ffa502;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;

  &:hover {
    background-color: #e67e22;
  }
`;

const TableRow = styled.tr`
  background-color: ${(props) => (props.even ? "#f9f9f9" : "white")};

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TransactionTable = () => {
  const { clubId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (selectedAccount) {
      setTransactions([]); // 기존 데이터 초기화
      setCurrentPage(1); // 페이지 리셋
      fetchTransactions();
    }
  }, [selectedAccount]);

  const fetchTransactions = async () => {
    try {
      const response = await securedAPI.get(`/api/budget/get-all/account_id?accountId=${selectedAccount}`);
      console.log("🚀 [Transaction Data Loaded]", response.data);
      setTransactions(response.data || []); // 빈 응답 방어 코드 추가
    } catch (error) {
      console.error("❌ 거래 내역을 불러오는데 실패했습니다.", error);
    }
  };

  const paginatedTransactions = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container>
      <Accounts onSelectAccount={setSelectedAccount} />

      {selectedAccount ? (
        <>
          {transactions.length === 0 ? (
            <MessageContainer>거래 내역이 없습니다.</MessageContainer>
          ) : (
            <>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>거래일</TableHeader>
                    <TableHeader>입출금</TableHeader>
                    <TableHeader>시간</TableHeader>
                    <TableHeader>금액</TableHeader>
                    <TableHeader>잔액</TableHeader>
                    <TableHeader>거래분류</TableHeader>
                    <TableHeader>AI 거래분류</TableHeader>
                    <TableHeader>내용</TableHeader>
                    <TableHeader>비고</TableHeader>
                    <TableHeader>수정</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((transaction, index) => (
                    <TableRow key={transaction.transactionId} even={index % 2 === 0}>
                      <TableCell>{dayjs(transaction.transactionDate).format("YYYY-MM-DD")}</TableCell>
                      <TableCell>{transaction.transactionType}</TableCell>
                      <TableCell>{dayjs(transaction.transactionDate).format("HH:mm")}</TableCell>
                      <TableCell>
                        <Amount negative={transaction.transactionAmount < 0}>
                          {transaction.transactionAmount.toLocaleString()} 원
                        </Amount>
                      </TableCell>
                      <TableCell>{transaction.transactionBalance.toLocaleString()} 원</TableCell>
                      <TableCell>{transaction.transactionCategory}</TableCell>
                      <TableCell>{transaction.transactionDetail}</TableCell>
                      <TableCell>{transaction.transactionDescription}</TableCell>
                      <TableCell>{transaction.transactionMemo}</TableCell>
                      <TableCell>
                        <EditButton>수정</EditButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>

              {/* ✅ 페이지네이션 추가 */}
              <Pagination>
                <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                  이전
                </PageButton>
                <span>{currentPage} / {Math.ceil(transactions.length / itemsPerPage)}</span>
                <PageButton disabled={currentPage >= Math.ceil(transactions.length / itemsPerPage)} 
                  onClick={() => setCurrentPage(currentPage + 1)}>
                  다음
                </PageButton>
              </Pagination>
            </>
          )}
        </>
      ) : (
        <MessageContainer>계좌를 선택해 주세요.</MessageContainer>
      )}
    </Container>
  );
};

export default TransactionTable;
