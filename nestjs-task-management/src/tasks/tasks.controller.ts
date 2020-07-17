import { TaskStatusValidationPipes } from './pipes/task-status-validation-pipe';
import { Controller, Get, Post, Body, Param, Delete, Query, UsePipes, ValidationPipe, Patch, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTaskFilterDTO } from './dto/get-task-filter-dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { JwtAuthGuard } from 'src/auth/auth-dto/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) { }
  private logger = new Logger('TasksController');
  @Get()
  getTasks(
    @Query(ValidationPipe) getTaskFilterDTO: GetTaskFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" is getting all Tasks.Filters: ${JSON.stringify(getTaskFilterDTO)}`);
    return this.tasksService.getTasks(getTaskFilterDTO, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  // @Get()
  // getFilterTask(@Query() taskfilter: GetTaskFilterDTO): Task[] {
  //   return this.tasksService.getTaskWithFilter(taskfilter);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating task. Data: ${JSON.stringify(createTaskDTO)}`)
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipes) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTask(id, status, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<string> {
    return this.tasksService.deleteTask(id, user);
  }

}
