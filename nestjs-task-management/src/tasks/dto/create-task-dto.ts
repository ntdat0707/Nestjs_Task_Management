import { IsNotEmpty } from 'class-validator'
export class CreateTaskDTO {
    @IsNotEmpty()
    id: string;

    title: string;
    
    description: string;
}