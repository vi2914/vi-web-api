import sportService from "../service/sportService.js";

export async function getAll(req, res) {
    try {
        const sports = await sportService.getSports();
        res.json(sports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getById(req, res) {
    try {
        const sport = await sportService.getSport(req.params.id);

        if (!sport) {
            return res.status(404).json({
                message: 'Sport not found'
            });
        }

        res.json(sport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function create(req, res) {
    try {
        const newSport = await sportService.createSport(req.body);

        res.status(201).json(newSport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function update(req, res) {
    try {
        const updatedSport = await sportService.updateSport(
            req.params.id,
            req.body
        );

        res.json(updatedSport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteSportController(req, res) {
    try {
        await sportService.deleteSport(req.params.id);

        res.json({
            message: 'Sport deleted'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}