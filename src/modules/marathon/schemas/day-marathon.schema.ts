import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity, MenuEnum, WorkoutsEnum } from '../../../settings/types';
import { WorkoutObjType } from '../../workout/dto/create-workout.dto';
import { Workout } from '../../workout/schemas/workout.schema';
import { Recipe } from '../../recipe/schemas/recipe.schema';

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class DayMarathon extends BaseEntity {
  @Prop({ required: false, default: [] })
  tasksForDay: Array<string>;
  @Prop({ required: false, default: [] })
  workouts: Array<Workout>;
  @Prop({ required: false, default: [] })
  recipe: Array<Recipe>;
  @Prop({ required: true })
  day: number;
  @Prop({ required: false, default: WorkoutsEnum['без типа'] })
  workoutCategory: WorkoutsEnum;
  @Prop({ required: false, default: MenuEnum['без типа'] })
  MenuCategory: MenuEnum;
}

export const DayMarathonSchema = SchemaFactory.createForClass(DayMarathon);
export type DayMarathonDocument = DayMarathon & Document;

export type WorkoutType = {
  entry: WorkoutObjType;
  warmUp: WorkoutObjType;
  mainPart: WorkoutObjType;
  stretching: WorkoutObjType;
  day: number;
  category: WorkoutsEnum;
};
