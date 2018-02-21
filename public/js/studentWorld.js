// studentWorld.js

class StudentWorld extends GameWorld{
	constructor(){
		super();
		this.numAnts0 = 0;
		this.numAnts1 = 0;
		this.numAnts2 = 0;
		this.numAnts3 = 0;

		this.numColonies = 0;

		this.ticks = 0;

		this.map = [];
		for (let x = 0; x < 64; x++){
			this.map[x] = [];
			for (let y = 0; y < 64; y++){
				this.map[x][y] = [];
			}
		} // Makes 3D array

		this.scores = {'green': 0, 'red': 0, 'blue': 0, 'yellow': 0};
		this.winningScore = MIN_ANTS_TO_QUALIFY - 1;
		this.currentWinner = "";

		this.antProgram = {'green': null, 'red': null, 'blue': null, 'yellow': null};
	}

	init(program0, program1, program2, program3){
		this.updateStats();
		for(let i = 0; i < 64; i++){
			for(let j = 0; j < 64; j++){
				switch(fields[field_index % fields.length][j*64 + i]){
					case '*':
						this.addActor(new Pebble(this, i, j));
						break;
					case 'g':
						this.addActor(new BabyGrasshopper(this, i, j));
						break;
					case '0':
						this.addActor(new AntHill(this, i, j, Colony.green, program0));
						break;
					case '1':
						this.addActor(new AntHill(this, i, j, Colony.red, program1));
						break;
					case '2':
						this.addActor(new AntHill(this, i, j, Colony.yellow, program2));
						break;
					case '3':
						this.addActor(new AntHill(this, i, j, Colony.blue, program3));
						break;
					case 'w':
						this.addActor(new WaterPool(this, i, j));
						break;
					case 'p':
						this.addActor(new Poison(this, i, j));
						break;
					case 'f':
						this.addActor(new Food(this, i, j, START_FOOD_ENERGY));
						break;
					case ' ':
						break;
				}
			}
		}
	}


