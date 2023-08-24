import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create_task.dto';
import { TasksStatus } from './task_status.enum';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const task = this.create({
      ...createTaskDTO,
      status: TasksStatus.OPEN,
    });
    await this.save(task);
    return task;
  }

  async getTasks(filterDTO?: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDTO;

    const query = this.createQueryBuilder('task'); // task entity

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) like LOWER(:search) OR LOWER(task.description) like LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
