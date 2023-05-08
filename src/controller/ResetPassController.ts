import { Request, Response } from "express";
import { UserRepository } from "../repository/UserRepository";
import { readdirSync } from "fs";

const bcrypt = require("bcrypt");

const regExPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const ResetPassword = {
  async reset(req: Request, res: Response) {
    const { pass, userId } = req.body;
    if (!regExPassword.test(pass)) return res.status(204).send({ validation: false });
    try {
      const newPass = await bcrypt.hash(pass, 10);
      await UserRepository.FindByIdAndUpdate(userId, newPass);
      res.send("Password updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
