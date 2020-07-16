import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig:TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port:5432,
    database: 'taskmanagement', //
    username:'postgres',
    password:'123',
    synchronize:true,
    entities:[__dirname +'/../**/*.entity.{js,ts}'] // note focus on this line when error repo cannot access to entity
}