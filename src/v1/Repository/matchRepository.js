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
        'SELECT * FROM Game_Match WHERE Match_ID = ?',
        [id]
    );
    return result.rows[0];
}

export async function createMatch(matchDate, homeTeamID, awayTeamID, RefereeID, matchTime, arenaID, sportID) {
    const id = randomUUID();
    const pool = await getPool();
    const result = await pool.query(
        `INSERT INTO Game_Match (Match_ID, Home_team_ID, Away_team_ID, Referee_ID, Match_date, Match_time, Arena_ID, Sport_ID)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             RETURNING *`,
        [id, homeTeamID, awayTeamID, RefereeID, matchDate, matchTime, arenaID, sportID]
    );
    return result.rows[0];
}

export async function updateMatch(id, matchDate, homeTeamID, awayTeamID, RefereeID, matchTime, arenaID, sportID) {
    const pool = await getPool();
    const result = await pool.query(
        `UPDATE Game_Match
             SET Home_team_ID = ?, Away_team_ID = ?, Referee_ID = ?, Match_date = ?, Match_time = ?, Arena_ID = ?, Sport_ID = ?
             WHERE Match_ID = ?
             RETURNING *`,
        [homeTeamID, awayTeamID, RefereeID, matchDate, matchTime, arenaID, sportID, id]
    );
    return result.rows[0];
}

export async function deleteMatch(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Game_Match WHERE Match_ID = ?',
        [id]
    );
}

export async function getMatchesBySport(sportId) {
    const pool = await getPool();
    const result = await pool.query(
        `SELECT m.*
         FROM Game_Match m
         JOIN Sport s ON m.Sport_ID = s.Sport_ID
            WHERE s.Sport_ID = ?
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
            WHERE t.Team_ID = ?
            ORDER BY m.Match_date`,
        [teamId]
    );
    return result.rows;
}

export async function addMatchResult(matchId, matchResult) {
    const pool = await getPool();
    const result = await pool.query(
        `UPDATE Game_Match
             SET Result = ?
             WHERE Match_ID = ?
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
         WHERE Match_date = ?
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
            WHERE r.Referee_ID = ?
            ORDER BY m.Match_date`,
        [refereeId]
    );
    return result.rows;
}