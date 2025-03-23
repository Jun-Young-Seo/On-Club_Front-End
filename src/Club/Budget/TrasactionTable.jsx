import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import TransactionModal from "./TransactionModal";
import securedAPI from "../../Axios/SecuredAPI";
import TransactionPutModal from "./TrasnactionPutModal";

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

const SearchInput = styled.input`
  width: 30%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("전체");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ API에서 거래 내역 불러오기
  const fetchTransactions = async () => {
    try {
      const response = await securedAPI.get("/api/budget/get-all?clubId=1&accountId=1");
      console.log(response);
      setTransactions(response.data);
    } catch (error) {
      console.error("거래 내역을 불러오는데 실패했습니다.", error);
    }
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  // ✅ 필터링 로직
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "입금" && transaction.transactionType !== "입금") return false;
    if (filter === "출금" && transaction.transactionType !== "출금") return false;

    const transactionDate = dayjs(transaction.transactionDate).format("YYYY-MM-DD");
    if (startDate && transactionDate < startDate) return false;
    if (endDate && transactionDate > endDate) return false;

    return true;
  });

  // ✅ 필터 초기화
  const resetFilters = () => {
    setFilter("전체");
    setStartDate("");
    setEndDate("");
  };
  const handleCreateTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };
  
  return (
    <Container>
      <TopSection>
        <SearchInput placeholder="거래 내역 검색" />
        <AddTransactionButton onClick={() => setIsCreateModalOpen(true)}>+ 거래 추가</AddTransactionButton>
        {isCreateModalOpen && (
            <TransactionPutModal onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateTransaction} />
        )}

        <FilterContainer>
          {/* ✅ 입금/출금 필터 버튼 */}
          <FilterButton active={filter === "전체"} onClick={() => setFilter("전체")}>전체</FilterButton>
          <FilterButton active={filter === "입금"} onClick={() => setFilter("입금")}>입금</FilterButton>
          <FilterButton active={filter === "출금"} onClick={() => setFilter("출금")}>출금</FilterButton>

          {/* ✅ 날짜 범위 선택 */}
          <DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <span>~</span>
          <DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

          {/* ✅ 필터 초기화 버튼 */}
          <ResetButton onClick={resetFilters}>초기화</ResetButton>
        </FilterContainer>
      </TopSection>

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
            {filteredTransactions.map((transaction, index) => (
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
                    <EditButton onClick={() => openEditModal(transaction)}>수정</EditButton>
                </TableCell>
                </TableRow>
            ))}
            </tbody>

      </Table>

      {isModalOpen && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={closeEditModal}
          onSave={fetchTransactions}
        />
      )}
    </Container>
  );
};

export default TransactionTable;
