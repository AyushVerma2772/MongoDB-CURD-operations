const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }]

})

const ClubModel = mongoose.model("Club", clubSchema);

module.exports = ClubModel;
