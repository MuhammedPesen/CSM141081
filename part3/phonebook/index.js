const express = require('express')
const morgan = require('morgan')
const person = require('./models/person');
require("./models/person")

const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);  // Log error details for debugging

    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Malformatted ID' });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    // General server error
    res.status(500).json({ error: 'Internal server error' });
};

const app = express();

app.use(express.json());
app.use(morgan('tiny'))

const Person = person


app.get("/", (request, response) => {
    response.send("<h2>Welcome to the application<h2>")
    console.log("landing page")
})

app.get("/info", async (request, response, next) => {
    try {
        const persons = await Person.find({});
        const message = `<h2>Phonebook has info for ${persons.length} people!</h2>
                         <br> ${new Date()} <br>`;
        response.send(message);
    } catch (error) {
        next(error);
    }
});

app.get("/api/persons", async (request, response, next) => {
    try {
        const persons = await Person.find({});
        response.send(persons);
    } catch (error) {
        next(error);
    }
})

app.get("/api/persons/:id", async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        next(error);  // Pass error to the error-handling middleware
    }
});

app.post("/api/persons", async (request, response, next) => {
    try {
        const persons = await Person.find({});

        console.log("New person: " + request.body.name, request.body.number);

        if (!request.body.name || !request.body.number) {
            return response.status(400).json({
                error: 'Content is missing'
            });
        }
        if (persons.some(person => person.name === request.body.name)) {
            return response.status(400).json({
                error: "Name already in use"
            });
        }

        if (persons.some(person => person.number === request.body.number)) {
            return response.status(400).json({
                error: "Number already in use"
            });
        }

        const newPerson = new Person({
            "name": request.body.name,
            "number": request.body.number,
        });

        await newPerson.save();

        const updatedPersons = await Person.find({});
        response.json(updatedPersons);
    } catch (error) {
        next(error);
    }
})

app.delete("/api/persons/:id", async (request, response, next) => {
    try {
        const id = request.params.id;
        const person = await Person.findById(id);

        if (!person) {
            return response.status(404).json({
                error: 'There is no such id'
            });
        }

        await Person.findByIdAndDelete(id);
        response.status(204).end();
    } catch (error) {
        next(error);
    }
})

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})