	initT(program0, program1, program2, program3){
		for(let x = 0; x < 64; x++){
			for(let y = 0; y < 64; y++){
				if(x === 0 || y === 0 || x === 63 || y === 63){
					let tmp = new Pebble(this, x, y);
					this.addActor(tmp);
				}
			}
		}
		
		//let x = new Ant(this, 31, 31, Colony.blue, program0);
		//this.addActor(x);

		//this.addActor(new Food(this, 31, 35, START_FOOD_ENERGY));
		let g = new Ant(this, 31, 31, Colony.green, program0);
		this.addActor(g);
		this.addActor(new Pheromone(this, 31, 30, Colony.green, PheromoneType.ptype3));

		//this.addActor(new AntHill(this, 31, 31, Colony.blue, program0));
		/*this.addActor(new Food(this, 33, 31, START_FOOD_ENERGY));
		this.addActor(new Food(this, 29, 31, START_FOOD_ENERGY));
		this.addActor(new Food(this, 31, 33, START_FOOD_ENERGY));*/
		/*

		for(let x = 0; x < 64; x++){
			for(let y = 0; y < 64; y++){
				if(x === 0 || y === 0 || x === 63 || y === 63){
					let tmp = new Pebble(this, x, y);
					this.addActor(tmp);
				}
			}
		}

		

		//temporary display all
        this.addActor(new Pebble(this, 21, 1));
        this.addActor(new Food(this, 21, 2, START_FOOD_ENERGY));
        this.addActor(new AntHill(this, 21, 3, Colony.green, 'p1'));
        this.addActor(new Pheromone(this, 21, 4, Colony.blue, PheromoneType.ptype1));
        this.addActor(new Pheromone(this, 22, 4, Colony.green, PheromoneType.ptype2));
        this.addActor(new Pheromone(this, 23, 4, Colony.red, PheromoneType.ptype3));
        this.addActor(new Pheromone(this, 24, 4, Colony.yellow, PheromoneType.ptype3));
        this.addActor(new WaterPool(this, 21, 5));
        this.addActor(new Poison(this, 21, 6));
        this.addActor(new Ant(this, 21, 7, Colony.blue, program0, 'ant'));
        this.addActor(new Ant(this, 22, 7, Colony.green, program1, 'ant'));
        this.addActor(new Ant(this, 23, 7, Colony.red, program2, 'ant'));
        this.addActor(new Ant(this, 24, 7, Colony.yellow, program3, 'ant'));
        this.addActor(new BabyGrasshopper(this, 21, 8));
        this.addActor(new AdultGrasshopper(this, 21, 9));



		//temporary test all
		let p = new Pebble(this, 1, 1);
		this.addActor(p);
		console.log("---Pebble---");
		console.log(p.blocksMovement());

		let f = new Food(this, 1, 2, START_FOOD_ENERGY);
		this.addActor(f);
		console.log("---Food---");
		console.log(f.isEdible());

		let ah = new AntHill(this, 1, 3, Colony.green, program0);
		this.addActor(ah);
		console.log("---Anthill---");
		console.log(ah.isAntHill(Colony.green));
		console.log(ah.getEnergy());
		console.log(ah.studentWorld.getActorsAt(1,3));
		console.log(this.scores[Colony.green]);
		ah.doSomething();
		ah.doSomething();
		ah.doSomething();
		ah.doSomething();
		ah.doSomething();
		ah.doSomething();
		ah.doSomething();
		ah.doSomething();
		console.log(ah.getEnergy());
		console.log(ah.studentWorld.getActorsAt(1,3));
		console.log(this.scores[Colony.green]);

		let pb = new Pheromone(this, 1, 4, Colony.blue, PheromoneType.ptype1);
		this.addActor(pb);
		let pg = new Pheromone(this, 2, 4, Colony.green, PheromoneType.ptype2);
		this.addActor(pg);
		let pr = new Pheromone(this, 3, 4, Colony.red, PheromoneType.ptype3);
		this.addActor(pr);
		let py = new Pheromone(this, 4, 4, Colony.yellow, PheromoneType.ptype3);
		this.addActor(py);
		console.log("---Pheromone---");
		console.log(py.getEnergy());
		py.doSomething();
		console.log(py.getEnergy());
		console.log(py.isPheromone(Colony.yellow));
		console.log(py.getPheromoneType());
		py.setPheromoneType(PheromoneType.ptype1);
		console.log(py.getPheromoneType());
		console.log(py.isPheromoneType(PheromoneType.ptype3));
		py.increaseStrength();
		console.log(py.getEnergy());
		console.log(this.getPheromoneAt_4(1, 3, Colony.blue, PheromoneType.ptype1));
		console.log(this.getPheromoneAt_4(1, 4, Colony.red, PheromoneType.ptype1));
		console.log(this.getPheromoneAt_4(1, 4, Colony.blue, PheromoneType.ptype2));
		console.log(this.getPheromoneAt_4(1, 4, Colony.blue, PheromoneType.ptype1));

		let wp = new WaterPool(this, 1, 5);
		this.addActor(wp);
		console.log("---WaterPool---");
		let anwp = new Ant(this, 1, 5, Colony.blue, program0, 'ant');
		this.addActor(anwp);
		console.log(anwp.stunned + " " + anwp.sleepTicks);
		wp.doSomething();
		console.log(anwp.stunned + " " + anwp.sleepTicks);

		let po = new Poison(this, 1, 6);
		this.addActor(po);
		console.log("---Poison---");
		let anpo = new Ant(this, 1, 6, Colony.blue, program0, 'ant');
		this.addActor(anpo);
		console.log(anpo.getEnergy());
		po.doSomething();
		console.log(anpo.getEnergy());

		let anb = new Ant(this, 1, 7, Colony.blue, program0, 'ant');
		this.addActor(anb);
		let ang = new Ant(this, 2, 7, Colony.green, program0, 'ant');
		this.addActor(ang);
		let anr = new Ant(this, 3, 7, Colony.red, program0, 'ant');
		this.addActor(anr);
		let any = new Ant(this, 4, 7, Colony.yellow, program0, 'ant');
		this.addActor(any);
		console.log("---Ant---");
		console.log(any.getEnergy());
		console.log(any.iWasBit);
		any.getBitten(150);
		console.log(any.getEnergy());
		console.log(any.iWasBit);
		console.log(any.isEnemy(Colony.yellow));
		console.log(f.getEnergy());
		console.log(any.getEnergy());
		let ff = new Food(this, 4, 7, START_FOOD_ENERGY);
		this.addActor(ff);
		any.pickupAndEatFood(50);
		console.log(ff.getEnergy());
		console.log(any.getEnergy());
		console.log(anb.getX() + " " + anb.getY() + " " + anb.getXYInFrontOfMe());
		console.log(anb.destX + " " + anb.destY);
		console.log(anb.moveForwardIfPossible());
		console.log(anb.destX + " " + anb.destY);
		console.log(this.canMoveTo(1,1));
		console.log(this.canMoveTo(1,2));
		console.log(this.canMoveTo(2,1));
		any.emitPheromone(PheromoneType.ptype2);
		any.emitPheromone(PheromoneType.ptype2);
		any.emitPheromone(PheromoneType.ptype1);
		console.log(this.getActorsAt(4,7));
		any.doSomething();
		console.log(any.program);

		let bg = new BabyGrasshopper(this, 1, 8);
		this.addActor(bg);
		console.log("---BabyGrasshopper---");
		console.log(bg.walkDist);
		console.log(bg.getDirection());
		console.log(bg.isEnemy(Colony.yellow));
		bg.doSomething();
		console.log(bg.getEnergy());
		console.log(this.getActorsAt(1,8));
		console.log(bg.walkDist + " " + bg.dir);
		console.log(bg.getX() + " " + bg.getY());
		console.log(bg.sleepTicks);


		let ag1 = new AdultGrasshopper(this, 1, 9);
		let ag2 = new AdultGrasshopper(this, 1, 9);
		this.addActor(ag1);
		this.addActor(ag2);
		console.log("---AdultGrashopper---");

		console.log(ag1.getEnergy() + " " + ag2.getEnergy());
		ag1.getBitten(ADULT_GRASSHOPPER_BITE_DAMAGE);
		console.log(ag1.getEnergy() + " " + ag2.getEnergy());

		ag2.doSomething();
		console.log(ag2.getX() + " " + ag2.getY());
		console.log(ag1.getEnergy() + " " + ag2.getEnergy());

		ag1.jump();
		console.log(ag1.getX() + " " + ag1.getY());

		console.log("---studentWorld---");
		console.log(this.getActorsAt(1, 1));
		console.log(this.getEdibleAt(1, 2));
		console.log(this.getEdibleAt(1, 9));
		//end temporary test all
		*/


	}

