import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create_task.dto';
import { UpdateTaskDTO } from './dto/update_task.dto';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private taskRepository: TasksRepository,
  ) {}

  async getTaskByID(taskID: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskID } });

    if (!task) {
      throw new NotFoundException(`Task ID with ${taskID} not found`);
    }

    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO, user);
  }

  async deleteTaskById(taskID: string): Promise<void> {
    const deleted = await this.taskRepository.delete({ id: taskID });

    if (deleted.affected === 0) {
      throw new NotFoundException(`Task ID with ${taskID} not found`);
    }
  }

  async updateTaskById(
    taskID: string,
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<Task> {
    const task = await this.getTaskByID(taskID);
    Object.assign(task, updateTaskDTO);

    return this.taskRepository.save(task);
  }

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO);
  }
}
