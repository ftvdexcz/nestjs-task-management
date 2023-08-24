import { IsEnum } from 'class-validator';
import { TasksStatus } from '../task_status.enum';

export class UpdateTaskDTO {
  title: string;
  description: string;

  @IsEnum(TasksStatus)
  status: TasksStatus = TasksStatus.OPEN; // default status if status is not passed in
}
