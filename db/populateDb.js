const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20)
    );

CREATE TABLE IF NOT EXISTS trainer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20)
    );

CREATE TABLE IF NOT EXISTS pokemon (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  trainer_id INT,
  constraint fk_trainer FOREIGN KEY (trainer_id) REFERENCES trainer(id)
);

CREATE TABLE IF NOT EXISTS pokemon_type (
    pokemon_id INT references pokemon(id) ON DELETE CASCADE,
    type_id INT references type(id) ON DELETE CASCADE,
    PRIMARY KEY (pokemon_id, type_id)
    );

INSERT INTO type (name)
VALUES
('Normal'),
('Fire'),
('Water'),
('Grass'),
('Electric'),
('Ice'),
('Fighting'),
('Poison'),
('Ground'),
('Flying'),
('Psychic'),
('Bug'),
('Rock'),
('Ghost'),
('Dragon'),
('Dark'),
('Steel'),
('Fairy');

INSERT INTO pokemon (name) 
VALUES 
('Bulbasaur'), ('Ivysaur'), ('Venusaur'),
('Charmander'), ('Charmeleon'), ('Charizard'),
('Squirtle'), ('Wartortle'), ('Blastoise'),
('Caterpie'), ('Metapod'), ('Butterfree'),
('Weedle'), ('Kakuna'), ('Beedrill'),
('Pidgey'), ('Pidgeotto'), ('Pidgeot'),
('Rattata'), ('Raticate'), ('Spearow'),
('Fearow'), ('Ekans'), ('Arbok'),
('Pikachu'), ('Raichu'), ('Sandshrew'),
('Sandslash'), ('Nidoran♀'), ('Nidorina'),
('Nidoqueen'), ('Nidoran♂'), ('Nidorino'),
('Nidoking'), ('Clefairy'), ('Clefable'),
('Vulpix'), ('Ninetales'), ('Jigglypuff'),
('Wigglytuff'), ('Zubat'), ('Golbat'),
('Oddish'), ('Gloom'), ('Vileplume'),
('Paras'), ('Parasect'), ('Venonat'),
('Venomoth'), ('Diglett'), ('Dugtrio'),
('Meowth'), ('Persian'), ('Psyduck'),
('Golduck'), ('Mankey'), ('Primeape'),
('Growlithe'), ('Arcanine'), ('Poliwag'),
('Poliwhirl'), ('Poliwrath'), ('Abra'),
('Kadabra'), ('Alakazam'), ('Machop'),
('Machoke'), ('Machamp'), ('Bellsprout'),
('Weepinbell'), ('Victreebel'), ('Tentacool'),
('Tentacruel'), ('Geodude'), ('Graveler'),
('Golem'), ('Ponyta'), ('Rapidash'),
('Slowpoke'), ('Slowbro'), ('Magnemite'),
('Magneton'), ('Farfetch’d'), ('Doduo'),
('Dodrio'), ('Seel'), ('Dewgong'),
('Grimer'), ('Muk'), ('Shellder'),
('Cloyster'), ('Gastly'), ('Haunter'),
('Gengar'), ('Onix'), ('Drowzee'),
('Hypno'), ('Krabby'), ('Kingler'),
('Voltorb'), ('Electrode'), ('Exeggcute'),
('Exeggutor'), ('Cubone'), ('Marowak'),
('Hitmonlee'), ('Hitmonchan'), ('Lickitung'),
('Koffing'), ('Weezing'), ('Rhyhorn'),
('Rhydon'), ('Chansey'), ('Tangela'),
('Kangaskhan'), ('Horsea'), ('Seadra'),
('Goldeen'), ('Seaking'), ('Staryu'),
('Starmie'), ('Mr. Mime'), ('Scyther'),
('Jynx'), ('Electabuzz'), ('Magmar'),
('Pinsir'), ('Tauros'), ('Magikarp'),
('Gyarados'), ('Lapras'), ('Ditto'),
('Eevee'), ('Vaporeon'), ('Jolteon'),
('Flareon'), ('Porygon'), ('Omanyte'),
('Omastar'), ('Kabuto'), ('Kabutops'),
('Aerodactyl'), ('Snorlax'), ('Articuno'),
('Zapdos'), ('Moltres'), ('Dratini'),
('Dragonair'), ('Dragonite'), ('Mewtwo'),
('Mew');

