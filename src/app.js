const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  /* const parsedTechs = techs.replace(/ /, '');
  const techsArray = parsedTechs.split(','); */
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const checkRepositoryExists = repositories.find(repository => repository.id === id);
  
  if (!checkRepositoryExists) {
    return response.status(400).json('Repository not found');
  }
  
  const index = repositories.indexOf(checkRepositoryExists);

  repositories[index] = { ...checkRepositoryExists, title, url, techs };

  return response.json(repositories[index]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const checkRepositoryExists = repositories.find(repository => repository.id === id);
  
  if (!checkRepositoryExists) {
    return response.status(400).send();
  }

  const index = repositories.indexOf(checkRepositoryExists);

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const checkRepositoryExists = repositories.find(repository => repository.id === id);
  
  if (!checkRepositoryExists) {
    return response.status(400).send();
  }

  const index = repositories.indexOf(checkRepositoryExists);

  repositories[index].likes += 1;

  return response.json({
    likes: repositories[index].likes
  });
});


module.exports = app;
