import mongoose from 'mongoose';

const staffRosterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Staff name is required'],
      trim: true,
    },
    dept: {
      type: String,
      required: [true, 'Department is required'],
      enum: ['Biochemistry', 'Hematology', 'Radiology', 'Microbiology'],
      trim: true,
    },
    shift: {
      type: String,
      required: [true, 'Shift roster is required'],
      enum: ['Morning', 'Evening', 'Night'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const StaffRoster = mongoose.model('StaffRoster', staffRosterSchema);
export default StaffRoster;
