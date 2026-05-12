import { randomUUID } from "crypto";
import { getPool } from "../data/db.js";

/* ---------------- MATCHES ---------------- */

export async function getMatches() {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT * FROM Game_Match ORDER BY Match_Time'
    );
    return rows;
}

export async function getMatch(id) {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT * FROM Game_Match WHERE Match_ID = ?',
        [id]
    );
    return rows[0];
}

export async function createMatch(matchDate, homeTeamID, awayTeamID, RefereeID, matchTime, arenaID, sportID) {
    const id = randomUUID();
    const pool = await getPool();

    await pool.query(
        `INSERT INTO Game_Match 
        (Match_ID, Home_team_ID, Away_team_ID, Referee_ID, Match_Time, Arena_ID, Sport_ID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, homeTeamID, awayTeamID, RefereeID, matchTime, arenaID, sportID]
    );

    const [rows] = await pool.query(
        'SELECT * FROM Game_Match WHERE Match_ID = ?',
        [id]
    );

    return rows[0];
}

export async function updateMatch(id, matchDate, homeTeamID, awayTeamID, RefereeID, matchTime, arenaID, sportID) {
    const pool = await getPool();

    await pool.query(
        `UPDATE Game_Match
         SET Home_team_ID = ?, Away_team_ID = ?, Referee_ID = ?, Match_Time = ?, Arena_ID = ?, Sport_ID = ?
         WHERE Match_ID = ?`,
        [homeTeamID, awayTeamID, RefereeID, matchTime, arenaID, sportID, id]
    );

    const [rows] = await pool.query(
        'SELECT * FROM Game_Match WHERE Match_ID = ?',
        [id]
    );

    return rows[0];
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
    const [rows] = await pool.query(
        `SELECT m.*
         FROM Game_Match m
         JOIN Sport s ON m.Sport_ID = s.Sport_ID
         WHERE s.Sport_ID = ?
         ORDER BY m.Match_Time`,
        [sportId]
    );
    return rows;
}

export async function getMatchesByTeam(teamId) {
    const pool = await getPool();
    const [rows] = await pool.query(
        `SELECT m.*
         FROM Game_Match m
         JOIN Team t ON (m.Home_team_ID = t.Team_ID OR m.Away_team_ID = t.Team_ID)
         WHERE t.Team_ID = ?
         ORDER BY m.Match_Time`,
        [teamId]
    );
    return rows;
}

export async function addMatchResult(matchId, matchResult) {
    const pool = await getPool();

    await pool.query(
        `UPDATE Game_Match
         SET Result = ?
         WHERE Match_ID = ?`,
        [matchResult, matchId]
    );

    const [rows] = await pool.query(
        'SELECT * FROM Game_Match WHERE Match_ID = ?',
        [matchId]
    );

    return rows[0];
}

export async function getMatchesByDate(datetime) {
    const pool = await getPool();
    const date = datetime.split('T')[0];

    const [rows] = await pool.query(
        `SELECT *
         FROM Game_Match
         WHERE Match_Time = ?
         ORDER BY Match_Time`,
        [date]
    );

    return rows;
}

export async function getMatchesByReferee(refereeId) {
    const pool = await getPool();
    const [rows] = await pool.query(
        `SELECT m.*
         FROM Game_Match m
         JOIN Referee r ON m.Referee_ID = r.Referee_ID
         WHERE r.Referee_ID = ?
         ORDER BY m.Match_Time`,
        [refereeId]
    );

    return rows;
}