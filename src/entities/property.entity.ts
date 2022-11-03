import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Address } from "./address.entity";
import { Category } from "./category.entity";
import { SchedulesUserProperties } from "./schedulesUserProperties.entity";

@Entity("properties")
export class Property {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;
  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, { eager: true })
  category?: Category;

  @OneToMany(
    () => SchedulesUserProperties,
    (schedulesUserProperties) => schedulesUserProperties.user
  )
  schedulesUserProperties: SchedulesUserProperties[];
}
