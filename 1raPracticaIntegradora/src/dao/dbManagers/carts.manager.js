import { cartsCollection } from '../dbManagers/models/carts.model.js';

export default class Carts {
    constructor() {
        console.log('Working carts with DB');
    }

    getAll = async () => {
        const carts = await cartsCollection.find().lean();
        return carts;
    }

    save = async (cart) => {
        const result = await cartsCollection.create(cart);
        return result;
    }

    update = async (id, cart) => {
        const result = await cartsCollection.updateOne({ _id: id }, cart);
        return result;
    }
}