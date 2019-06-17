
function createScatterPlot(datatable, title){

    // Create empty variables
    var datX = [];
    var datY = [];
    var geneSymbol = [];

    // For each gene in the datatable obtain the geneSymbol, logFC and the FDR
    $.each(datatable, function(dat, info){
        if (dat % 5 === 1 && dat !== 0) {
            // Genesymbol
            geneSymbol.push(info)
        } else if (dat % 5 === 2 && dat !== 0) {
            // logFC
            datX.push(parseFloat(info))
        } else if (dat % 5 === 3 && dat !== 0) {
            // FDR
            datY.push(parseFloat(info))
        }
    });

    // Save the information in traces
    var traces = [];
    traces.push({
        x: datX,
        y: datY,
        mode: 'markers',
        type: 'scatter',
        text: geneSymbol,
        textposition: 'top center',
        textfont: {
            family:  'Raleway, sans-serif'
        },
        marker: {
            size: 12,
            opacity: 1,
            colorscale: 'Jet',
            hoverinfo: 'x+y+text'
        }
    });
    // }

    // Create a layout value
    var layout = {
        title: title,
        categoryorder: "array",
        xaxis: {
            title: 'LogFC'
        },
        yaxis: {
            title: '-log10(FDR)'
        },
        hovermode: 'closest',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        autosize: false
    };

    var options = {
        showLink: false, // removes the link to edit on plotly - works
        displaylogo: false,
        scrollZoom: true,
        modeBarButtonsToRemove: ['zoom2d', 'select2d', 'pan', 'pan2d', 'lasso2d', 'autoScale2d', 'sendDataToCloud',
            'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoomIn2d', 'zoomOut2d',
            'resetScale2d', 'hoverClosestPie']
    };

    // Create a plot with traces and layout.
    Plotly.newPlot('scatterplot', traces, layout, options);
}