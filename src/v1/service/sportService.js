import { getSports, getSport, createSport, updateSport, deleteSport } from '../Repository/sportRepository.js';

class SportService {
    async getSports() {
        return await sportRepository.getAll();
    }

    async getSport(id) {
        return await sportRepository.getById(id);
    }

    async createSport(data) {
        return await sportRepository.create(data.sport_name);
    }

    async updateSport(id, data) {
        return await sportRepository.update(id, data.sport_name);
    }

    async deleteSport(id) {
        return await sportRepository.delete(id);
    }
}

export default new SportService();