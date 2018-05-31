/*
 * Code written in this javascript document is used to perform global features of BRAIN-sat
 * .
 * @Author Mldubbelaar
 */

var uniqueStudies = [];
var uniqueTitle = [];
var uniqueGEOD = [];
// var uniqueCelltypeID = [];
var seqTypeOnPage = [];
var organismOnPage = [];
var GEODOnPage = [];
var bargraphData = [];
// var searchedCondition = false;
var tableContentDE = [];
// var appLoaded = false;
// var reloadAgain = false;
var studiesSearch = ["E-GEOD-99074", "E-GEOD-52564"];

$(document).ready(function () {

    // Make sure that an autocomplete addition is made for #geneText
    geneSearch(studiesSearch[1], "#geneText", false);
	// This function is found in brainsatFunctions.js and obtains the studies to display on the website.
	obtainStudies();
	// if statement where the specific on enter button is used.
    enterSearch("geneText", "geneSearch");
	
	// When the user clicks upon the contact button, all other divs are hidden and contactInfo is shown.
	$("body").on("click", "#contactButton", function(){
		// returnHome();
		$("#accordion").hide();
        $("#materialInfo").hide();
        $("#publicationPart").hide();
		$("#contactInfo").show();
	});

    // When clicking upon the return button at the publication part, the homepage is shown again.
    $("body").on("click", ".returnButton", function(){
        returnHome();
    });

    // When clicking upon the information button, the information page is shown.
    $("body").on("click", "#informationButton", function(){
        // returnHome();
        $("#accordion").hide();
        $("#contactInfo").hide();
        $("#publicationPart").hide();
        $("#materialInfo").show();
    });
	
	// When the downloadLink is clicked, a csv file will be made with the content out of the hiddenQEtext div.
	$('#DownloadQETable').click(function(){
	    downloadInnerHtml("TPMData.csv", 'hiddenQEtext','text/html');
	});
	
	// When the button with the ID DownloadTPMGraph is clicked the content of the TPMdiv is downloaded.
	$('#DownloadTPMGraph').click(function(){
		var usedDiv = "#TPMdiv";
		var h = $(usedDiv)[0].ownerDocument.defaultView.innerHeight;
		$(usedDiv)[0].ownerDocument.defaultView.innerHeight = $(usedDiv).height();
		
		// html2canvas is used to change the SVG content into a canvas format.
		// The allowTaint option is used to show all content (good or bad converted).
		html2canvas($(usedDiv), {
			allowTaint: true,
            taintTest: false
		}).then(function(canvas) {
	        $(usedDiv)[0].ownerDocument.defaultView.innerHeight = h;
	        // The canvas is changed into a dataURL
	        var imgData = canvas.toDataURL('image/png');
	        // jsPDF is used to create a new PDF document 
	        var doc = new jsPDF();
	        // The distanced and sizes of the end image are given, together with the dataURL and the original format. 
			doc.addImage(imgData, 'PNG', 15, 40, 180, 100);
			// The PDF will be saved as TPMbarplot.pdf
			doc.save('TPMbarplot.pdf');
	    });
	});
	
	// When the button with the ID DownloadTPMGraph is clicked the content of the TPMdiv is downloaded.
	$('#DownloadScatterplot').click(function(){
		var usedDiv = "#scatterplot";
		var h = $(usedDiv)[0].ownerDocument.defaultView.innerHeight;
		$(usedDiv)[0].ownerDocument.defaultView.innerHeight = $(usedDiv).height();
		
		// html2canvas is used to change the SVG content into a canvas format.
		// The allowTaint option is used to show all content (good or bad converted).
		html2canvas($(usedDiv), {
			allowTaint: true,
            taintTest: false
		}).then(function(canvas) {
	        $(usedDiv)[0].ownerDocument.defaultView.innerHeight = h;
	        // The canvas is changed into a dataURL
	        var imgData = canvas.toDataURL('image/png');
	        // jsPDF is used to create a new PDF document 
	        var doc = new jsPDF();
	        // The distanced and sizes of the end image are given, together with the dataURL and the original format. 
			doc.addImage(imgData, 'PNG', 15, 40, 140, 95);
			// The PDF will be saved as TPMbarplot.pdf
			doc.save('DEscatterplot.pdf');
	    });

	});

	// When clicking upon the gene search button, the typed gene is searched in mice or human studies.
	// Returning those studies with the given TPM values in the shape of a dashboard.
	$("body").on("click", "#geneSearch", function(){
        $("#geneInformation").empty();
        // searchTopStudies();
		var geneName = [];
		// The filled in value of the input with id geneText is used.
		if ($("#geneText").val() !== "") {
			geneName = $('#geneText').val();
			for (var i=0; i < studiesSearch.length; i++) {
			    if (i !== 0 ) {
                    $("#geneInformation").append("<hr>")
                }
			    var egeodStudyNr = studiesSearch[i];
                var imgSource = "";
                var organism = "";
                if($("dashboard_"+egeodStudyNr.replace(/-/g,'')).length === 0) {
                	$("#geneInformation").append("<div id='dashboard_" + egeodStudyNr.replace(/-/g,'') + "' style='height:650px;'></div>");
                    $.get('/api/v2/base_BRAINSATstudies?attr=GEOD_NR,Title,Research_link,Author,Organism,&q=GEOD_NR=="'+egeodStudyNr+'"').done(function(data){
                        // imgSource = "/img/distributionPlot_" + egeodStudyNr.replace(/-/g, "").replace("EGEOD","")+".png";
                    	var data = data["items"];
                        // organism = data[1]['Organism'];
                        if (data[1]['Organism'] === "Mus musculus") {
                            $("#dashboard_"+data[1]["GEOD_NR"].replace(/-/g,"")).append("<div id='geneName' class='row'><div class='col-md-6' style='font-size:24pt;'><a href='https://www.ensembl.org/Mus_musculus/Gene/Summary?g="+ capitalizeEachWord(geneName) + "' target='_blank'><p style='margin-left:0.5em;'><b>"+capitalizeEachWord(geneName)+"</b></p></a></div></div>");
                            imgSource = "/img/distributionPlot_" + data[1]["GEOD_NR"].replace(/-/g,"").replace("EGEOD","")+".png";
                        	$("#dashboard_"+data[1]["GEOD_NR"].replace(/-/g,"")).append('<div class="row"><div class="col-xs-9 col-sm-9" style="font-size:24pt;"><p style="margin-left:0.5em;"><b>Mouse</b></p></div><div class="col-xs-3 col-sm-3 img" style="margin-bottom:-100px;"><img class="img-responsive" src=\"'+imgSource+'\"/></div></div>');
                        } else if (data[1]['Organism'] === "Homo sapiens") {
                            $("#dashboard_"+data[1]["GEOD_NR"].replace(/-/g,"")).append("<div id='geneName' class='row'><div class='col-md-6' style='font-size:24pt;'><a href='https://www.ensembl.org/Homo_sapiens/Gene/Summary?g="+ geneName.toUpperCase() + "' target='_blank'><p style='margin-left:0.5em;'><b>"+geneName.toUpperCase()+"</b></p></a></div></div>");
                            imgSource = "/img/distributionPlot_" + data[1]["GEOD_NR"].replace(/-/g,"").replace("EGEOD","")+".png";
                            $("#dashboard_"+data[1]["GEOD_NR"].replace(/-/g,"")).append('<div class="row"><div class="col-xs-9 col-sm-9" style="font-size:24pt;"><p style="margin-left:0.5em;"><b>Human</b></p></div><div class="col-xs-3 col-sm-3 img" style="margin-bottom:-100px;"><img class="img-responsive" src=\"'+imgSource+'\"/></div></div>');
                        }
                        // This information is added into the div, making sure that it is clear which dashboard belongs to which study.
                        if (data[1]['Research_link'] === "Unknown") {
                            $("#dashboard_"+data[1]["GEOD_NR"].replace(/-/g,"")).append("<p class='svgTitle col-xs-9 col-sm-9'><b>"+ data[1]["Title"] +"</b><br/>By "+ data[1]["Author"] + "</p> <br/>");
                        } else {
                            $("#dashboard_"+data[1]["GEOD_NR"].replace(/-/g,"")).append("<p class='svgTitle col-xs-9 col-sm-9'><b>"+ data[1]["Title"] +"</b><br/>By <a href='"+data[1]['Research_link']+"' target='_blank'>"+ data[1]["Author"] + "</a>"+ "</p> <br/>");
                        }
                        // $("#dashboard_"+data[1]["GEOD_NR"].replace(/-/g,"")).append("<hr>")
                    });
                    obtainTPMofGenes(egeodStudyNr.replace(/-/g,''), geneName.toLowerCase(), egeodStudyNr.replace(/-/g,''), organism);
                }
			}
		}


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
    // searchBar(inputName)

    if ($('#geneInformation').is(':empty')) {
        $('#geneInformation').html('<div class="alert alert-danger" role="alert"><strong>Oops!</strong> Unable to find: ' + geneName + ' <br/>Please try again.</div>' )
    }

	});
	
	// When clicking upon the conditionSearch button
	$("body").on("click", "#conditionSearch", function(){
		// The tableContent is emptied
		$("#tableContent").empty();
		if ($('#conditionText').val() != "") {
			// Studies that contain the condition given in the searchbar are returned.
			$.get("/api/v2/base_BRAINSATstudies?q=Abstract=q="+$("#conditionText").val().replace(/ /g,'_')).done(function(data){
			var data = data["items"];
			var tdstart = "<td>";
			var tdend = "</td>";
			uniqueTitle = [];
			uniqueStudies = [];
			// The found studies are loaded into the studyTable.
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
		uniqueStudies.sort()
		// Studies are joined with <br/> and written into the div tableContent.
		$("#tableContent").html(uniqueStudies.join("<br/>"));
			});
	// The accordion with the studies will open and the condition search part will close.
	$('#collapseOne').collapse("show");
	$('#collapseThree').collapse("hide");
	// A refresh button is showed to refresh all of the studies again.
	$("#refreshPublications").show();
	// The condition searchbar is emptied again.
	$('#conditionText').val("");
	}});

	// When clicking upon the refresh button 
	$("body").on("click", "#refreshPublications", function(){
		returnStudies();
	});
	

	//----------------------//
	//Tutorial part of BRAIN-sat.//
	//----------------------//
	
	// When clicking upon the close button of the tutorial pop up
	$("body").on("click", "#closeModal", function(){
		// Information about the QE and DE analysis is hidden.
		$('#QEanalysis').collapse('hide');
		$('#DEanalysis').collapse('hide');
        $('#SCRNAanalysis').collapse('hide');
	});
	
	// When clicking upon the DE information in the tutorial button the QE information is hidden.
	$("body").on("click", ".tutorialDEinfo", function(){
		$('#QEanalysis').collapse('hide');
        $('#SCRNAanalysis').collapse('hide');
	});

	// When clicking upon the QE information in the tutorial button the DE information is hidden.
	$("body").on("click", ".tutorialQEinfo", function(){
		$('#DEanalysis').collapse('hide');
        $('#SCRNAanalysis').collapse('hide');
	});

    // When clicking upon the scRNA information in the tutorial button the DE information is hidden.
    $("body").on("click", ".tutorialscRNAinfo", function(){
        $('#DEanalysis').collapse('hide');
        $('#QEanalysis').collapse('hide');
    });

	// The input id filter is called (this input is used to filter the studies on the homepage).
    searchBar("#filter");
    
});