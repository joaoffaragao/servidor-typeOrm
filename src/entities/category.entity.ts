import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Property } from "./property.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(() => Property, (property) => property.category)
  proprieties: Property[];
}
