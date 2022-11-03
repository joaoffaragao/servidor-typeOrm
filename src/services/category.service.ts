import AppDataSource from "../data-source";
import { Category } from "../entities/category.entity";
import { Property } from "../entities/property.entity";
import { AppError } from "../errors/appError";

export class CategoryService {
  static async getAllCategories(): Promise<Category[]> {
    const categoryRepository = AppDataSource.getRepository(Category);

    const categories = await categoryRepository.find();

    return categories;
  }

  static async getAllPropertyByCategory(id: string) {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    const propertyRepository = AppDataSource.getRepository(Property);

    const properties = propertyRepository.findBy({
      category,
    });

    return properties;
  }

  static async getCategory(id: string) {
    const categoryRepository = AppDataSource.getRepository(Category);

    const category = await categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  }

  static async createCategory(name: string): Promise<Category> {
    const categoryRepository = AppDataSource.getRepository(Category);

    const category = await categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (category) {
      throw new AppError("name already registered", 400);
    }

    const newCategory = categoryRepository.create({ name });

    if (!newCategory) {
      throw new AppError("Erro 1", 400);
    }

    await categoryRepository.save(newCategory);

    return newCategory;
  }
}
