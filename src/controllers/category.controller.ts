import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async read(req: Request, res: Response) {
    const categories = await CategoryService.getAllCategories();
    return res.status(200).json(categories);
  }

  static async readPropertiesByCatagory(req: Request, res: Response) {
    const { id } = req.params;
    const category = await CategoryService.getCategory(id);
    const properties = await CategoryService.getAllPropertyByCategory(id);
    return res.status(200).json({ ...category, properties });
  }

  static async create(req: Request, res: Response) {
    const { name } = req.body;
    const category = await CategoryService.createCategory(name);
    return res.status(201).json(category);
  }
  static async update(req: Request, res: Response) {}
  static async delete(req: Request, res: Response) {}
}
