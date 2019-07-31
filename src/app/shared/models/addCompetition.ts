export interface AddCompetition {
  id: number;
  title: string;
  description: string;
  maxCandidates: number;
  endDate: Date;
  courseId: number;
  active: boolean;
}
