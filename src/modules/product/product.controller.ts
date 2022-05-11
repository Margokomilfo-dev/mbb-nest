import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDocument } from './schemas/product.schema';
import { ProductService } from './product.service';
import { HttpExceptionFilter } from '../../exceptions/http-filter.exception';
import { ProductEntity } from './entities/product.entity';
import { ProductCategoryEnum } from '../../settings/types';
import { ObjectId } from 'mongoose';

@Controller('product')
@UseFilters(new HttpExceptionFilter())
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'get products' })
  @ApiOkResponse({
    description: 'The getProducts - request has been successfully',
    type: [ProductEntity],
  })
  @Get(':id')
  getProductById(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.getProductById(id);
  }

  @ApiOperation({ summary: 'get products by Type' })
  @ApiOkResponse({
    description: 'The getProducts by Type - request has been successfully',
    type: [ProductEntity],
  })
  @Get('type/:type')
  getProductsByType(
    @Param('type') type: ProductCategoryEnum,
  ): Promise<ProductDocument[]> {
    return this.productService.getProducts(type);
  }

  @ApiOperation({ summary: 'createProduct' })
  @ApiOkResponse({
    description: 'The createProduct - request has been successfully',
    type: ProductEntity,
  })
  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @ApiOperation({ summary: 'getProductByName' })
  @ApiOkResponse({
    description: 'The createProduct - request has been successfully',
    type: [ProductEntity],
  })
  @Post('byName')
  getProductByName(
    @Body() dto: { name: string },
  ): Promise<Array<ProductDocument>> {
    return this.productService.getProductByName(dto.name);
  }
}
