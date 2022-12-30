import mongoose, { Schema, model, models } from "mongoose";

const testSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

// we are creating a model called test
// it will first check if the model Test exist, if not it will create a new model
const Test = models.Test || model('Test', testSchema)

export default Test; // export the model