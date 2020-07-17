import { TaskStatusValidationPipes } from './pipes/task-status-validation-pipe';
import { Controller, Get, Post, Body, Param, Delete, Query, UsePipes, ValidationPipe, Patch, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTaskFilterDTO } from './dto/get-task-filter-dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { JwtAuthGuard } from 'src/auth/auth-dto/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(
    @Query(ValidationPipe) taskfiltered: GetTaskFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(taskfiltered, user);
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
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Patch('/:id/status')
  updateTask(
      @Param('id', ParseIntPipe) id: number,
      @Body('status', TaskStatusValidationPipes) status: TaskStatus,
      @GetUser() user: User
      ): Promise<Task> {
    return this.tasksService.updateTask(id, status,user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<string> {
    return this.tasksService.deleteTask(id,user);
  }

}
