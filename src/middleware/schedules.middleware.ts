import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import { AuxiliaryFunctions } from "../utils/functions";

export class SchedulesMiddleware {
  static async dateVerify(req: Request, res: Response, next: NextFunction) {
    const { date, hour } = req.body;

    const dateArray = date.split("/");
    const hourArray = hour.split(":");

    const dateTime = [...dateArray, ...hourArray];

    if (dateTime.length < 5) {
      dateTime.push("00");
    }
    if (dateTime.length < 6) {
      dateTime.push("00");
    }

    const dateTimeFormat = dateTime.map((valor) => {
      return Number(valor);
    });

    const [year, month, day, hours, minutes, seconds] = dateTimeFormat;

    const dateFormt = new Date(year, month - 1, day, hours, minutes, seconds);

    if (dateFormt.getDay() == 0 || dateFormt.getDay() == 6) {
      throw new AppError("Proibido agendar sabado e domingo");
    }

    if (dateFormt.getHours() >= 18 || dateFormt.getHours() < 8) {
      throw new AppError("Agende um horario entre 8 e 18 horas");
    }

    const dateString = `${dateFormt.getFullYear()}-${AuxiliaryFunctions.formatNumber(
      dateFormt.getMonth()
    )}-${AuxiliaryFunctions.formatNumber(dateFormt.getDate())}`;

    const timeString = `${AuxiliaryFunctions.formatNumber(
      dateFormt.getHours()
    )}:${AuxiliaryFunctions.formatNumber(
      dateFormt.getMinutes()
    )}:${AuxiliaryFunctions.formatNumber(dateFormt.getSeconds())}`;

    req.body.dateString = dateString;
    req.body.timeString = timeString;

    next();
  }
}
