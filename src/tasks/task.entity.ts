import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TasksStatus } from './task_status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TasksStatus;
}
