require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Note = require("./models/note");
const mongoose = require("mongoose");

const app = express();

// app.use(morgan("tiny"));
app.use(cors());

app.use(
  morgan(function (tokens, req, res) {
    tokensArray = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ];

    if (tokens.method(req, res) === "POST") {
      tokensArray.push(JSON.stringify(req.body));
    }
    return tokensArray.join(" ");
  })
);

app.use(express.json());

app.use(express.static("dist"));

// const password = process.argv[2];
// const url = `mongodb+srv://fullstackUserName:${password}@fullstackopenfirstclust.nr0heyo.mongodb.net/`;
// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });
// noteSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

// const Note = mongoose.model("Note", noteSchema);

// let phoneBooks = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World</h1>");
// });

// app.get("/api/persons", (request, response) => {
//   response.json(phoneBooks);
// });

// app.get("/api/notes", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });

// app.get("/info", (request, response) => {
//   const currentTime = new Date();
//   const phoneBookLength = phoneBooks.length;
//   // console.log(phoneBookLength);

//   response.send(
//     `<p> Phonebook has info for ${phoneBookLength} people <br/> ${currentTime}</p>`
//   );
// });

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   // console.log(id);
//   // console.log(id);
//   const phoneBook = phoneBooks.find((phoneBook) => phoneBook.id === id);
//   if (phoneBook) {
//     response.json(phoneBook);
//   } else {
//     response.status(404).end();
//   }
// });

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);

//   const phoneBook = phoneBooks.find((phoneBook) => phoneBook.id === id);
//   if (phoneBook) {
//     phoneBooks = phoneBooks.filter((phoneBook) => phoneBook.id !== id);
//     response.json(phoneBooks);
//     response.status(204).end();
//   } else {
//     response.status(404).end();
//   }
// });

// app.post("/api/persons", (request, response) => {
//   const content = request.body;
//   if (!content) {
//     return response.status(400).json({ error: "content missing" });
//   }

//   if (!content.name || !content.number) {
//     return response.status(400).json({
//       error: content.name ? "phone number is missing" : "name is missing",
//     });
//   }

//   const nameExist = phoneBooks.find(
//     (phonebook) => phonebook.name === content.name
//   )
//     ? true
//     : false;

//   const phoneExist = phoneBooks.find(
//     (phonebook) => phonebook.number === content.number
//   )
//     ? true
//     : false;

//   if (phoneExist || nameExist) {
//     return response.status(400).json({
//       error: nameExist ? "name must be unique" : "phone number must be unique",
//     });
//   }

//   const randomId = Math.floor(1000 * Math.random());

//   const phonebook = {
//     ...content,
//     id: randomId,
//   };

//   phoneBooks.push(phonebook);
//   response.json(phonebook);
// });
app.get("/api/notes", (request, response) => {
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    response.json(result);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findById(id).then((note) => {
    response.json(note);
  });
});

app.post("/api/notes", (request, response) => {
  const requestContent = request.body;
  console.log("here");

  if (!requestContent) {
    return response.status(400).json({ error: "content missing" });
  }
  const note = new Note({
    content: requestContent.content,
    important: requestContent.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json({
        id: savedNote._id,
        content: savedNote.content,
        important: savedNote.important,
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: "error saving note" });
    });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id).then((note) => {
    res.status(204).end();
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
