// Controllers/teamController.js

import teamService from "../service/teamService.js";

/* =========================
   TEAMS
========================= */

export const getTeams = async (req, res) => {
    try {
        const teams = await teamService.getTeams();

        res.status(200).json(teams);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch teams"
        });
    }
};

export const getTeam = async (req, res) => {
    try {
        const team = await teamService.getTeam(
            req.params.id
        );

        if (!team) {
            return res.status(404).json({
                error: "Team not found"
            });
        }

        res.status(200).json(team);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch team"
        });
    }
};

export const createTeam = async (req, res) => {
    try {
        const result = await teamService.createTeam(
            req.body
        );

        res.status(201).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create team"
        });
    }
};

export const updateTeam = async (req, res) => {
    try {
        const updated = await teamService.updateTeam(
            req.params.id,
            req.body
        );

        if (!updated) {
            return res.status(404).json({
                error: "Team not found"
            });
        }

        res.status(200).json(updated);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update team"
        });
    }
};

export const deleteTeam = async (req, res) => {
    try {
        const deleted = await teamService.deleteTeam(
            req.params.id
        );

        if (!deleted) {
            return res.status(404).json({
                error: "Team not found"
            });
        }

        res.status(200).json({
            message: "Team deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete team"
        });
    }
};

export const getTeamsBySport = async (req, res) => {
    try {
        const teams = await teamService.getTeamsBySport(
            req.params.sportId
        );

        res.status(200).json(teams);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch teams by sport"
        });
    }
};

/* =========================
   PLAYERS
========================= */

export const addPlayerToTeam = async (req, res) => {
    try {
        const result = await teamService.addPlayerToTeam(
            req.params.teamId,
            req.params.playerId
        );

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to add player to team"
        });
    }
};

export const removePlayerFromTeam = async (req, res) => {
    try {
        const result = await teamService.removePlayerFromTeam(
            req.params.teamId,
            req.params.playerId
        );

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to remove player from team"
        });
    }
};

export const getPlayersInTeam = async (req, res) => {
    try {
        const players = await teamService.getPlayersInTeam(
            req.params.teamId
        );

        res.status(200).json(players);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch players in team"
        });
    }
};

export const createPlayer = async (req, res) => {
    try {
        const player = await teamService.createPlayer(
            req.body
        );

        res.status(201).json(player);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create player"
        });
    }
};

export const createTeamWithPlayers = async (req, res) => {
    try {
        const { teamData, playerIds } = req.body;

        const result = await teamService.createTeamWithPlayers(
            teamData,
            playerIds
        );

        res.status(201).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create team with players"
        });
    }
};

/* =========================
   TEAM MANAGERS
========================= */

export const addTeamManager = async (req, res) => {
    try {
        const result = await teamService.addTeamManager(
            req.params.teamId,
            req.params.managerId
        );

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to add team manager"
        });
    }
};

export const removeTeamManager = async (req, res) => {
    try {
        const result = await teamService.removeTeamManager(
            req.params.teamId,
            req.params.managerId
        );

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to remove team manager"
        });
    }
};

export const getTeamManagers = async (req, res) => {
    try {
        const managers = await teamService.getTeamManagers(
            req.params.teamId
        );

        res.status(200).json(managers);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch team managers"
        });
    }
};