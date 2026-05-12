// routes/teamRoutes.js

import express from "express";

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
    createPlayer,
    createTeamWithPlayers,

    addTeamManager,
    removeTeamManager,
    getTeamManagers
} from "../controllers/teamController.js";

import {
    authenticateToken,
    authorizeRole
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   TEAMS
========================= */

// GET | localhost:3868/api/v1/teams
router.get("/", authenticateToken, getTeams);

// GET | localhost:3868/api/v1/teams/:id
router.get("/:id", authenticateToken, getTeam);

// POST | localhost:3868/api/v1/teams
router.post(
    "/",
    authenticateToken,
    authorizeRole("admin", "management"),
    createTeam
);

// PUT | localhost:3868/api/v1/teams/:id
router.put(
    "/:id",
    authenticateToken,
    authorizeRole("admin", "management"),
    updateTeam
);

// DELETE | localhost:3868/api/v1/teams/:id
router.delete(
    "/:id",
    authenticateToken,
    authorizeRole("admin"),
    deleteTeam
);

// GET | localhost:3868/api/v1/teams/sport/:sportId
router.get(
    "/sport/:sportId",
    getTeamsBySport
);

/* =========================
   PLAYERS
========================= */

// GET | localhost:3868/api/v1/teams/:teamId/players
router.get(
    "/:teamId/players",
    getPlayersInTeam
);

// POST | localhost:3868/api/v1/teams/:teamId/players/:playerId
router.post(
    "/:teamId/players/:playerId",
    authenticateToken,
    authorizeRole("admin", "management"),
    addPlayerToTeam
);

// DELETE | localhost:3868/api/v1/teams/:teamId/players/:playerId
router.delete(
    "/:teamId/players/:playerId",
    authenticateToken,
    authorizeRole("admin", "management"),
    removePlayerFromTeam
);

// POST | localhost:3868/api/v1/teams/player
router.post(
    "/player",
    authenticateToken,
    authorizeRole("admin", "management"),
    createPlayer
);

// POST | localhost:3868/api/v1/teams/with-players
router.post(
    "/with-players",
    authenticateToken,
    authorizeRole("admin", "management"),
    createTeamWithPlayers
);

/* =========================
   TEAM MANAGERS
========================= */

// GET | localhost:3868/api/v1/teams/:teamId/managers
router.get(
    "/:teamId/managers",
    getTeamManagers
);

// POST | localhost:3868/api/v1/teams/:teamId/managers/:managerId
router.post(
    "/:teamId/managers/:managerId",
    authenticateToken,
    authorizeRole("admin", "management"),
    addTeamManager
);

// DELETE | localhost:3868/api/v1/teams/:teamId/managers/:managerId
router.delete(
    "/:teamId/managers/:managerId",
    authenticateToken,
    authorizeRole("admin", "management"),
    removeTeamManager
);

export default router;