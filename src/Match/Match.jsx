import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import securedAPI from '../Axios/SecuredAPI';
import { useParams } from 'react-router-dom';

// ─── 기본 레이아웃 및 스타일 ─────────────────────────────

const Container = styled.div`
  padding: 2rem;
`;
const Section = styled.div`
  margin-bottom: 3rem;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const Button = styled.button`
  padding: 0.4rem 1.2rem;
  margin-top: 0.5rem;
  background: #e6e600;
  color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
`;
const Card = styled.div`
  border: 2px solid ${props => props.borderColor || "#ccc"};
  background-color: #fff;
  border-radius: 8px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  min-width: 120px;
  text-align: center;
  transition: 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;
const ScoreField = styled.input`
  width: 30px;
  font-size: 1rem;
  text-align: center;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
`;
const TimeText = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
`;

// ─── 게임 목록 관련 스타일 ─────────────────────────────

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;
const GameCard = styled.div`
  background-color: #2e8b57;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border: 2px solid white;
  display: flex;
  flex-direction: row;
  font-size: 0.9rem;
  color: white;
  height: 140px;
  overflow: hidden;
  position: relative;
`;
const LeftSection = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MiddleLine = styled.div`
  width: 2px;
  background-color: white;
`;
const RightSection = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TeamRow = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.3rem;
`;
const TeamDivider = styled.div`
  width: 100%;
  height: 2px;
  background-color: white;
  margin: 0.4rem 0;
`;
const ScoreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
`;

// 삭제 버튼 (게임 카드 우측 상단)
const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: red;
`;

// ─── Main Component ─────────────────────────────

