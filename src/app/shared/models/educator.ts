import { EducatorRate } from './educatorRates';

export class Educator {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  courseField: string;
  courseFieldId: number;
  username: string;
  accountType: string;
  active: boolean;
  avatarUrl: string;
  rates: EducatorRate[];
  avgRate: number;
}
