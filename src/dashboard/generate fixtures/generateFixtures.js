import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../redux/actions/teamsAction";

export default function GenerateFixtures() {
  const dispatch = useDispatch();
  const registeredTeams = useSelector((state) => state.teamsReducer.allTeams);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);
  
  const allTeams = [];

  registeredTeams.map((team) => {
    return allTeams.push(team.team);
  })

    const testData = allTeams;

    const matchParticipants = (participants) => {
      const p = Array.from(participants);
      if (p % 2 === 1) {
        p.push(null);
      }
      const pairings = [];
      while (p.length !== 0) {
        let participantA = p.shift();
        let participantB = p.pop();
        if (participantA !== undefined && participantB !== undefined) {
          pairings.push([`${participantA} vs ${participantB}`]);
        }
      }
      return pairings;
    };

    const rotateArray = (array) => {
      const p = Array.from(array);
      const firstElement = p.shift();
      const lastElement = p.pop();
      return [firstElement, lastElement, ...p];
    };

    const generateTournament = (participants) => {
      const tournamentRounds = [];
      const rounds = Math.ceil(participants.length / 2);
      let p = Array.from(participants);
      for (let i = 0; i < rounds; i++) {
        tournamentRounds.push(matchParticipants(p));
        p = rotateArray(p);
      }
      return tournamentRounds;
    };

    
  const matchday1 = generateTournament(testData)[0];
  const matchday2 = generateTournament(testData)[1];
  const matchday3 = generateTournament(testData)[2];
  const matchday4 = generateTournament(testData)[3];

  console.log(matchday1);

  return (
    <div>
      <div className="container-lg">
        <div className="row justify-content-around">
          <div className="col-lg-3">
            <div className="lead text-center my-4 text-bold">Registered teams</div>
         
            <ol className="list-group group list-group-numbered">
              {registeredTeams.map((teams) => (
                <li className="list-group-item" key={teams.name}>{`${teams.team}`}</li>
              ))}
            </ol>
          </div>
          <div className="col-lg-5">
            <div className="text-center lead py-4">Fixtures</div>
          </div>
        </div>
      </div>
    </div>
  );
}
