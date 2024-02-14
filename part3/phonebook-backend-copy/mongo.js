const mongoose = require("mongoose");
const argLength = process.argv.length;

if (argLength < 3) {
  console.log("give password as argument");
  return;
}

const password = process.argv[2];

const url = `mongodb+srv://phonebook:${password}@phonebook.4srn2fv.mongodb.net/`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  phoneNumber: String,
});

const Contact = new mongoose.model("Contact", contactSchema);

if (argLength === 3) {
  Contact.find({}).then((result) => {
    console.log("phonebook");
    result.forEach((contact) => {
      console.log(contact.name, contact.phoneNumber);
    });
    mongoose.connection.close();
  });
} else if (argLength === 5) {
  const contact = new Contact({
    name: process.argv[3].toString(),
    phoneNumber: process.argv[4].toString(),
  });
  contact.save().then((result) => {
    console.log(
      "added",
      process.argv[3].toString(),
      process.argv[4].toString(),
      "to phonebook"
    );
    mongoose.connection.close();
  });
} else {
  console.log("incorrect arg");
  mongoose.connection.close();
}
