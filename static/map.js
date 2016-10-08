var texture_unvisited = null;
var texture_visited = null;


$(function() {

	var worldmap = new Datamap({
		element: document.getElementById("chart"), height: 550,
		fills: {
			defaultFill: 
				function() {
					if (texture_unvisited === null) {
						svg = d3.selectAll(".datamaps-subunits");
						var t = textures.lines().stroke("green").strokeWidth(2);
						t.background("#555555");
						svg.call(t);
						texture_unvisited = t.url();
						return t.url() ;
					} else {
						return texture_unvisited;
					}
				}
		},
		
		geographyConfig: {
			highlightFillColor: function() { 
				if (texture_visited === null) {
					svg = d3.selectAll(".datamaps-subunits");
					var t = textures.paths().d("waves").strokeWidth(2);
					t.background("#AFAFAF");
					svg.call(t);
					texture_visited = t.url();
					return t.url();
				} else {
					return texture_visited;
				}
			}
		},

		setProjection: function(element) {
			var projection = d3.geo.mercator()
				.center([9.993, 54.55])
				.rotate([0,0])
				.translate([element.offsetWidth / 2, element.offsetHeight / 2])
				.scale(1500);
			var path = d3.geo.path()
				.projection(projection);
		return {path: path, projection: projection};
		},
	});

	// Relocate the texture URLs?
	datamap = document.getElementsByClassName("datamaps-subunits")[0];
	defs = document.getElementsByTagName("defs");
	//datamap.appendChild(defs[0]);
	//datamap.appendChild(defs[0]);

	//	
	countries = d3.selectAll(".datamaps-subunit");
	countries.style("stroke", "000000");

});
