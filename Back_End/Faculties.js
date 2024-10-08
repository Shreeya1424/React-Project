const mongoose= require('mongoose');
const schema=mongoose.Schema({
    FacultyID:Number,
    FacultyName:String,
    FacultyDesignation:String,
    FacultyEducationQualification:String,
    FacultyExperience:Number,
    FacultyWorkingSince:String,
});
module.exports = mongoose.model("Faculties",schema);