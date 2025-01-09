const pool = require("./pool");

async function getAllPokemons() {
  const { rows } = await pool.query("SELECT * FROM pokemon");
  return rows;
}

async function getAllTrainers() {
  const { rows } = await pool.query("SELECT * FROM trainer");
  return rows;
}

async function getAllTypes() {
  const { rows } = await pool.query("SELECT * FROM type");
  return rows;
}

async function addNewTrainer(trainerName) {
  await pool.query("INSERT INTO trainer (name) VALUES ($1)", [trainerName]);
  console.log("Added trainer name");
}

async function asignPokemonToTrainer(pokemon, trainer) {
  await pool.query(
    "UPDATE pokemon SET trainer_id = (SELECT id FROM trainer WHERE name = ($1) LIMIT 1) WHERE name = ($2)",
    [trainer, pokemon]
  );
  console.log("Add pokemon to trainer");
}

async function getPokemon(pokemon) {
  const { rows } = await pool.query(
    `
    SELECT 
      p.id, 
      p.name, 
      p.level, 
      t.name AS type_name, 
      tr.name AS trainer_name 
    FROM pokemon p
    LEFT JOIN type t ON p.type_id = t.id
    LEFT JOIN trainer tr ON p.trainer_id = tr.id
    WHERE p.name = $1
  `,
    [pokemon]
  );
  return rows;
}

async function getType(type) {
  const { rows } = await pool.query(
    `
    SELECT t.id as type_id, t.name as type_name, p.id AS pokemon_id, p.name AS pokemon_name 
    FROM type t 
    LEFT JOIN pokemon p ON t.id = p.type_id
    WHERE t.name = $1
    `,
    [type]
  );
  return rows;
}

async function getTrainer(trainer) {
  const { rows } = await pool.query(
    `
  SELECT tr.id AS trainer_id,
  tr.name AS trainer_name, 
  p.id AS pokemon_id,
  p.name AS pokemon_name
  FROM trainer tr
  LEFT JOIN pokemon p ON tr.id = p.trainer_id
  WHERE tr.name = $1
  `,
    [trainer]
  );
  return rows;
}

module.exports = {
  getAllPokemons,
  getAllTrainers,
  getAllTypes,
  addNewTrainer,
  asignPokemonToTrainer,
  getPokemon,
  getType,
  getTrainer,
};
