import { 
    createAgeGroup,
    getAgeGroups,
    getAgeGroup,
    deleteAgeGroup,
    updateAgeGroup,
    createSport,
    getSports,
    getSport,
    deleteSport,
    updateSport,
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
    async getSports() {
        return await getSports();
    }
    async getArenas() {
        return await getArenas();
    }
    async getAgeGroup(id) {
        return await getAgeGroup(id);
    }
    async getSport(id) {
        return await getSport(id);
    }
    async getArena(id) {
        return await getArena(id);
    }
    async createAgeGroup(data) {
        return await createAgeGroup(data.group_name);
    }
    async createSport(data) {
        return await createSport(data.sport_name);
    }
    async createArena(data) {
        return await createArena(data.arena_name);
    }
    async updateAgeGroup(id, data) {
        return await updateAgeGroup(id, data.group_name);
    }
    async updateSport(id, data) {
        return await updateSport(id, data.sport_name);
    }
    async updateArena(id, data) {
        return await updateArena(id, data.arena_name);
    }
    async deleteAgeGroup(id) {
        return await deleteAgeGroup(id);
    }
    async deleteSport(id) {
        return await deleteSport(id);
    }
    async deleteArena(id) {
        return await deleteArena(id);
    }
}

export default new NormalizeService();