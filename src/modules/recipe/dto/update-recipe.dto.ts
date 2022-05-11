import { MealsEnum, MenuEnum } from '../../../settings/types';

export class UpdateRecipeDto {
  name: string;
  image: string;
  description: string;
  type: null | MealsEnum;
  menu: null | MenuEnum;
  oven: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  isFavorite: boolean;
}
