// loadImgs.js

var imgs = { "adultgrass_down": null,
		 "adultgrass_left": null,
		 "adultgrass_right": null,
		 "adultgrass_up": null,
		 "anthill": null,
		 "babygrass_down": null,
		 "babygrass_left": null,
		 "babygrass_right": null,
		 "babygrass_up": null,
		 "food": null,
		 "greenant_down": null,
		 "greenant_left": null,
		 "greenant_right": null,
		 "greenant_up": null,
		 "greenpher": null,
		 "poison": null,
		 "redant_down": null,
		 "redant_left": null,
		 "redant_right": null,
		 "redant_up": null,
		 "redpher": null,
		 "rock1": null,
		 "waterpool": null,
		 "blueant_down": null,
		 "blueant_left": null,
		 "blueant_right": null,
		 "blueant_up": null,
		 "bluepher": null,
		 "yellowant_down": null,
		 "yellowant_left": null,
		 "yellowant_right": null,
		 "yellowant_up": null,
		 "yellowpher": null};

var loaded_imgs = 0;
var img_names = Object.keys(imgs);
for (var i = 0; i < img_names.length; i++){
	imgs[img_names[i]] = new Image();
	imgs[img_names[i]].src = "./assets/" + img_names[i] + ".png";
	imgs[img_names[i]].onload = function(){
		loaded_imgs++;
		if(loaded_imgs === 33) {
            sw.init(greenProgram, redProgram, yellowProgram, blueProgram);
            sw.draw();
		}
	}
}
