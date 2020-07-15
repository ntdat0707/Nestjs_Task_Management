import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModuleModule } from './tasks/tasks-module.module';

@Module({
  imports: [TasksModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
