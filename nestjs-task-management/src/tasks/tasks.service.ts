import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTaskFilterDTO } from './dto/get-task-filter-dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(taskId: string): Task {
        return this.tasks.find(task => task.id === taskId);
    }

    getTaskWithFilter(taskfiltered: GetTaskFilterDTO): Task[] {
        const { status, search } = taskfiltered;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task => task.status.includes(search) ||
                task.description.includes(search));
        }
        return tasks;
    }

    createTask(createTaskDTO: CreateTaskDTO): string {
        const { id, title, description } = createTaskDTO;
        const task: Task = {
            id,
            title,
            description,
            status: TaskStatus.OPEN,
        }
        this.tasks.push(task);
        return 'New Task is added';
    }

    updateTask(id: string, status: TaskStatus): Task {
        let task = this.getTaskById(id);
        task.status = status;
        return task;
    }
    deleteTask(taskId: string): string {
        let index = this.tasks.indexOf(this.tasks.find(task => task.id === taskId));
        // let task = this.tasks.find(task => task.id === taskId);
        // let index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
        return 'Task is deleted';
    }
}

