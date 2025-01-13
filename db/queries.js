const pool = require("./pool");

async function getAllPokemons() {
  const { rows } = await pool.query("SELECT * FROM pokemon ORDER BY id");
  return rows;
}

async function getAllTrainers() {
  const { rows } = await pool.query("SELECT * FROM trainer ORDER BY id");
  return rows;
}

async function getAllTypes() {
  const { rows } = await pool.query("SELECT * FROM type ORDER BY id");
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
      ARRAY_AGG(t.name) AS type_names,
      tr.name AS trainer_name 
    FROM pokemon p
    LEFT JOIN pokemon_type pt ON p.id = pt.pokemon_id
    LEFT JOIN type t ON pt.type_id = t.id
    LEFT JOIN trainer tr ON p.trainer_id = tr.id
    WHERE p.name ILIKE $1
    GROUP BY p.id, p.name, tr.name
  `,
    [`${pokemon}%`]
  );
  return rows;
}

async function getType(type) {
  const { rows } = await pool.query(
    `
    SELECT
     t.id as type_id,
     t.name as type_name,
     p.id AS pokemon_id,
     p.name AS pokemon_name 
    FROM type t 
    LEFT JOIN pokemon_type pt ON t.id = pt.type_id
    LEFT JOIN pokemon p ON pt.pokemon_id = p.id
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

async function deletePokemonFromTrainer(pokemon) {
  await pool.query(
    `
    UPDATE pokemon
    SET trainer_id = NULL
    WHERE name = $1
    `,
    [pokemon]
  );
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
  deletePokemonFromTrainer,
};
