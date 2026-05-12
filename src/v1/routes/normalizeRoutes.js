// routes/normalizeRoutes.js

import express from "express";

import {
    getAgeGroups,
    getAgeGroup,
    createAgeGroup,
    updateAgeGroup,
    deleteAgeGroup,

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
    getAgeGroups
);

router.get(
    "/age-groups/:id",
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
   ARENAS
========================= */

router.get(
    "/arenas",
    getArenas
);

router.get(
    "/arenas/:id",
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