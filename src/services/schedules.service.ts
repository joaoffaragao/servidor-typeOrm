import AppDataSource from "../data-source";
import { SchedulesUserProperties } from "../entities/schedulesUserProperties.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { PropertyService } from "./property.service";
import { AuxiliaryFunctions } from "../utils/functions";

export class SchedulesService {
  static async newSchedules(
    dateString: string,
    timeString: string,
    propertyId: string,
    userId: string
  ) {
    const schedules = await this.listSchedulesByProperty(propertyId);

    schedules.forEach((schedule) => {
      if (schedule.date.toString() == dateString) {
        if (schedule.hour.toString() == timeString) {
          throw new AppError("Horario ja reservado", 400);
        }
      }
    });

    const property = await PropertyService.getOnePorperties(propertyId);

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    const schedulesRepository = AppDataSource.getRepository(
      SchedulesUserProperties
    );

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const newSchedules = schedulesRepository.create({
      date: dateString,
      hour: timeString,
      property,
      user,
    });

    await schedulesRepository.save(newSchedules);

    return newSchedules;
  }

  static async listSchedulesByProperty(propertyId: string) {
    const property = await PropertyService.getOnePorperties(propertyId);

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    const schedulesRepository = AppDataSource.getRepository(
      SchedulesUserProperties
    );

    const schedule = await schedulesRepository.find({
      where: {
        property: {
          id: property.id,
        },
      },
    });

    return schedule;
  }
}
