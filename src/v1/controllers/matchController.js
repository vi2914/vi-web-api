// Controllers/matchController.js

import matchService from "../service/matchService.js";

export const getMatches = async (req, res) => {
    try {
        const matches = await matchService.getAll();

        res.status(200).json(matches);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch matches"
        });
    }
};

export const getMatchById = async (req, res) => {
    try {
        const match = await matchService.getById(
            req.params.id
        );

        if (!match) {
            return res.status(404).json({
                error: "Match not found"
            });
        }

        res.status(200).json(match);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch match"
        });
    }
};

export const createMatch = async (req, res) => {
    try {
        const result = await matchService.create(
            req.body
        );

        res.status(201).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create match"
        });
    }
};

export const updateMatch = async (req, res) => {
    try {
        const updated = await matchService.update(
            req.params.id,
            req.body
        );

        if (!updated) {
            return res.status(404).json({
                error: "Match not found"
            });
        }

        res.status(200).json(updated);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update match"
        });
    }
};

export const deleteMatch = async (req, res) => {
    try {
        const deleted = await matchService.delete(
            req.params.id
        );

        if (!deleted) {
            return res.status(404).json({
                error: "Match not found"
            });
        }

        res.status(200).json({
            message: "Match deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete match"
        });
    }
};

export const getMatchesBySport = async (req, res) => {
    try {
        const matches = await matchService.getBySport(
            req.params.sportId
        );

        res.status(200).json(matches);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch matches by sport"
        });
    }
};

export const getMatchesByTeam = async (req, res) => {
    try {
        const matches = await matchService.getByTeam(
            req.params.teamId
        );

        res.status(200).json(matches);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch matches by team"
        });
    }
};

export const addMatchResult = async (req, res) => {
    try {
        const { homeScore, awayScore } = req.body;

        const result = await matchService.addResult(
            req.params.matchId,
            homeScore,
            awayScore
        );

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to add match result"
        });
    }
};

export const getMatchesByDate = async (req, res) => {
    try {
        const matches = await matchService.getByDate(
            req.params.date
        );

        res.status(200).json(matches);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch matches by date"
        });
    }
};

export const getMatchesByReferee = async (req, res) => {
    try {
        const matches = await matchService.getByReferee(
            req.params.refereeId
        );

        res.status(200).json(matches);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch matches by referee"
        });
    }
};