	draw(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(let i = 0; i < 64; i++){
			for(let j = 0; j < 64; j++){
				ctx.fillStyle = ((i+j)%2 === 0)? "#56534a": "#4f4c43";
				ctx.fillRect(i*offset, j*offset, offset+1, offset+1);
			}
		}

		for(let x = 0; x < 64; x++){
			for(let y = 0; y < 64; y++){
				for(let a = this.map[x][y].length - 1; a >= 0; a--){
					ctx.drawImage(this.map[x][y][a].img, this.map[x][y][a].x*offset, this.map[x][y][a].y*offset, offset, offset);
				}
			}
		}

	}

	move(){
		// increment tick count
        this.ticks++;

        // update status bar
		this.updateStats();

        // clear the moved boolean for all actors
        for(let i = 0; i < 64; i++){
            for(let j = 0; j < 64; j++){
                for(let k = 0; k < this.map[i][j].length; k++){
                    this.map[i][j][k].setMoved(false);
                }
            }
        }

        // if the actor has not already moved, move it and set its moved boolean to true
		// if actor is not in original location, delete it from original location and insert in new one
		for(let i = 0; i < 64; i++){
			for(let j = 0; j < 64; j++){
				for(let k = 0; k < this.map[i][j].length; k++){
					let currActor = this.map[i][j][k];
					let origX = currActor.getX();
					let origY = currActor.getY();
					if(!currActor.hasMoved() && !currActor.isDead()) {
                        currActor.doSomething();
                        currActor.setMoved(true);

                        if(origX !== currActor.getX() || origY !== currActor.getY()){
                        	this.map[i][j].splice(k, 1);
                        	k--;
                        	this.addActor(currActor);
						}
                    }
				}
			}
		}

		this.removeDeadActors();

        if(this.ticks === 2000){
            if(this.currentWinner !== ""){
				swal({
					title: "And the winner is...",
					text: `Colony ${this.currentWinner} is the winner, with ${this.winningScore} ants produced!`,
					type: "info",
					confirmButtonText: "Reset Game"
				}).then(function(){
					compileCode();
				});
            } else{
				swal({
					title: "No Winner...",
					text: "No colony produced more than 5 ants in 2000 ticks, so the game ends in a tie.",
					type: "warning",
                    confirmButtonText: "Reset Game"
                }).then(function(){
                    compileCode();
				});
            }
        }
	}

	cleanUp(){
	}

