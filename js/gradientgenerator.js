$(document).ready(function(){

	var $colorElement = $('.menuitem'),
		steps = $colorElement.length+1;
	
	//generates random rgb colors
	var generate_rgb = function(){
		var r = Math.floor(Math.random()*128)+100,
			g = Math.floor(Math.random()*128)+100,
			b = Math.floor(Math.random()*128)+100;

		return {
			r: r,
			g: g,
			b: b
		};
	};



	//defines the start and end rgb colors and finds the diffrence between them
	var color_mixer = function(color1, color2){
		
		//This gets the difference between color1 & color2 for the number of steps you need
		var color_diff = function(color1, color2){
			if(color1 > color2){
				return Math.floor((color1 - color2) / steps);
			}
			else{
				return Math.floor((color2 - color1) / steps);
			}
		};

		//This gets the lower color number. The color_diff number is added to this number at each step to created the gradient
		var color_lower = function(color1, color2){
			var lower_number = 0;
			if(color1 > color2){
				lower_number = color2;
				return lower_number;
			}
			else{
				lower_number = color1;
				return lower_number;
			}
		};

		return {
			add_r: color_diff(color1.r, color2.r),
			add_g: color_diff(color1.g, color2.g),
			add_b: color_diff(color1.b, color2.b),
			lower_r: color_lower(color1.r, color2.r),
			lower_g: color_lower(color1.g, color2.g),
			lower_b: color_lower(color1.b, color2.b)
		};

	};


	//This creates an array of all the colors at each step and applies it to the element we selected.
	var add_color = function(mixed, $svg){
		var colorArray = [];

		//This increments each color value indiviually and pushes it to it's own colorArray
		for(var i=0; i < steps; i++){
			colorArray.push([
				mixed.lower_r += mixed.add_r,
				mixed.lower_g += mixed.add_g,
				mixed.lower_b += mixed.add_b
			]);
		}

		//if you are using an svg logo or icon, you can include it with your color gradient
		//if you don't use this, then remove the +1 from colorArray[i+1] & steps = $colorElement.length+1
		$svg.css("fill","rgb("+colorArray[0].join(',')+")");

		//This applies each step color to each element. +1 is added to colorArray because I am including the svg logo
		$colorElement.each(function(i){
			this.style["background-color"]="rgb("+colorArray[i+1].join(',')+")";
		});

	};

	//This makes it work
	add_color(color_mixer(generate_rgb(), generate_rgb()),$('svg path'));

});
