import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity("schedules_user_properties")
export class SchedulesUserProperties {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: Date;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Property, { eager: true })
  property: Property;
}