	canMoveTo(toX, toY){
		if (toX < 0 || toX >= VIEW_WIDTH || toY < 0 || toY >= VIEW_HEIGHT)
        	return false;

        let actors = this.getActorsAt(toX, toY);
		if (actors.length === 0)
			return true;

		for (let i = 0; i < actors.length; i++){
			if (actors[i].blocksMovement()){
				return false
			}
		}

		return true;
	}

	addActor(actor){
		this.map[actor.getX()][actor.getY()].unshift(actor);
	}

	getEdibleAt(x, y){
		let actors = this.getActorsAt(x, y);
		if (actors.length === 0)
			return;

		for (let i = 0; i < actors.length; i++){
			if (actors[i].isEdible() && !actors[i].isDead()){
				return actors[i];
			}
		}

		return null;
	}

	getPheromoneAt_4(x, y, colony, pheromoneType){
		let actors = this.getActorsAt(x, y);
		if (actors.length === 0)
			return;

		for (let i = 0; i < actors.length; i++){
			if (actors[i].isPheromone(colony) && actors[i].isPheromoneType(pheromoneType) && !actors[i].isDead()){
				return actors[i];
			}
		}
		return null;
	}

	getPheromoneAt_3(x, y, colony){
		let actors = this.getActorsAt(x, y);
		if (actors.length === 0)
			return;

		for (let i = 0; i < actors.length; i++){
			if (actors[i].isPheromone(colony) && !actors[i].isDead()){
				return actors[i];
			}
		}
		return null;
	}

	isEnemyAt(x, y, colony){
		let actors = this.getActorsAt(x, y);
		if (actors.length === 0)
			return false;

		for (let i = 0; i < actors.length; i++){
			if (actors[i].isEnemy(colony) && !actors[i].isDead()){
				return true;
			}
		}
		return false;
	}

	isDangerAt(x, y, colony){
		let actors = this.getActorsAt(x, y);
		if (actors.length === 0)
			return false;

		for (let i = 0; i < actors.length; i++){
			if (actors[i].isDangerous(colony) && !actors[i].isDead()){
				return true;
			}
		}
		return false;
	}

	isAntHillAt(x, y, colony){
		let actors = this.getActorsAt(x, y);
		if (actors.length === 0)
			return false;

		for (let i = 0; i < actors.length; i++){
			if (actors[i].isAntHill(colony) && !actors[i].isDead()){
				return true;
			}
		}
		return false;
	}

	biteEnemyAt(me, colony, biteDamage){
		let actors = this.getActorsAt(me.getX(), me.getY());
		if (actors.length === 0)
			return false;

		let enemies = [];
		for (let i = 0; i < actors.length; i++){
			if (actors[i].isEnemy(colony) && !actors[i].isDead() && actors[i] !== me){
				enemies.push(actors[i]);
			}
		}
		if (enemies.length === 0)
			return false;
		enemies[randInt(0, enemies.length - 1)].getBitten(biteDamage);
		return true;
	}

	poisonAllPoisonableAt(x, y){
		let actors = this.getActorsAt(x, y);
		if (actors.length === 0)
			return;

		for (let i = 0; i < actors.length; i++){
			if (!actors[i].isDead()){
				actors[i].getPoisoned();
			}
		}
	}

	stunAllStunnableAt(x, y){
	    let actors = this.getActorsAt(x, y);
		if (actors.length === 0)
			return;

		for (let i = 0; i < actors.length; i++){
			if (!actors[i].isDead()){
				actors[i].getStunned();
			}
		}
	}

	increaseScore(colonyNum){
		this.scores[colonyNum]++;
		if (this.scores[colonyNum] > this.winningScore) {
            this.winningScore = this.scores[colonyNum];
            this.currentWinner = colonyNum;
        }
	}

	getActorsAt(x, y){
		return this.map[x][y];
	}

	removeDeadActors(){
        for(let i = 0; i < 64; i++){
            for(let j = 0; j < 64; j++){
                for(let k = 0; k < this.map[i][j].length; k++){
                    let currActor = this.map[i][j][k];
                    if(currActor.isDead()){
                        this.map[i][j].splice(k, 1);
                        k--;
                    }
                }
            }
        }
	}

	updateStats(){
        $('#ticks').text(this.ticks);
        $('#green-count').text(this.scores.green);
        $('#red-count').text(this.scores.red);
        $('#blue-count').text(this.scores.blue);
        $('#yellow-count').text(this.scores.yellow);
	}

}
