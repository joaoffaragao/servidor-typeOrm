import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  district: string;
  @Column()
  zipCode: string;
  @Column()
  number?: string;
  @Column()
  city: string;
  @Column()
  state: string;
}
