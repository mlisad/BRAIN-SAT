/*
 * Code written in this javascript document is a modification from the following code: https://bl.ocks.org/mbostock/3887051
 * @Author Mldubbelaar
 */

function createBarGraph(widthDIV, divToAdd){
	// The size of the bar graph is defined.
	var margin = {top: 5, right: 30, bottom: 160, left: 70},
        width = ($(widthDIV).width()) - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;
	
    var x = d3.scaleBand()
        .range([0, width*0.90])
        .padding(0.1);
    var y = d3.scaleLinear().nice()
        .range([height, 0]);

	// Colors for the columns is defined.
    var color = d3.scaleOrdinal()
		.domain([
			"Not expressed",
			"Not significantly expressed",
			  "90-100 percentile: very low expression",
			  "80-90 percentile: low expression",
			  "70-80 percentile: low expression",
			  "60-70 percentile: low expression",
			  "50-60 percentile: moderate expression",
			  "40-50 percentile: moderate expression",
			  "30-40 percentile: moderate expression",
			  "20-30 percentile: moderately high expression",
			  "10-20 percentile: moderately high expression",
			  "5-10 percentile: high expression",
			  "0-5 percentile: very high expression"
	  			])
	    .range([
	    	"#cccccc",		//Grey
	    	"#666666", 		//Dark Grey
	    	"#000000", 		//Black
	    	"#1b1464", 		//Midnightblue
	    	"#2e3192", 		//Darkblue
	    	"#0071bc", 		//Blue
	    	"#29abe2", 		//Lightblue
	    	"#00a99d", 		//Turqoise
	    	"#39b54a", 		//Green
	    	"#8cc63f", 		//Greenyellow
	    	"#ffda00", 		//Yellow
	    	"#f15a24",		//Orange
	    	"#c1272d" 		//Red
            // "#cccccc",		//Grey
            // "#666666", 		//Dark Grey
            // "#000000", 		//Black
            // "#3333cc", 		//Midnightblue
            // "#000099", 		//Darkblue
            // "#0000ff", 		//Blue
            // "#33ccff", 		//Darkturqoise
            // "#66ffff", 		//Turqoise
            // "#66ff33", 		//Green
            // "#ccff33", 		//Greenyellow
            // "#ffff00", 		//Yellow
            // "#ff6600",		//Orange
            // "#ff0000" 		//Red
				]);

	// X axis is defined.
	var xAxis = d3.axisBottom(x)
		.tickSize(0, 0);

	// Y axis is defined.
    var yAxis = d3.axisLeft(y)
        .tickFormat(d3.format(".2"));

	// The svg is drawn and added into the div with the id "TPMdiv"
    var svg = d3.select(divToAdd).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .attr("class", "tpmValsPlot")
	  	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([0,10]).direction("e")
        .html(function(d) {
        	if (d.Percentile[":"] === undefined) {
				// var percentileInfo = d.Percentile.split(": ");
                return d.Percentile + "<br/> mean TPM value: " + parseFloat(d.TPM).toFixed(2);
				// return "TPM value : " + d.TPM + "<br/>TPM Low value : " + d.Low_TPM +"<br/>TPM High value : " + d.High_TPM + "<br/><br/>" + capitalizeEachWord(d.Percentile)
			} else {
                return d.Percentile.split(": ")[1] + "<br/> mean TPM value: " + parseFloat(d.TPM).toFixed(2);
                // return "TPM value : " + d.TPM + "<br/>TPM Low value : " + d.Low_TPM +"<br/>TPM High value : " + d.High_TPM + "<br/><br/>" + capitalizeEachWord(d.Percentile.split(": ")[1])
			}
        });
    svg.call(tool_tip);

	  // Defining the tpmTypes (these types will be drawn).
	  var tpmTypes = ["TPM"];
	  var tpmTypesHigh = ["High_TPM"];
	  var percentileTypes = [
		  "Not expressed",
		  "Not significantly expressed",
		  "90-100 percentile: very low expression",
		  "80-90 percentile: low expression",
		  "70-80 percentile: low expression",
		  "60-70 percentile: low expression",
		  "50-60 percentile: moderate expression",
		  "40-50 percentile: moderate expression",
		  "30-40 percentile: moderate expression",
		  "20-30 percentile: moderately high expression",
		  "10-20 percentile: moderately high expression",
		  "5-10 percentile: high expression",
		  "0-5 percentile: very high expression"];

	  // The tpmVals are obtained.
	  bargraphData.forEach(function(d) {
	  	// MOE for error bars
	    d.tpmVal = tpmTypes.map(function(name) {return {name: name, value: +d[name]}; });
	    d.tpmValHigh = tpmTypesHigh.map(function(name) {return {name: name, value: +d[name]}; });
	  });

	  x.domain(bargraphData.map(function(d) { return d.Gene; }));
	  y.domain([0, d3.max(bargraphData, function(d) { return d3.max(d.tpmValHigh, function(d) { return d.value; }); })]);

    if ($( window ).width() > "767" ) {
        // Adds the X axis to the svg.

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")"
            )
            .call(xAxis)
            .selectAll("text")
            .call(wrap, 135)
            .attr("transform", "rotate(-45)")
            .style("font-size", "14px")
            .style("text-anchor", "end");

        // Adds the Y axis to the svg.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("TPM value")
            .style("font-size", "16px");
    } else {
        // Adds the X axis to the svg.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .call(wrap, 135)
            .attr("transform", "rotate(-45)")
            .style("font-size", "6px")
            .style("text-anchor", "end");

        // Adds the Y axis to the svg.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("TPM value")
            .style("font-size", "8px");
	}

	  // Defines state (used to draw all of the bars).
	  var state = svg.selectAll(".state")
	      .data(bargraphData)
	      .enter().append("g")
	      .attr("class", "state")
	      .attr("transform", function(d) { return "translate(" + x(d.Gene) + ",0)"; })
	      .attr("fill", function(d) { return color(d.Percentile); })
          .on('mouseover', tool_tip.show)
          .on('mouseout', tool_tip.hide);

	  // Adds each bar to the bargraph.
	  state.selectAll("rect")
	      .data(function(d) { return d.tpmVal; })
	      .enter().append("rect")
          .attr("width", d3.min([x.bandwidth(), 50]))
          .attr("x", function(d) { return x(d.name); })
	      .attr("y", function(d) { return y(d.value); })
	      .attr("height", function(d) { return height - y(d.value); });

    var addData = function() {
        var points = svg.selectAll('circle.point')
            .data(bargraphData);
        // Add Error Dot
        points.enter()
            .append('circle')
            .attr('class', 'point')
            .attr('r', 4)
            .merge( points )
            .attr("stroke-width","2")
            .attr("stroke","black")
            .attr("cx", function(d) { return x(d.Gene) + (d3.min([x.bandwidth(), 50])/2); })
            .attr('cy', function(d) { return y(d.TPM); });

        var lines = svg.selectAll('line.error')
            .data(bargraphData);
        // Add Error Line
        lines.enter()
            .append("line")
            .attr("class", "error-line")
            .attr("x1", function(d) { return x(d.Gene) + (d3.min([x.bandwidth(), 50])/2); })
            .attr("y1", function(d) { return y(d.Low_TPM);})
            .attr("x2", function(d) { return x(d.Gene) + (d3.min([x.bandwidth(), 50])/2); })
            .attr("y2", function(d) { return y(d.High_TPM); })
            .attr("stroke-width","2")
            .attr("stroke","black")
            // Add Error Top Cap
            .append("line")
            .attr("class", "error-cap")
            .attr("x1", function(d) { return (x(d.Gene) + (d3.min([x.bandwidth(), 50])/2)) - 4;})
            .attr("y1", function(d) { return y(d.High_TPM);})
            .attr("x2", function(d) { return (x(d.Gene) + (d3.min([x.bandwidth(), 50])/2)) + 4;})
            .attr("y2", function(d) { return y(d.High_TPM);})
            .attr("stroke-width","2")
            .attr("stroke","black")
            // Add Error Bottom Cap
            .append("line")
            .attr("class", "error-cap")
            .attr("x1", function(d) { return (x(d.Gene) + (d3.min([x.bandwidth(), 50])/2)) - 4;})
            .attr("y1", function(d) { return y(d.Low_TPM);})
            .attr("x2", function(d) { return (x(d.Gene) + (d3.min([x.bandwidth(), 50])/2)) + 4;})
            .attr("y2", function(d) { return y(d.Low_TPM);})
            .attr("stroke-width","2")
            .attr("stroke","black");
    };
    addData();

    if ($( window ).width() > "767" ) {
        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate(-50," + height/2 + ") rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            // .attr("transform", "rotate(-90)")
            .style("font-size", "16px")
            .text("Abundance (TPM)");
    } else {
        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate(-50," + height/2 + ") rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            // .attr("transform", "rotate(-90)")
            .style("font-size", "8px")
            .text("Abundance (TPM)");

    }

	  // Adds the legend to the svg.
	  var legend = svg.selectAll(".legend")
	      // .data(tpmTypes.slice().reverse())
	      .data(percentileTypes.slice().reverse())
	      .enter().append("g")
	      .attr("class", "legend")
	      .style("font-size", "16px")
	      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	  // Adds the color to the legend.
	  legend.append("rect")
	  	  .attr("x", width-83)
	      .attr("width", 18)
	      .attr("height", 18)
	      .style("fill", color);

	  // Adds the names of the legend.
	  legend.append("text")
	  	  .attr("x", width - 63)
	      .attr("y", 9)
	      .attr("dy", ".35em")
	      .style("text-anchor", "start")
	      .text(function(d) {
	      	if (d[":"] === undefined) {
	      		if (/percentile/i.test(d)) {
	      			var percentileNumber = d.split(" percentile: ");
		  			return capitalizeEachWord(percentileNumber[0]);
	      		} else if (d ==="Not expressed") {
			  			return capitalizeEachWord("Not Expr");
			  	} else {
			  			return capitalizeEachWord("Not Sign");
			  		}
		  	}
		  });
}