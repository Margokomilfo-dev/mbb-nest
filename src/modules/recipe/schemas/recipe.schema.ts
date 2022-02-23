import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity, MealsEnum, MenuEnum } from '../../../settings/types';
import { IngredientType } from '../dto/create-recipe.dto';

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Recipe extends BaseEntity {
  @Prop({ required: true })
  name: string;
  @Prop({ required: false, default: false })
  oven: boolean;
  @Prop({ required: false, default: null })
  calories: number;
  @Prop({ required: false, default: null })
  proteins: number;
  @Prop({ required: false, default: null })
  fats: number;
  @Prop({ required: false, default: null })
  carbs: number;
  @Prop({ required: false, default: null })
  image: string;
  @Prop({ required: false, default: false })
  isFavorite: boolean;
  @Prop({ required: false, default: null })
  description: string;
  @Prop({ required: false, default: MealsEnum['без типа'] })
  type: MealsEnum;
  @Prop({ required: false, default: MenuEnum['без типа'] })
  menu: MenuEnum;
  @Prop({ required: false, default: [] })
  ingredients: IngredientType[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
export type RecipeDocument = Recipe & Document;
