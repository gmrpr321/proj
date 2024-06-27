const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  field1: String,
  field2: String,
});

const TestModel = mongoose.model("TestModel", testSchema);

module.exports = TestModel;
