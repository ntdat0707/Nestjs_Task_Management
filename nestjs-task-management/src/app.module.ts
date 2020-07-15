import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModuleModule } from './tasks/tasks-module.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), 
    TasksModuleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
