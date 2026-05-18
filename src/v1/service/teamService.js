import {
    getTeams,
    getTeam,
    createTeam,
    updateTeam,
    deleteTeam,
    getTeamsBySport,
    addPlayerToTeam,
    removePlayerFromTeam,
    getPlayersInTeam,
    createTeamWithPlayers,
    createPlayer,
    addTeamManager,
    removeTeamManager,
    getTeamManagers
} from '../Repository/teamRepository.js';

class TeamService {
    async getTeams() {
        return await getTeams();
    }

    async getTeam(id) {
        return await getTeam(id);
    }

    async createTeam(data) {
        return await createTeam(data.Team_name, data.Manager_ID, data.Sport_ID, data.Age_Group_ID);
    }

    async updateTeam(id, data) {
        return await updateTeam(id, data.Team_name, data.Manager_ID, data.Sport_ID, data.Age_Group_ID);
    }

    async deleteTeam(id) {
        return await deleteTeam(id);
    }

    async getTeamsBySport(sportId) {
        return await getTeamsBySport(sportId);
    }

    async addPlayerToTeam(teamId, playerId) {
        return await addPlayerToTeam(teamId, playerId);
    }

    async removePlayerFromTeam(teamId, playerId) {
        return await removePlayerFromTeam(teamId, playerId);
    }

    async getPlayersInTeam(teamId) {
        return await getPlayersInTeam(teamId);
    }

    async createTeamWithPlayers(teamData, playerIds) {
        return await createTeamWithPlayers(teamData.Team_name, teamData.SportId, teamData.AgeGroupId, playerIds);
    }

    async createPlayer(playerData) {
        return await createPlayer(playerData.First_name, playerData.Last_name, playerData.Player_number);
    }

    async addTeamManager(teamId, managerId) {
        return await addTeamManager(teamId, managerId);
    }

    async removeTeamManager(teamId, managerId) {
        return await removeTeamManager(teamId, managerId);
    }

    async getTeamManagers(teamId) {
        return await getTeamManagers(teamId);
    }
}

export default new TeamService();