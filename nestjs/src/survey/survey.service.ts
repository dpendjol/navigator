import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Survey } from "./schemas/survey.schema";
import { Model } from "mongoose";
import { CreateSurveyDto } from "./dto/createSurvey.dto";

@Injectable()
export class SurveyService {
    constructor(
        @InjectModel(Survey.name)
        private SurveyModel: Model<Survey>
    ) {}

    async createSurvey(createSurveyDto : CreateSurveyDto){
        const newSurvey = new this.SurveyModel(createSurveyDto);
        const result = await newSurvey.save();
        return;
    }   

    async getData(team : string) {
        const result =  await this.SurveyModel.find({entry: team}).exec();
        return result;
    }
}