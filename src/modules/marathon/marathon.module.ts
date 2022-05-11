import { Module } from '@nestjs/common';
import { MarathonService } from './marathon.service';
import { RecipeModule } from '../recipe/recipe.module';
import { MarathonController } from './marathon.controller';
import { WorkoutModule } from '../workout/workout.module';

@Module({
  imports: [RecipeModule, WorkoutModule],
  controllers: [MarathonController],
  providers: [MarathonService],
  exports: [MarathonService],
})
export class MarathonModule {}
