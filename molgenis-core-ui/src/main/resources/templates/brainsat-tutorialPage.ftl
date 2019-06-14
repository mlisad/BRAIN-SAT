<div class="modal fade" tabindex="-1" role="dialog" id="tutorialModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close closeModal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Tutorial</h4>
      </div>
      <div class="modal-body">
		<p>
			The Brain interactive sequencing analysis tool (BRAIN-sat) is a comprehensive web-based tool to access and analyze neuronal transcriptome data. <br/>
			The tool has several features that can be accessed by using the drop-down menu:
			<ul>
				<li>Differential gene expression (DE) analysis</li>
				<li>Quantitative gene expression (QE) analysis</li>
				<li>Single cell RNA sequencing (scRNA) analysis</li>
			</ul>
			<br/>
			<div class="btn-group btn-group-justified computerContent">
				<div class="btn-group"><button class="btn btn-default tutorialDEinfo" type="button" data-toggle="collapse" data-target="#DEanalysis" aria-expanded="false">Differential gene expression analysis</button></div>
				<div class="btn-group"><button class="btn btn-default tutorialQEinfo" type="button" data-toggle="collapse" data-target="#QEanalysis" aria-expanded="false">Quantitative gene expression analysis</button></div>
				<div class="btn-group"><button class="btn btn-default tutorialscRNAinfo" type="button" data-toggle="collapse" data-target="#SCRNAanalysis" aria-expanded="false">Single cell RNA sequencing analysis</button></div>
			</div>

			<div class="btn-group btn-group-justified mobileContent">
				<div class="btn-group"><button class="btn btn-default tutorialDEinfo" type="button" data-toggle="collapse" data-target="#DEanalysis" aria-expanded="false">DE</button></div>
				<div class="btn-group"><button class="btn btn-default tutorialQEinfo" type="button" data-toggle="collapse" data-target="#QEanalysis" aria-expanded="false">QE</button></div>
				<div class="btn-group"><button class="btn btn-default tutorialscRNAinfo" type="button" data-toggle="collapse" data-target="#SCRNAanalysis" aria-expanded="false">scRNA</button></div>
			</div>
		  <hr>
			<div class="collapse" id="DEanalysis">
			  <div class="well">
			  	The Differential Expression (DE) analysis can be used to generate gene lists differentially expressed genes with the associated log fold changes and multiple testing corrected p-values between two conditions of interest (A vs. B). <br/>
				<br/>
			  	After performing the DE analysis, an interactive volcano scatterplot will be generated displaying the most significant genes.
			  	The volcano scatterplot can be used to search a specific gene with the use of a zoom.
			  	Information as the LogFC and -log(FDR) values can be seen with the use of a hover function.<br/>
			  	<br/>
			  	The table next to the scatterplot shows all the significant genes (FDR 0.05).
			  	The columns: Gene symbol, LogFC and -log10(FDR) can be found within this table.
			  	Genes of interest can be found with the use of the search bar at the top of the table.<br/>
			  	<br/>
			  	The DE analysis is done with R, using a pairwise comparison with edgeR.
			  	The raw dataset is filtered for genes with a count per million (CPM) >= 2 for each row.
			  	<br/>
			  </div>
			</div>
			<div class="collapse" id="QEanalysis">
			  <div class="well">
			  	The Quantitative Expression (QE) analysis can be used to determine which genes are expressed in particular neuronal  cell type and to what degree.
			  	A table is obtained showing the gene symbols on the left side and the detected cell types on the right of the gene symbol.
			  	The TPM values of the given gene in a given cell type is shown.<br/>
			  	<br/>
			  	Transcripts Per Million (TPM) values are used to quantify gene expression in RNA sequencing data.
			  	TPM is a modification of RPKM, respecting average invariance and elimination statistical biases from the RPKM measure.
			  	The difference with TPM and RPKM/FPKM is that the normalization of the gene length is done first and normalization of the sequencing depth is done second.
			  	Leading to the same number when all of the TPMs are added in each sample, which makes it easier to compare the samples.<br/>
			  	<br/>
				<strong>Calculation: TPM = (normalized transcripts (RPKM|FPKM) / sum of normalized transcript) * 10^6. </strong><br/>
			  	<br/>
			  	A bar graph is shown when clicking on a gene of interest, showing the TPM value of that gene within all known neuronal cell types.
			  </div>
			</div>

          <div class="collapse" id="SCRNAanalysis">
              <div class="well">
                  The dashboard created for the single cell RNA sequencing dataset consists of 3 different visualizations. <br/>
                  <br/>
                  The first visualization (and only one in the beginning) is the interactive tSNE, that enables hovering over the data to obtain more information.
				  Several colors are added to the tSNE to distinguish the different clusters. <br/>
                  <br/>
				  The second (boxplot) and third (piecard) visualizations are exclusively available when a gene is searched.
				  The different abundant gene expression levels (CPM) are visualized with the use of the boxplot.
				  On the x-axis the different clusters are shown and the CPM expression level is shown on the y-axis. <br/>
				  <br/>
				  The piechard describes how the overall distribution of the gene of interest in different clusters.
				  The combination of the boxplot and the piechard help explain the average and outliers of the gene in the clusters.
              </div>
          </div>
		</p>
      </div>
    </div>
  </div>
</div>