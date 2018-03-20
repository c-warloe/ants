// graphObject.js

class GraphObject {
	constructor(img, startX, startY, startDir, depth) {
		this.imgName = img;
		this.img = imgs[img + startDir];
		this.x = startX;
		this.y = startY;
		this.destX = startX;
		this.destY = startY;
		this.dir = startDir;
		this.depth = depth;
	}

	getX(){
		return this.x;
	}

	getY(){
		return this.y;
	}

	moveTo(x, y){
		this.x = x;
		this.y = y;
	}

	getDirection(){
		return this.dir;
	}

	getDirectionNum(){
		switch (this.dir){
			case Direction.up:
				return 1;
			case Direction.right:
				return 2;
			case Direction.down:
				return 3;
			case Direction.left:
				return 4;
			default:
				return 0;
		}
	}

	setDirection(dir){
		this.dir = dir;
	}

	setDirectionNum(dir){
		switch (dir){
			case 1:
				this.dir = Direction.up;
				break;
			case 2:
				this.dir = Direction.right;
				break;
			case 3:
				this.dir = Direction.down;
				break;
			case 4:
				this.dir = Direction.left;
				break;
			default:
				this.dir = Direction.none;
		}
	}

	updateImg(){
		this.img = imgs[this.imgName + this.dir];
	}
}
