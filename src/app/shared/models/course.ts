import { CourseRate } from './courseRates';

export class Course {
  id: number;

  name: string;
  description: string;
  numberOfLectures: number;

  startDate: Date;
  classStartTime: string;
  daysOfWeek: string[];

  administrator: string;
  educator: string;
  courseField: boolean;
  price: number;
  rates: CourseRate[];
  avgRate: number;
}
