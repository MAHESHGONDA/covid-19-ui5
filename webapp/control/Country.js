sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	return Control.extend("com.sapyard.covid19.control.ToTenCountry", {
		metadata: {
			properties: {
				/* Business Object properties */
				title: {
					type: "string"
				},
				author: {
					type: "string"
				},
				description: {
					type: "string"
				},
				price: {
					type: "float"
				},

				// only for demonstration
				countryList: {
					type: "object"
				},
				whatever: {
					type: "any"
				}
			}

		},
		init: function () {

			this.margin = {
				top: 80,
				right: 180,
				bottom: 80,
				left: 180
			};
			this.width = 960 - this.margin.left - this.margin.right;
			this.height = 500 - this.margin.top - this.margin.bottom;
		},
		renderer: function (oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			// oRM.addClass("myAppDemoWTProductRating");
			oRM.writeClasses();
			oRM.write(">");
			// oRM.renderControl(oControl.getAggregation("_rating"));
			// oRM.renderControl(oControl.getAggregation("_label"));
			// oRM.renderControl(oControl.getAggregation("_button"));
			oRM.write("</div>");
		},
		onAfterRendering: function (oSource) {
			// var svg = d3.select('svg');
			debugger;
			// set the dimensions and margins of the graph
			var margin = {
					top: 20,
					right: 20,
					bottom: 30,
					left: 40
				},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

			// set the ranges
			var x = d3.scaleBand()
				.range([0, width])
				.padding(0.1);
			var y = d3.scaleLinear()
				.range([height, 0]);

			// append the svg object to the body of the page
			// append a 'group' element to 'svg'
			// moves the 'group' element to the top left margin
			var svg = d3.select(oSource.srcControl.getDomRef()).append('svg')
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform",
					"translate(" + margin.left + "," + margin.top + ")");

			// get the data
			// d3.csv("sales.csv", function (error, data) {

			// format the data
			var data = this.getCountryList();
			data.forEach(function (d) {
				d.sales = +d.sales;
			});

			// Scale the range of the data in the domains
			x.domain(data.map(function (d) {
				return d.salesperson;
			}));
			y.domain([0, d3.max(data, function (d) {
				return d.sales;
			})]);

			// append the rectangles for the bar chart
			svg.selectAll(".bar")
				.data(data)
				.enter().append("rect")
				.attr("class", "bar")
				.attr("x", function (d) {
					return x(d.salesperson);
				})
				.attr("width", x.bandwidth())
				.attr("y", function (d) {
					return y(d.sales);
				})
				.attr("height", function (d) {
					return height - y(d.sales);
				});

			// add the x Axis
			svg.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));

			// add the y Axis
			svg.append("g")
				.call(d3.axisLeft(y));

			// });

			// 	var svg = d3.select(oSource.srcControl.getDomRef()).append('svg')
			// 		// .attr("width", this.width + this.margin.left + this.margin.right)
			// 		// .attr("height", this.height + this.margin.top + this.margin.bottom)
			// 		// .append("g")
			// 		// .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

			// 	const margin = 80;
			// 	const width = 700 - 2 * margin;
			// 	const height = 500 - 2 * margin;

			// 	const chart = svg.append('g')
			// 		.attr('transform', `translate(${margin}, ${margin})`);

			// 	var sample = this.getCountryList();
			// 	if(sample && !sample.length ){
			// 		return;
			// 	}
			// 	const xScale = d3.scaleBand()
			// 		.range([0, width])
			// 		.domain(sample.map((s) => s.country))
			// 		.padding(0.3)

			// 	const yScale = d3.scaleLinear()
			// 		.range([height, 0])
			// 		.domain([0, 100]);

			// 	// vertical grid lines
			// 	// const makeXLines = () => d3.axisBottom()
			// 	//   .scale(xScale)

			// 	const makeYLines = () => d3.axisLeft()
			// 		.scale(yScale)

			// 	chart.append('g')
			// 		.attr('transform', `translate(0, ${height})`)
			// 		.call(d3.axisBottom(xScale));

			// 	chart.append('g')
			// 		.call(d3.axisLeft(yScale));

			// 	// vertical grid lines
			// 	// chart.append('g')
			// 	//   .attr('class', 'grid')
			// 	//   .attr('transform', `translate(0, ${height})`)
			// 	//   .call(makeXLines()
			// 	//     .tickSize(-height, 0, 0)
			// 	//     .tickFormat('')
			// 	//   )

			// 	chart.append('g')
			// 		.attr('class', 'grid')
			// 		.call(makeYLines()
			// 			.tickSize(-width, 0, 0)
			// 			.tickFormat('')
			// 		)

			// 	const barGroups = chart.selectAll()
			// 		.data(sample)
			// 		.enter()
			// 		.append('g')

			// debugger;
			// 	barGroups
			// 		.append('rect')
			// 		.attr('class', 'bar')
			// 		.attr('x', (g) => xScale(g.country))
			// 		.attr('y', (g) => yScale(g.cases))
			// 		.attr('height', (g) => height - yScale(g.cases))
			// 		.attr('width', xScale.bandwidth());
			// 		// .on('mouseenter', function (actual, i) {
			// 		// 	d3.selectAll('.value')
			// 		// 		.attr('opacity', 0)

			// 		// 	d3.select(this)
			// 		// 		.transition()
			// 		// 		.duration(300)
			// 		// 		.attr('opacity', 0.6)
			// 		// 		.attr('x', (a) => xScale(a.language) - 5)
			// 		// 		.attr('width', xScale.bandwidth() + 10)

			// 		// 	const y = yScale(actual.value)

			// 		// 	line = chart.append('line')
			// 		// 		.attr('id', 'limit')
			// 		// 		.attr('x1', 0)
			// 		// 		.attr('y1', y)
			// 		// 		.attr('x2', width)
			// 		// 		.attr('y2', y)

			// 		// 	barGroups.append('text')
			// 		// 		.attr('class', 'divergence')
			// 		// 		.attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
			// 		// 		.attr('y', (a) => yScale(a.value) + 30)
			// 		// 		.attr('fill', 'white')
			// 		// 		.attr('text-anchor', 'middle')
			// 		// 		.text((a, idx) => {
			// 		// 			const divergence = (a.value - actual.value).toFixed(1)

			// 		// 			let text = ''
			// 		// 			if (divergence > 0) text += '+'
			// 		// 			text += `${divergence}%`

			// 		// 			return idx !== i ? text : '';
			// 		// 		})

			// 		// })
			// 		// .on('mouseleave', function () {
			// 		// 	d3.selectAll('.value')
			// 		// 		.attr('opacity', 1)

			// 		// 	d3.select(this)
			// 		// 		.transition()
			// 		// 		.duration(300)
			// 		// 		.attr('opacity', 1)
			// 		// 		.attr('x', (a) => xScale(a.language))
			// 		// 		.attr('width', xScale.bandwidth())

			// 		// 	chart.selectAll('#limit').remove()
			// 		// 	chart.selectAll('.divergence').remove()
			// 		// }

			// 		// )

			// 	barGroups
			// 		.append('text')
			// 		.attr('class', 'value')
			// 		.attr('x', (a) => xScale(a.country) + xScale.bandwidth() / 2)
			// 		.attr('y', (a) => yScale(a.cases) + 30)
			// 		.attr('text-anchor', 'middle')
			// 		.text((a) => `${a.cases}%`)

			// 	svg
			// 		.append('text')
			// 		.attr('class', 'label')
			// 		.attr('x', -(height / 2) - margin)
			// 		.attr('y', margin / 2.4)
			// 		.attr('transform', 'rotate(-90)')
			// 		.attr('text-anchor', 'middle')
			// 		.text('Love meter (%)')

			// 	svg.append('text')
			// 		.attr('class', 'label')
			// 		.attr('x', width / 2 + margin)
			// 		.attr('y', height + margin * 1.7)
			// 		.attr('text-anchor', 'middle')
			// 		.text('Languages')

			// 	svg.append('text')
			// 		.attr('class', 'title')
			// 		.attr('x', width / 2 + margin)
			// 		.attr('y', 40)
			// 		.attr('text-anchor', 'middle')
			// 		.text('Most loved programming languages in 2018')

			// 	svg.append('text')
			// 		.attr('class', 'source')
			// 		.attr('x', width - margin / 2)
			// 		.attr('y', height + margin * 1.7)
			// 		.attr('text-anchor', 'start')
			// 		.text('Source: Stack Overflow, 2018')
			// 		// var svg = d3.select("body").append("svg")
			// 		// const svgContainer = d3.select('#container');

		}
	});
});