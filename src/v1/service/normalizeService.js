import { 
    createAgeGroup,
    getAgeGroups,
    getAgeGroup,
    deleteAgeGroup,
    updateAgeGroup,
    createArena,
    getArenas,
    getArena,
    deleteArena,
    updateArena
} from '../Repository/normalizeRepository.js';

class NormalizeService {
    async getAgeGroups() {
        return await getAgeGroups();
    }
    async getArenas() {
        return await getArenas();
    }
    async getAgeGroup(id) {
        return await getAgeGroup(id);
    }
    async getArena(id) {
        return await getArena(id);
    }
    async createAgeGroup(data) {
        return await createAgeGroup(data.Group_name);
    }
    async createArena(data) {
        return await createArena(data.Arena_name, data.Capacity, data.Location);
    }
    async updateAgeGroup(id, data) {
        return await updateAgeGroup(id, data.Group_name);
    }
    async updateArena(id, data) {
        return await updateArena(id, data.Arena_name, data.Capacity, data.Location);
    }
    async deleteAgeGroup(id) {
        return await deleteAgeGroup(id);
    }
    async deleteArena(id) {
        return await deleteArena(id);
    }
}

export default new NormalizeService();