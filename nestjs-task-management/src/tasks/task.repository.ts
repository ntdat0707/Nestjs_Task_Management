
import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTaskFilterDTO } from './dto/get-task-filter-dto';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(taskfiltered:GetTaskFilterDTO):Promise<Task[]> {
        const {status,search}= taskfiltered;
        const query = this.createQueryBuilder('task'); //table name

        if(status){

        }

        if(search){

        }
        const tasks = await query.getMany();
        return tasks;
    }


    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDTO;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

}
