import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTaskFilterDTO } from './dto/get-task-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async getTasks(taskfiltered:GetTaskFilterDTO): Promise<Task[]>{
        return this.taskRepository.getTasks(taskfiltered);
       //return ;
    }

    async getTaskById(id: number): Promise<Task> {
        let found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task "${id}" not found`);
        }
        return found;
    }

    // getTaskWithFilter(taskfiltered: GetTaskFilterDTO): Task[] {
    //     const { status, search } = taskfiltered;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task => task.status.includes(search) ||
    //             task.description.includes(search));
    //     }
    //     return tasks;
    // }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO);
    }

    async updateTask(id: number, status: TaskStatus): Promise<Task> {
        let task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    async deleteTask(id: number): Promise<string> {
        let task = await this.taskRepository.findOneOrFail(id);
        if(!task)
        {
            throw new NotFoundException(`Task "${id}" not found`);
        }
        //this.taskRepository.remove(task);
        
        console.log("Task[]:",this.taskRepository);

        // let task = this.tasks.find(task => task.id === taskId);
        // let index = this.tasks.indexOf(task);
        // if (index > -1) {
        //     this.tasks.splice(index, 1);
        // }
         return 'Task is deleted';
    }
}

