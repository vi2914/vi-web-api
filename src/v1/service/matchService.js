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
        return await createMatch(
            data.matchDate,
            data.homeTeamID,
            data.awayTeamID,
            data.RefereeID,
            data.matchTime,
            data.arenaID,
            data.sportID
        );
    }
    async update(id, data) {
        return await updateMatch(
            id,
            data.matchDate,
            data.homeTeamID,
            data.awayTeamID,
            data.RefereeID,
            data.matchTime,
            data.arenaID,
            data.sportID
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