const Match = () => {
  const [waitingList, setWaitingList] = useState([]);
  const [gameList, setGameList] = useState([]);
  // 전체 참가자 정보를 id → participant 객체로 저장 (대기자 명단 UI에서 사용)
  const [allParticipants, setAllParticipants] = useState({});
  // 팀 생성용으로 선택한 참가자 ID (최대 4명)
  const [currentTempSelection, setCurrentTempSelection] = useState([]);
  const { clubId } = useParams();
  const [elapsedTimes, setElapsedTimes] = useState({});

  // 백엔드에서 전체 참가자와 게임 목록을 불러옴
  const fetchData = async () => {
    try {
      const [userRes, gameRes] = await Promise.all([
        securedAPI.get(`/api/participant/all?eventId=6`),
        securedAPI.get(`/api/game/all_games?eventId=6`)
      ]);
      const participants = userRes.data.map(user => ({
        id: user.userId,
        userId: user.userId,
        name: user.userName,
        gender: user.gender === 'FEMALE' ? '여자' : '남자',
        career: user.career,
        lastGamedAt: user.lastGamedAt ? new Date(user.lastGamedAt) : new Date(),
      }));
      // 대기자 명단은 항상 전체 참가자를 표시
      setWaitingList(participants);
      const participantMap = {};
      participants.forEach(p => { participantMap[p.id] = p; });
      setAllParticipants(participantMap);
      setGameList(gameRes.data);
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 대기자 명단의 경과 시간 갱신 (lastGamedAt 기준)
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

  // 대기자 카드 클릭: 선택 상태 토글
  const toggleTempSelection = (id) => {
    setCurrentTempSelection(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length < 4) return [...prev, id];
      return prev;
    });
  };

  // 대기자 카드의 테두리 색상: 
  // 선택 상태일 경우, 첫 두명은 파란색, 다음 두명은 주황색; 기본은 회색.
  const getWaitingBorderColor = (id) => {
    const index = currentTempSelection.indexOf(id);
    if (index !== -1) {
      return index < 2 ? "#3b75ff" : "#ff8c00";
    }
    return "#ccc";
  };

  // 팀 생성 버튼 클릭 시, 선택된 4명으로 게임 생성 (대기자 명단의 카드는 유지됨)
  const createGame = async () => {
    if (currentTempSelection.length !== 4) {
      alert("4명을 선택해야 게임을 생성할 수 있습니다.");
      return;
    }
    const userIdList = currentTempSelection;
    const matchStartTime = new Date().toISOString();
    try {
      const res = await securedAPI.post('/api/game/make', {
        userIdList,
        eventId: 6,
        clubId: parseInt(clubId),
        matchStartTime,
      });
      setGameList(prev => [...prev, res.data]);
      // 선택 상태 초기화 (대기자 명단의 카드들은 그대로 유지)
      setCurrentTempSelection([]);
    } catch (err) {
      console.error("게임 생성 실패:", err);
    }
  };

  // ── 기존 게임 관련 함수 ──

  const startGame = async (gameId, userIdList) => {
    try {
      const dto = { gameId: String(gameId), userIdList };
      await securedAPI.post('/api/game/start', dto);
      setGameList(prev =>
        prev.map(g =>
          g.gameId === gameId ? { ...g, status: 'PLAYING', startAt: new Date() } : g
        )
      );
    } catch (err) {
      console.error("게임 시작 실패:", err);
    }
  };

  const updateParticipants = async () => {
    try {
      const res = await securedAPI.get(`/api/participant/update?eventId=6`);
      const participants = res.data.map(user => ({
        id: user.userId,
        userId: user.userId,
        name: user.userName,
        gender: user.gender === 'FEMALE' ? '여자' : '남자',
        career: user.career,
        lastGamedAt: user.lastGamedAt ? new Date(user.lastGamedAt) : new Date(),
      }));
      setWaitingList(participants);
      const participantMap = {};
      participants.forEach(p => { participantMap[p.id] = p; });
      setAllParticipants(participantMap);
    } catch (err) {
      console.error("참가자 목록 업데이트 실패:", err);
    }
  };
  
  const completeGame = async (gameId, score1, score2) => {
    try {
      const url = `/api/game/end?gameId=${gameId}&score1=${score1}&score2=${score2}`;
      await securedAPI.post(url);
      // 완료 API 호출 후, 백엔드에서 업데이트된 참가자 목록을 가져와 동기화
      await updateParticipants();
      // 로컬 상태에서도 해당 게임의 상태를 완료로 업데이트
      setGameList(prev =>
        prev.map(game =>
          game.gameId === gameId 
            ? { ...game, status: "DONE", score: `${score1}:${score2}` }
            : game
        )
      );
    } catch (err) {
      console.error("게임 종료 실패:", err);
    }
  };
  
  

  const handleScoreChange = (gameId, teamIndex, value) => {
    setGameList(prev =>
      prev.map(g => {
        if (g.gameId === gameId) {
          const scores = (g.score || "0:0").split(":").map(Number);
          scores[teamIndex] = Number(value);
          return { ...g, score: `${scores[0]}:${scores[1]}` };
        }
        return g;
      })
    );
  };

  const getElapsedTime = (startAt) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(startAt)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}분 ${secs < 10 ? "0" : ""}${secs}초`;
  };

  return (
    <Container>
      {/* 대기자 명단 영역 */}
      <Section>
        <Title>대기자 명단</Title>
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
          <Button onClick={createGame}>게임 생성 (팀 생성)</Button>
        )}
      </Section>

      {/* 게임 목록 영역 */}
      <Section>
        <Title>게임 목록</Title>
        <GameGrid>
          {gameList.map(game => (
            <GameCard key={game.gameId}>
              {/* 삭제 버튼: 게임 상태가 WAITING이면 우측 상단에 X 표시 */}
              {game.status === 'WAITING' && (
                <DeleteButton
                  onClick={() => {
                    securedAPI.post(`/api/game/delete?gameId=${game.gameId}`)
                      .then(() => {
                        setGameList(prev => prev.filter(g => g.gameId !== game.gameId));
                      })
                      .catch(err => console.error("게임 삭제 실패:", err));
                  }}
                >
                  X
                </DeleteButton>
              )}
              <LeftSection>
                <TeamRow>
                  {game.userIdList.slice(0,2).map((id, idx) => (
                    <div key={idx}>
                      {allParticipants[id] ? allParticipants[id].name : id}
                    </div>
                  ))}
                </TeamRow>
                <TeamRow>
                  {game.userIdList.slice(2,4).map((id, idx) => (
                    <div key={idx}>
                      {allParticipants[id] ? allParticipants[id].name : id}
                    </div>
                  ))}
                </TeamRow>
              </LeftSection>
              <MiddleLine />
              <RightSection>
                {game.status !== 'DONE' && (
                  <ScoreRow>
                    <ScoreField
                      type="number"
                      value={(game.score || "0:0").split(":")[0]}
                      onChange={(e) => handleScoreChange(game.gameId, 0, e.target.value)}
                    />
                    <div>:</div>
                    <ScoreField
                      type="number"
                      value={(game.score || "0:0").split(":")[1]}
                      onChange={(e) => handleScoreChange(game.gameId, 1, e.target.value)}
                    />
                  </ScoreRow>
                )}
                {game.status === 'PLAYING' && (
                  <div style={{ marginBottom: "0.3rem" }}>
                    {getElapsedTime(game.startAt)}
                  </div>
                )}
                {game.status === 'WAITING' && (
                  <Button onClick={() => startGame(game.gameId, game.userIdList)}>
                    시작
                  </Button>
                )}
                {game.status === 'PLAYING' && (
                  <Button onClick={() => {
                    // 기본값 "0:0"을 사용하여 안전하게 split 처리
                    const scoreString = game.score || "0:0";
                    const [score1, score2] = scoreString.split(":");
                    completeGame(game.gameId, score1, score2);
                  }}>
                    완료
                  </Button>
                )}
                {game.status === 'DONE' && (
                  <div style={{ fontSize: "1rem" }}>{game.score}</div>
                )}
              </RightSection>
            </GameCard>
          ))}
        </GameGrid>
      </Section>
    </Container>
  );
};

export default Match;
