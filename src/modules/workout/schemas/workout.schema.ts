import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity, WorkoutsEnum } from '../../../settings/types';
import { WorkoutObjType } from '../dto/create-workout.dto';

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Workout extends BaseEntity {
  @Prop({ required: false, default: null, type: () => Object })
  entry: WorkoutObjType;
  @Prop({ required: false, default: null, type: () => Object })
  warmUp: WorkoutObjType;
  @Prop({ required: false, default: null, type: () => Object })
  mainPart: WorkoutObjType;
  @Prop({ required: false, default: null, type: () => Object })
  stretching: WorkoutObjType;
  @Prop({ required: true })
  day: number;
  @Prop({ required: false, default: WorkoutsEnum['без типа'] })
  category: WorkoutsEnum;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
export type WorkoutDocument = Workout & Document;
