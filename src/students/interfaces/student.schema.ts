import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true },
    phone: { type: String, required: true },
    isUnderage: { type: Boolean, required: true },
    activeEnrollment: { type: Boolean, required: false, default: false },
    motherName: { type: String, required: false },
    fatherName: { type: String, required: false },
    invoiceDay: { type: Date, required: true },
    monthlyFee: { type: Number, required: false },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  },
  { timestamps: true, collection: 'students' },
);
