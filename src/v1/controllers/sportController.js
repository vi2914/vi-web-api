import { getSports, getSport, createSport, updateSport, deleteSport } from '../Repository/sportRepository.js';

export async function getAll(req, res) {
    try {
        const sports = await getSports();
        res.json(sports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getById(req, res) {
    try {
        const sport = await getSport(req.params.id);

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
        const newSport = await createSport(req.body);

        res.status(201).json(newSport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function update(req, res) {
    try {
        const updatedSport = await updateSport(
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
        await deleteSport(req.params.id);

        res.json({
            message: 'Sport deleted'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}