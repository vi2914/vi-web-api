import { getReferees, getReferee, createReferee, updateReferee, deleteReferee } from "../Repository/refereeRepository.js";

class RefereeService {
    async getReferees() {
        return await getReferees();
    }
    async getReferee(id) {
        return await getReferee(id);
    }
    async create(data) {
        return await createReferee(data.Referee_name);
    }
    async update(id, data) {
        return await updateReferee(id, data.Referee_name);
    }
    async delete(id) {
        return await deleteReferee(id);
    }
}

export default new RefereeService();