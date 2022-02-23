export class CreateWorkOutDto {
  entry: null | WorkoutObjType;
  warmUp: null | WorkoutObjType;
  mainPart: null | WorkoutObjType;
  stretching: null | WorkoutObjType;
  day: number;
  category: number;
}
export type WorkoutObjType = {
  link: string;
  description: string;
};
