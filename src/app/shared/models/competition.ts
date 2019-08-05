import { CompetitionApplication } from './competitionApplication';
import { Educator } from './educator';

export class Competition {
  id: number;
  courseName: string;
  courseId: number;
  title: string;
  description: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
  maxCandidatesNumber: number;
  currentCandidatesNumber: number;
  applications: CompetitionApplication[];
  educator: Educator;
  lecturesNumber: number;
  courseStartDate: Date;
  price: number;
  daysOfWeek: string;
  courseStartTime: string;
}
