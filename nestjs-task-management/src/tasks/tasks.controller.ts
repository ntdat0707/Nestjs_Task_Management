import { TaskStatusValidationPipes } from './pipes/task-status-validation-pipe';
import { Controller, Get, Post, Body, Param, Delete, Query, UsePipes, ValidationPipe, Patch, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTaskFilterDTO } from './dto/get-task-filter-dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query(ValidationPipe) taskfiltered: GetTaskFilterDTO): Promise<Task[]> {
    return this.tasksService.getTasks(taskfiltered);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Get()
  // getFilterTask(@Query() taskfilter: GetTaskFilterDTO): Task[] {
  //   return this.tasksService.getTaskWithFilter(taskfilter);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDTO: CreateTaskDTO
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Patch('/:id/status')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipes) status: TaskStatus): Promise<Task> {
    return this.tasksService.updateTask(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.tasksService.deleteTask(id);
  }

}
