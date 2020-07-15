import { Controller, Get, Post, Body, Param, Delete, Query, UsePipes,ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTaskFilterDTO } from './dto/get-task-filter-dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Get()
  getFilterTask(@Query() taskfilter: GetTaskFilterDTO): Task[] {
    return this.tasksService.getTaskWithFilter(taskfilter);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDTO: CreateTaskDTO
  ): string {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): string {
    return this.tasksService.deleteTask(id);
  }

}
