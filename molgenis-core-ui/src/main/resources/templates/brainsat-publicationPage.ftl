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
                            A bar plot is used to visualize quantitative expression (QE) analysis.
                            The gene expression levels (abundance) in different conditions (x-axis) are depicted as TPM values (y-axis).
                            (1) The error bars indicate the lowest and the highest TPM value.
                            (2) The color of the bars reflect expression levels, color coding is based on percentiles.
                            <br>
                            <img src="/img/colorscale.png" width="50%" class="center-block"/><br>
                            <br>
                            These 13 percentile groups distribute gene expression levels from very low (grey) to very high expressed, 0-5 percentile (red).
                            The percentiles are also shown when hovering over a bar (3).
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
                            Differential expression (DE) analysis is visualized in volcano plots.
                            The x-axis represents logFC and the y-axis depicts -log10(FDR).
                            The title of the plot (1) indicates which conditions are compared.
                            In this particular plot, genes that are higher expressed in the neurons are located to the right side of the 0 on the x-axis (3) and dots left of the x-axis 0 are genes that are more abundantly expressed in astrocytes (2).
                            More information about the dot can be obtained by hovering over a dot (4), providing the precise logFC, -log10(FDR) and the gene symbol that the dot represents.
                            For download purposes, the following button can be used (5).
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
                            <div class="btn-group"><button class="btn btn-default tsneExplanation" type="button" data-toggle="collapse" data-target="#tsneSC" aria-expanded="false">tSNE</button></div>
                            <div class="btn-group"><button class="btn btn-default boxplotExplanation" type="button" data-toggle="collapse" data-target="#boxplotSC" aria-expanded="false">Box plot</button></div>
                            <div class="btn-group"><button class="btn btn-default piechartExplanation" type="button" data-toggle="collapse" data-target="#piechartCS" aria-expanded="false">Pie chart</button></div>
                        </div>

                        <hr>

                        <div class="collapse" id="tsneSC">
                            <h4>tSNE example:</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="/img/scRNA_analysis_example_tsne.png" width="80%" class="center-block">
                                </div>
                                <div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">
                                    The tSNE consists of several elements, initially variation is based on the different conditions (see legend).
                                    The transparency of the dot is changed (1) when a gene is searched in the data.
                                    A solid dot represents in percentages the highest value and a 'transparent' dot means that the gene expression level (CPM) is a low value (or even 0).
                                    Hovering over the dots reveals a label that shows the sample name and conditions in which it was found (2).
                                    The tSNE can be downloaded when you click on the camera (3).
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
                                    The box plot provides additional information about the gene expression level.
                                    The variation is based on the CPM values that are provided, each condition is equal to the condition of the tSNE.
                                    Variation that cannot be captured (1) by the box or whiskers represent the outliers.
                                    The median, interquartile range, outside of the whiskers and the maximum and minimum values can be obtained by hovering over the box plot (2).
                                    This visualization will be downloaded after you click on the camera (3).
                                </div>
                            </div>

                        </div>

                        <div class="collapse" id="piechartCS">
                            <h4>Pie chart example:</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="/img/scRNA_analysis_example_piechart.png" width="60%" class="center-block">
                                </div>
                                <div class="col-md-6" style="padding-right:20px; border-right: 1px solid #ccc;">
                                    The pie chart is the figure that explains the distribution of all variance, explaining in which condition a gene is most abundantly expressed.
                                    Each of the conditions is drawn in the pie chart (1), including the percentage (2).
                                    This percentage is calculated by dividing the CPM of the samples in one condition by the CPM value of all samples.
                                    Hovering over a condition reveals a label (3).
                                    By clicking on the camera button, this image can be downloaded (4).
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
</div>