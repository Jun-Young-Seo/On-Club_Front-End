import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import TransactionModal from "./TransactionModifyModal";
import securedAPI from "../../Axios/SecuredAPI";
import TransactionCreateModal from "./TrasnactionCreateModal";
import Accounts from "./Accounts";
import ExcelUploadModal from "./ExcelUploadModal";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 90%;
  margin: 40px auto;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? "#3498db" : "#ddd")};
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.active ? "#2980b9" : "#bbb")};
  }
`;

const DateInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
`;

const ResetButton = styled.button`
  background-color: #ff6b6b;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #e63946;
  }
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
  // font-size: 14px;
  font-size : ${({$isUnknown}) => ($isUnknown ? '22px' : '14px')};
  color: ${({ $isUnknown }) => ($isUnknown ? '#d9534f' : '#333')};
  font-weight: ${({ $isUnknown }) => ($isUnknown ? 'bold' : 'normal')};
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
const AddTransactionButton = styled.button`
  background-color: #2ecc71;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;

  &:hover {
    background-color: #27ae60;
  }
`;

const AddTransactionExcelButton = styled.button`
  background-color: #2ecc71;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;

  &:hover {
    background-color: #27ae60;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* 버튼 사이 간격 */
`;

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("전체");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);

  const {clubId} = useParams();

useEffect(() => {
  const fetchTransactions = async () => {
    if (!selectedAccount) return;
    try {
      const response = await securedAPI.get(`/api/budget/get-all/account_id?accountId=${selectedAccount}`);
      const fetched = response.data || [];
      setTransactions(fetched);

      const hasUnknown = fetched.some(tx => tx.transactionDetail === "?");
      if (hasUnknown) {
        Swal.fire({
          icon: "warning",
          title: "AI 거래분류가 ? 인 거래가 있습니다",
          text: "?인 거래는 AI 예산관리 보고서 작성에서 제외됩니다.",
          confirmButtonText: "확인"
        });
      }

    } catch (error) {
      console.error("❌ 거래 내역을 불러오는데 실패했습니다.", error);
    }
  };

  fetchTransactions();
}, [selectedAccount]);


  const onEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const onSaveTransaction = () => {
    setIsModalOpen(false);
    fetchTransactions();
  };

  const fetchTransactions = async () => {
    try {
      const response = await securedAPI.get(`/api/budget/get-all/account_id?accountId=${selectedAccount}`);
      console.log("🚀 [Transaction Data Loaded]", response.data);
      setTransactions(response.data || []);
    } catch (error) {
      console.error("❌ 거래 내역을 불러오는데 실패했습니다.", error);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "입금" && transaction.transactionType !== "입금") return false;
    if (filter === "출금" && transaction.transactionType !== "출금") return false;

    if (startDate && dayjs(transaction.transactionDate).isBefore(dayjs(startDate),"day")) return false;
    if (endDate && dayjs(transaction.transactionDate).isAfter(dayjs(endDate),"day")) return false;

    return true;
  });

  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetFilters = () => {
    setFilter("전체");
    setStartDate("");
    setEndDate("");
  };
  const handleCreateTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };
  
  const handleExcelFileUpload = (file, password) => {
    const userId = sessionStorage.getItem('userId');
    const accountId = selectedAccount;
  
    // 검증
    if (!userId || !accountId || !clubId || !file || !password) {
      console.error('필수 데이터 누락:', { userId, accountId, clubId, file, password });
      return Promise.reject('필수 데이터 누락');
    }
    console.log(file);
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('accountId', accountId);
    formData.append('clubId', clubId);
    formData.append('excelFilePassword', password);  
    formData.append('excelFile', file);
  
    console.log('userId:', userId);
    console.log('clubId:', clubId);
    console.log('accountId:', accountId);
    console.log('password:', password);
  
    return securedAPI.post('/api/excel/budget', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(response => {
      console.log('업로드 성공:', response.data);
      fetchTransactions(); // 리스트 갱신
    })
    .catch(error => {
      console.error('엑셀 업로드 실패:', error);
      throw error;
    });
  };
  
  return (
    <Container>
      <TopSection>
      <ButtonGroup>
        <AddTransactionButton onClick={() => setIsCreateModalOpen(true)}>+ 거래 추가</AddTransactionButton>
        <AddTransactionExcelButton onClick={()=>setIsExcelModalOpen(true)}>+ 엑셀로 거래 추가</AddTransactionExcelButton>
      </ButtonGroup>
      <FilterContainer>
          <FilterButton active={filter === "전체"} onClick={() => setFilter("전체")}>전체</FilterButton>
          <FilterButton active={filter === "입금"} onClick={() => setFilter("입금")}>입금</FilterButton>
          <FilterButton active={filter === "출금"} onClick={() => setFilter("출금")}>출금</FilterButton>

          <DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <span>~</span>
          <DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

          <ResetButton onClick={resetFilters}>초기화</ResetButton>
        </FilterContainer>
      </TopSection>

      <Accounts onSelectAccount={setSelectedAccount} />

      {selectedAccount ? (
        <>
          {filteredTransactions.length === 0 ? (
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
                      <TableCell $isUnknown={transaction.transactionDetail === "?"}>
                        {transaction.transactionDetail}
                      </TableCell>
                      <TableCell>{transaction.transactionDescription}</TableCell>
                      <TableCell>{transaction.transactionMemo}</TableCell>
                      <TableCell>
                        <EditButton onClick={() => onEditTransaction(transaction)}>수정</EditButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>

              <Pagination>
                <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                  이전
                </PageButton>
                <span>{currentPage} / {Math.ceil(filteredTransactions.length / itemsPerPage)}</span>
                <PageButton disabled={currentPage >= Math.ceil(filteredTransactions.length / itemsPerPage)} 
                  onClick={() => setCurrentPage(currentPage + 1)}>
                  다음
                </PageButton>
              </Pagination>
            </>
          )}
          {isModalOpen && selectedTransaction && (
            <TransactionModal
              transaction={selectedTransaction}
              onSave={onSaveTransaction}
              onClose={() => setIsModalOpen(false)}
            />
          )}
            {isCreateModalOpen && (
            <TransactionCreateModal 
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateTransaction}
                selectedAccount={selectedAccount} />
            )}
            {isExcelModalOpen && (
              <ExcelUploadModal 
                onClose={() => setIsExcelModalOpen(false)}
                onSubmit={(file, birthDate) => handleExcelFileUpload(file, birthDate)}
                />
            )}

        </>
        
      ) : (
        <MessageContainer>계좌를 선택해 주세요.</MessageContainer>
      )}
    </Container>
  );
};

export default TransactionTable;
