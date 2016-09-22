$(function() {
	var data = [1, 2, 3, 4, 5, 6, 8];

	var margin = {top: 20, right: 20, left: 70, bottom: 70},
			width = parseInt(d3.select("div#chart").style("width")) - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

	var x = d3.scaleBand()
			.domain(data)
			.range([0, width])
			.paddingInner(0.1);

	var y = d3.scaleLinear()
			.domain([data[0], data[data.length - 1]])
			.range([height, 0]);

	var xAxis = d3.axisBottom()
			.scale(x)
			.tickSize(6, -height);

	var yAxis = d3.axisLeft()
			.scale(y)
			.tickSize(6, -width);

	var svg = d3.select("div#chart").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin. bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("text")
		.attr("text-anchor", "middle")
		.attr("transform", "translate(" + (width/2) + "," + (height+(margin["bottom"]/2)) + ")")
		.text("Dude, what.");

	svg.append("text")
		.attr("id", "y-axis")
		.attr("text-anchor", "middle")
		.attr("transform", "translate(" + (-margin["left"]/2) + "," + (height/2) + ") rotate(-90)")
		.text("Seriously, what");

	var chart = $("div#chart");

	$(window).scroll(function(){
		if (chart.visible()){
			svg.selectAll('rect')
				.data(data)
				.enter()
				.append('rect')
				.attr('class', 'bar')
				.attr('fill', '#C02942')
				.attr('x', function(d) { return x(d); })
				.attr('width', x.bandwidth()) 
				.attr('y', function() { return height; })
				.attr('height', 0)
				.transition()
					.delay(function(d,i) { return i*50; })
					.duration(800)
					.attr('y', function(d) { return y(d); })
					.attr('height', function(d) { return height - y(d); });
		}
});


});
