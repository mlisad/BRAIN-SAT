/*
 * Code written in this javascript document contains the functions that were used on BRAIN-sat
 * @Author Mldubbelaar
 */

// The function searchbar enables the search function within the datatable layout.
// It is an interactive way of filtering that checks the search term while typing.
function searchBar(inputName){
    $(inputName).keyup(function () {
        var rex = new RegExp($(this).val(), 'i');
        var searchDiv = $('.searchable tr');
        // All of the content within the table is hidden
        searchDiv.hide();
        // Genes that match the regex pattern are shown
        searchDiv.filter(function () {
            return rex.test($(this).text());
        }).show();
    });
}

// $('[data-toggle="popover"]').popover({
//     placement: 'top',
//     trigger: 'hover'
// });


// Returns all of the studies.
function returnStudies(){
    // All of the known studies are obtained.
    $.get("/api/v2/base_BRAINSATstudies?attrs=Unique_ID,GEOD_NR,Title,Author,Organism,Year,CelltypeID,SequencingType,Research_link&num=10000").done(function(data){
        data = data["items"];
        var tdstart = "<td>";
        var tdend = "</td>";
        uniqueTitle = [];
        uniqueStudies = [];
        // Each of the known studies is added into the variable uniqueStudies.
        $.each(data, function(i){
            if ($.inArray(data[i]["Title"], uniqueTitle)=== -1) {
                uniqueTitle.push(data[i]["Title"]);
                uniqueStudies.push(
                    "<tr class='studyTable' id='" + data[i]["GEOD_NR"] + "' >"
                    + tdstart + data[i]["CelltypeID"] + tdend
                    + tdstart + data[i]["Region"] + tdend
                    + tdstart + data[i]["Organism"] + tdend
                    + tdstart + data[i]["Author"] + tdend
                    + tdstart + data[i]["Title"] + tdend
                    + tdstart + data[i]["Year"] + tdend
                    + "</tr>" );
            }
        });
        // These studies are sorted alphabetically on the GEOD number.
        uniqueStudies.sort();
        // Studies are joined with <br/> and written into the div tableContent.
        $("#tableContent").html(uniqueStudies.join("<br/>"));
    });
    // The refresh button is hidden again.
    $("#refreshPublications").hide();
}

// This function is the main caller when the user goes back to the 'home layout'.
// Everything is resetted to the normal state, processes related to the analyses are stopped
function returnHome(){
    // The website is returned to the normal state when the returnHome function is called
    location.reload();
}

// The function obtainStudies obtains the studies from the database in MOLGENIS and presents it on the BRAIN-sat homepage.
function obtainStudies() {
    // The studies known in the studies database are collected
    $.get("/api/v2/base_BRAINSATstudies?attrs=Unique_ID,GEOD_NR,Title,Author,Organism,Year,Region,CelltypeID,SequencingType,Research_link&num=10000").done(function(data){
        // The items within the data are collected and saved as variable data.
        data = data["items"];
        var tdstart = "<td>";
        var tdend = "</td>";
        // For each element in the variable data
        $.each(data, function(i){
            // If the title is unknown in the variable uniqueTitle
            if ($.inArray(data[i]["Title"], uniqueTitle)=== -1) {
                // The title of the given study is pushed to the variable uniqueTitle
                uniqueTitle.push(data[i]["Title"]);
                // The EGEOD number of the given study is pushed to the variable uniqueGEOD
                uniqueGEOD.push(data[i]["GEOD_NR"]);
                // Information like the GEOD number, title, author, organism and year are pushed to the
                // variable uniqueStudies in the form of a row of a table.
                uniqueStudies.push(
                    "<tr class='studyTable' id='" + data[i]["GEOD_NR"] + "' >"
                    + tdstart + data[i]["CelltypeID"] + tdend
                    + tdstart + data[i]["Region"] + tdend
                    + tdstart + data[i]["Organism"] + tdend
                    + tdstart + data[i]["Author"] + tdend
                    + tdstart + data[i]["Title"] + tdend
                    + tdstart + data[i]["Year"] + tdend
                    + "</tr>" );
            }
        });
        // The uniqueStudies are sorted, leading to a table where the studies are sorted on the GEOD number.
        uniqueStudies.sort();
        // The sorted table is joined with <br/> and added to the div tableContent.
        $("#tableContent").html(uniqueStudies.join("<br/>"));
    });
}

