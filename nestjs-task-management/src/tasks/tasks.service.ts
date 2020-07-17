import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTaskFilterDTO } from './dto/get-task-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async getTasks(getTaskFilterDTO: GetTaskFilterDTO, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(getTaskFilterDTO, user);
        //return ;
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        let found = await this.taskRepository.findOne({ where: { id, userId: user.id } });
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

    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO, user);
    }

    async updateTask(id: number, status: TaskStatus, user: User): Promise<Task> {
        let task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }

    async deleteTask(id: number, user: User): Promise<string> {

        let task = await this.getTaskById(id, user);
        if (!task) {
            throw new NotFoundException(`Task "${id}" not found`);
        }
        else {
            await this.taskRepository.remove(task);
        }

        return 'Task is deleted';
    }
}

