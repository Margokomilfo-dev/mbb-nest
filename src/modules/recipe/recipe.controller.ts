import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../../exceptions/http-filter.exception';
import { RecipeService } from './recipe.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProductEntity } from '../product/entities/product.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { MealsEnum, MenuEnum } from '../../settings/types';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@UseFilters(new HttpExceptionFilter())
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @ApiOperation({ summary: 'getRecipesByMeal' })
  // @ApiOkResponse({
  //   description: 'The getRecipesByMeal - request has been successfully',
  //   type: RecipeEntity,
  // })
  @Get(':type')
  getRecipesByMeal(@Param('type') type: MealsEnum) {
    return this.recipeService.getRecipesByMeal(type);
  }

  @ApiOperation({ summary: 'getRecipesByMeal' })
  // @ApiOkResponse({
  //   description: 'The getRecipesByMeal - request has been successfully',
  //   type: RecipeEntity,
  // })
  @Get(':menu/:type')
  getRecipesByMenuByMeal(
    @Param('menu') menu: MenuEnum,
    @Param('type') type: MealsEnum,
  ) {
    return this.recipeService.getRecipesByMenuByMeal(menu, type);
  }

  @ApiOperation({ summary: 'getRecipeById' })
  // @ApiOkResponse({
  //   description: 'The getRecipeById - request has been successfully',
  //   type: RecipeEntity,
  // })
  @Get('get/id/:id')
  getRecipeById(@Param('id') id: string) {
    return this.recipeService.getRecipeById(id);
  }

  @ApiOperation({ summary: 'createProduct' })
  @ApiOkResponse({
    description: 'The createProduct - request has been successfully',
    type: ProductEntity,
  })
  @Post()
  createRecipe(
    @Body() dto: CreateRecipeDto, //: Promise<RecipeDocument> {
  ) {
    return this.recipeService.createRecipe(dto);
  }

  @ApiOperation({ summary: 'updateRecipe' })
  @ApiOkResponse({
    description: 'The updateRecipe - request has been successfully',
    type: ProductEntity,
  })
  @Post('update/:id')
  addIng(
    @Param('id') id: string,
    @Body() dto: UpdateRecipeDto, //: Promise<RecipeDocument> {
  ) {
    return this.recipeService.updateRecipe(dto, id);
  }
}
