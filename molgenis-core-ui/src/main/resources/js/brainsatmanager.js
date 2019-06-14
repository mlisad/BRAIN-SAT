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

$(document).ready(function () {
	var bodyCon =  $("body");
    // Make sure that an autocomplete addition is made for #geneText
    geneSearch("combinedMatrixSearch", "#geneText", false);
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
    bodyCon.on("click", "#geneSearch", function() {
        geneSearched("#geneText")
    });

    bodyCon.on("click", "#geneSearchOnPage",  function() {
        geneSearched("#geneTextOnPage")
    });

	//---------------------------//
	//Tutorial part of BRAIN-sat.//
	//---------------------------//

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

    //---------------------------//
    // Setting part of BRAIN-sat.//
    //---------------------------//
    // When clicking upon the scRNA information in the tutorial button the DE information is hidden.
    bodyCon.on("click", ".settingsPreprocessing", function(){
        $('#rawDatasets').collapse('hide');
        $('#disclaimer').collapse('hide');
    });

    // When clicking upon the scRNA information in the tutorial button the DE information is hidden.
    bodyCon.on("click", ".rawDatasets", function(){
        $('#dataSetting').collapse('hide');
        $('#disclaimer').collapse('hide');
    });

    bodyCon.on("click", ".disclaimer", function(){
        $('#dataSetting').collapse('hide');
        $('#rawDatasets').collapse('hide');
    });

    //---------------------------//
    //   SC part of BRAIN-sat.   //
    //---------------------------//
    bodyCon.on("click", ".tsneExplanation", function(){
        $('#boxplotSC').collapse('hide');
        $('#piechardCS').collapse('hide');
    });

    // When clicking upon the scRNA information in the tutorial button the DE information is hidden.
    bodyCon.on("click", ".boxplotExplanation", function(){
        $('#tsneSC').collapse('hide');
        $('#piechardCS').collapse('hide');
    });

    bodyCon.on("click", ".piechardExplanation", function(){
        $('#tsneSC').collapse('hide');
        $('#boxplotSC').collapse('hide');
    });

    $('[data-toggle="modalSC"]').hover(function() {
        var modalId = $(this).data('target');
        $(modalId).modal('show');

    });

    // The input id filter is called (this input is used to filter the studies on the homepage).
    searchBar("#filter");
});