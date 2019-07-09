import { CompetitionApplication } from './competitionApplication';

export class Competition {
  id: number;
  courseName: string;
  courseId: number;
  title: string;
  description: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
  educatorId: number;
  maxCandidatesNumber: number;
  currentCandidatesNumber: number;
  applications: CompetitionApplication[];
}
