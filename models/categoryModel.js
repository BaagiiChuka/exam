const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "You have to write 'name' field. "],
      unique: true,
      trim: true,
      maxlength: [100, "Your text must be a max length is 100."],
    }
    
});

module.exports = mongoose.model("Category", CategorySchema);
