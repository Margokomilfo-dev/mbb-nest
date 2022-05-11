import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { WorkoutController } from './workout.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]),
  ],
  providers: [WorkoutService],
  controllers: [WorkoutController],
  exports: [WorkoutService],
})
export class WorkoutModule {}
