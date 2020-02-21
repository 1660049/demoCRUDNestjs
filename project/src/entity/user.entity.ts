import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeUpdate, UpdateDateColumn, } from "typeorm";


@Entity()
export class UserEntity{
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
    employeeId: string;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;

    @Column('timestamptz',{nullable: true})
    deletedAt: Date;

}