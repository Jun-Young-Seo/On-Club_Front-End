import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import securedAPI from '../Axios/SecuredAPI';
import { useParams } from 'react-router-dom';
import AddParticipantModal from './AddParticipantModal';

const Container = styled.div` padding: 2rem; `;
const Section = styled.div` margin-bottom: 3rem; `;
const SectionTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const Title = styled.h2` font-size: 1.5rem; margin-bottom: 1rem; `;
const Button = styled.button`
  padding: 0.4rem 1.2rem;
  background: #e6e600;
  color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
`;

const StartButton = styled.button`
  padding: 0.4rem 1.2rem;
  margin-top : 1.2rem;
  background: #e6e600;
  color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const Card = styled.div`
  border: 2px solid ${props => props.borderColor || "#ccc"};
  background-color: #fff;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  min-width: 120px;
  text-align: center;
  transition: 0.2s;
  &:hover { transform: scale(1.02); }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;
const GameCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #5fbd7b;
  border: ${({ $highlighted }) => ($highlighted ? '10px solid #ffd700' : '1px solid #ddd')};
  border-radius: 10px;
  padding: 1rem;
  transition: border 0.3s ease;
`;
const TeamWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const TeamColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  align-items: center;
`;
const Divider = styled.div`
  width: 3px;
  background-color: white;
  height: 100%;
  margin: 0 1.5rem;
`;
const UserNameClickable = styled.div`
  cursor: pointer;
  color: white;
  padding: 0.2rem 0.5rem;
  border: ${({ $highlighted }) => ($highlighted ? '2px solid #ffd700' : 'none')};
  border-radius: 6px;
  font-weight: bold;
  font-size:1.3rem;
`;
const TimeText = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.3rem;
`;
const ScoreBox = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  background: #fff;
  color: #5fbd7b;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  min-width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;
const ScoreField = styled.input`
  width: 28px;
  text-align: center;
  font-size: 1.4rem;
  border: none;
  border-bottom: 2px solid #5fbd7b;
  outline: none;
  background: transparent;
  color: #5fbd7b;
  padding: 0;
`;
const GameFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 6px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: red;
  cursor: pointer;
`;

// ─── Main Component ─────────────────────────────

const Match = () => {
  const { clubId, eventId } = useParams();
  const [waitingList, setWaitingList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [allParticipants, setAllParticipants] = useState({});
  const [currentTempSelection, setCurrentTempSelection] = useState([]);
  const [elapsedTimes, setElapsedTimes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightName, setHighlightName] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [userRes, gameRes] = await Promise.all([
        securedAPI.get(`/api/participant/all?eventId=${eventId}`),
        securedAPI.get(`/api/game/all_games?eventId=${eventId}`)
      ]);

      // 대기자 명단
      const participants = userRes.data.map(user => ({
        id: user.userId,
        userId: user.userId,
        name: user.userName,
        gender: user.gender === 'FEMALE' ? '여자' : '남자',
        career: user.career,
        lastGamedAt: user.lastGamedAt ? new Date(user.lastGamedAt) : new Date(),
      }));
      console.log(gameRes.data);
      setWaitingList(participants);
      const map = {};
      participants.forEach(p => { map[p.id] = p; });
      setAllParticipants(map);

      // 게임 목록 (GetGameDto)
      setGameList(gameRes.data);
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    }
  }, [eventId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 대기자 경과 시간 계산
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updated = {};
      waitingList.forEach(p => {
        const diffSec = Math.floor((now - p.lastGamedAt) / 1000);
        const minutes = Math.floor(diffSec / 60);
        const secs = diffSec % 60;
        updated[p.id] = `${minutes}분 ${secs < 10 ? "0" : ""}${secs}초`;
      });
      setElapsedTimes(updated);
    }, 1000);
    return () => clearInterval(interval);
  }, [waitingList]);

const toggleTempSelection = (id) => {
  setCurrentTempSelection(prev => {
    const idx = prev.indexOf(id);
    if (idx !== -1) {
      return prev.filter(x => x !== id);
    }

    if (prev.length >= 4) return prev;

    return [...prev, id];
  });
};

  const getWaitingBorderColor = (id) => {
    const idx = currentTempSelection.indexOf(id);
    if (idx === -1) return "#ccc";
    return idx < 2 ? "#3b75ff" : "#ff8c00";
  };

  const createGame = async () => {
    if (currentTempSelection.length !== 4) {
      return alert("4명을 선택해주세요.");
    }
    try {
      await securedAPI.post('/api/game/make', {
        clubId: parseInt(clubId, 10),
        eventId: parseInt(eventId, 10),
        userIdListForTeamOne: currentTempSelection.slice(0, 2),
        userIdListForTeamTwo: currentTempSelection.slice(2, 4),
      });
      setCurrentTempSelection([]);
      await fetchData();
    } catch (err) {
      console.error("게임 생성 실패:", err);
    }
  };

  const startGame = async (gameId) => {
    try {
      await securedAPI.post(`/api/game/start?gameId=${gameId}`);
      await fetchData();
    } catch (err) {
      console.error("게임 시작 실패:", err);
    }
  };

