import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCategoryEnum } from '../../settings/types';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getProducts(type: ProductCategoryEnum) {
    if (type == ProductCategoryEnum.Все) {
      return this.productModel.find();
    } else return this.productModel.find({ category: type });
  }

  async getProductByName(name: string) {
    return this.productModel.find({ name: { $regex: name } });
  }

  async getProductByName_(name: string) {
    return this.productModel.findOne({ name }, { new: true });
  }

  async getProductById(id: string): Promise<ProductDocument> {
    return this.productModel.findOne({ _id: id }).lean();
  }

  async createProduct(dto: CreateProductDto) {
    const product = await this.productModel.findOne({ name: dto.name }).lean();
    if (!product) return new this.productModel(dto).save();
    if (product) return 'unfortunately';
  }
}
