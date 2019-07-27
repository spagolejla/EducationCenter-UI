
import { CourseClass } from './courseClass';
import { StudentAttendance } from './studentAttendance';

export class CourseManage {
  id: number;
  name: string;
  maxNumberOfClasses: number;
  currentNumberOfClasses: number;
  classes: CourseClass[];
  students: StudentAttendance[];
}
