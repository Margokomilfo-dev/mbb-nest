import { Injectable } from '@nestjs/common';
import { RecipeService } from '../recipe/recipe.service';
import { MenuEnum, WorkoutsEnum } from '../../settings/types';
import { WorkoutService } from '../workout/workout.service';

@Injectable()
export class MarathonService {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly workoutService: WorkoutService,
  ) {}

  //doesn't used
  async getRandomMenuForDay(menuCategory: MenuEnum) {
    const breakfast = await this.recipeService.getRandomRecipe(menuCategory, 1);
    const snack1 = await this.recipeService.getRandomRecipe(menuCategory, 2);
    const lunch = await this.recipeService.getRandomRecipe(menuCategory, 3);
    const snack2 = await this.recipeService.getRandomRecipe(menuCategory, 4);
    const dinner = await this.recipeService.getRandomRecipe(menuCategory, 5);
    console.log(breakfast);
    return {
      breakfast,
      snack1,
      lunch,
      snack2,
      dinner,
      calories:
        breakfast.calories +
        snack1.calories +
        lunch.calories +
        snack2.calories +
        dinner.calories,
    };
  }
  async getMenuForDay(menuCategory: MenuEnum, day: number) {
    const breakfast = await this.recipeService.getRecipeForDay(
      menuCategory,
      1,
      day,
    );
    const snack1 = await this.recipeService.getRecipeForDay(
      menuCategory,
      2,
      day,
    );
    const lunch = await this.recipeService.getRecipeForDay(
      menuCategory,
      3,
      day,
    );
    const snack2 = await this.recipeService.getRecipeForDay(
      menuCategory,
      4,
      day,
    );
    const dinner = await this.recipeService.getRecipeForDay(
      menuCategory,
      5,
      day,
    );
    return {
      breakfast,
      snack1,
      lunch,
      snack2,
      dinner,
      calories:
        breakfast.calories +
        snack1.calories +
        lunch.calories +
        snack2.calories +
        dinner.calories,
    };
  }
  async getWorkoutForDay(type: WorkoutsEnum, day: number) {
    return await this.workoutService.getWorkoutsByCategoryAndDay(type, day);
  }
}
