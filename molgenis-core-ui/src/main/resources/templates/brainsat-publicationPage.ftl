<div id="publicationPart">
	<div id="informationStudy"></div>
	<button type="button" class="btn btn-primary btn-block disabled" id="RnaSeq" type="button" data-toggle="collapse" data-target="#rnaSeqCollapse" aria-expanded="false" aria-controls="rnaSeqCollapse">RNA Sequencing</button>
	<div class="collapse" id="rnaSeqCollapse">
		<div class="well">
			<div id="conditions"></div>
			<div id="errorLengthForSubmit" class="alert alert-danger" role="alert">
				<strong>Oops!</strong> You have to fill in two conditions before continuing!
			</div>
			<div id="selectBarMessage" class="alert alert-danger" role="alert">
				<strong>Oops!</strong> This study cannot be used for the differentially expression analysis since it contains one condition.
			</div>
			<div id="NoDEGMessage" class="alert alert-danger" role="alert">
						<strong>Oops!</strong> No significant differentially expressed genes where found.<br/>Please try again.
			</div>

			
				<div id="analysis_info">
					<strong>Quantitative Expression (QE)</strong> analysis can be used to determine which genes are expressed in particular cell type and to what degree. <br/>
					<strong>Differential Expression (DE)</strong> analysis can be used to generate gene lists containing differentially expressed genes with the associated log fold changes and multiple testing corrected p-values between two conditions of interest (A vs. B).
				</div>
			
			<div class="computerContent btn-group btn-group-justified">
				<div class="btn-group">
					<button type="button" class="btn btn-default btn-responsive QEbutton">Quantitative Expression Analysis</button>
				</div>
				<div class="btn-group">
					<button type="button" class="btn btn-default btn-responsive DEbutton">Differential Expression Analysis </button>
				</div>
			</div>
			
			<div class="mobileContent btn-group btn-group-justified">
				<div class="btn-group">
					<button type="button" class="btn btn-default btn-responsive QEbutton">QE</button>
				</div>
				<div class="btn-group">
					<button type="button" class="btn btn-default btn-responsive DEbutton">DE</button>
				</div>
			</div>
			
			
			<br/>
			
			<div id="QE_content">
				<div class="col-md-4 col-md-offset-8 input-group pull-right">
					<span class="input-group-btn">
						<button id="searchGeneBarGraph" class="btn btn-default" type="button"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
					</span>
					<input id="geneBarGraph" class="form-control genelist" type="text" placeholder="Search Gene">
				</div>
				<br/>

				<div id="TPMdiv" class="col-md-12">
				</div>
				<div class="col-md-12 text-center">
					<button type="button" id="DownloadTPMGraph" class="btn btn-primary"><span class="glyphicon glyphicon-save-file" aria-hidden="true"></span> Download TPM graph</button>
				</div>
			</div>
			
			<div id="selectBar" class="DE">
				<select id="selectConditions" class="DE" multiple="multiple"></select><br/>
				<div class="col-md-12 text-center DE">
					<button type="button" class="btn btn-default col-md-6 col-md-offset-3 DE" id="submitDEbutton">Perform DE analysis</button>
				</div>
			</div>
			<br/>
			<br/>
            <div class="loader" style="display:none;"></div>
			<div id="DEcollection" class="row DE">
				<div id="scatterplot" class="col-md-7 DE"></div>
				<div id="DETableContent" class="col-md-5 DE">
					<div id="searchBar_DE" class="input-group DE">				
						<input id="DEsearch" class="form-control" type="text" placeholder="Search gene..." />
					</div>
					<br/>
					<br/>
					<div id="DETable" class="col-md-12 table-scroll"></div>
				</div>
				<br/>
				<div class="col-md-12 text-center row">
					<button type="button" id="DownloadScatterplot" class="btn btn-primary"><span class="glyphicon glyphicon-save-file" aria-hidden="true"></span>Download Scatterplot</button>
				</div>
			</div>
		</div>
	</div>
	<#--<div id="container2"></div>-->

	<#include "resource-macros.ftl">
	<button type="button" class="btn btn-primary btn-block disabled" id="SingleCell" data-toggle="collapse" data-target="#singleCellCollapse" aria-expanded="false" aria-controls="singleCellCollapse">Single Cell RNA Sequencing</button>
    <div id="singleCellCollapse">
        	<div id="app"></div>
	</div>

    <script>
         $("#SingleCell").on("click", function () {
             $("#singleCellCollapse").collapse('show');
             if (document.getElementById("tSNEplot")) {
                 document.getElementById("tSNEplot").innerHTML = "";
		 	}
             $("#tSNEplot").show();
             $("#searchGenetSne").show();
             $("#searchGeneInput").show();
             var GEODName = GEODOnPage[0];
             if (GEODName !== '') {
                 window.__INITIAL_STATE__ = GEODName.replace(/-/g,'');
             }
             if (appLoaded) {
                 removejscssfile("/js/singlecell/app.js", "js");
                 removejscssfile("/js/singlecell/vendor.js", "js");
                 removejscssfile("/js/singlecell/manifest.js", "js");
                 reloadAgain = true
             } else {
                 loadVue();
             }

             if (reloadAgain) {
                 loadVue();
                 reloadAgain = false;
             }

         });
         var appLoaded = false;
         var reloadAgain = false;
         $(document).ready(function () {
         });

         function loadVue() {
             $.getScript("/js/singlecell/manifest.js", function (data, textStatus, jqxhr) {
                 $.getScript("/js/singlecell/vendor.js", function (data, textStatus, jqxhr) {
                     $.getScript("/js/singlecell/app.js", function (data, textStatus, jqxhr) {
                         appLoaded = true;
                     });
                 });
             });
         }

         function removejscssfile(filename, filetype){
             var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"; //determine element type to create nodelist from
             var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"; //determine corresponding attribute to test for
             var allsuspects=document.getElementsByTagName(targetelement);
             for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
                 if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
                     allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
             }
         }

	 </script>
	<button type="button" id="returnAccordion" class="btn btn-default btn-block returnButton"><span id="leftArrow" class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>
</div>