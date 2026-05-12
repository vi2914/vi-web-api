// routes/normalizeRoutes.js

import express from "express";

import {
    getAgeGroups,
    getAgeGroup,
    createAgeGroup,
    updateAgeGroup,
    deleteAgeGroup,

    getSports,
    getSport,
    createSport,
    updateSport,
    deleteSport,

    getArenas,
    getArena,
    createArena,
    updateArena,
    deleteArena
} from "../controllers/normalizeController.js";

import {
    authenticateToken,
    authorizeRole
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   AGE GROUPS
========================= */

router.get(
    "/age-groups",
    authenticateToken,
    getAgeGroups
);

router.get(
    "/age-groups/:id",
    authenticateToken,
    getAgeGroup
);

router.post(
    "/age-groups",
    authenticateToken,
    authorizeRole("admin", "management"),
    createAgeGroup
);

router.put(
    "/age-groups/:id",
    authenticateToken,
    authorizeRole("admin", "management"),
    updateAgeGroup
);

router.delete(
    "/age-groups/:id",
    authenticateToken,
    authorizeRole("admin"),
    deleteAgeGroup
);

/* =========================
   SPORTS
========================= */

router.get(
    "/sports",
    authenticateToken,
    getSports
);

router.get(
    "/sports/:id",
    authenticateToken,
    getSport
);

router.post(
    "/sports",
    authenticateToken,
    authorizeRole("admin", "management"),
    createSport
);

router.put(
    "/sports/:id",
    authenticateToken,
    authorizeRole("admin", "management"),
    updateSport
);

router.delete(
    "/sports/:id",
    authenticateToken,
    authorizeRole("admin"),
    deleteSport
);

/* =========================
   ARENAS
========================= */

router.get(
    "/arenas",
    authenticateToken,
    getArenas
);

router.get(
    "/arenas/:id",
    authenticateToken,
    getArena
);

router.post(
    "/arenas",
    authenticateToken,
    authorizeRole("admin", "management"),
    createArena
);

router.put(
    "/arenas/:id",
    authenticateToken,
    authorizeRole("admin", "management"),
    updateArena
);

router.delete(
    "/arenas/:id",
    authenticateToken,
    authorizeRole("admin"),
    deleteArena
);

export default router;