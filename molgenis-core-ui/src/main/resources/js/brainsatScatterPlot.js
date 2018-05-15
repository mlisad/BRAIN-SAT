
function createScatterPlot(datatable, title){
    var datX = [];
    var datY = [];
    var geneSymbol = [];

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
    // Create a plot with traces and layout.
    Plotly.newPlot('scatterplot', traces, layout, {scrollZoom: true});
}