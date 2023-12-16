const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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

let phoneBooks = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(phoneBooks);
});

app.get("/info", (request, response) => {
  const currentTime = new Date();
  const phoneBookLength = phoneBooks.length;
  // console.log(phoneBookLength);

  response.send(
    `<p> Phonebook has info for ${phoneBookLength} people <br/> ${currentTime}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  // console.log(id);
  // console.log(id);
  const phoneBook = phoneBooks.find((phoneBook) => phoneBook.id === id);
  if (phoneBook) {
    response.json(phoneBook);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const phoneBook = phoneBooks.find((phoneBook) => phoneBook.id === id);
  if (phoneBook) {
    phoneBooks = phoneBooks.filter((phoneBook) => phoneBook.id !== id);
    response.json(phoneBooks);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const content = request.body;
  if (!content) {
    return response.status(400).json({ error: "content missing" });
  }

  if (!content.name || !content.number) {
    return response.status(400).json({
      error: content.name ? "phone number is missing" : "name is missing",
    });
  }

  const nameExist = phoneBooks.find(
    (phonebook) => phonebook.name === content.name
  )
    ? true
    : false;

  const phoneExist = phoneBooks.find(
    (phonebook) => phonebook.number === content.number
  )
    ? true
    : false;

  if (phoneExist || nameExist) {
    return response.status(400).json({
      error: nameExist ? "name must be unique" : "phone number must be unique",
    });
  }

  const randomId = Math.floor(1000 * Math.random());

  const phonebook = {
    ...content,
    id: randomId,
  };

  phoneBooks.push(phonebook);
  response.json(phonebook);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("running");
});
