<#include "molgenis-header.ftl">
<#include "molgenis-footer.ftl">

<#assign css=["brainsat.css",  "scatterD3.css", "jquery-ui.css", "QE_Bargraph.css", "typeahead.css"]>
<#assign js=["brainsatmanager.js", "brainsatPublicationPart.js", "brainsatScatterPlot.js", "brainsatBarGraph.js", "brainsatFunctions.js", "plotly-latest.min.js", "jquery-ui.js", "sorttable.js", "html2canvas.js","html2canvas.svg.js"]>

<@header css js/>
<div class="container">
	<#--<img id="goadImage" src="/img/testLogoGOAD.png" alt="" width="20%" height="20%" />-->
	<#--<a href="http://www.umcg.nl/NL/Zorg/paginas/Default.aspx">-->
		<#--<img id="umcgImage" src="https://www.umcg.nl/width/204/height/112/imageMaxWidth/204/imageMaxHeight/112/imageVAlign/mid/imageHAlign/mid/image/L19sYXlvdXRzLzE1L1VtY2dQb3J0YWwvaW1hZ2VzL2xvZ29fdW1jZy5wbmc=/Canvas.ashx" alt="" width="20%" height="20%" />-->
	<#--</a>-->
	<div class="btn-group btn-group-justified">
		<div id="homeButton" class="btn-group returnButton"><button class="btn btn-primary" type="button"><span class="glyphicon glyphicon-home" aria-hidden="true"></span></button></div>
        <div id="informationButton" class="btn-group"><button class="btn btn-primary" type="button"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></button></div>
        <div id="contactButton" class="btn-group"><button class="btn btn-primary" type="button"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></div>
        <div id="divEmptyButton" class="btn-group"><button class="btn btn-primary disabled" type="button">&nbsp;</button></div>
	</div>	<div class="well">
        <h2>Welcome to the <span style="text-decoration: underline;"><b>bra</b></span>in <span style="text-decoration: underline;"><b>in</b></span>teractive <span style="text-decoration: underline;"><b>s</b></span>equencing <span style="text-decoration: underline;"><b>a</b></span>nalysis <span style="text-decoration: underline;"><b>t</b></span>ool (BRAIN-sat)</h2>        <img id="goadImage" src="/img/logoBRAINSAT2.png" alt="" width="25%" height="25%" />
        BRAIN-sat is an interactive online platform that contains preprocessed data to enables analyses of public available studies. <br/>
        This preprocessing enables the interactive analyses as searching for genes, quantitative and differentially expression analysis. <br/>
		For more information about the features of BRAIN-sat, click<button id="tutorialButton" data-toggle="modal" data-target="#tutorialModal"><u>here</u></button>for the tutorial. <br/>
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
                    <button id="refreshPublications" class="btn btn-default" type="button"><span class="glyphicon glyphicon-refresh"></span></button>
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
			<div id="geneInformation"></div> 
			<#--<div id='dashboard'></div>-->
			<button type="button" id="returnTPM" class="btn btn-default btn-block returnButton"><span id="leftArrow" class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>
		</div>
	</div>
	
	<div class="panel panel-default">
		<div class="panel-footer">Copyright &copy; 2017 M.L. Dubbelaar, M.L. Brummer, D. Hendriksen, M. Meijer, M. de Haan, I.R. Holtman, M.A. Swertz, B.J.L. Eggen, H.W.G.M. Boddeke</div>
	</div>
</div>
<@footer/>