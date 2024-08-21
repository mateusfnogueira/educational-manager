import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    weekDays: [{ type: Array<String>, required: true }],
    duration: { type: Number, required: true },
    startClass: { type: String, required: true },
    endClass: { type: String, required: true },
  },
  { timestamps: true, collection: 'courses' },
);
