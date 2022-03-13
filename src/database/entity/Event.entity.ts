import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  @Column() startAt: Date;
  @Column({ type: 'float8' }) latitude: number;
  @Column({ type: 'float8' }) longitude: number;
  @Column() duration: string;
  @Column() summary: string;
  @Column() description: string;
  @Column({ nullable: true }) whatsAppUrl?: string;
  @Column({ nullable: true }) contact?: string;
}
