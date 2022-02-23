import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity, ProductCategoryEnum } from '../../../settings/types';

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Product extends BaseEntity {
  @Prop({ required: true })
  name: string;
  @Prop({ required: false, default: ProductCategoryEnum.Все })
  category: ProductCategoryEnum;
  @Prop({ required: true })
  calories: number;
  @Prop({ required: true })
  proteins: number;
  @Prop({ required: true })
  fats: number;
  @Prop({ required: true })
  carbs: number;
  @Prop({ required: false, default: null })
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = Product & Document;
