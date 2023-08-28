import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create_task.dto';
import { TasksStatus } from './task_status.enum';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const task = this.create({
      ...createTaskDTO,
      status: TasksStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }

  async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDTO;

    const query = this.createQueryBuilder('task'); // task entity

    query.where({ user }); // fetch only tasks belonging to user

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) like LOWER(:search) OR LOWER(task.description) like LOWER(:search))', // wrap in () to fix condition issues
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
