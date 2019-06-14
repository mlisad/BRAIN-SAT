/*
 * Code written in this javascript document is used to perform features of the publication part of BRAINSAT.
 * @Author Mldubbelaar
 */


$(document).ready(function () {
	
	//-------------------------------------------------//
	//Global functions of the publication part of BRAINSAT.//
	//-------------------------------------------------//
	
	// When clicking upon a study within the studyTable.
	$("body").on("click", ".studyTable", function(){
        $('html,body').scrollTop(0);
		// Creates a tooltip when hovering on the studyTable	
		// $('.studyTable').tooltip();
	
		// The information of the given studies are obtained.
		var uniqueConditions = [];
		var studyConditions = [];
		var studyInformation = [];
		$.get("/api/v2/base_BRAINSATstudies?q=GEOD_NR=="+$(this).attr("id")).done(function(data){
			var data = data["items"];
			// The variables studyTitle and GEODOnPage are cleared.
			var studyTitle = [];
			GEODOnPage = [];
			organismOnPage = [];
            seqTypeOnPage = [];
			// For each known sample the data is obtained.
			$.each(data, function(i, item){
				// The data is saved when the sample is not known yet.
				if ($.inArray(data[i]["Tissue"] + " " + data[i]["Celltype"] + " " + data[i]["Strain"] + " " + data[i]["Age"], uniqueConditions) === -1 ){
					uniqueConditions.push(data[i]["Tissue"] + " " + data[i]["Celltype"] + " " + data[i]["Strain"] + " " + data[i]["Age"]);
					// Variable sampleInfo is made to make sure that one sample is noted as option.	
					var sampleInfo = data[i]["Tissue"] + " " + data[i]["Celltype"] + " " + data[i]["Strain"] + " " + data[i]["Age"];
					// Information is pushed to the variable studyConditions.
					studyConditions.push('<option value="' + data[i]["SRA"] + '">' + capitalizeEachWord(sampleInfo.replace(/ undefined/g, "")) + '</option>');
				}
				// The code below is used to show global information like the title, author and publication year above the QE/DE part.
				// Only if the title is not yet known in studyTitle, this information is added to the variable studyInformation.
				if ($.inArray(data[i]["Title"], studyTitle)== -1) {
					studyTitle.push(data[i]["Title"]);
					studyInformation.push(
						"<b>Title:</b> " + data[i]["Title"] + "<br/>"
						+ "<b>Author:</b> " + data[i]["Author"] + "<br/>"
						+ "<b>Publication year:</b> " + data[i]["Year"] + "<br/>"
                        + "<b>Organism:</b> " + data[i]["Organism"]);
					// The GEOD number is pushed so it can be used for calling the R API's.
					GEODOnPage.push(data[i]["GEOD_NR"]);
					organismOnPage.push(data[i]["Organism"]);
                    seqTypeOnPage.push(data[i]["SequencingType"])
 			}});
		// Conditions are sorted alphabetically.
		studyConditions.sort();

		// Make sure that the right seq type of the study is enabled/disabled.
			if (seqTypeOnPage.length !== 1) {
                $( "#RnaSeq" ).removeClass( "disabled" );
                $( "#SingleCell" ).removeClass( "disabled" )
			} else if (seqTypeOnPage[0] === 'RNA'){
                $( "#RnaSeq" ).removeClass( "disabled" )
            } else if (seqTypeOnPage[0] === 'scRNA') {
                $( "#SingleCell" ).removeClass( "disabled" )
            }

		// The different conditions are added into the select selectConditions.
		$("#selectConditions").html(studyConditions);

		// Global information is added into the div informationStudy.
		$("#informationStudy").html(studyInformation);
		});
		// The according showing the studies is hidden and the publicationPart with the options QE and DE is shown.
		$("#accordion").hide();
		$(".row.DE").hide();
		$("#publicationPart").show();
		$("#scModalDiv").hide();
	});

	//---------------------------------------------//
	//DE functions of the publication part of BRAINSAT.//
	//---------------------------------------------//

	//When clicking upon the DE button.
	$("body").on("click", ".DEbutton", function(){
		// QE content that might be visible is hidden.
		$("#analysis_info").hide();
		$("#QE_content").hide();
		$("#searchBar_QE").hide();
		$("#submitQEbutton").hide();
		// The select2 bar is shown.
		$("#s2id_selectConditions").show();
		$("#selectBar").show();
		// Makes sure that there are two conditions chosen within the select bar.
		if ($('#selectConditions option').size() !== 1) {
			$("#selectBar").toggle();
			$("#selectConditions").select2({
				placeholder: "Select two conditions",
				maximumSelectionSize:2,
				allowClear: true
			});
		} else {
		//An error is raised when none or one condition is chosen.
			$("#selectBarMessage").show();
		}
		hideQE();
		$("#s2id_selectConditions").show();
		$("#selectBar").show();
	});

	$("body").on("click", "#submitDEbutton", function(){
		// The table-scroll is emptied when clicking the DE submit button
		// and the for-control is reset.
		// The modal that holds the loading bar is hidden.
		$("#NoDEGMessage").hide();
		$("#firstCondition").remove();
		$(".table-scroll").empty();
		$(".form-control").trigger("reset");
		$("#DETable").empty();
		$("#DEcontent").hide();
		$("#searchBar_DE").hide();
		$("#DETableContent").hide();
		$("#scatterplot").empty();
		$(".row.DE").hide();
		$(".loader").show();

		// When there are two conditions chosen the API for the scatterplot and the DE table is called.
		var count = $("#selectConditions :selected").length;
		var firstCondition = "";
        var secondCondition = "";
        var splitFirst = "";
        var splitSecond = "";
        var DEtitle = "";
		
		if (count === 2) {
            $.get("/api/v2/base_"+GEODOnPage[0].replace(/-/g,'')+"Targets?q=SRA=="+$("#selectConditions").val()[0]).done(
                function(data){
                    var data = data["items"];
                    firstCondition = data[0]["Description"];
                    splitFirst = firstCondition.split('_');
                    $.get("/api/v2/base_"+GEODOnPage[0].replace(/-/g,'')+"Targets?q=SRA=="+$("#selectConditions").val()[1]).done(
                        function(data){
                            var data = data["items"];
                            secondCondition = data[0]["Description"];
                            splitSecond = secondCondition.split('_');

                            var diffFirst = $(splitFirst).not(splitSecond);
                            var diffSecond = $(splitSecond).not(splitFirst);

                            DEtitle = capitalizeEachWord(diffFirst.toArray().join(' ')) + " vs " + capitalizeEachWord(diffSecond.toArray().join(' '))
                        });
                });

			if ($( window ).width() < "768" ) {
				$( "<div class='text-center'>Please perform the analysis on a bigger screen to obtain the scatterplot</div><br/><br/>" ).appendTo( "#scatterplot" );
			} else {
				$.get("/scripts/DEAnalysis/run?entityName=base_"+GEODOnPage[0].replace(/-/g,'')+"&condition1="+$("#selectConditions").val()[0]+"&condition2="+$("#selectConditions").val()[1]+"&targetFile=base_"+GEODOnPage[0].replace(/-/g,'')+"Targets&organism="+organismOnPage[0].replace(/ /g, "+") + "?start=1&num=10000").done(
                    function(data){
						if (data.startsWith('Login success[1] "No differentially expressed genes where found')) {
							$("#NoDEGMessage").show();
                            $(".loader").hide();
                            $("#DEHelp").hide();
						} else {
							// The DE table is added to the div DETable.
							$("#DETable").append(
									'<table id="countTable" class="table table-striped table-hover table-condensed table-responsive header-fixed sortable">' +
										'<thead><tr></th><th>geneSym</th><th>LogFC</th><th>-log10(FDR)</th></tr></thead>' +
										'<tbody id="DEcontent" class="searchable"></tbody>' +
									'</table>');
							// The data information obtained from the API is splitted by new lines and spaces.
							var stringArray = data.split(/[ ,\n"]+/);
							// Starting from the 6th element the data is saved into the variable tableContent.
							tableContentDE = stringArray.slice(6,stringArray.length);
							var counter = 0;
							var stringToAppend = '';
							// For each element within the variable tableContent
							$.each(tableContentDE, function(i, content){
								if (counter ===0){
									// The beginning of the row for the table is made starting with the first element.
									counter += 1;
								} else if (counter === 1) {
                                    // Adding elements.
                                    stringToAppend += '<tr><td>' + content + '</td>';
                                    counter += 1;
                                } else if (counter === 2 ) {
                                    stringToAppend += '<td>'+parseFloat(content).toFixed(7)+'</td>';
                                    counter += 1;
								} else if (counter === 3 ) {
                                    stringToAppend += '<td>'+parseFloat(content).toFixed(7)+'</td>';
                                    counter += 1;
                                } else {
									// The last element end to row and appends the information to the div DEcontent.
                                    stringToAppend += '</tr>';
									$('#DEcontent').append(stringToAppend);
                                    stringToAppend = '';
                                    counter = 0;
								};
							});
							// Shows all of the necessary content used for the DE analysis.
							$("#DETable").show();
                            createScatterPlot(tableContentDE, DEtitle.replace(/-/g,' '));
							$("#DEcontent").show();
							$("#searchBar_DE").show();
							$("#DETableContent").show();
							$("#scatterplot").show();
							$("#scatterplotHelp").show();
							$(".row.DE").show();
							searchBar("#DEsearch");
                            $(".loader").hide();
                            $("#DEHelp").show();
				}
				});
			}
			} else {
				// An error is given when there is only one condition to choose from.
				$("#errorLengthForSubmit").show();
				$('#errorLengthForSubmit').delay(3000).fadeOut('slow');
			}
		});
	
	//---------------------------------------------//
	//QE functions of the publication part of BRAINSAT.//
	//---------------------------------------------//
	
	// When clicking upon the submit QE button
	$("body").on("click", ".QEbutton", function(){
		// The table-scroll is emptied when clicking the QE submit button
		// and the for-control is reset.
		$(".table-scroll").empty();
		$(".form-control").trigger("reset");

		hideDE();
        availableGenes = [];
        geneSearch(GEODOnPage[0], ".genelist", true);
        enterSearch("geneBarGraph", "searchGeneBarGraph");
	});

	$("body").on("click", "#searchGeneBarGraph", function(){
		obtainTPMofGenes(GEODOnPage[0].replace(/-/g,''), $("#geneBarGraph").val(), organismOnPage);
	});

	// The function searchbar enables the search function within the datatable layout.
	// It is an interactive way of filtering that checks the search term while typing.
	$("body").on("click", "#searchGeneTable", function(){
		// The pattern given in the search bar is used to match the beginning of genes
		var rex = new ("^"+$("#geneTableQE").val(), 'i');
		// All of the content within the table is hidden
		$('.searchable tr').hide();
		// Genes that match the regex pattern are shown
		$('.searchable tr').filter(function () {
			return rex.test($(this).text());
		}).show();

	});

    $("#SingleCell").on("click", function () {
        // $("#scModalDiv").collapse('show');
        $("#scModalDiv").show();
        $("#singleCellCollapse").collapse('show');
        $("#SingleCellHelp").show();

        if (document.getElementById("tSNEplot")) {
            document.getElementById("tSNEplot").innerHTML = "";
        }
        if (document.getElementById("barplotVis")) {
            document.getElementById("barplotVis").innerHTML = "";
        }
        if (document.getElementById("pieChartVis")) {
            document.getElementById("pieChartVis").innerHTML = "";
        }

        $("#searchGenetSne").show();
        $("#searchGeneInput").show();

        if (GEODOnPage[0] !== '') {
            window.__INITIAL_STATE__ = GEODOnPage[0].replace(/-/g,'');
        }

        loadVue();
    });


});