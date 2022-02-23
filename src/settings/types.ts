import { ApiProperty } from '@nestjs/swagger';

export enum ResultCode {
  Success = 0,
  Error = 1,
}

export class ErrorMessage {
  constructor(readonly message: string, readonly field: string | null = null) {}
}

export class Result<T = null> {
  constructor(
    public resultCode: ResultCode,
    public messages: ErrorMessage[],
    public data?: T,
  ) {}
}

export class BaseEntity {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  __v: number;
}

export enum DimesinonsEnum {
  'гр.' = 1,
  'мл.' = 2,
  'шт.' = 3,
  'по вкусу' = 4,
}

export enum MealsEnum {
  'без типа',
  завтрак = 1,
  'перекус 1' = 2,
  обед = 3,
  'перекус 2' = 4,
  ужин = 5,
  десерт = 6,
}

export enum WorkoutsEnum {
  'без типа',
  'Домашние УРОВЕНЬ 1 НОВИЧОК' = 1,
  'Домашние УРОВЕНЬ 1 ПРОДВИНУТЫЙ' = 2,
  'Домашние УРОВЕНЬ 2 НОВИЧОК' = 3,
  'Домашние УРОВЕНЬ 2 ПРОДВИНУТЫЙ' = 4,
  'Домашние УРОВЕНЬ 3 НОВИЧОК' = 5,
  'Домашние УРОВЕНЬ 3 ПРОДВИНУТЫЙ' = 6,
  'Для тренажёрного зала НОВИЧОК' = 7,
  'Для тренажёрного зала ПРОДВИНУТЫЙ' = 8,
  'Щадящие тренировки' = 9,
}

export enum MenuEnum {
  'без типа',
  веганское = 1,
  ХИТ = 2,
  особенное = 3,
  альтернативное = 4,
  'Anti Age' = 5,
  парное = 6,
  постное = 7,
  базовое = 8,
  витаминное = 9,
  безлактозное = 10,
  'без духовки' = 11,
}
export enum ProductCategoryEnum {
  'Все',
  Грибы = 1,
  Консервы = 2,
  'Крупы и бобовые' = 3,
  'Макаронные изделия' = 4,
  Масла = 5,
  Мед = 6,
  'Молочные продукты' = 7,
  Мука = 8,
  'Мясные продукты' = 9,
  'Овощи и зелень' = 10,
  'Остальное' = 11,
  Приправы = 12,
  'Растительное молоко' = 13,
  'Рыба и морепродукты' = 14,
  Сахарозаменители = 15,
  Семена = 16,
  'Соевые продукты' = 17,
  'Спортивное питание' = 18,
  Субпродукты = 19,
  'Сухофрукты и орехи' = 20,
  'Фрукты и ягоды' = 21,
  'Хлеб и хлебцы' = 22,
  Яйца = 23,
}
