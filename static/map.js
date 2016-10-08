$(function() {
	// svg = d3.selectAll(".datamaps-subunits");
	svg = d3.select("#chart");
	var t = textures.lines().thicker().stroke("green").strokeWidth(2);
	var texture_scroll = textures.lines().thicker().strokeWidth(3);
	t.background("#AAAAAA");
	texture_scroll.background("#AFAFAF");
	svg.call(t);
	svg.call(texture_scroll);

	var worldmap = new Datamap({
		element: document.getElementById("chart"),
		height: 450,
		fills: {
			defaultFill: t.url()
		},
		setProjection: function(element) {
			var projection = d3.geo.mercator()
				.center([9.993, 53.55])
				.rotate([0,0])
				.translate([element.offsetWidth / 2, element.offsetHeight / 2])
				.scale(1000);
			var path = d3.geo.path()
				.projection(projection);

		return {path: path, projection: projection};
		},
	});

	// Relocate the texture URLs?
	datamap = document.getElementsByClassName("datamaps-subunits")[0];
	defs = document.getElementsByTagName("defs");
	datamap.appendChild(defs[0]);
	datamap.appendChild(defs[0]);

	countries = d3.selectAll(".datamaps-subunit");
	// countries.style("fill", t.url());
	countries.style("stroke", "000000");
});
