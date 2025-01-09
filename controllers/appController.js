const db = require("../db/queries");

async function getPokemonsAndTrainers(req, res) {
  const pokemon = await db.getAllPokemons();
  const trainer = await db.getAllTrainers();
  const type = await db.getAllTypes();
  console.log(pokemon);
  console.log(trainer);
  console.log(type);
  res.render("index", { pokemons: pokemon, trainers: trainer, types: type });
}

async function createTrainerGet(req, res) {
  res.send(
    `<h1>Create a new trainer</h1><form method="post"> <input type="text" name="name" placeholder="Trainer name"/><button type="submit">Submit</button></form>`
  );
}

async function createTrainerPost(req, res) {
  const { name } = req.body;
  await db.addNewTrainer(name);
  res.redirect("/");
}

async function addPokemonToTrainerPost(req, res) {
  const { pokemon, trainer } = req.body;
  await db.asignPokemonToTrainer(pokemon, trainer);
  res.redirect("/");
}

async function searchPokemon(req, res) {
  res.send(
    `<form method="get"><input type="text" name="pokemon" placeholder="Pokemon" /><button type="submit">Submit</button></form>`
  );
}

async function searchPokemonGet(req, res) {
  const { pokemon } = req.query;
  const result = await db.getPokemon(pokemon);
  console.log(result);
  res.render("pokemon", { pokemon: result });
}

async function searchTypeGet(req, res) {
  const { type } = req.query;
  const result = await db.getType(type);
  console.log(result);
  res.render("type", { pokemons: result, type: type });
}

async function searchTrainerGet(req, res) {
  const { trainer } = req.query;
  const result = await db.getTrainer(trainer);
  console.log(result);
  res.render("trainer", { trainers: result, trainer: trainer });
}

module.exports = {
  getPokemonsAndTrainers,
  createTrainerGet,
  createTrainerPost,
  addPokemonToTrainerPost,
  searchPokemon,
  searchPokemonGet,
  searchTypeGet,
  searchTrainerGet,
};