<div id="publicationPart" xmlns="http://www.w3.org/1999/html">
	<div id="informationStudy"></div>
	<button type="button" class="btn btn-primary btn-block disabled" id="RnaSeq" data-toggle="collapse" data-target="#rnaSeqCollapse" aria-expanded="false" aria-controls="rnaSeqCollapse">RNA Sequencing</button>
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
					<button type="button" class="btn btn-default btn-responsive QEbutton"> Quantitative Expression Analysis </button>
				</div>
                <div class="btn-group">
					<button type="button" class="btn btn-default btn-responsive DEbutton"> Differential Expression Analysis </button>
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
                <div class="tooltip pull-right">
                    <span id="QEHelp" class="tooltipSearch glyphicon glyphicon-info-sign"> </span>
                    <span class="tooltiptext rightSideHelp">
                    <div class="row">
                        <div class="col-md-6"><h2>Example:</h2>
                            <hr>
                            <img src="/img/QE_analysis_example.png" width="100%" class="center-block"/>
                        </div>
                        <div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">
                            <h2>Explanation:</h2>
								<hr>
								A bar plot is used to visualize the quantitative expression (QE) analysis.
								The abundance of the different conditions (x-axis) are calculated to TPM values and the TPM values are represented on the y-axis.
								(1) Each of the bar plots is indicated with an error bar based on the sample with the lowest and the TPM value in the condition.
								(2) Is the bar plot of the condition, the colors of the bar are based on the percentile group.
								A percentiles are calculated based on the distribution of the abundance for each condition. <br>
								<br>
								<img src="/img/colorscale.png" width="50%" class="center-block"/><br>
								<br>
								These percentile groups consists of 13 divisions (see color bar), from not (significantly) expressed (grey) until very high expressed, 0-5 percentile (red).
								This information is given when hovering over the bar plot (3).
								(4) To save the bar plot, click this image.
                        </div>
                    </div>
                </span>
                </div>

                <div id="TPMdiv" class="col-md-12 row">
					<div id="geneName" class="col-md-8"></div>
                    <div class="col-md-4 input-group pull-right">
					<span class="input-group-btn">
						<button id="searchGeneBarGraph" class="btn btn-default" type="button"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
					</span>
                        <input id="geneBarGraph" class="form-control genelist" type="text" placeholder="Search Gene">
                    </div>

                    <br>
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
            <div class="tooltip col-md-7">
                <span id="DEHelp" class="tooltipSearch glyphicon glyphicon-info-sign pull-right"> </span>
                <span class="tooltiptext">
                    <div class="row">
                        <div class="col-md-6"><h2>Example:</h2>
                            <hr>
                            <img src="/img/DE_analysis_example.png" width="100%" class="center-block"/>
                        </div>
                        <div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">
                            <h2>Explanation:</h2>
                            <hr>
								The differential expression (DE) analysis is visualized with a volcano plot.
								The x-axis represents the logFC and the y-axis consist of the -log10(FDR).
								The title of plot (1) indicates which conditions are compared.
								In the example figure, astrocytes and neurons are compared.
								Genes that are more highly expressed in the Neurons are in the  right side of the volcano plot (3) and the left side (2) consist of genes that are more highly expressed in the astrocytes.
								More information is provided when you hover over the dots(4), consisting of the precise logFC, -log10(FDR) and the gene symbol.
								For download purposes the following button can be used (5).
                        </div>
                    </div>
                </span>
            </div>

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
			</div>
		</div>
	</div>

	<#include "resource-macros.ftl">

    <button type="button" class="btn btn-primary btn-block disabled" id="SingleCell" data-toggle="collapse" data-target="#singleCellCollapse" aria-expanded="false" aria-controls="singleCellCollapse"> Single Cell RNA Sequencing </button>