-- GEN 1 Pokemon
INSERT INTO pokemon_type (pokemon_id, type_id) VALUES
(1, 4), (1, 8),    -- Bulbasaur (Grass/Poison)
(2, 4), (2, 8),    -- Ivysaur (Grass/Poison)
(3, 4), (3, 8),    -- Venusaur (Grass/Poison)
(4, 2),            -- Charmander (Fire)
(5, 2),            -- Charmeleon (Fire)
(6, 2), (6, 10),   -- Charizard (Fire/Flying)
(7, 3),            -- Squirtle (Water)
(8, 3),            -- Wartortle (Water)
(9, 3),            -- Blastoise (Water)
(10, 12),          -- Caterpie (Bug)
(11, 12),          -- Metapod (Bug)
(12, 12), (12, 10), -- Butterfree (Bug/Flying)
(13, 12), (13, 8), -- Weedle (Bug/Poison)
(14, 12), (14, 8), -- Kakuna (Bug/Poison)
(15, 12), (15, 8), -- Beedrill (Bug/Poison)
(16, 1), (16, 10), -- Pidgey (Normal/Flying)
(17, 1), (17, 10), -- Pidgeotto (Normal/Flying)
(18, 1), (18, 10), -- Pidgeot (Normal/Flying)
(19, 1),           -- Rattata (Normal)
(20, 1),           -- Raticate (Normal)
(21, 1), (21, 10), -- Spearow (Normal/Flying)
(22, 1), (22, 10), -- Fearow (Normal/Flying)
(23, 8),           -- Ekans (Poison)
(24, 8),           -- Arbok (Poison)
(25, 5),           -- Pikachu (Electric)
(26, 5),           -- Raichu (Electric)
(27, 9),           -- Sandshrew (Ground)
(28, 9),           -- Sandslash (Ground)
(29, 8),           -- Nidoran♀ (Poison)
(30, 8),           -- Nidorina (Poison)
(31, 8), (31, 9),  -- Nidoqueen (Poison/Ground)
(32, 8),           -- Nidoran♂ (Poison)
(33, 8),           -- Nidorino (Poison)
(34, 8), (34, 9),  -- Nidoking (Poison/Ground)
(35, 18),          -- Clefairy (Fairy)
(36, 18),          -- Clefable (Fairy)
(37, 2),           -- Vulpix (Fire)
(38, 2),           -- Ninetales (Fire)
(39, 18), (39, 1), -- Jigglypuff (Fairy/Normal)
(40, 18), (40, 1), -- Wigglytuff (Fairy/Normal)
(41, 8), (41, 10), -- Zubat (Poison/Flying)
(42, 8), (42, 10), -- Golbat (Poison/Flying)
(43, 4), (43, 8),  -- Oddish (Grass/Poison)
(44, 4), (44, 8),  -- Gloom (Grass/Poison)
(45, 4), (45, 8),  -- Vileplume (Grass/Poison)
(46, 12), (46, 4), -- Paras (Bug/Grass)
(47, 12), (47, 4), -- Parasect (Bug/Grass)
(48, 12), (48, 8), -- Venonat (Bug/Poison)
(49, 12), (49, 8), -- Venomoth (Bug/Poison)
(50, 9),           -- Diglett (Ground)
(51, 9),           -- Dugtrio (Ground)
(52, 1),           -- Meowth (Normal)
(53, 1),           -- Persian (Normal)
(54, 3),           -- Psyduck (Water)
(55, 3),           -- Golduck (Water)
(56, 7),           -- Mankey (Fighting)
(57, 7),           -- Primeape (Fighting)
(58, 2),           -- Growlithe (Fire)
(59, 2),           -- Arcanine (Fire)
(60, 3),           -- Poliwag (Water)
(61, 3),           -- Poliwhirl (Water)
(62, 3), (62, 7),  -- Poliwrath (Water/Fighting)
(63, 11),          -- Abra (Psychic)
(64, 11),          -- Kadabra (Psychic)
(65, 11),          -- Alakazam (Psychic)
(66, 7),           -- Machop (Fighting)
(67, 7),           -- Machoke (Fighting)
(68, 7),           -- Machamp (Fighting)
(69, 4), (69, 8),  -- Bellsprout (Grass/Poison)
(70, 4), (70, 8),  -- Weepinbell (Grass/Poison)
(71, 4), (71, 8),  -- Victreebel (Grass/Poison)
(72, 3), (72, 8),  -- Tentacool (Water/Poison)
(73, 3), (73, 8),  -- Tentacruel (Water/Poison)
(74, 13), (74, 9), -- Geodude (Rock/Ground)
(75, 13), (75, 9), -- Graveler (Rock/Ground)
(76, 13), (76, 9), -- Golem (Rock/Ground)
(77, 2),           -- Ponyta (Fire)
(78, 2),           -- Rapidash (Fire)
(79, 3), (79, 11), -- Slowpoke (Water/Psychic)
(80, 3), (80, 11), -- Slowbro (Water/Psychic)
(81, 5), (81, 17), -- Magnemite (Electric/Steel)
(82, 5), (82, 17), -- Magneton (Electric/Steel)
(83, 1), (83, 10), -- Farfetch’d (Normal/Flying)
(84, 1), (84, 10), -- Doduo (Normal/Flying)
(85, 1), (85, 10), -- Dodrio (Normal/Flying)
(86, 3),           -- Seel (Water)
(87, 3), (87, 6),  -- Dewgong (Water/Ice)
(88, 8),           -- Grimer (Poison)
(89, 8),           -- Muk (Poison)
(90, 3),           -- Shellder (Water)
(91, 3), (91, 6),  -- Cloyster (Water/Ice)
(92, 14), (92, 8), -- Gastly (Ghost/Poison)
(93, 14), (93, 8), -- Haunter (Ghost/Poison)
(94, 14), (94, 8), -- Gengar (Ghost/Poison)
(95, 13), (95, 9), -- Onix (Rock/Ground)
(96, 11),          -- Drowzee (Psychic)
(97, 11),          -- Hypno (Psychic)
(98, 3),           -- Krabby (Water)
(99, 3),           -- Kingler (Water)
(100, 5),          -- Voltorb (Electric)
(101, 5),          -- Electrode (Electric)
(102, 4), (102, 11), -- Exeggcute (Grass/Psychic)
(103, 4), (103, 11), -- Exeggutor (Grass/Psychic)
(104, 9),          -- Cubone (Ground)
(105, 9),          -- Marowak (Ground)
(106, 7),          -- Hitmonlee (Fighting)
(107, 7),          -- Hitmonchan (Fighting)
(108, 1),          -- Lickitung (Normal)
(109, 8),          -- Koffing (Poison)
(110, 8),          -- Weezing (Poison)
(111, 13), (111, 9), -- Rhyhorn (Rock/Ground)
(112, 13), (112, 9), -- Rhydon (Rock/Ground)
(113, 1),          -- Chansey (Normal)
(114, 4),          -- Tangela (Grass)
(115, 1),          -- Kangaskhan (Normal)
(116, 3),          -- Horsea (Water)
(117, 3),          -- Seadra (Water)
(118, 3),          -- Goldeen (Water)
(119, 3),          -- Seaking (Water)
(120, 3),          -- Staryu (Water)
(121, 3), (121, 11), -- Starmie (Water/Psychic)
(122, 18), (122, 11), -- Mr. Mime (Fairy/Psychic)
(123, 12), (123, 10), -- Scyther (Bug/Flying)
(124, 6), (124, 11), -- Jynx (Ice/Psychic)
(125, 5),          -- Electabuzz (Electric)
(126, 2),          -- Magmar (Fire)
(127, 12),         -- Pinsir (Bug)
(128, 1),          -- Tauros (Normal)
(129, 3),          -- Magikarp (Water)
(130, 3), (130, 10), -- Gyarados (Water/Flying)
(131, 3), (131, 6),       -- Lapras (Water/Ice)
(132, 1),       -- Ditto (Normal)
(133, 1),       -- Eevee (Normal)
(134, 3),       -- Vaporeon (Water)
(135, 5),       -- Jolteon (Electric)
(136, 2),       -- Flareon (Fire)
(137, 1),       -- Porygon (Normal)
(138, 13), (138, 3), -- Omanyte (Rock/Water)
(139, 13), (139, 3), -- Omastar (Rock/Water)
(140, 13), (140, 3), -- Kabuto (Rock/Water)
(141, 13), (141, 3), -- Kabutops (Rock/Water)
(142, 13), (142, 10), -- Aerodactyl (Rock/Flying)
(143, 1),       -- Snorlax (Normal)
(144, 6), (144, 10), -- Articuno (Ice/Flying)
(145, 5), (145, 10), -- Zapdos (Electric/Flying)
(146, 2), (146, 10), -- Moltres (Fire/Flying)
(147, 16),      -- Dratini (Dragon)
(148, 16),      -- Dragonair (Dragon)
(149, 16), (149, 10), -- Dragonite (Dragon/Flying)
(150, 11),      -- Mewtwo (Psychic)
(151, 11);      -- Mew (Psychic)
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Seeding done!");
}

main();
