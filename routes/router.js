const { Router } = require("express");
const appController = require("../controllers/appController");

const router = Router();

router.get("/", appController.getPokemonsAndTrainers);
router.get("/new", appController.createTrainerGet);
router.post("/new", appController.createTrainerPost);
router.post("/add", appController.addPokemonToTrainerPost);
router.get("/pokemon", appController.pokemonGet);
router.get("/search", appController.searchPokemonGet);
router.get("/type", appController.searchTypeGet);
router.get("/trainer", appController.searchTrainerGet);
router.post("/release", appController.deletePokemonPost);
router.post("/auth", appController.handleCreateTrainerAuth);

module.exports = router;
