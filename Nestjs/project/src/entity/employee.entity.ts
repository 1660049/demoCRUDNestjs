import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeUpdate, UpdateDateColumn } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  identityNumber: string;

  @Column()
  phoneNumber: string;

  @Column()
  managerId: string;


  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @UpdateDateColumn({type: "timestamptz", default: ()=> "CURRENT_TIMESTAMP"})
  updatedAt: Date;

  @Column({ type:'timestamptz', nullable: true})
  deletedAt: Date;

}