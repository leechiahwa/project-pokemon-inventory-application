const { Router } = require("express");
const appController = require("../controllers/appController");

const router = Router();

router.get("/", appController.getPokemonsAndTrainers);
router.get("/new", appController.createTrainerGet);
router.post("/new", appController.createTrainerPost);
router.post("/add", appController.addPokemonToTrainerPost);
router.get("/search", appController.searchPokemonGet);
router.get("/type", appController.searchTypeGet);
router.get("/trainer", appController.searchTrainerGet);
router.post("/release", appController.deletePokemonPost);

module.exports = router;
