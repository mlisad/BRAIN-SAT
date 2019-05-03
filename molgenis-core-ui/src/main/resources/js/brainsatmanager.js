/*
 * Code written in this javascript document is used to perform global features of BRAIN-sat
 * .
 * @Author Mldubbelaar
 */

var uniqueStudies = [];
var uniqueTitle = [];
var uniqueGEOD = [];
var seqTypeOnPage = [];
var organismOnPage = [];
var GEODOnPage = [];
var tableContentDE = [];
var availableGenes = [];
var studiesSearch = ["E-GEOD-99074", "E-GEOD-52564"];
var QEimageCon = '<img src=\'img/QE_analysis_example.png\' class=\'img-fluid\' alt=\'TPM figure explanation\'>' +
    '<br><hr><br>' +
    'This barplot is used to visualize the quantitative expression (QE) analysis.<br>' +
    'The abundance of the different conditions (x axis) are calculated to TPM values.' +
    '<p class=\'lead\'>' +
    'TPM = (normalized transcripts (RPKM|FPKM) / sum of normalized transcript) * 10^6. \n' +
    '</p>' +
    'The different conditions can be found on the x-axis and the TPM values are represented on the Y-axis <br>' +
    '(1) Each of the barplots is indicated with an error bar based on the sample with the lowest and the TPM value in the condition<br>' +
    '(2) Is the bar plot of the condition, the colors of the bar are based on the percentile group. ' +
    'A percentiles are calculated based on the distribution of the abundance for each condition. ' +
    '<img src=\'img/colorscale.png\' class=\'img-fluid\' alt=\'colorscale\'>' +
    'These percentile groups consists of 13 divisions, from not (significantly) expressed (grey) until very high expressed, 0-5 percentile (red). ' +
    'This information is given when hovering over the bar plot (3). <br>' +
    '(4) To save the bar plot, click this image.'

$(document).ready(function () {

	var bodyCon =  $("body");
    // Make sure that an autocomplete addition is made for #geneText
    geneSearch(studiesSearch[0], "#geneText", false);
	// This function is found in brainsatFunctions.js and obtains the studies to display on the website.
	obtainStudies();
	// if statement where the specific on enter button is used.
    enterSearch("geneText", "geneSearch");

    // When clicking upon the return button at the publication part, the homepage is shown again.
    bodyCon.on("click", ".returnButton", function(){
        returnHome();
    });

	// When clicking upon the gene search button, the typed gene is searched in mice or human studies.
	// Returning those studies with the given TPM values in the shape of a dashboard.
    bodyCon.on("click", "#geneSearch", function(){
        // $.ajaxSetup({async:false});
		var geneTextDiv = $("#geneText");
        $("#geneInformation").empty();
        fillGeneSearch(geneTextDiv.val());
		// The accordion is resetted to the 'normal' state.
		$('#collapseOne').collapse("show");
		$('#collapseTwo').collapse("hide");
		// A return button is shown.
		$("#returnTPM").show();
		$(".legend").remove();
		// The accordion is hidden.
		$("#accordion").hide();
		// The gene part is shown (part with the dashboards).
		$("#genePart").show();
		// The search value is cleared.
        geneTextDiv.val("");
		$('#geneTextOnPage').val("");

		availableGenes = [];
		geneSearch(studiesSearch[0], "#geneTextOnPage", false);
		enterSearch("geneTextOnPage", "geneSearchOnPage");
	});

    bodyCon.on("click", "#geneSearchOnPage", function(){
		var geneTextOnPageDiv = $("#geneTextOnPage");
        $("#geneInformation").empty();
        fillGeneSearch(geneTextOnPageDiv.val());

        // The accordion is resetted to the 'normal' state.
        $('#collapseOne').collapse("show");
        $('#collapseTwo').collapse("hide");
        // A return button is shown.
        $("#returnTPM").show();
        $(".legend").remove();
        // The accordion is hidden.
        $("#accordion").hide();
        // The gene part is shown (part with the dashboards).
        $("#genePart").show();
        // The search value is cleared.
        $('#geneText').val("");
        geneTextOnPageDiv.val("");
    });

	// When clicking upon the conditionSearch button
    bodyCon.on("click", "#conditionSearch", function(){
		// The tableContent is emptied
		var conditionTextDiv = $('#conditionText');
		$("#tableContent").empty();
		if (conditionTextDiv.val() !== "") {
			// Studies that contain the condition given in the searchbar are returned.
			$.get("/api/v2/base_BRAINSATstudies?q=Abstract=q="+conditionTextDiv.val().replace(/ /g,'_')).done(function(data){
				data = data["items"];
				var tdstart = "<td>";
				var tdend = "</td>";
				uniqueTitle = [];
				uniqueStudies = [];
				// The found studies are loaded into the studyTable.
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
	// The accordion with the studies will open and the condition search part will close.
	$('#collapseOne').collapse("show");
	$('#collapseThree').collapse("hide");
	// A refresh button is showed to refresh all of the studies again.
	$("#refreshPublications").show();
	// The condition searchbar is emptied again.
	conditionTextDiv.val("");
	}});

	// When clicking upon the refresh button
	bodyCon.on("click", "#refreshPublications", function(){
		returnStudies();
	});


	//----------------------//
	//Tutorial part of BRAIN-sat.//
	//----------------------//

	// When clicking upon the close button of the tutorial pop up
	bodyCon.on("click", "#closeModal", function(){
		// Information about the QE and DE analysis is hidden.
		$('#QEanalysis').collapse('hide');
		$('#DEanalysis').collapse('hide');
        $('#SCRNAanalysis').collapse('hide');
        $('#rawDatasets').collapse('hide');
        $('#dataSetting').collapse('hide');
	});

	// When clicking upon the DE information in the tutorial button the QE information is hidden.
	bodyCon.on("click", ".tutorialDEinfo", function(){
		$('#QEanalysis').collapse('hide');
        $('#SCRNAanalysis').collapse('hide');
	});

	// When clicking upon the QE information in the tutorial button the DE information is hidden.
	bodyCon.on("click", ".tutorialQEinfo", function(){
		$('#DEanalysis').collapse('hide');
        $('#SCRNAanalysis').collapse('hide');
	});

    // When clicking upon the scRNA information in the tutorial button the DE information is hidden.
    bodyCon.on("click", ".tutorialscRNAinfo", function(){
        $('#DEanalysis').collapse('hide');
        $('#QEanalysis').collapse('hide');
    });

    // When clicking upon the scRNA information in the tutorial button the DE information is hidden.
    bodyCon.on("click", ".settingsPreprocessing", function(){
        $('#rawDatasets').collapse('hide');
    });


    // When clicking upon the scRNA information in the tutorial button the DE information is hidden.
    bodyCon.on("click", ".rawDatasets", function(){
        $('#dataSetting').collapse('hide');
    });


    // The input id filter is called (this input is used to filter the studies on the homepage).
    searchBar("#filter");

});