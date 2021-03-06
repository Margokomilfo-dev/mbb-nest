import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { appSettings } from './settings/app-settings';
import { RecipeModule } from './modules/recipe/recipe.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { MarathonModule } from './modules/marathon/marathon.module';

@Module({
  imports: [
    MongooseModule.forRoot(appSettings.api.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ProductModule,
    RecipeModule,
    WorkoutModule,
    MarathonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
