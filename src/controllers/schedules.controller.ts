import { Request, Response } from "express";
import { SchedulesService } from "../services/schedules.service";

export class SchedulesController {
  static async read(req: Request, res: Response) {}

  static async readByProperty(req: Request, res: Response) {
    const { id } = req.params;

    const schedules = await SchedulesService.listSchedulesByProperty(id);

    return res.status(200).json({ schedules });
  }

  static async create(req: Request, res: Response) {
    const { propertyId, userId } = req.body;
    const dateString = req.body.dateString;
    const timeString = req.body.timeString;

    const schedule = await SchedulesService.newSchedules(
      dateString,
      timeString,
      propertyId,
      userId
    );
    return res
      .status(201)
      .json({ schedule, message: "Horario agendado com sucesso" });
  }
  static async update(req: Request, res: Response) {}
  static async delete(req: Request, res: Response) {}
}
