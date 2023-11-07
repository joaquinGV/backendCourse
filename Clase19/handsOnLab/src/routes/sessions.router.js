import { Router } from "express";

const router = Router();

router.post("register", async (req, res) => {
  try {
    const {first_name, last_name, email, age, password} = req.body

    if(!first_name || !last_name || !email || !age || !password){
        return res.status(422).send({status: 'error', message: 'incomplete values'})
    }

    const exist = await usersModel.findOne({email});

    if(exist){
        
    }

  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});
