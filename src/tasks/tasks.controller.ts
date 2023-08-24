import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create_task.dto';
import { UpdateTaskDTO } from './dto/update_task.dto';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksService.getTasks(filterDTO);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Get('/:id')
  getTaskByID(@Param('id') taskID: string): Promise<Task> {
    return this.tasksService.getTaskByID(taskID);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') taskId: string): Promise<void> {
    await this.tasksService.deleteTaskById(taskId);
  }

  @Patch('/:id')
  updateTaskById(
    @Param('id') taskId: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(taskId, updateTaskDTO);
  }
}