const completeGame = async (gameId, teamOneScore, teamTwoScore, teamOneId, teamTwoId) => {
  try {
    await securedAPI.post('/api/game/end', {
      gameId,
      teamOneId,
      teamTwoId,
      teamOneScore,
      teamTwoScore
    });
    await fetchData();
  } catch (err) {
    console.error("게임 종료 실패:", err);
  }
};


  const deleteGame = async (gameId) => {
    try {
      await securedAPI.delete(`/api/game/delete?gameId=${gameId}`);
      setGameList(prev => prev.filter(g => g.gameId !== gameId));
    } catch (err) {
      console.error("게임 삭제 실패:", err);
    }
  };

  const handleScoreChange = (gameId, teamIndex, value) => {
    setGameList(prev =>
      prev.map(g => {
        if (g.gameId !== gameId) return g;
        if (teamIndex === 0) {
          return { ...g, teamOneScore: Number(value) };
        } else {
          return { ...g, teamTwoScore: Number(value) };
        }
      })
    );
  };

  const getStatus = (game) => {
    if (!game.joinedAt) return 'WAITING';
    if (!game.finishedAt) return 'PLAYING';
    return 'DONE';
  };

  const getElapsedTime = (startedAt) => {
    if (!startedAt) return '';
    const now = new Date();
    const seconds = Math.floor((now - new Date(startedAt)) / 1000);
    return `${Math.floor(seconds / 60)}분 ${seconds % 60}초`;
  };

  return (
    <Container>
      <Section>
        <SectionTitleRow>
          <Title>대기자 명단</Title>
          <Button onClick={() => setIsModalOpen(true)}>회원 추가하기</Button>
        </SectionTitleRow>
        <FlexWrap>
          {waitingList.map(user => (
            <Card
              key={user.id}
              onClick={() => toggleTempSelection(user.id)}
              borderColor={getWaitingBorderColor(user.id)}
            >
              <div>{user.name}</div>
              <TimeText>{elapsedTimes[user.id]}</TimeText>
              <TimeText>{user.gender} / {user.career}년차</TimeText>
            </Card>
          ))}
        </FlexWrap>
        {currentTempSelection.length === 4 && (
          <StartButton onClick={createGame}>게임 생성</StartButton>
        )}
      </Section>

      <Section>
        <Title>게임 목록</Title>
        <GameGrid>
          {gameList.map(game => {
            const status = getStatus(game);
            const isHighlighted = highlightName && game.userNames.includes(highlightName);
            const teamA = game.userNames.slice(0, 2);
            const teamB = game.userNames.slice(2, 4);

            return (
              <GameCard key={game.gameId} $highlighted={isHighlighted}>
                {(status === 'WAITING' || status === 'PLAYING') && (
                  <DeleteButton onClick={() => deleteGame(game.gameId)}>×</DeleteButton>
                )}

                <TeamWrapper>
                  <TeamColumn>
                    {teamA.map((name, idx) => (
                      <UserNameClickable
                        key={idx}
                        onClick={() => setHighlightName(prev => prev === name ? null : name)}
                        $highlighted={highlightName === name}
                      >
                        {name}
                      </UserNameClickable>
                    ))}
                  </TeamColumn>

                  <Divider />

                  <TeamColumn>
                    {teamB.map((name, idx) => (
                      <UserNameClickable
                        key={idx}
                        onClick={() => setHighlightName(prev => prev === name ? null : name)}
                        $highlighted={highlightName === name}
                      >
                        {name}
                      </UserNameClickable>
                    ))}
                  </TeamColumn>
                </TeamWrapper>

                <GameFooter>
                  <ScoreBox>
                    {status === 'PLAYING' ? (
                      <>
                        <ScoreField
                          type="number"
                          value={game.teamOneScore ?? 0}
                          onChange={e => handleScoreChange(game.gameId, 0, e.target.value)}
                        />
                        :
                        <ScoreField
                          type="number"
                          value={game.teamTwoScore ?? 0}
                          onChange={e => handleScoreChange(game.gameId, 1, e.target.value)}
                        />
                      </>
                    ) : (
                      <span>
                        {(game.teamOneScore ?? 0)} : {(game.teamTwoScore ?? 0)}
                      </span>
                    )}
                  </ScoreBox>

                  {status === 'WAITING' && (
                    <Button onClick={() => startGame(game.gameId)}>시작</Button>
                  )}
                  {status === 'PLAYING' && (
                    <>
                      <div style={{ fontSize: '0.85rem', color: '#5fbd7b' }}>
                        {getElapsedTime(game.joinedAt)}
                      </div>
                    <Button onClick={() => completeGame(
                      game.gameId,
                      game.teamOneScore ?? 0,
                      game.teamTwoScore ?? 0,
                      game.teamOneId,
                      game.teamTwoId
                    )}>
                      완료
                    </Button>
                    </>
                  )}
                  {status === 'DONE' && (
                    <div style={{ fontSize: '0.85rem', color: '#999' }}>
                      완료: {new Date(game.finishedAt).toLocaleTimeString()}
                    </div>
                  )}
                </GameFooter>
              </GameCard>
            );
          })}
        </GameGrid>
      </Section>

      {isModalOpen && (
        <AddParticipantModal
          clubId={clubId}
          eventId={eventId}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            fetchData();
            setIsModalOpen(false);
          }}
        />
      )}
    </Container>
  );
};

export default Match;