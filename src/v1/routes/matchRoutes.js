// routes/matchRoutes.js

import express from "express";

import {
    getMatches,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch,
    getMatchesBySport,
    getMatchesByTeam,
    addMatchResult,
    getMatchesByDate,
    getMatchesByReferee
} from "../controllers/matchController.js";

import {
    getReferees
} from "../controllers/accountController.js";

import {
    authenticateToken,
    authorizeRole
} from "../middleware/authMiddleware.js";

const router = express.Router();

// GET | localhost:3868/api/v1/matches
router.get("/", getMatches);

// GET | localhost:3868/api/v1/matches/date/:date
router.get(
    "/date/:date",
    getMatchesByDate
);

// GET | localhost:3868/api/v1/matches/referee/:refereeId
router.get(
    "/referee/:refereeId",
    getMatchesByReferee
);

router.get(
    "/referees",
    getReferees
)

// GET | localhost:3868/api/v1/matches/:id
router.get("/:id", getMatchById);

// POST | localhost:3868/api/v1/matches
router.post(
    "/",
    authenticateToken,
    authorizeRole("admin", "management"),
    createMatch
);

// PUT | localhost:3868/api/v1/matches/:id
router.put(
    "/:id",
    authenticateToken,
    authorizeRole("admin", "management"),
    updateMatch
);

// DELETE | localhost:3868/api/v1/matches/:id
router.delete(
    "/:id",
    authenticateToken,
    authorizeRole("admin"),
    deleteMatch
);

// GET | localhost:3868/api/v1/matches/sport/:sportId
router.get(
    "/sport/:sportId",
    getMatchesBySport
);

// GET | localhost:3868/api/v1/matches/team/:teamId
router.get(
    "/team/:teamId",
    getMatchesByTeam
);

// POST | localhost:3868/api/v1/matches/:matchId/result
router.post(
    "/:matchId/result",
    authenticateToken,
    authorizeRole("admin", "management", "referee"),
    addMatchResult
);

export default router;