
import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTaskFilterDTO } from './dto/get-task-filter-dto';
import { User } from 'src/auth/user.entity';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(
        taskfiltered: GetTaskFilterDTO,
        user: User): Promise<Task[]> {
        const { status, search } = taskfiltered;
        const query = this.createQueryBuilder('task'); //table name

        query.andWhere('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search',
                { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }


    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const { title, description } = createTaskDTO;
        // console.log('User:', user);
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        await task.save();
        delete task.user;// delete task.user for show on postman
        return task;
    }

}
