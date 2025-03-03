import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const patientSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    appointments: [
        {
            doctor: {
                type: Schema.Types.ObjectId,
                ref: 'Doctor',
                required: true
            },
            day: {
                type: String,
                enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                required: true
            },
            slots: [
                {
                    type: String,
                    enum: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'],
                    required: true
                }
            ]
        }
    ]
})

patientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

export const Patient = mongoose.model('Patient', patientSchema)