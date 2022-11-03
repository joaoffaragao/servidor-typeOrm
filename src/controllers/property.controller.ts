import { Request, Response } from "express";
import { AdressService } from "../services/address.service";
import { CategoryService } from "../services/category.service";
import { PropertyService } from "../services/property.service";

export class PropertyController {
  static async read(req: Request, res: Response) {
    const properties = await PropertyService.getAllProperties();

    return res.status(200).json(properties);
  }

  static async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const property = await PropertyService.getOnePorperties(id);
    return res.status(200).json(property);
  }

  static async create(req: Request, res: Response) {
    const { value, size, address, categoryId } = req.body;

    const { district, zipCode, number, city, state } = address;

    const category = await CategoryService.getCategory(categoryId);

    const newAddress = await AdressService.createAdress(
      district,
      zipCode,
      number,
      city,
      state
    );

    const newProperty = await PropertyService.createProperty(
      value,
      size,
      newAddress,
      category
    );

    return res.status(201).json(newProperty);
  }
  static async update(req: Request, res: Response) {}
  static async delete(req: Request, res: Response) {}
}
