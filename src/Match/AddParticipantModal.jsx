import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import securedAPI from '../Axios/SecuredAPI';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  position : relative;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 800px;
  max-height: 85vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

const ActionButton = styled.button`
  margin-top: 2rem;
  background-color: #5fbd7b;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #4fa46a;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #444;
`;

const UserCard = styled.div`
  padding: 1rem;
  border: 2px solid ${({ $selected }) => ($selected ? '#5fbd7b' : '#ddd')};
  border-radius: 12px;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.2s ease;
  box-shadow: ${({ $selected }) => ($selected ? '0 0 0 2px #5fbd7b' : 'none')};

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 0 3px #d3f255;
  }
`;

const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.6rem;
`;

const UserName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const RoleBadge = styled.div`
  background-color: ${({ $role }) => {
    switch ($role) {
      case 'LEADER': return '#4682B4';
      case 'MANAGER': return '#ffa94d';
      case 'REGULAR': return '#5fbd7b';
      case 'INACTIVE': return '#ccc';
      default: return '#999';
    }
  }};
  color: white;
  font-weight : 700;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  margin-top: 0.3rem;
`;

const UserDetail = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.2rem;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
const Icon = styled.span`
  margin-right: 0.55rem;
`;

const AddParticipantModal = ({ clubId, eventId, onClose, onSuccess }) => {
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchClubUsers = async () => {
      try {
        const response = await securedAPI.get(`/api/membership/all-members?clubId=${clubId}`);
        setUsers(response.data);
      } catch (error) {
        console.error('회원 목록 가져오기 실패:', error);
      }
    };
    fetchClubUsers();
  }, [clubId]);

  const toggleSelect = (membershipId) => {
    setSelectedIds(prev =>
      prev.includes(membershipId)
        ? prev.filter(id => id !== membershipId)
        : [...prev, membershipId]
    );
  };

  const handleSubmit = async () => {
    if (selectedIds.length === 0) {
      alert("선택된 유저가 없습니다.");
      return;
    }

    try {
      await Promise.all(
        selectedIds.map(id =>
          securedAPI.post(`/api/participant/add?eventId=${eventId}&membershipId=${id}`)
        )
      );
      alert(`✅ ${selectedIds.length}명 추가 완료`);
      onSuccess();
    } catch (error) {
      console.error("참가자 추가 실패:", error);
      alert("❌ 참가자 추가 실패");
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>회원 선택</Title>
        <UserGrid>
          {users.map(user => (
            <UserCard
              key={user.membershipId}
              onClick={() => toggleSelect(user.membershipId)}
              $selected={selectedIds.includes(user.membershipId)}
            >
              <UserNameWrapper>
                <UserName>{user.userName}</UserName>
                <RoleBadge $role={user.role}>
                  {user.role === 'LEADER' && '리더'}
                  {user.role === 'MANAGER' && '운영진'}
                  {user.role === 'REGULAR' && '정회원'}
                  {user.role === 'INACTIVE' && '휴회원'}
                </RoleBadge>
              </UserNameWrapper>
              <UserDetail>
                  <Icon>📞</Icon>
                    {user.userTel}
                </UserDetail>
              <UserDetail>
              <Icon>🎂</Icon>
                  {user.birthDate}
                </UserDetail>
              <UserDetail>
                <Icon>📍</Icon> 
                 {user.region}
                 </UserDetail>
              <UserDetail>
                <Icon>🧬</Icon> 
                 {user.gender === 'FEMALE' ? '여자' : '남자'} / {user.career}년차
                 </UserDetail>
              <UserDetail>📈 출석률 {user.attendanceRate}%</UserDetail>
            </UserCard>
          ))}
        </UserGrid>
        <ActionWrapper>
          <ActionButton onClick={handleSubmit}>
            선택한 {selectedIds.length}명 추가하기
          </ActionButton>
        </ActionWrapper>
      </ModalBox>
    </ModalBackdrop>
  );
};

export default AddParticipantModal;