// The function capitalizeEachWord is used to capitalize each word within the text.
function capitalizeEachWord(str) {
    // Each word ending with a space is used within the function.
    // This function makes sure that each word within the string is capitalized.
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// obtainTPMofGenes obtains all of the TPM values of a given study.
// It also enables the creation of the bargraph shown on the same page.
function obtainTPMofGenes(study, genes, origin, organism) {
    // This function is used to preprocess the data for the creation of the bar graph.
    // The gene is searched within the given study.
    $.get("/api/v2/base_TPM" + study + "?q=external_gene_name==" + genes.toLowerCase()).done(function(currdata){
        $('#dashboard').empty();
        $('#TPMdiv_barplot').remove();
        // The attributes are obtained from the meta data and the items are obtained.
        var data = currdata["items"];
        // The function createBarGraph is called to create the bargraph
        if (origin === "qeAnalysis") {
            // The div with id "geneName" is emptied.
            document.getElementById("geneName").innerHTML = "";
            if (organism[0] === "Mus musculus") {
                $("#geneName").append(
                    "<a class='QEgene' href='https://www.ensembl.org/" + organism[0].replace(/ /g, '_') + "/Gene/Summary?g=" + capitalizeEachWord(genes) + "' target='_blank'>" +
                    "<h2 class='QEgene'>" + capitalizeEachWord(genes) + "</h2>" +
                    "</a>");
                // $("#TPMdiv").append("<div class='glyphicon glyphicon-info-sign col-md-offset-4' data-html=\"true\" data-toggle=\"popover\" title=\"Modal Short Text\" data-content=\""+ QEimageCon+"\"></div>");
                $("#TPMdiv").append("<div id=TPMdiv_barplot></div>").ready(function(){
                    createBarGraph(data, "TPMdiv_barplot", $("#TPMdiv").width(), true);
                });
            } else if (organism[0] === "Homo sapiens") {
                $("#geneName").append(
                    "<a class='QEgene' href='https://www.ensembl.org/" + organism[0].replace(/ /g, '_') + "/Gene/Summary?g=" + genes.toUpperCase() + "' target='_blank'>" +
                    "<h2 class='QEgene'>" + genes.toUpperCase() + "</h2>" +
                    "</a>");
                // $("#TPMdiv").append("<div class='glyphicon glyphicon-info-sign col-md-offset-4' data-html=\"true\" data-toggle=\"popover\" title=\"Modal Short Text\" data-content=\""+ QEimageCon+"\"></div>");
                $("#TPMdiv").append("<div id=TPMdiv_barplot></div>").ready(function(){
                    createBarGraph(data, "TPMdiv_barplot", $("#TPMdiv").width(), true);
                });
            }
        } else {
            createBarGraph(data, "dashboard_" + origin + "_barplot", $("#geneInformation").width(), false);
        }
        // Adjust the position of the  plotly legend (where you can download the plot)
        $(".js-plotly-plot .plotly .modebar").css("top", "10%");
        enterSearch("geneBarGraph", "searchGeneBarGraph")
    });
}

function hideDE(){
    // DE data is hidden.
    $("#selectBar").hide();
    $("#selectConditions").hide();
    $("#scatterplot").hide();
    $("#searchBar_DE").hide();
    $("#DETable").hide();
}

//hideQE hides all of the QE content on BRAIN-sat.
function hideQE(){
    // QE data is hidden.
    $("#QEsearch").hide();
    $("#QETable").hide();
    $("#QE_content").hide();
}

function processGenes(dataFrame, studySearch, firstIteration) {
    // Obtain the object "items" from the dataFrame object
    var data = dataFrame["items"];
    // Make sure that you can loop through the genes
    $.each(data, function (g, genes) {
        // If a genes is searched from a study, then continue to the next if statement
        if (studySearch === true && firstIteration === true) {
            if (g === 0) {
                availableGenes = [];
                // The line below is used to create a bargraph of the first found gene on the website (bar graph part).
                obtainTPMofGenes(GEODOnPage[0].replace(/-/g,''), genes["external_gene_name"], "qeAnalysis", organismOnPage);
            }
        }
        // These genes are saved into the array availableGenes, where it can be used with the search function.
        availableGenes.push(capitalizeEachWord(genes["external_gene_name"]));
    });
}

function geneSearch(studyID, autoCompeteForm, studySearch){
    // Obtain the necessary information of the different tables and call the processGenes function.
    $.when($.get("/api/v2/base_TPM"+studyID.replace(/-/g,'')+"?start=1&num=10000")).done( function (firstGenes) {processGenes(firstGenes, studySearch, true)} );
    $.when($.get("/api/v2/base_TPM"+studyID.replace(/-/g,'')+"?start=10001&num=10000")).done( function (secondGenes) {processGenes(secondGenes, studySearch, false)} );
    $.when($.get("/api/v2/base_TPM"+studyID.replace(/-/g,'')+"?start=20001&num=10000")).done( function (thirdGenes) {processGenes(thirdGenes, studySearch, false)} );
    $.when($.get("/api/v2/base_TPM"+studyID.replace(/-/g,'')+"?start=30001&num=10000")).done( function (fourthGenes) {processGenes(fourthGenes, studySearch, false)} );

    // The autocomplete function of the searchbar for both the bar graph as the table is defined.
    $(autoCompeteForm).autocomplete({
        minLength: 2,
        delay: 0,
        autoFocus: true,
        source: availableGenes
    });

    // Make sure that you can press enter to search the content of the autoCompleteForm
    enterSearch(autoCompeteForm);

    if (studySearch === true) {
        // Shows all of the necessary content used for the QE analysis.
        $("#selectBar").hide();
        $("#analysis_info").hide();
        $("#DETableContent").hide();
        $("#firstCondition").hide();
        $("#QE_content").show();
        $("#searchBar_QE").show();
        $("#QEsearch").show();
        $(".row.DE").show();
        $("#DownloadQE").show();
        $("#selectBarQE").show();
        searchBar("#QEsearch");
    }
    hideDE();
}

// enterSearch enables to use enter to trigger the specified search engine
function enterSearch(idInputDiv, idButtonDiv){
    // Obtain the value of the element in the input div
    var input = document.getElementById(idInputDiv);
    if(input){
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById(idButtonDiv).click();
            }
        });
    }
}

