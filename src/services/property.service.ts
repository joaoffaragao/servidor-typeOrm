import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";
import { Category } from "../entities/category.entity";
import { Property } from "../entities/property.entity";

import { AppError } from "../errors/appError";

export class PropertyService {
  static async getAllProperties() {
    const propertyRepository = AppDataSource.getRepository(Property);

    return await propertyRepository.find();
  }

  static async getOnePorperties(id: string) {
    const propertyRepository = AppDataSource.getRepository(Property);

    const property = await propertyRepository.findOne({
      where: {
        id,
      },
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    return property;
  }

  static async createProperty(
    value: number,
    size: number,
    address: Address,
    category?: Category
  ): Promise<Property> {
    const propertyRepository = AppDataSource.getRepository(Property);

    const newProperty = propertyRepository.create({
      value,
      size,
      address,
      category,
    });

    if (!newProperty) {
      throw new AppError("Bad request", 403);
    }

    await propertyRepository.save(newProperty);

    if (newProperty.category) {
      return newProperty;
    }

    const newPropertyFind = await propertyRepository.findOne({
      where: {
        id: newProperty.id,
      },
      relations: {
        category: true,
      },
    });

    return newPropertyFind!;
  }
}
