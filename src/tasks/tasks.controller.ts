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
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
export class TasksController {
  private logger = new Logger('TasksController', { timestamp: true });
  constructor(
    private tasksService: TasksService,
    private config: ConfigService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  getTasks(
    @Query() filterDTO: GetTasksFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks, Filters: ${JSON.stringify(
        filterDTO,
      )}`,
    );
    return this.tasksService.getTasks(filterDTO, user);
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
  getTaskByID(
    @Param('id') taskID: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskByID(taskID, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteTaskById(
    @Param('id') taskId: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.tasksService.deleteTaskById(taskId, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateTaskById(
    @Param('id') taskId: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(taskId, updateTaskDTO, user);
  }
}
