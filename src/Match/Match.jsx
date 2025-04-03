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
  const [highlightUserId, setHighlightUserId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [userRes, gameRes] = await Promise.all([
        securedAPI.get(`/api/participant/all?eventId=${eventId}`),
        securedAPI.get(`/api/game/all_games?eventId=${eventId}`)
      ]);
      const participants = userRes.data.map(user => ({
        id: user.userId,
        userId: user.userId,
        name: user.userName,
        gender: user.gender === 'FEMALE' ? '여자' : '남자',
        career: user.career,
        lastGamedAt: user.lastGamedAt ? new Date(user.lastGamedAt) : new Date(),
      }));
      setWaitingList(participants);
      const map = {};
      participants.forEach(p => { map[p.id] = p; });
      setAllParticipants(map);
      setGameList(gameRes.data);
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    }
  }, [eventId]);

  useEffect(() => { fetchData(); }, [fetchData]);

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
    setCurrentTempSelection(prev => (
      prev.includes(id) ? prev.filter(x => x !== id)
                        : prev.length < 4 ? [...prev, id] : prev
    ));
  };

  const getWaitingBorderColor = (id) => {
    const index = currentTempSelection.indexOf(id);
    return index !== -1 ? (index < 2 ? "#3b75ff" : "#ff8c00") : "#ccc";
  };

  const createGame = async () => {
    if (currentTempSelection.length !== 4) return alert("4명을 선택해주세요.");
    const res = await securedAPI.post('/api/game/make', {
      userIdList: currentTempSelection,
      eventId,
      clubId: parseInt(clubId),
      matchStartTime: new Date().toISOString()
    });
    setGameList(prev => [...prev, res.data]);
    setCurrentTempSelection([]);
  };

  const startGame = async (gameId, userIdList) => {
    await securedAPI.post('/api/game/start', { gameId: String(gameId), userIdList });
    setGameList(prev => prev.map(g =>
      g.gameId === gameId ? { ...g, status: 'PLAYING', startAt: new Date() } : g
    ));
  };

  const completeGame = async (gameId, score1, score2) => {
    await securedAPI.post(`/api/game/end?gameId=${gameId}&score1=${score1}&score2=${score2}`);
    await fetchData();
  };

  const deleteGame = async (gameId) => {
    await securedAPI.delete(`/api/game/delete?gameId=${gameId}`);
    setGameList(prev => prev.filter(g => g.gameId !== gameId));
  };

  const handleScoreChange = (gameId, teamIndex, value) => {
    setGameList(prev => prev.map(g => {
      if (g.gameId !== gameId) return g;
      const scores = (g.score || "0:0").split(":").map(Number);
      scores[teamIndex] = Number(value);
      return { ...g, score: `${scores[0]}:${scores[1]}` };
    }));
  };

  const getElapsedTime = (startAt) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(startAt)) / 1000);
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
            <Card key={user.id} onClick={() => toggleTempSelection(user.id)} borderColor={getWaitingBorderColor(user.id)}>
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
            const isHighlighted = highlightUserId && game.userIdList.includes(highlightUserId);
            const [teamA, teamB] = [game.userIdList.slice(0, 2), game.userIdList.slice(2, 4)];
            return (
              <GameCard key={game.gameId} $highlighted={isHighlighted}>
                    {(game.status === 'WAITING' || game.status === 'PLAYING') && (
                      <DeleteButton onClick={() => deleteGame(game.gameId)}>×</DeleteButton>
                    )}
                  <TeamWrapper>
                    <TeamColumn>
                      {teamA.map((id, idx) => (
                        <UserNameClickable
                          key={idx}
                          onClick={() => setHighlightUserId(prev => prev === id ? null : id)}
                          $highlighted={highlightUserId === id}
                        >
                          {allParticipants[id] ? allParticipants[id].name : id}
                        </UserNameClickable>
                      ))}
                    </TeamColumn>

                    <Divider />

                    <TeamColumn>
                      {teamB.map((id, idx) => (
                        <UserNameClickable
                          key={idx}
                          onClick={() => setHighlightUserId(prev => prev === id ? null : id)}
                          $highlighted={highlightUserId === id}
                        >
                          {allParticipants[id] ? allParticipants[id].name : id}
                        </UserNameClickable>
                      ))}
                    </TeamColumn>
                  </TeamWrapper>

                <GameFooter>
                  <ScoreBox>
                    {game.status === 'PLAYING' ? (
                      <>
                        <ScoreField
                          type="number"
                          value={(game.score || "0:0").split(":")[0]}
                          onChange={(e) => handleScoreChange(game.gameId, 0, e.target.value)}
                        />
                        :
                        <ScoreField
                          type="number"
                          value={(game.score || "0:0").split(":")[1]}
                          onChange={(e) => handleScoreChange(game.gameId, 1, e.target.value)}
                        />
                      </>
                    ) : (
                      <span>{game.score || "0 : 0"}</span>
                    )}
                  </ScoreBox>

                  {game.status === 'WAITING' && (
                    <Button onClick={() => startGame(game.gameId, game.userIdList)}>시작</Button>
                  )}
                  {game.status === 'PLAYING' && (
                    <>
                      <div style={{ fontSize: '0.85rem', color: '#5fbd7b' }}>{getElapsedTime(game.startAt)}</div>
                      <Button onClick={() => {
                        const [s1, s2] = (game.score || "0:0").split(":");
                        completeGame(game.gameId, s1, s2);
                      }}>완료</Button>
                    </>
                  )} 
                   {game.status === 'DONE' && (
                      <div style={{ height: '1px', visibility: 'hidden' }} />
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