<#-- Figure explanation -->
    <#--<div id="scModalDiv" class="pull-right" data-toggle="modalSC" data-target="#scModal">-->
        <#--<span class="glyphicon glyphicon-info-sign"></span>-->
    <#--</div>-->
    <#--<div class="modal fade" id="scModal" tabindex="-1" role="dialog" aria-labelledby="scModalLabel" aria-hidden="true">-->
        <#--<div class="modal-dialog" role="document">-->
            <#--<div class="modal-content">-->
                <#--<div class="modal-header">-->
                    <#--<button type="button" class="close closeModal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
                    <#--<h4 class="modal-title">Explanation single cell figures</h4>-->
                <#--</div>-->

                <#--<div class="modal-body">-->
                    <#--<div class="btn-group btn-group-justified">-->
                        <#--<div class="btn-group"><button class="btn btn-default tsneExplanation" type="button" data-toggle="collapse" data-target="#tsneSC" aria-expanded="false">TSNE</button></div>-->
                        <#--<div class="btn-group"><button class="btn btn-default boxplotExplanation" type="button" data-toggle="collapse" data-target="#boxplotSC" aria-expanded="false">Box plot</button></div>-->
                        <#--<div class="btn-group"><button class="btn btn-default piechardExplanation" type="button" data-toggle="collapse" data-target="#piechardCS" aria-expanded="false">Pie chard</button></div>-->
                    <#--</div>-->

                    <#--<hr>-->

                    <#--<div class="collapse" id="tsneSC">-->
                        <#--<h4>tSNE example:</h4>-->
                        <#--<div class="row">-->
                            <#--<div class="col-md-6">-->
                                <#--<img src="/img/scRNA_analysis_example_tsne.png" width="80%" class="center-block">-->
                            <#--</div>-->
                            <#--<div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">-->
                                <#--The t-sne consists of several elements that might be useful for your analysis.-->
                                <#--Initially the only variation is based on the different conditions (see legend).-->
                                <#--The transparency of the samples is changed (1) when a gene is searched in the data.-->
                                <#--A solid dot represents in percentages the highest value and a 'see through' dot means that the gene abundance (CPM) is a low value (or even 0).-->
                                <#--Hovering over the dots enables a label that shows the sample name and conditions it was found (2).-->
                                <#--The t-sne can be downloaded when you click on the camera (3).-->
                            <#--</div>-->
                        <#--</div>-->
                    <#--</div>-->

                    <#--<div class="collapse" id="boxplotSC">-->
                        <#--<h4>Box plot example:</h4>-->
                        <#--<div class="row">-->
                            <#--<div class="col-md-6">-->
                                <#--<img src="/img/scRNA_analysis_example_boxplot.png" width="60%" class="center-block">-->
                            <#--</div>-->
                            <#--<div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">-->
                                <#--The box plot provides additional information about the gene expression abundancy.-->
                                <#--The variation is based on the CPM values that are provided, each condition is equal to the condition of the tSNE.-->
                                <#--Variation that cannot be captured (1) by the box or whiskers represent the outliers.-->
                                <#--The median, interquartile range, outside of the whiskers and the maximum and minimum values can be obtained by hovering over the boxplot (2).-->
                                <#--This visualization will be downloaded after you press on the camera (3).-->
                            <#--</div>-->
                        <#--</div>-->

                    <#--</div>-->

                    <#--<div class="collapse" id="piechardCS">-->
                        <#--<h4>Pie chard example:</h4>-->
                        <#--<div class="row">-->
                            <#--<div class="col-md-6">-->
                                <#--<img src="/img/scRNA_analysis_example_piechard.png" width="60%" class="center-block">-->
                            <#--</div>-->
                            <#--<div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">-->
                                <#--The pie card is the figure that explains the distribution of all variance.-->
                                <#--Explaining which condition has the most expression of a gene.-->
                                <#--Each of the conditions is draw in the pie chard (1), including the percentage (2).-->
                                <#--This percentage is calculated by dividing the CPM of the samples in one condition by the CPM value of all samples.-->
                                <#--Hovering over a condition enables a label (3).-->
                                <#--By clicking on the following button, this image can be downloaded (4).-->
                            <#--</div>-->
                        <#--</div>-->
                    <#--</div>-->
                <#--</div>-->
            <#--</div>-->
        <#--</div>-->
    <#--</div>-->
    <div id="singleCellCollapse">
        <div id="scModalDiv" class="pull-right" data-toggle="modalSC" data-target="#scModal">
            <span class="glyphicon glyphicon-info-sign"></span>
        </div>
        <div class="modal fade" id="scModal" tabindex="-1" role="dialog" aria-labelledby="scModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close closeModal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Explanation single cell figures</h4>
                    </div>

                    <div class="modal-body">
                        <div class="btn-group btn-group-justified">
                            <div class="btn-group"><button class="btn btn-default tsneExplanation" type="button" data-toggle="collapse" data-target="#tsneSC" aria-expanded="false">TSNE</button></div>
                            <div class="btn-group"><button class="btn btn-default boxplotExplanation" type="button" data-toggle="collapse" data-target="#boxplotSC" aria-expanded="false">Box plot</button></div>
                            <div class="btn-group"><button class="btn btn-default piechardExplanation" type="button" data-toggle="collapse" data-target="#piechardCS" aria-expanded="false">Pie chard</button></div>
                        </div>

                        <hr>

                        <div class="collapse" id="tsneSC">
                            <h4>tSNE example:</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="/img/scRNA_analysis_example_tsne.png" width="80%" class="center-block">
                                </div>
                                <div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">
                                    The t-sne consists of several elements that might be useful for your analysis.
                                    Initially the only variation is based on the different conditions (see legend).
                                    The transparency of the samples is changed (1) when a gene is searched in the data.
                                    A solid dot represents in percentages the highest value and a 'see through' dot means that the gene abundance (CPM) is a low value (or even 0).
                                    Hovering over the dots enables a label that shows the sample name and conditions it was found (2).
                                    The t-sne can be downloaded when you click on the camera (3).
                                </div>
                            </div>
                        </div>

                        <div class="collapse" id="boxplotSC">
                            <h4>Box plot example:</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="/img/scRNA_analysis_example_boxplot.png" width="60%" class="center-block">
                                </div>
                                <div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">
                                    The box plot provides additional information about the gene expression abundancy.
                                    The variation is based on the CPM values that are provided, each condition is equal to the condition of the tSNE.
                                    Variation that cannot be captured (1) by the box or whiskers represent the outliers.
                                    The median, interquartile range, outside of the whiskers and the maximum and minimum values can be obtained by hovering over the boxplot (2).
                                    This visualization will be downloaded after you press on the camera (3).
                                </div>
                            </div>

                        </div>

                        <div class="collapse" id="piechardCS">
                            <h4>Pie chard example:</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="/img/scRNA_analysis_example_piechard.png" width="60%" class="center-block">
                                </div>
                                <div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">
                                    The pie card is the figure that explains the distribution of all variance.
                                    Explaining which condition has the most expression of a gene.
                                    Each of the conditions is draw in the pie chard (1), including the percentage (2).
                                    This percentage is calculated by dividing the CPM of the samples in one condition by the CPM value of all samples.
                                    Hovering over a condition enables a label (3).
                                    By clicking on the following button, this image can be downloaded (4).
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="app"></div>
	</div>
	<button type="button" id="returnAccordion" class="btn btn-default btn-block returnButton"><span id="leftArrow" class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>
<#--</div>-->
</div>