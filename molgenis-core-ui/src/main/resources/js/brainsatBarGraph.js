/*
 * Code written in this javascript document creates the barplot which is used for the gene abundance visualization
 * @Author Mldubbelaar
 */


function createBarGraph(data, divToAdd, parentDiv, qeAnalysis) {
    // The first two components of the data[0] object are removed
    delete data[0]['_href'];
    delete data[0]['external_gene_name'];

    // Several conditions are defined for later use
    var conditions = [];
    var aveList = [];
    var lowList = [];
    var highList = [];
    var percentile = [];

    // All of the information regarding the percentiles are saved in an array
    // This information consists of the percentile, the text beloning to the percentile and the color
    var percentileInfo = [
        {colorNames:"Not Expr", percentileText:"Not expressed", colors:"#cccccc"},                      //Grey
        {colorNames:"Not Sign", percentileText:"Not significantly expressed",  colors:"#666666"},       //Dark Grey
        {colorNames:"90-100", percentileText:"Very low expressed", colors:"#000000"},                  //Black
        {colorNames:"80-90", percentileText:"Low expressed", colors:"#1b1464"},                        //Midnightblue
        {colorNames:"70-80", percentileText:"Low expressed", colors:"#2e3192"},                        //Darkblue
        {colorNames:"60-70", percentileText:"Low expressed", colors:"#0071bc"},                        //Blue
        {colorNames:"50-60", percentileText:"Moderate expressed", colors:"#29abe2"},                   //Lightblue
        {colorNames:"40-50", percentileText:"Moderate expressed", colors:"#00a99d"},                   //Turqoise
        {colorNames:"30-40", percentileText:"Moderate expressed", colors:"#39b54a"},                   //Green
        {colorNames:"20-30", percentileText:"Moderately high expressed", colors:"#8cc63f"},            //Greenyellow
        {colorNames:"10-20", percentileText:"Moderately high expressed", colors:"#ffda00"},            //Yellow
        {colorNames:"5-10", percentileText:"High expressed", colors:"#f15a24"},                        //Orange
        {colorNames:"0-5", percentileText:"Very high expressed", colors:"#c1272d"}];                   //Red

    // A counter is determined to generate the right element to the previously defined variables
    var counter = 1;
    // The average count is saved to calculate the difference of the high and the low abundance
    var averageCount = [];
    // The value to adjust the bottom margin
    var bottomMarigin = 50;

    if (qeAnalysis === true) {
        bottomMarigin = 120
    }

    // Looping through the data[0] object
    $.each(data[0], function(i, item) {

        // The last saved variable is the percentile
        if (counter === 4) {
            if (item === "Not significantly expressed") {
                percentile.push("Not Sign");
            } else if (item === "Not expressed") {
                percentile.push("Not Expr");
            } else {
                percentile.push(item.replace(/ percentile: .+ expression/g, ''));
            }
            // Reset of counter
            counter = 0
        } else if (counter === 1) {
            // The first element saves the average TPM value and the belonging condition (capitalized).
            aveList.push(parseFloat(item));
            averageCount = parseFloat(item);
            conditions.push(capitalizeEachWord(i.replace(/_/g, " ").replace(/-/g, " ")));
        } else if (counter === 2) {
            // The difference of the lowest TPM value (compared to the average) is saved into the lowList array
            lowList.push(averageCount - parseFloat(item))
        } else if (counter === 3) {
            // The difference of the highest TPM value (compared to the average) is saved into the highList array
            highList.push(parseFloat(item) - averageCount)
        }
        counter += 1
    });

    // Traces is saved, since we are looping through the different conditions and percentiles.
    var traces = [];

    // For each of the different percentiles that are known
    for (var i = 0; i < percentileInfo.length; i++) {
        // Determine the index of the percentiles obtained from the conditions to the percentileInfo array.
        var indexes = getAllIndexes(percentile, percentileInfo[i]["colorNames"]);
        // When the index is not empty
        if (indexes.length >= 1) {
            var l = 0;
            // Generate a trace with the following information
            while (l < indexes.length) {
                    traces.push({
                        // Obtain the right condition
                        x: [conditions[indexes[l]]],
                        //  use the average on the y-axis
                        y: [aveList[indexes[l]]],
                        type: 'bar',
                        // Obtain the right percentile description
                        name: percentileInfo[i]["colorNames"],
                        // And the belonging text
                        text: percentileInfo[i]["percentileText"],
                        hoverinfo: 'name+text',
                        marker: {
                            // Make sure that the right color is added to the barplot
                            color: percentileInfo[i]["colors"]
                        },
                        // Add the error margins
                        error_y:{
                            type:'data',
                            // The variation of the highest and the lowest value is not symmetric
                            symmetric: false,
                            // The variation of the highest TPM is defined
                            array: [highList[indexes[l]]] ,
                            // And the lowest TPM difference.
                            arrayminus: [lowList[indexes[l]]]
                        }
                    });

                // Continue with the for loop until all conditions are done.
                l++
            }
        }
    }

    // Create a layout value
    var layout = {
        showlegend: false,
        xaxis: {
            title: ''
        },
        yaxis: {
            title: 'Abundance (TPM)'
        },
        hovermode: 'closest',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        autosize: false,
        width: parentDiv,
        margin: {
            b: bottomMarigin
        }
    };

    // Define the necessary buttons and other options for plotly
    var options = {
        showLink: false,
        displaylogo: false,
        modeBarButtonsToRemove: ['zoom2d', 'select2d', 'pan', 'pan2d', 'lasso2d', 'autoScale2d', 'sendDataToCloud',
            'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoomIn2d', 'zoomOut2d',
            'resetScale2d', 'hoverClosestPie'],
        responsive: true
    };


    // Sort the x axis alphabetically
    traces = traces.sort(dynamicSort("x"));
    // Draw the plot
    Plotly.newPlot(divToAdd, traces, layout, options);

}

