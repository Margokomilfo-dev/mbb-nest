import { Controller, Get, Param } from '@nestjs/common';
import { MarathonService } from './marathon.service';
import { MenuEnum, WorkoutsEnum } from '../../settings/types';

@Controller('marathon')
export class MarathonController {
  constructor(private readonly marathonService: MarathonService) {}
  @Get(':menu')
  getRecipeById(@Param('menu') menu: MenuEnum) {
    return this.marathonService.getRandomMenuForDay(menu);
  }
  @Get(':menu/:day')
  getRecipeForDay(@Param('menu') menu: MenuEnum, @Param('day') day: number) {
    return this.marathonService.getMenuForDay(menu, day);
  }
  @Get('workout/:type/:day')
  getWorkoutForDay(
    @Param('type') type: WorkoutsEnum,
    @Param('day') day: number,
  ) {
    return this.marathonService.getWorkoutForDay(type, day);
  }
}
