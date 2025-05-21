import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SurveyModule } from './survey/survey.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/survey'), SurveyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
