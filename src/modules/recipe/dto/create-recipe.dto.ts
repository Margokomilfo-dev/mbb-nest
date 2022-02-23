import { MealsEnum, MenuEnum } from '../../../settings/types';

export class CreateRecipeDto {
  name: string;
  image: string;
  description: string;
  type: null | MealsEnum;
  menu: null | MenuEnum;
  ingredients: IngredientType[];
  oven: string;
}

export type IngredientType = {
  id: string;
  // name: string;
  // calories: number;
  // proteins: number;
  // fats: number;
  // carbs: number;
  // image: null | string;
  count: string;
};