// https://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array
function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) !== -1){
        indexes.push(i);
    }
    return indexes;
}

// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function fillGeneSearch(geneName) {
    if (availableGenes.includes(geneName)) {
        var imgSource = "";
        var organism = "";
        for (var i=0; i < studiesSearch.length; i++) {
            if (i !== 0 ) {
                $("#geneInformation").append("<hr>")
            }
            var egeodStudyNr = studiesSearch[i];
            if($("dashboard_"+egeodStudyNr.replace(/-/g,'')).length === 0) {
                $("#geneInformation").append("<div id='dashboard_" + egeodStudyNr.replace(/-/g,'') + "' style='height:650px;'></div>");
                $.get('/api/v2/base_BRAINSATstudies?attr=GEOD_NR,Title,Research_link,Author,Organism,&q=GEOD_NR=="'+egeodStudyNr+'"').done(function(data){
                    data = data["items"];
                    var dashboardDiv =  $("#dashboard_"+data[1]["GEOD_NR"].replace(/-/g,""));
                    organism = data[1]['Organism'];
                    if (data[1]['Organism'] === "Mus musculus") {
                        dashboardDiv.append("<div id='geneName' class='row'><div class='col-md-6' style='font-size:24pt;'><a href='https://www.ensembl.org/Mus_musculus/Gene/Summary?g="+ capitalizeEachWord(geneName) + "' target='_blank'><p style='margin-left:0.5em;'><b>"+capitalizeEachWord(geneName)+"</b></p></a></div></div>");
                        imgSource = "/img/distributionPlot_" + data[1]["GEOD_NR"].replace(/-/g,"").replace("EGEOD","")+".png";
                        dashboardDiv.append('<div class="row"><div class="col-xs-9 col-sm-9" style="font-size:24pt;"><p style="margin-left:0.5em;"><b>Mouse</b></p></div><div class="col-xs-3 col-sm-3 img" style="margin-bottom:-100px;"><img class="img-responsive" src=\"'+imgSource+'\"/></div></div>');
                    } else if (data[1]['Organism'] === "Homo sapiens") {
                        dashboardDiv.append("<div id='geneName' class='row'><div class='col-md-6' style='font-size:24pt;'><a href='https://www.ensembl.org/Homo_sapiens/Gene/Summary?g="+ geneName.toUpperCase() + "' target='_blank'><p style='margin-left:0.5em;'><b>"+geneName.toUpperCase()+"</b></p></a></div></div>");
                        imgSource = "/img/distributionPlot_" + data[1]["GEOD_NR"].replace(/-/g,"").replace("EGEOD","")+".png";
                        dashboardDiv.append('<div class="row"><div class="col-xs-9 col-sm-9" style="font-size:24pt;"><p style="margin-left:0.5em;"><b>Human</b></p></div><div class="col-xs-3 col-sm-3 img" style="margin-bottom:-100px;"><img class="img-responsive" src=\"'+imgSource+'\"/></div></div>');
                    }
                    // This information is added into the div, making sure that it is clear which dashboard belongs to which study.
                    if (data[1]['Research_link'] === "Unknown") {
                        dashboardDiv.append("<p class='svgTitle col-xs-9 col-sm-9'><b>"+ data[1]["Title"] +"</b><br/>By "+ data[1]["Author"] + "</p> <br/>");
                    } else {
                        dashboardDiv.append("<p class='svgTitle col-xs-9 col-sm-9'><b>"+ data[1]["Title"] +"</b><br/>By <a href='"+data[1]['Research_link']+"' target='_blank'>"+ data[1]["Author"] + "</a>"+ "</p> <br/>");
                    }

                    // if (i === 0) {
                    //     dashboardDiv.append("<div class='glyphicon glyphicon-info-sign col-md-offset-4' data-html=\"true\" data-toggle=\"popover\" title=\"Modal Short Text\" data-content=\""+ QEimageCon +"\"></div>");
                    // }
                    // Add the dashboard barplot div last
                    dashboardDiv.append('<div id=dashboard_' +  data[1]["GEOD_NR"].replace(/-/g,'') + '_barplot></div>').ready(function(){
                        obtainTPMofGenes(data[1]["GEOD_NR"].replace(/-/g,''), geneName.toLowerCase(), data[1]["GEOD_NR"].replace(/-/g,''), organism);
                    });
                });
            }
        }
    } else {
        $('#geneInformation').html('<div class="alert alert-danger" role="alert"><strong>Oops!</strong> Unable to find: ' + geneName + ' <br/>Please try again.</div>' )

    }
}
