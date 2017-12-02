// consts.js

Direction = {none: '', up: '_up', right: '_right', down: '_down', left: '_left'}

PheromoneType = {pnone: 0, ptype1: 1, ptype2: 2, ptype3: 3}

Colony = {green: 'green', red: 'red', blue: 'blue', yellow: 'yellow'}

// Pebble
const PEBBLE_DEPTH = 1;

// EnergyHolder
const DEATH_FOOD_AMOUNT = 100;

// Food
const FOOD_DEPTH = 2;
const START_FOOD_ENERGY = 6000;

// Anthill
const ANTHILL_DEPTH = 2;
const ANTHILL_START_FOOD = 8999;
const QUEEN_EAT_PER_TICK = 10000;
const MIN_FOOD_TO_PRODUCE_NEW_ANT = 2000;

// Pheromone
const PHEROMONE_DEPTH = 2;
const PHEROMONE_START_STRENGTH = 256;
const INCREMENTAL_PHEROMONE_STRENGTH = 256;
const MAX_PHEROMONE_STRENGTH = 768;

// TriggerableActor
const ACTIVATING_OBJECT_DEPTH = 2;

// Insect
const INSECT_DEPTH = 1;
const POISON_DAMAGE = 150;
const STUN_TICKS = 2;

// Ant
const ANT_START_ENERGY = 1500;
const ANT_MAX_FOOD_THAT_CAN_BE_CARRIED = 1800;
const ANT_FOOD_PICKUP_AMOUNT = 400;
const ANT_EAT_AMOUNT = 100;
const MAX_COMMANDS_PER_TICK = 10;
const ANT_BITE_DAMAGE = 15;

// Grasshopper
const GRASSHOPPER_EAT_AMOUNT = 200;
const TICKS_TO_SLEEP_BETWEEN_MOVES = 2;
const MIN_WALK_DIST = 2;
const MAX_WALK_DIST = 10;

// BabyGrasshopper
const BABY_GRASSHOPPER_START_ENERGY = 500;
const BABY_GRASSHOPPER_GROW_UP_ENERGY = 1600;

// AdultGrasshopper
const ADULT_GRASSHOPPER_START_ENERGY = 1600;
const ADULT_GRASSHOPPER_BITE_DAMAGE = 50;