// consts.js

const Opcode = {
    empty: -2,
    invalid: -1,
    label: 0,
    goto: 1,
    if: 2,
    emitPheromone: 3,
    faceRandomDirection: 4,
    rotateClockwise: 5,
    rotateCounterClockwise: 6,
    moveForward: 7,
    bite: 8,
    pickUpFood: 9,
    dropFood: 10,
    eatFood: 11,
    generateRandomNumber: 12,
    rememberPheromone: 13
}

const Condition = {
    invalid_if: -1,
    i_smell_danger_in_front_of_me: 0,
    i_smell_pheromone_in_front_of_me: 1,
    i_was_bit: 2,
    i_am_carrying_food: 3,
    i_am_hungry: 4,
    i_am_standing_on_my_anthill: 5,
    i_am_standing_on_food: 6,
    i_am_standing_with_an_enemy: 7,
    i_was_blocked_from_moving: 8,
    last_random_number_was_zero: 9,
    last_pheromone_stronger: 10,
    same_pheromone_type: 11,
    i_smell_pheromone_1_in_front_of_me: 12,
    i_smell_pheromone_2_in_front_of_me: 13,
    i_smell_pheromone_3_in_front_of_me: 14
}

const Direction = {none: '', up: '_up', right: '_right', down: '_down', left: '_left'};

const PheromoneType = {pnone: 0, ptype1: 1, ptype2: 2, ptype3: 3};

const Colony = {green: 'green', red: 'red', blue: 'blue', yellow: 'yellow'};

// GameConstants
const MIN_ANTS_TO_QUALIFY = 6;
const VIEW_WIDTH = 64;
const VIEW_HEIGHT = 64;

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
const PHEROMONE_START_STRENGTH = 512;
const INCREMENTAL_PHEROMONE_STRENGTH = 256;
const MAX_PHEROMONE_STRENGTH = 1024;

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
const HUNGRY_IF_LESS_THAN_THIS_ENERGY = 25;

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
const INVALID_COLONY_NUMBER = -1;
const MAX_JUMP_TRIES = 10;
const MAX_JUMP_RADIUS = 10;
const MIN_JUMP_RADIUS = 3;

// Return a uniformly distributed random int from min to max, inclusive
function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRandomDirection(){
    switch(randInt(1, 4)) {
        case 1:
            return Direction.up;
            break;
        case 2:
            return Direction.right;
            break;
        case 3:
            return Direction.down;
            break;
        case 4:
            return Direction.left;
            break;
        default:
            return Direction.none;
    }
    return Direction.none;
}

// Temp dev. method
function throwIfMissing() {
    throw new Error('Missing parameter');
}
var placeHolderText = `colony: NAME
//Write your code here!

start:`;

//Default ant program
var dumbAntProg = `colony: DumbAnt
// this program controls a single ant and causes it to move
// around the field and do things.
// this ant moves around randomly, picks up food if it
// happens to stumble upon it, eats when it gets hungry,
// and will drop food on its anthill if it happens to be
// stumble back on its anthill while holding food.
// here are the ant's programming instructions, written
// in our "Bugs!" language

start:
    faceRandomDirection // face some random direction
    moveForward // move forward
    if i_am_standing_on_food then goto on_food
    if i_am_hungry then goto eat_food
    if i_am_standing_on_my_anthill then goto on_hill
    goto start // jump back to the "start:" line
on_food:
    pickUpFood
    goto start // jump back to the "start:" line
eat_food:
    eatFood // assumes we have food - I hope we do!
    goto start // jump back to the "start:" line
on_hill:
    dropFood // feed the anthill's queen ant so she
    // can produce more ants for the colony
    goto start // jump back to the "start:" line`;

var terminalInstructions = `The left panel shows the simulation
The right panel is the code editor where you edit your program
Press 'Compile' to load your program
Press 'Run' to start the simulation
Press 'Submit' to send your code to the instructor`;

var compileInstructions = `Press 'Run' to start the simulation`;
