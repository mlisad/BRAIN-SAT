/*
 * Code written in this javascript document creates the dotplot which is used for the gene abundance visualization (search)
 * @Author Mldubbelaar
 */


function createSearchPlot(information, geneValues) {
    // Delete the following values from the geneValues object
    delete geneValues[0]['_href'];
    delete geneValues[0]['external_gene_name'];

    // Create empty elements to use further in the function.
    var studyInfo = {};
    var uniqueCelltype = [];
    var uniqueAuthor = [];
    var uniqueOrganism = ["Mus musculus", "Homo sapiens", "Rattus norvegicus"];
    var celltypes = [];
    var aveList = [];
    var textList = [];
    var uniqueTraceNames = [];
    // Traces is saved, since we are looping through the different conditions and percentiles.
    var traces = [];

    // For each information trace (meta data of the geneValues object)
    $.each(information, function(i) {
        // Remove _href
        delete information[i]['_href'];
        // Make sure that the Identifier is saved (a combination of all the necessary information from the information object)
        studyInfo[ information[i]["Identifier"] ] = Object.values(information[i]).slice(1)
            .join("<br>").replace(/<br>_/g,'<br>').replace(/Endothelial cell/g,'Endothelial');
        // Make sure that the unique Cell types are saved
        if (!uniqueCelltype.includes(information[i]["CellType"].replace(/Endothelial cell/g,'Endothelial'))) {
            uniqueCelltype.push(information[i]["CellType"].replace(/Endothelial cell/g,'Endothelial'))
        }
        // Make sure that the unique Authors are saved (with the corresponding publication year).
        if (!uniqueAuthor.includes(information[i]["Author"] + "_" + information[i]["Year"])) {
            uniqueAuthor.push(information[i]["Author"] + "_" + information[i]["Year"])
        }
        // Push all of the cell types.
        celltypes.push(information[i]["CellType"].replace(/Endothelial cell/g,'Endothelial'));
    });

    // For each element of the geneValues object
    $.each(geneValues[0], function(i, item) {
        // Push the average value
        aveList.push(Math.log2(parseFloat(item)));
        // And the identifier of the average values is saved (communicates with the information values).
        textList.push(Object.values(studyInfo)[Object.keys(studyInfo).indexOf(i)]);
    });

    // Sort the list of uniqueAuthors
    uniqueAuthor = uniqueAuthor.sort();
    // Establish the number of colors that need to be generated (based on the different authors)
    var colorAuthor = Plotly.d3.range(uniqueAuthor.length).map(Plotly.d3.scale.category20());

    // For each of the different percentiles that are known
    for (var i = 0; i < uniqueCelltype.length; i++) {
        // Determine the index of the percentiles obtained from the conditions to the percentileInfo array.
        var indexes = getAllIndexes(celltypes, uniqueCelltype[i]);
        // When the index is not empty
        if (indexes.length >= 1) {
            var l = 0;
            // Generate a trace with the following information
            while (l < indexes.length) {
                // Create three empty variables
                var textInfo, region, strain = "";
                // Determine if the region is empty or not and create the appropriate build up for textInfo
                if (textList[indexes[l]].split('<br>')[4] !== "") {
                    region = textList[indexes[l]].split('<br>')[4] + " ";
                }
                // Determine if the strain is empty or not and create the appropriate build up for textInfo
                if (textList[indexes[l]].split('<br>')[5] !== "") {
                    strain = "[" + textList[indexes[l]].split('<br>')[5] + "]";
                }

                // Enable to build the text box in the plot (textInfo)
                textInfo = "<br>" + textList[indexes[l]].split('<br>')[0] + " (" + textList[indexes[l]].split('<br>')[1] + ")<br>" + region + strain;
                // Make sure that the traceName is created (since this is quite long)
                var traceName = textList[indexes[l]].split('<br>')[0].split(' et al.')[0] + " (" + textList[indexes[l]].split('<br>')[1] + ") - " + textList[indexes[l]].split('<br>')[2].replace(/Homo sapiens/g,'Hs').replace(/Mus musculus/g,'Mm').replace(/Rattus norvegicus/g,'Rn');
                // var traceName = textList[indexes[l]].split('<br>')[2].replace(/Homo sapiens/g,'Hs').replace(/Mus musculus/g,'Mm').replace(/Rattus norvegicus/g,'Rn');
                // Check if the traceName is present in uniqueTranceNames

                if (!uniqueTraceNames.includes(traceName)) {
                    // If true: Make sure that the traceName is saved in the array uniqueTraceName
                    uniqueTraceNames.push(traceName);
                    // Make sure that the trace is created with the showLegend parameter true
                    traces.push(fillTrace([uniqueCelltype[i]], [aveList[indexes[l]]], textInfo, traceName,
                        colorAuthor[uniqueAuthor.indexOf(textList[indexes[l]].split('<br>')[0] + "_" + textList[indexes[l]].split('<br>')[1])],
                        uniqueOrganism.indexOf(textList[indexes[l]].split('<br>')[2]),
                        // [lowList[indexes[l]]], [highList[indexes[l]]],
                        true));
                } else {
                    // Make sure that the trace is created with the showLegend parameter false
                    traces.push(fillTrace([uniqueCelltype[i]], [aveList[indexes[l]]], textInfo, traceName,
                        colorAuthor[uniqueAuthor.indexOf(textList[indexes[l]].split('<br>')[0] + "_" + textList[indexes[l]].split('<br>')[1])],
                        uniqueOrganism.indexOf(textList[indexes[l]].split('<br>')[2]),
                        // [lowList[indexes[l]]], [highList[indexes[l]]],
                        false));
                }
                // Continue with the for loop until all conditions are done.
                l++
            }
        }
    }
    // Create a layout value
    var layout = {
        legend: {
            traceorder: 'normal',
            tracetoggle: false,
            color: "#000",
            font: {
                family: 'sans-serif',
                size: 12,
                color: '#000'
            }
        },
        xaxis: {
            title: ''
        },
        yaxis: {
            title: 'Abundance log2(CPM)'
        },
        hovermode: 'closest',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        autosize: false,
        width: $("#geneInformation").width()

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
    Plotly.newPlot("geneSearchPlot", traces, layout, options);
}

function fillTrace(valuesx, valuesy, valuesText, valueName, markerColor, markerShape, showLegend) {
    return ({
        // Obtain the right condition
        x: valuesx,
        //  use the average on the y-axis
        y: valuesy,
        type: 'markers',
        // And the belonging text
        text: valuesText,
        // Determine true or false if this information is presented in the legend
        showlegend: showLegend,
        // Contains the value name (author, year and organism)
        name: valueName,
        hoverinfo: 'text+y', //Visualize with the y value as well
        marker: {
            // Color based on the different authors
            color: markerColor,
            // Symbol based on organism
            symbol: markerShape,
            size: 15
        }
    });

}