import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const doctorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    speciality: {
        type: String,
        enum: ['Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician'],    // I am considering that as of now we have only these type of doctors in hospital.
        required: true
    },
    availability: [
        {
            day: {
                type: String,
                enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                required: true
            },
            slots: [
                {
                    type: String,
                    enum: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '14:00-15:00', '15:00-16:00', '16:00-17:00']
                }
            ]
        }
    ]
});

doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 
  
    try {
      const salt = await bcrypt.genSalt(10); 
      this.password = await bcrypt.hash(this.password, salt); 
      next();
    } catch (error) {
      next(error);
    }
  });

export const Doctor = mongoose.model('Doctor', doctorSchema);
