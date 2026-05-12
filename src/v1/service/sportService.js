import { getSports, getSport, createSport, updateSport, deleteSport } from '../Repository/sportRepository.js';

class SportService {
    async getSports() {
        return await getSports();
    }

    async getSport(id) {
        return await getSport(id);
    }

    async createSport(data) {
        const name = data.Sport_Name;
        return await createSport(name);
    }

    async updateSport(id, data) {
        const name = data.Sport_Name;
        return await updateSport(id, name);
    }

    async deleteSport(id) {
        return await deleteSport(id);
    }
}

export default new SportService();