export interface ICourse {
  name: string;
  description: string;
  price: number;
  weekDays: string[];
  duration: number;
  startClass: string;
  endClass: string;
  students?: string[];
}
