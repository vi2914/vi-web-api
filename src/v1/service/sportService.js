import { getSports, getSport, createSport, updateSport, deleteSport } from '../Repository/sportRepository.js';

class SportService {
    async getSports() {
        return await getSports();
    }

    async getSport(id) {
        return await getSport(id);
    }

    async createSport(data) {
        return await createSport(data);
    }

    async updateSport(id, data) {
        return await updateSport(id, data);
    }

    async deleteSport(id) {
        return await deleteSport(id);
    }
}

export default new SportService();