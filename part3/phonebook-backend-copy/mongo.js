const mongoose = require("mongoose");
if (process.argv.length < 3) {
  console.log("give password as argument");
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackUserName:${password}@fullstackopenfirstclust.nr0heyo.mongodb.net/`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    unique: true,
  },
  important: Boolean,
});

const Note = new mongoose.model("Note", noteSchema);

// const note = new Note({ content: "HTML is easy", important: true });

// note.save().then((result) => {
//   console.log("note Saved!!");
//   console.log(result);
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
