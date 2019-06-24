export interface EditCourse
{
  id: number;
  name: string;
  description: string;
  numberOfLectures: number;
  price: number;

  startDate: Date;
  classStartTime: string;
  daysOfWeek: string;

  administratorId: number;
  educatorId: number;
  courseFieldId: number;
}
