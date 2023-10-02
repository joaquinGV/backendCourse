router.get('/', (req, res) => {
    res.send({ status: 'success', payload: users });
});

router.post('/', (req, res) => {
    const pet = req.body; //Obteniendo el objeto que vamos a insertar
    if(!pet.name) {
        return res.status(400).send({ status: 'error', error: 'incomplete values' });
    }
    users.push(pet);
    res.send({ status: 'success', payload: pet });
});

export default router;