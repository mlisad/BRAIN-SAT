/*
 * Code written in this javascript document contains the functions that were used on BRAIN-sat
 * @Author Mldubbelaar
 */

// The function searchbar enables the search function within the datatable layout.
// It is an interactive way of filtering that checks the search term while typing.
function searchBar(inputName){
	$(inputName).keyup(function () {
    var rex = new RegExp($(this).val(), 'i');
	// All of the content within the table is hidden
	$('.searchable tr').hide();
	// Genes that match the regex pattern are shown
    $('.searchable tr').filter(function () {
        return rex.test($(this).text());
    }).show();
});
}

// The function downloaInnerHtml enables to download the content within a div
// The spaces are changed into the enters.
function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).innerHTML;
    elHtml = elHtml.split(' ').join('\r\n');
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

// Returns all of the studies.
function returnStudies(){
	// All of the known studies are obtained. 
	$.get("/api/v2/base_BRAINSATstudies?attrs=Unique_ID,GEOD_NR,Title,Author,Organism,Year,CelltypeID,SequencingType,Research_link&num=10000").done(function(data){
		var data = data["items"];
		var tdstart = "<td>";
		var tdend = "</td>";
		uniqueTitle = [];
		uniqueStudies = [];
		// Each of the known studies is added into the variable uniqueStudies.
		$.each(data, function(i, item){
			if ($.inArray(data[i]["Title"], uniqueTitle)== -1) {
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
		var data = data["items"];
		var tdstart = "<td>";
		var tdend = "</td>";
		// For each element in the variable data
		$.each(data, function(i, item){
			// If the title is unknown in the variable uniqueTitle
			if ($.inArray(data[i]["Title"], uniqueTitle)== -1) {
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

// obtainTPMofGenes obtaines all of the TPM values of a given study.
// It also enables the creation of the bargraph shown on the same page.
function obtainTPMofGenes(study, genes, origin, organism) {
	// This function is used to preprocess the data for the creation of the bar graph.
	var dict = {};
	// The gene is searched within the given study.
	$.get("/api/v2/base_TPM" + study + "?q=external_gene_name==" + genes.toLowerCase()).done(function(data){
		// The div with id "TPMdiv" is empied.
		$('#TPMdiv').empty();
        $('#dashboard').empty();
		// The attributes are obtained from the meta data and the items are obtained.
		var attr = data.meta["attributes"];
		var data = data["items"];
		if (data[0] !== undefined && data[0] !== null) {
            $.each(data, function(i, content){
                $.each(attr, function(t, types){
                    if (t === 0) {
                        // The gene name is obtained and written into the div with id "TPMdiv"
                        if (organism[0] === "Mus musculus") {
                            $("#TPMdiv").html("<div id='geneName' class='row'><div class='col-md-6'><a href='https://www.ensembl.org/" + organism[0].replace(/ /g,'_') + "/Gene/Summary?g="+ capitalizeEachWord(data[i][attr[t]["name"]]) + "' target='_blank'><h2>"+capitalizeEachWord(data[i][attr[t]["name"]])+"</h2></a></div></div>");
                        } else if (organism[0] === "Homo sapiens") {
                            $("#TPMdiv").html("<div id='geneName' class='row'><div class='col-md-6'><a href='https://www.ensembl.org/" + organism[0].replace(/ /g,'_') + "/Gene/Summary?g="+ data[i][attr[t]["name"]].toUpperCase() + "' target='_blank'><h2>"+data[i][attr[t]["name"]].toUpperCase()+"</h2></a></div></div>");
                        }
                    } else if (t % 4 === 1 && t !== 0) {
                        // The cell type is obtained.
                        if (attr[t]["name"].length > 4){
                            // Cell type names with a length > 4 are capitalized.
                            dict["Gene"] = capitalizeEachWord(attr[t]["name"].replace(/_/g, " "))
                        } else {
                            // Cell type names with a length < 4 are seen as an abbreviation and therefore written in uppercase.
                            dict["Gene"] = attr[t]["name"].replace(/_/g, " ").toUpperCase()
                        }
                        // The 'normal' TPM value is added into the dict 'dict'.
                        dict["TPM"] = data[i][attr[t]["name"]]
                    } else if (t % 4 === 2 && t !== 0) {
                        // Information on position 2 when performing t % 4 are saved as the low TPM values.
                        dict["Low_TPM"] = data[i][attr[t]["name"]]
                    } else if (t % 4 === 3 && t !== 0) {
                        // Information on position 3 when performing t % 4 are saved as the high TPM values.
                        dict["High_TPM"] = data[i][attr[t]["name"]]
                    } else if (t % 4 === 0 && t != 0) {
                        // Information on position 0 when performing t % 4 are saved as the percentiles.
                        dict["Percentile"] = data[i][attr[t]["name"]];
                        // All of the information is pushed to the array bargraphData
                        bargraphData.push(dict);
                        // The dict 'dict' is empied when in the end.
                        if (t !== attr.length) {
                            dict = {};
                        }
                    }
                });
            });
            // The function createBarGraph is called to create the bargraph
            if (origin === "qeAnalysis") {
                createBarGraph("#QE_content", "#TPMdiv");
            } else {
                createBarGraph("#genePart", "#dashboard_" + origin);
            }
            $("g.tick").css("font-size", "16px");
            bargraphData = [];

		} else {
            $("#dashboard_"+study).remove()
		}
        enterSearch("geneBarGraph", "searchGeneBarGraph");
		});
}

//https://bl.ocks.org/mbostock/7555321
function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}
function hideDE(){
    // DE data is hidden.
    $("#selectBar").hide();
    $("#selectConditions").hide();
    $("#scatterplot").hide();
    $("#searchBar_DE").hide();
    $("#DETable").hide();
    $("#DownloadScatterplotButton").hide();
}

//hideQE hides all of the QE content on BRAIN-sat.
function hideQE(){
    // QE data is hidden.
    $("#QEsearch").hide();
    $("#QETable").hide();
    $("#QE_content").hide();
}

function geneSearch(studyID, autoCompeteForm, studySearch){
    var availableGenes = [];
    // Creating a table that is shown on the website.
    var firstGenes = $.get("/api/v2/base_TPM"+studyID.replace(/-/g,'')+"?start=1&num=10000");
    var secondGenes = $.get("/api/v2/base_TPM"+studyID.replace(/-/g,'')+"?start=10001&num=10000");
    var thirdGenes = $.get("/api/v2/base_TPM"+studyID.replace(/-/g,'')+"?start=20001&num=10000");
    var fourthGenes = $.get("/api/v2/base_TPM"+studyID.replace(/-/g,'')+"?start=30001&num=10000");
    $.merge(firstGenes, secondGenes, thirdGenes, fourthGenes).done(function(data) {
        // Attributes from the meta data is obtained to determine the different cell types that are known.
        var data = data["items"];
        $.each(data, function (i, content) {
            if (studySearch === true) {
                if (i === 0) {
                    // The line below is used to create a bargraph of the first found gene on the website (bar graph part).
                    obtainTPMofGenes(GEODOnPage[0].replace(/-/g,''), content["external_gene_name"], "qeAnalysis", organismOnPage)
                }
            }
            // These genes are saved into the array availableGenes, where it can be used with the search function.
            availableGenes.push(capitalizeEachWord(content["external_gene_name"]));
        });
        // The autocomplete function of the searchbar for both the bar graph as the table is defined.
        $(autoCompeteForm).autocomplete({
            minLength: 2,
            delay: 0,
            autoFocus: true,
            source: availableGenes
        });

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
    });
}

function enterSearch(idInputDiv, idButtonDiv){
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

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}