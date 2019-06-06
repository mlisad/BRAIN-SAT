<#include "molgenis-header.ftl">
<#include "molgenis-footer.ftl">

<#assign css=["brainsat.css", "jquery-ui.css", "typeahead.css"]>
<#assign js=["brainsatmanager.js", "brainsatPublicationPart.js", "brainsatScatterPlot.js", "brainsatBarGraph.js", "brainsatDotPlot.js", "brainsatFunctions.js", "plotly-latest.min.js", "jquery-ui.js", "sorttable.js"]>

<@header css js/>
<div class="container">
	<div class="btn-group btn-group-justified">
		<div id="homeButton" class="btn-group returnButton"><button class="btn btn-primary" type="button"><span class="glyphicon glyphicon-home" aria-hidden="true"></span></button></div>
        <div id="tutorialButtonDiv" class="btn-group"><button id="tutorialButton" class="btn btn-primary" type="button" data-toggle="modal" data-target="#tutorialModal"><span class="glyphicon glyphicon-education" aria-hidden="true"></span></button></div>
        <div id="informationButton" class="btn-group"><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#settingsModal"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></button></div>
        <div id="contactButton" class="btn-group"><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#contactModal"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></div>
        <div id="divEmptyButton" class="btn-group"><button class="btn btn-primary disabled" type="button">&nbsp;</button></div>
	</div>
    <div class="well">
        <h2>Welcome to the <span style="text-decoration: underline;"><b>bra</b></span>in <span style="text-decoration: underline;"><b>in</b></span>teractive <span style="text-decoration: underline;"><b>s</b></span>equencing <span style="text-decoration: underline;"><b>a</b></span>nalysis <span style="text-decoration: underline;"><b>t</b></span>ool (BRAIN-sat)</h2>
        <img id="brainSatImage" src="/img/logoBRAINSAT2.png" alt="" width="25%" height="25%" />
        BRAIN-sat is an interactive online platform that contains preprocessed data to enables analyses of public available studies. <br/>
        This pre-processing enables the interactive analyses as searching for genes, quantitative and differentially expression analysis. <br/>
        <br/>
        If you have suggestions or questions regarding BRAIN-sat, please feel free to contact us.
        <br/>
	<#include "brainsat-tutorialPage.ftl">
	</div>

	<div id="accordion" class="panel-group">
		<div class="panel panel-default">
            <div id="headingOne" class="panel-heading">
                <h4 class="panel-title">
                    <a class="collapsed" href="#collapseOne" data-toggle="collapse" data-parent="#accordion">Gene search</a>
                </h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse in">
                <div class="panel-body">
                    <div class="input-group pull-left">
						<span class="input-group-btn ">
					        <button id="geneSearch" class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>
					      </span>
                        <input id="geneText" type="text" class="form-control searchGene ui-autocomplete-input" placeholder="Search for...">
                    </div>
                </div>
            </div>
		</div>
		<div class="panel panel-default">
            <div id="headingTwo" class="panel-heading">
                <h4 class="panel-title">
                    <a href="#collapseTwo" data-toggle="collapse" data-parent="#accordion">Publications</a>
                </h4>
            </div>
            <div id="collapseTwo" class="panel-collapse collapse">
                <div id="StudyInfo" class="panel-body">
                    <#--<button id="refreshPublications" class="btn btn-default" type="button"><span class="glyphicon glyphicon-refresh"></span></button>-->
                    <div class="input-group span3 col-md-3 col-md-push-9"><span class="input-group-addon">Search</span><input id="filter" class="form-control" type="text" placeholder="Type here..." /></div>
                    <p>&nbsp;</p>
                    <div class="table-responsive">
                        <table id="publicationCard" class="table table-striped table-hover table-condensed table-responsive sortable">
                            <thead>
                            <tr><th id="celltype">Celltype</th><th id="region">Region</th><th id="organism">Organism</th><th id="author">Author</th><th id="title">Title</th><th id="year">Year</th></tr>
                            </thead>
                            <tbody id="tableContent" class="searchable"></tbody>
                        </table>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<#include "brainsat-publicationPage.ftl">
	<#include "brainsat-contactPage.ftl">
	<#include "brainsat-informationPage.ftl">
	<div id="genePart">
		<div class="well">
            <div class="tooltip pull-right">
                <span id="SearchHelp" class="tooltipSearch glyphicon glyphicon-info-sign"> </span>
                <span class="tooltiptext rightSideHelp">
                    <div class="row">
                        <div class="col-md-6"><h2>Example:</h2>
                            <hr>
                            <img src="/img/Search_Example.png" width="80%" class="center-block"/>
                        </div>
                        <div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">
                            <h2>Explanation:</h2>
                            <hr>
                            The search visualization is realized with a dot plot.
                            This visualization can be used to compare the gene expression in different cell types.
                            The different cell types are represented on the x-axis and the log2(CPM) values are indicated on the y-axis.
                            (1) The gene that is filled in is shown in the top left corner of the plot.
                            Different data point (2) contain two types of information, the first type of information is given by the color indication which
                            is unique for an author. The second type of information is given by the shape: a mouse data point is indicated by a round dot, human is represented as a square and rat is shown with a rectangular.
                            An information box is opened when you hover over the data points (3). The number given on the first line is the log2(CPM) value of the mean/median* of the samples.
                            The last two lines contain the author name (year) and the region [strain].
                            (4) shows the legend that can be used with the corresponding figure, the identifiers are based on the author (year) and the organism.
                            This image can be saved when the camera image is clicked (5).
                        </div>
                    </div>
                </span>
            </div>
            <div id="genePartSearch" class="input-group pull-left col-md-4 col-md-offset-8">
                <span class="input-group-btn">
                    <button id="geneSearchOnPage" class="btn btn-default" type="button">
                        <span class="glyphicon glyphicon-search"></span>
                    </button>
                </span>
                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>
                <input id="geneTextOnPage" type="text" class="form-control searchGene ui-autocomplete-input" placeholder="Search for..." autocomplete="off">
            </div>
                <div id="geneInformation"></div>
                <div id='geneNameSearch'></div>
                <div id='geneSearchPlot'></div>
              </div>
			<button type="button" id="returnTPM" class="btn btn-default btn-block returnButton"><span id="leftArrow" class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>
		</div>
	</div>
	
	<div class="panel panel-default">
		<div class="panel-footer">Copyright &copy; 2017 M.L. Dubbelaar, M.L. Brummer, D. Hendriksen, M. de Haan, F.D.L. Kelpin, M. Meijer, M.A. Noback, R. Wedema, I.R. Holtman, M.A. Swertz, B.J.L. Eggen, H.W.G.M. Boddeke</div>
    </div>
</div>
<@footer/>