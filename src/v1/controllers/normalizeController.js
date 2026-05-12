// Controllers/normalizeController.js

import normalizeService from "../service/normalizeService.js";

/* =========================
   AGE GROUPS
========================= */

export const getAgeGroups = async (req, res) => {
    try {
        const groups = await normalizeService.getAgeGroups();

        res.status(200).json(groups);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch age groups"
        });
    }
};

export const getAgeGroup = async (req, res) => {
    try {
        const group = await normalizeService.getAgeGroup(
            req.params.id
        );

        if (!group) {
            return res.status(404).json({
                error: "Age group not found"
            });
        }

        res.status(200).json(group);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch age group"
        });
    }
};

export const createAgeGroup = async (req, res) => {
    try {
        const result = await normalizeService.createAgeGroup(
            req.body
        );

        res.status(201).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create age group"
        });
    }
};

export const updateAgeGroup = async (req, res) => {
    try {
        const updated = await normalizeService.updateAgeGroup(
            req.params.id,
            req.body
        );

        if (!updated) {
            return res.status(404).json({
                error: "Age group not found"
            });
        }

        res.status(200).json(updated);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update age group"
        });
    }
};

export const deleteAgeGroup = async (req, res) => {
    try {
        const deleted = await normalizeService.deleteAgeGroup(
            req.params.id
        );

        if (!deleted) {
            return res.status(404).json({
                error: "Age group not found"
            });
        }

        res.status(200).json({
            message: "Age group deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete age group"
        });
    }
};

/* =========================
   SPORTS
========================= */

export const getSports = async (req, res) => {
    try {
        const sports = await normalizeService.getSports();

        res.status(200).json(sports);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch sports"
        });
    }
};

export const getSport = async (req, res) => {
    try {
        const sport = await normalizeService.getSport(
            req.params.id
        );

        if (!sport) {
            return res.status(404).json({
                error: "Sport not found"
            });
        }

        res.status(200).json(sport);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch sport"
        });
    }
};

export const createSport = async (req, res) => {
    try {
        const result = await normalizeService.createSport(
            req.body
        );

        res.status(201).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create sport"
        });
    }
};

export const updateSport = async (req, res) => {
    try {
        const updated = await normalizeService.updateSport(
            req.params.id,
            req.body
        );

        if (!updated) {
            return res.status(404).json({
                error: "Sport not found"
            });
        }

        res.status(200).json(updated);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update sport"
        });
    }
};

export const deleteSport = async (req, res) => {
    try {
        const deleted = await normalizeService.deleteSport(
            req.params.id
        );

        if (!deleted) {
            return res.status(404).json({
                error: "Sport not found"
            });
        }

        res.status(200).json({
            message: "Sport deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete sport"
        });
    }
};

/* =========================
   ARENAS
========================= */

export const getArenas = async (req, res) => {
    try {
        const arenas = await normalizeService.getArenas();

        res.status(200).json(arenas);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch arenas"
        });
    }
};

export const getArena = async (req, res) => {
    try {
        const arena = await normalizeService.getArena(
            req.params.id
        );

        if (!arena) {
            return res.status(404).json({
                error: "Arena not found"
            });
        }

        res.status(200).json(arena);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch arena"
        });
    }
};

export const createArena = async (req, res) => {
    try {
        const result = await normalizeService.createArena(
            req.body
        );

        res.status(201).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create arena"
        });
    }
};

export const updateArena = async (req, res) => {
    try {
        const updated = await normalizeService.updateArena(
            req.params.id,
            req.body
        );

        if (!updated) {
            return res.status(404).json({
                error: "Arena not found"
            });
        }

        res.status(200).json(updated);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update arena"
        });
    }
};

export const deleteArena = async (req, res) => {
    try {
        const deleted = await normalizeService.deleteArena(
            req.params.id
        );

        if (!deleted) {
            return res.status(404).json({
                error: "Arena not found"
            });
        }

        res.status(200).json({
            message: "Arena deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete arena"
        });
    }
};