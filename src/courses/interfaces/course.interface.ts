
export interface IRefStudent {
  _id: string;
  name: string;
}
export interface ICourse {
  _id: string;
  name: string;
  description: string;
  price: number;
  weekDays: string[];
  duration: number;
  startClass: string;
  endClass: string;
  students?: IRefStudent[];
}

export interface IAddedCourse {
  _id: string;
  name: string;
  price: number;
  weekDays: string[];
  duration: number;
  startClass: string;
  endClass: string;
}
