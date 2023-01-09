import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, RecipeDocument } from './schemas/recipe.schema';
import { CreateRecipeDto, IngredientType } from './dto/create-recipe.dto';
import { AddDeleteIngredientDto } from './dto/add-delete-ingredient.dto';
import { MealsEnum, MenuEnum } from '../../settings/types';
import { ProductService } from '../product/product.service';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<RecipeDocument>,
    private productService: ProductService,
  ) {}

  async createRecipe(dto: CreateRecipeDto) {
    // const recipe = await this.recipeModel.findOne({ name: dto.name });
    console.log('такой рецепт уже существует');
    let calories = 0;
    let proteins = 0;
    let fats = 0;
    let carbs = 0;
    const ingredients = [];
    if (dto.ingredients.length) {
      const promises = dto.ingredients.map(async (i) => {
        try {
          const res = await this.productService.getProductById(i.id);
          ingredients.push({ ...res, count: i.count });

          if (Number.isInteger(+i.count)) {
            calories = calories + this.getNumber(+i.count, res.calories);
            proteins = proteins + this.getNumber(+i.count, res.proteins);
            fats = fats + this.getNumber(+i.count, res.fats);
            carbs = carbs + this.getNumber(+i.count, res.carbs);
          }
        } catch (e) {
          console.log('some Error in scheduler service with endMeeting ');
        }
      });
      await Promise.all(promises);
    }

    return new this.recipeModel({
      name: dto.name,
      calories,
      proteins,
      fats,
      carbs,
      description: dto.description,
      type: dto.type,
      ingredients: ingredients,
      menu: dto.menu,
      image: dto.image,
      oven: dto.oven === 'true',
    }).save();
  }

  async addIngredientToRecipe(dto: IngredientType, id: string) {
    // const recipe = await this.recipeModel.findById(id);
    // if (recipe) {
    //   // const includedIt = recipe.ingredients
    //   //   .map((i) => i.name.toLowerCase())
    //   //   .includes(dto.name.toLowerCase());
    //   // if (includedIt) {
    //   //   return 'this ingredient is here';
    //   // } else {
    //   const product = await this.productService.getProductById(dto.id);
    //   if (product) {
    //     await this.recipeModel.findByIdAndUpdate(
    //       id,
    //       {
    //         calories: this.getNumber(dto.count, product.calories),
    //         proteins: this.getNumber(dto.count, product.proteins),
    //         fats: this.getNumber(dto.count, product.fats),
    //         carbs: this.getNumber(dto.count, product.carbs),
    //         $push: { ingredients: dto },
    //       },
    //       { new: true },
    //     );
    //     // }
    //     return this.recipeModel.findById(id);
    //   }
    // } else return 'the recipe is not found';
  }

  async deleteIngredientToRecipe(dto: AddDeleteIngredientDto, id: string) {
    //   const recipe = await this.recipeModel.findById(id);
    //   if (recipe) {
    //     const includedIt = recipe.ingredients
    //       .map((i) => i.name.toLowerCase())
    //       .includes(dto.name.toLowerCase());
    //     if (includedIt) {
    //       await this.recipeModel.findByIdAndUpdate(
    //         id,
    //         {
    //           $pull: { ingredients: { name: dto.name } },
    //         },
    //         { new: true },
    //       );
    //     } else return 'this ingredient is not here';
    //   } else return 'the recipe is not found';
  }

  async getRecipe(id: string) {
    const recipe = await this.recipeModel.findById(id);
    if (recipe) {
    }
    return this.recipeModel.findById(id);
  }

  //надо оптимизировать
  async getRecipes(type?: MealsEnum, menu?: MealsEnum, name?: string) {
    return this.recipeModel.find({ type });
  }

  async getRecipesByMeal(type: MealsEnum) {
    if (+type === MealsEnum['без типа']) {
      return this.recipeModel.find({});
    }
    return this.recipeModel.find({ type });
  }
  async getRecipesByMenuByMeal(menu: MenuEnum, type: MealsEnum) {
    if (+menu === MenuEnum['без типа'] && +type !== MealsEnum['без типа']) {
      return this.recipeModel.find({ type });
    }
    if (+type === MealsEnum['без типа'] && +menu !== MenuEnum['без типа']) {
      return this.recipeModel.find({ menu });
    }
    if (+type === MealsEnum['без типа'] && +menu === MenuEnum['без типа']) {
      return this.recipeModel.find({});
    }
    return this.recipeModel.find({ menu, type });
  }
  async getRecipeById(id: string) {
    return this.recipeModel.findById(id);
  }

  async getRandomRecipe(menu: MenuEnum, meal: MenuEnum) {
    const res = await this.recipeModel.find({ menu, type: meal }).lean();
    return res[Math.floor(Math.random() * res.length)];
  }
  async getRecipeForDay(menu: MenuEnum, meal: MenuEnum, day: number) {
    if (menu == 0) {
      const res = await this.recipeModel.find({ type: meal }).lean();
      if (res.length > 0) return res[day];
      return null;
    } else {
      const res = await this.recipeModel
        .find({ menu: menu, type: meal })
        .lean();
      if (res.length > 0) return res[day];
      return null;
    }
  }

  //doesn't work
  async updateRecipe(dto: UpdateRecipeDto, id: string) {
    const recipe = await this.recipeModel.findById(id);
    if (recipe) {
      const res = this.recipeModel.findByIdAndUpdate(
        id,
        {
          image: dto.image ? dto.image : recipe.image,
          menu: dto.menu ? dto.menu : recipe.menu,
          type: dto.type ? dto.type : recipe.type,
          description: dto.description ? dto.description : recipe.description,
          isFavorite: dto.isFavorite ? dto.isFavorite : recipe.isFavorite,
          carbs: dto.carbs ? dto.carbs : recipe.carbs,
          fats: dto.fats ? dto.fats : recipe.fats,
          proteins: dto.proteins ? dto.proteins : recipe.proteins,
          calories: dto.calories ? dto.calories : recipe.calories,
          oven: dto.oven ? dto.oven : recipe.oven,
          name: dto.name ? dto.name : recipe.name,
        },
        { new: true },
      );
      return res;
    }
  }

  //for visible admin part когда будем просто вставлять граммы - чтобы видеть сколько из этих грамм получается чего
  async getTotalParamsCounts(dto: AddDeleteIngredientDto) {
    const product = await this.productService.getProductByName_(dto.name);
    const calories = this.getNumber(dto.weight, product.calories);
    const proteins = this.getNumber(dto.weight, product.proteins);
    const fats = this.getNumber(dto.weight, product.fats);
    const carbs = this.getNumber(dto.weight, product.carbs);
    return {
      name: dto.name,
      weight: dto.weight,
      calories,
      proteins,
      fats,
      carbs,
    };
  }

  //для подсчета количества калорий, жиров, белков и углеводов в зависимости от веса
  getNumber(g: number, productTotalNumber: number) {
    return (g * productTotalNumber) / 100;
  }
}
