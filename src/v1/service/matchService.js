import { 
    getMatches,
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch,
    getMatchesBySport,
    getMatchesByTeam,
    addMatchResult,
    getMatchesByDate,
    getMatchesByReferee
} from '../Repository/matchRepository.js';

class MatchService {
    async getAll() {
        return await getMatches();
    }
    async getById(id) {
        return await getMatch(id);
    }
    async create(data) {
        const date = data.Match_date; // Assuming this is in 'YYYY-MM-DD' format
        const time = data.Match_time; // Assuming this is in 'HH:mm:ss' format

        // Combine into ISO format: YYYY-MM-DDTHH:mm:ss
        const dateTimeString = `${date}T${time}`;

        const timestamp = new Date(dateTimeString).getTime();
        return await createMatch(
            data.Home_team_ID,
            data.Away_team_ID,
            data.Referee_ID,
            timestamp,
            data.Arena_ID,
            data.Sport_ID
        );
    }
    async update(id, data) {
        const date = data.Match_date; // Assuming this is in 'YYYY-MM-DD' format
        const time = data.Match_time; // Assuming this is in 'HH:mm:ss' format
        const dateTimeString = `${date}T${time}`;
        const timestamp = new Date(dateTimeString).getTime();
        return await updateMatch(
            id,
            data.Home_team_ID,
            data.Away_team_ID,
            data.Referee_ID,
            timestamp,
            data.Arena_ID,
            data.Sport_ID
        );
    }
    async delete(id) {
        return await deleteMatch(id);
    }
    async getBySport(sportId) {
        return await getMatchesBySport(sportId);
    }
    async getByTeam(teamId) {
        return await getMatchesByTeam(teamId);
    }
    async addResult(matchId, homeScore, awayScore) {
        const result = `${homeScore}-${awayScore}`;
        return await addMatchResult(matchId, result);
    }
    async getByDate(datetime) {
        return await getMatchesByDate(datetime);
    }
    async getByReferee(refereeId) {
        return await getMatchesByReferee(refereeId);
    }
}

export default new MatchService();