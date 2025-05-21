import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true})
export class Survey {
    @Prop({required: true})
    entry: string

    @Prop({required:true})
    values: [string]
}

export const SurveySchema = SchemaFactory.createForClass(Survey);