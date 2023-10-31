import { studentsModel } from "./models/students.models";

export default class Students {
    constructor() {
        console.log('Working students with DB')
    }

    // No colocar logica de negocio

    getAll = async () => {
        // MongoDB el formato de nuestros registros son BSON
        const students = await studentsModel.find();
        // PSON -> POJO (Plain Old JavaScript Object )
        return students.map(student => student.toObject());
    }

    save = async (student) => {
        const result = await studentsModel.create(student);
        return result;
    }
}