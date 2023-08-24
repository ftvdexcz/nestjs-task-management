import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create_task.dto';
import { UpdateTaskDTO } from './dto/update_task.dto';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get_user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UseGuards(AuthGuard())
  getTasks(@Query() filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksService.getTasks(filterDTO);
  }

  @Post()
  @UseGuards(AuthGuard())
  createTask(
    @GetUser() user: User,
    @Body() createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getTaskByID(@Param('id') taskID: string): Promise<Task> {
    return this.tasksService.getTaskByID(taskID);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteTaskById(@Param('id') taskId: string): Promise<void> {
    await this.tasksService.deleteTaskById(taskId);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateTaskById(
    @Param('id') taskId: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(taskId, updateTaskDTO);
  }
}
