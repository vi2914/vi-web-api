import { randomUUID } from "crypto";
import { getPool } from "../data/db.js";

export async function getMatches() {
    const pool = await getPool();
    const result = await pool.query(
        'SELECT * FROM Game_Match ORDER BY Match_date'
    );
    return result.rows;
}

export async function getMatch(id) {
    const pool = await getPool();
    const result = await pool.query(
        'SELECT * FROM Game_Match WHERE Match_ID = $1',
        [id]
    );
    return result.rows[0];
}

export async function createMatch(matchDate, homeTeamID, awayTeamID, RefereeID, matchTime, arenaID, sportID) {
    const id = randomUUID();
    const pool = await getPool();
    const result = await pool.query(
        `INSERT INTO Game_Match (Match_ID, Home_team_ID, Away_team_ID, Referee_ID, Match_date, Match_time, Arena_ID, Sport_ID)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
        [id, homeTeamID, awayTeamID, RefereeID, matchDate, matchTime, arenaID, sportID]
    );
    return result.rows[0];
}

export async function updateMatch(id, matchDate, homeTeamID, awayTeamID, RefereeID, matchTime, arenaID, sportID) {
    const pool = await getPool();
    const result = await pool.query(
        `UPDATE Game_Match
             SET Home_team_ID = $1, Away_team_ID = $2, Referee_ID = $3, Match_date = $4, Match_time = $5, Arena_ID = $6, Sport_ID = $7
             WHERE Match_ID = $8
             RETURNING *`,
        [homeTeamID, awayTeamID, RefereeID, matchDate, matchTime, arenaID, sportID, id]
    );
    return result.rows[0];
}

export async function deleteMatch(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Game_Match WHERE Match_ID = $1',
        [id]
    );
}

export async function getMatchesBySport(sportId) {
    const pool = await getPool();
    const result = await pool.query(
        `SELECT m.*
         FROM Game_Match m
         JOIN Sport s ON m.Sport_ID = s.Sport_ID
            WHERE s.Sport_ID = $1
            ORDER BY m.Match_date`,
        [sportId]
    );
    return result.rows;
}

export async function getMatchesByTeam(teamId) {
    const pool = await getPool();
    const result = await pool.query(
        `SELECT m.*
         FROM Game_Match m
         JOIN Team t ON (m.Home_team_ID = t.Team_ID OR m.Away_team_ID = t.Team_ID)
            WHERE t.Team_ID = $1
            ORDER BY m.Match_date`,
        [teamId]
    );
    return result.rows;
}

export async function addMatchResult(matchId, matchResult) {
    const pool = await getPool();
    const result = await pool.query(
        `UPDATE Game_Match
             SET Result = $1
             WHERE Match_ID = $2
             RETURNING *`,
        [matchResult, matchId]
    );
    return result.rows[0];
}

export async function getMatchesByDate(datetime) {
    const pool = await getPool();
    const date = datetime.split('T')[0]; // Extract date part
    const result = await pool.query(
        `SELECT *
         FROM Game_Match
         WHERE Match_date = $1
         ORDER BY Match_time`,
        [date]
    );
    return result.rows;
}

export async function getMatchesByReferee(refereeId) {
    const pool = await getPool();
    const result = await pool.query(
        `SELECT m.*
         FROM Game_Match m
         JOIN Referee r ON m.Referee_ID = r.Referee_ID
            WHERE r.Referee_ID = $1
            ORDER BY m.Match_date`,
        [refereeId]
    );
    return result.rows;
}