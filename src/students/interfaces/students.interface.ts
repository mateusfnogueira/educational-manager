import { IAddedCourse } from 'src/courses/interfaces';
import { IAddress } from './address.interface';

export interface IStudent {
  _id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: IAddress;
  isUnderage: boolean;
  activeEnrollment: boolean;
  motherName: string;
  fatherName: string;
  courses: Array<IAddedCourse>;
  invoiceDay: Date;
  monthlyFee: number;
}
