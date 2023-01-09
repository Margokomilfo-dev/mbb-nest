import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './schemas/workout.schema';
import { CreateWorkOutDto } from './dto/create-workout.dto';
import { WorkoutsEnum } from '../../settings/types';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name)
    private readonly workoutModel: Model<WorkoutDocument>,
  ) {}

  async createWorkOut(dto: CreateWorkOutDto) {
    const workout = await this.workoutModel.findOne({
      category: dto.category,
      day: dto.day,
    });
    if (workout) return 'треня на этот день есть';
    const fun = (link: string) =>
      link.replace('.youtube.com/watch?v=', '.youtube-nocookie.com/embed/');
    return new this.workoutModel({
      entry: dto.entry ? { ...dto.entry, link: fun(dto.entry.link) } : null,
      warmUp: dto.warmUp ? { ...dto.warmUp, link: fun(dto.warmUp.link) } : null,
      mainPart: dto.mainPart
        ? { ...dto.mainPart, link: fun(dto.mainPart.link) }
        : null,
      stretching: dto.stretching
        ? { ...dto.stretching, link: fun(dto.stretching.link) }
        : null,
      day: dto.day,
      category: dto.category ? dto.category : WorkoutsEnum['без типа'],
    }).save();
  }

  async getWorkoutsByCategory(category: WorkoutsEnum) {
    if (+category === WorkoutsEnum['без типа']) {
      return this.workoutModel.find({}).sort({ category: 1 });
    }
    return this.workoutModel.find({ category }).sort({ day: 1 });
  }
  async getWorkoutsByCategoryAndDay(category: WorkoutsEnum, day: number) {
    const res = await this.workoutModel.findOne({ category, day }).lean();
    if (!res) return 'no workouts for today';
    return res;
  }

  async getWorkoutsById(id: string) {
    return this.workoutModel.findById(id);
  }
}
