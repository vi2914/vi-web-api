import refereeService from "../service/refereeService.js";

export const getReferees = async (req, res) => {
    try {
        const referees = await refereeService.getReferees();
        res.json(referees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRefereeById = async (req, res) => {
    try {
        const referee = await refereeService.getReferee(req.params.id);
        if (!referee) {
            return res.status(404).json({ error: "Referee not found" });
        }
        res.json(referee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createReferee = async (req, res) => {
    try {
        const newReferee = await refereeService.createReferee(req.body);
        res.status(201).json(newReferee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateReferee = async (req, res) => {
    try {
        const updatedReferee = await refereeService.updateReferee(req.params.id, req.body);
        if (!updatedReferee) {
            return res.status(404).json({ error: "Referee not found" });
        }
        res.json(updatedReferee);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteReferee = async (req, res) => {
    try {
        const deleted = await refereeService.deleteReferee(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Referee not found" });
        }
        res.json({ message: "Referee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};