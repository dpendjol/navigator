import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SurveyService } from "./survey.service";
import { CreateSurveyDto } from "./dto/createSurvey.dto";

@Controller('/survey')
export class SurveyController {

    constructor(private surveyService: SurveyService) {

    }
    @Post()
    createSurvey(@Body() createSurveyDto : CreateSurveyDto) {
        return this.surveyService.createSurvey(createSurveyDto)
    }

    @Get(':entry') 
    async getData(@Param('entry') entry : string) {
        const result = await this.surveyService.getData(entry);
        return result
    }
}