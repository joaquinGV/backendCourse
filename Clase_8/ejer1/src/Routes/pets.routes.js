import {Router, router} from 'express';

const router = Router();
const 
router.get('/', (req, res) => {
    res.send({ status: 'success', payload: pets });
});

router.post('/', (req, res) => {
    const pet = req.body; //Obteniendo el objeto que vamos a insertar
    if(!pet.name) {
        return res.status(400).send({ status: 'error', error: 'incomplete values' });
    }
    pets.push(pet);
    res.send({ status: 'success', payload: pet });
});

export default router;