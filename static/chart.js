$(function() {
	var data = [1, 2, 3, 4, 5];

	var margin = {top: 20, right: 20, left: 40, bottom: 20},
			width = parseInt(d3.select("div#chart").style("width")) - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

	var x = d3.scaleBand()
			.domain(data)
			.range([0, width]);

	var y = d3.scaleLinear()
			.domain(data)
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

	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', function(d) { return x(d); })
		.attr('width', 30) 
		.attr('y', function(d) { return y(d); })
		.attr('height', function(d) { return height - y(d); });



});
