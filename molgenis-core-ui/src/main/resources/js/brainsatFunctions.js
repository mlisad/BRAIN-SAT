/*
 * Code written in this javascript document contains the functions that were used on BRAIN-sat
 * @Author Mldubbelaar
 */

function loadVue() {
    $.getScript("/js/singlecell/manifest.js", function (data, textStatus, jqxhr) {
        $.getScript("/js/singlecell/vendor.js", function (data, textStatus, jqxhr) {
            $.getScript("/js/singlecell/app.js", function (data, textStatus, jqxhr) {

            });
        });
    });
}

function geneSearched(divID) {
    var divName = $(divID);
    $("#geneNameSearch").empty();
    $("#geneSearchPlot").empty();
    fillGeneSearch(divName.val());

    // The accordion is reseted to the 'normal' state.
    $('#collapseOne').collapse("show");
    $('#collapseTwo').collapse("hide");
    // A return button is shown.
    $("#returnTPM").show();
    // $(".legend").remove();
    // The accordion is hidden.
    $("#accordion").hide();
    // The gene part is shown (part with the dashboards).
    $("#genePart").show();
    // The search value is cleared.
    $('#geneText').val("");
    divName.val("");

    if (divID === "#geneText") {
        availableGenes = [];
        geneSearch("combinedMatrixSearch", "#geneTextOnPage", false);
        enterSearch("geneTextOnPage", "geneSearchOnPage");
    }
}

// The function searchbar enables the search function within the datatable layout.
// It is an interactive way of filtering that checks the search term while typing.
function searchBar(inputName) {
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
            if ($.inArray(data[i]["GEOD_NR"], uniqueGEOD)=== -1) {
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
function obtainTPMofGenes(study, genes, organism) {
    // This function is used to preprocess the data for the creation of the bar graph.
    // The gene is searched within the given study.
    $.get("/api/v2/base_TPM" + study + "?q=external_gene_name==" + genes.toLowerCase()).done(function(currdata){
        $('#dashboard').empty();
        $('#TPMdiv_barplot').remove();
        // The attributes are obtained from the meta data and the items are obtained.
        var data = currdata["items"];
        // The div with id "geneName" is emptied.
        document.getElementById("geneName").innerHTML = "";
        if (organism[0] === "Mus musculus" || organism[0] === "Rattus norvegicus") {
            $("#geneName").append(
                "<h2>" + capitalizeEachWord(genes) + "</h2>");
            $("#TPMdiv").append("<div id=TPMdiv_barplot></div>").ready(function(){
                createBarGraph(data, "TPMdiv_barplot", $("#TPMdiv").width(), true);
            });
        } else if (organism[0] === "Homo sapiens" || organism[0] === "Macaca mulatta") {
            $("#geneName").append(
                                "<h2>" + genes.toUpperCase() + "</h2>");
            $("#TPMdiv").append("<div id=TPMdiv_barplot></div>").ready(function(){
                createBarGraph(data, "TPMdiv_barplot", $("#TPMdiv").width(), true);
            });
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
    $("#scatterplotHelp").hide();
    $("#searchBar_DE").hide();
    $("#DETable").hide();
    $("#DEHelp").hide();
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
                // The line below is used to create a bargraph of the first found gene on the website (bar graph part).
                obtainTPMofGenes(GEODOnPage[0].replace(/-/g,''), genes["external_gene_name"], organismOnPage);
            }
        }
        // These genes are saved into the array availableGenes, where it can be used with the search function.
        availableGenes.push(capitalizeEachWord(genes["external_gene_name"]));
    });
}

function geneSearch(studyID, autoCompeteForm, studySearch){
    // Change the studyID when the defined autoCompleteForm = .geneList
    if (autoCompeteForm === ".genelist") {
        studyID = "TPM"+studyID.replace(/-/g,'');
    }

    // Create necessary variables
    var numberOfGene, tenThousand, restVal = "";
    var tenThousandCounter = 0;

    // Determine how many genes are available in the dataset
    $.when($.get("/api/v2/base_TPMEGEOD52564")).done( function (data) {
        // Total number of genes
        numberOfGene = data["total"].toString();
        // The ten thousands values are saves together with the rest values ()
        if (numberOfGene.length >= 5) {
            tenThousand = numberOfGene.charAt(0);
            restVal = numberOfGene.substring(1);
        } else {
            tenThousand = "0";
            restVal = numberOfGene;
        }

        // Make sure that there are no unnecessary genes called
        // The while consists of tenThousand +1 to make sure that the excess genes are obtained as well.
        while (tenThousandCounter !== parseInt(tenThousand)+1) {
            if (tenThousandCounter === 0) {
                $.when($.get("/api/v2/base_"+studyID+"?start=1&num=10000")).done( function (genePart) {processGenes(genePart, studySearch, true)} );
            } else if (tenThousandCounter === parseInt(tenThousand)) {
                $.when($.get("/api/v2/base_"+studyID+"?start="+tenThousand+"0000&num="+restVal)).done( function (genePart) {processGenes(genePart, studySearch, false)} );
            } else {
                $.when($.get("/api/v2/base_"+studyID+"?start="+tenThousandCounter+"0001&num="+(tenThousandCounter+1).toString()+"0000")).done( function (genePart) {processGenes(genePart, studySearch, false)} );
            }
            tenThousandCounter += 1
        }

    });

    // The autocomplete function of the searchbar for both the bar graph as the table is defined.
    $(autoCompeteForm).autocomplete({
        minLength: 2,
        delay: 0,
        autoFocus: true,
        source: availableGenes
    });

    // Enable the use of the of geneText
    if (autoCompeteForm === "#geneText") {
        $(autoCompeteForm).prop("disabled", false);
    }

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
        if (document.getElementById("geneInformation")) {
            $("#geneInformation").empty();
        }
        document.getElementById("geneNameSearch").innerHTML = "";
        $.get("/api/v2/base_infoTableSearch").done(function(infoData) {
            infoData = infoData["items"];
            $.get("/api/v2/base_combinedMatrixSearch?q=external_gene_name==" + geneName.toUpperCase()).done(function(geneData){
                geneData = geneData["items"];
                $("#geneNameSearch").append("" +
                    "<a class='QEgene' href='https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=" + geneName.toUpperCase() + "' target='_blank'>" +
                        "<h2>" + geneName.toUpperCase() + "</h2>" +
                    "</a>").
                ready(function(){
                        createSearchPlot(infoData, geneData)
                });
            });
        });
    } else {
        $('#geneInformation').html('<div id="geneAlert" class="alert alert-danger" role="alert"><strong>Oops!</strong> Unable to find: ' + geneName + ' <br/>Please try again.</div>' )

    }
}
