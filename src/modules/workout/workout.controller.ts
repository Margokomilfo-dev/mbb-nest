import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateWorkOutDto } from './dto/create-workout.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @ApiOperation({ summary: 'createWorkOut' })
  @Get(':id')
  getWorkoutsById(@Param('id') id: string) {
    return this.workoutService.getWorkoutsById(id);
  }

  @ApiOperation({ summary: 'createWorkOut' })
  @Get('category/:category')
  getWorkoutsByCategory(@Param('category') category: number) {
    return this.workoutService.getWorkoutsByCategory(category);
  }

  @ApiOperation({ summary: 'createWorkOut' })
  // @ApiOkResponse({
  //   description: 'The createWorkOut - request has been successfully',
  //   type: WorkOutEntity,
  // })
  @Post()
  createRecipe(
    @Body() dto: CreateWorkOutDto, //: Promise<RecipeDocument> {
  ) {
    return this.workoutService.createWorkOut(dto);
  }
}
