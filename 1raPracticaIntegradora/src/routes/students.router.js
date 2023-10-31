import { Router } from "express";
import Students from "../dao/dbManagers/students.managers.js";

const router = Router();
const studentsManager = new Students();

router.get("/", async (req, res) => {
  try {
    const students = studentsManager.getAll();
    res.send({ status: "success", payload: students });
  } catch (error) {
    res.status(500).send({ status: "errror", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      first_name: firstName,
      last_name: lastName,
      dni,
      email,
      birth_date: birthDate,
      gender,
    } = req.body;
    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .send({ status: "error", message: "incomplete data" });
    }

    const result = await coursesManager.save({
      fisrt_name: firstName,
      last_name: lastName,
      dni,
      email,
      birth_date: birthDate,
      gender,
    });

    res.status(201).send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

export default router;
