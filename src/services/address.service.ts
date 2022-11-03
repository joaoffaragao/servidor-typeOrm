import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";
import { AppError } from "../errors/appError";

export class AdressService {
  static async getAllAdress(): Promise<Address[]> {
    const AddressRepository = AppDataSource.getRepository(Address);

    const Addresses = await AddressRepository.find();

    return Addresses;
  }

  static async createAdress(
    district: string,
    zipCode: string,
    city: string,
    state: string,
    number?: string
  ): Promise<Address> {
    const addressRepository = AppDataSource.getRepository(Address);

    if (state.length <= 2) {
      throw new AppError("state can only have 2 characters", 400);
    }

    if (zipCode.length > 8) {
      throw new AppError(
        `ZipCode can only have 8 characters ${zipCode.length}`,
        400
      );
    }

    const addressFound = await addressRepository.find({
      where: {
        zipCode,
      },
    });

    if (addressFound[0]) {
      throw new AppError("Address already used", 400);
    }

    const newAddress = addressRepository.create({
      district,
      zipCode,
      city,
      state,
      number,
    });

    if (!newAddress) {
      throw new AppError("Bad request", 403);
    }

    await addressRepository.save(newAddress);

    return newAddress;
  }
}
