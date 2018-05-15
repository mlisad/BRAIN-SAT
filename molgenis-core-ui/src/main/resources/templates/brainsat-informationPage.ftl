<div id="materialInfo">
	<div class="well">
		<h4>Data Processing</h4>

		The compute 5 pipeline from <a href="http://www.molgenis.org/wiki/ComputeStart">MOLGENIS</a> was used to process the data.
        This pipeline contains several other features that were used to obtain results for BRAIN-sat.
		Aligning was done with <a href="https://ccb.jhu.edu/software/hisat2/index.shtml">HISAT2</a>.
		<a href="http://www.bioinformatics.babraham.ac.uk/index.html">FASTQC</a> was used to perform a quality check on obtained datasets.
		Several preprocessing steps were performed with <a href="http://broadinstitute.github.io/picard/">Picard</a> and <a href="http://samtools.sourceforge.net/">Samtools</a>.
		<a href="https://pypi.python.org/pypi/HTSeq">HTSeq</a> was used to obtain the counts for the datasets.
		<br/>
		<br/>
        <h4>Analyses</h4>
		The interactive analyses are done with R. The filtering of low expression genes is done with the use of <a href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-15-92">DAFS: a data-adaptive flag method</a>.
		<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2796818/">EdgeR</a> is used to generate the differential gene expression lists and to obtain the quantitative gene information, and <a href="https://cran.r-project.org/web/packages/scatterD3/vignettes/introduction.html">scatterD3</a> was used to create the interactive QE bargraphs.
		<br/>
		<br/>

        <h4>Visualization BRAIN-sat</h4>
		The set-up of <a href="https://github.com/molgenis/molgenis">MOLGENIS</a> and several javascript packages where used in order to develop BRAIN-sat.
		The sorting of the table content was done with the use of <a href="https://www.kryogenix.org/code/browser/sorttable/">sorttable</a>.
		<a href="https://d3js.org/">D3js</a> was used in order to develop the interactive images of the QE data and the implementation of <a href="https://html2canvas.hertzen.com/">html2canvas</a> and <a href="https://github.com/MrRio/jsPDF">jsPDF</a> make sure that these images can be downloaded. <br/>
		<a href="https://plot.ly/javascript/">Plotly</a> was used to generate the interactive images of the single cell data and the differential expression vulcano scatterplot of the bulk RNA data.
		<br/>
		<br/>
		<h4>Datasets</h4>
        <table>
            <colgroup>
                <col width="25%">
                <col width="10%">
                <col width="10%">
            </colgroup>
            <tr>
                <td>Chiu et al. (2013)</td>
                <td><a href="https://www.ncbi.nlm.nih.gov/pubmed/23850290" target="_blank">Pubmed</a></td>
                <td><a href="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE43366" target="_blank">Data</a></td>
            </tr>
            <tr>
                <td>Phatnani et al. (2013)</td>
                <td><a href="https://www.ncbi.nlm.nih.gov/pubmed/23388633" target="_blank">Pubmed</a></td>
                <td><a href="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE43879" target="_blank">Data</a></td>
            </tr>
            <tr>
                <td>Zhang et al. (2014)</td>
                <td><a href="https://www.ncbi.nlm.nih.gov/pubmed/25186741" target="_blank">Pubmed</a></td>
                <td><a href="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE52564" target="_blank">Data</a></td>
            </tr>
		<#--<ul>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-68376/" target="_blank">Bruttger et al. (2015)</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-52946/" target="_blank">Butovsky et al. (2014)</a></li>-->
			<#--<li>Chiu et al. (2013) <a href="https://www.ncbi.nlm.nih.gov/pubmed/23850290" target="_blank">Pubmed</a> <a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-43366/" target="_blank">Data</a></li>-->
			<!--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-66211/" target="_blank">Cronk et al. (2013)</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-54443/" target="_blank">Crotti et al. (2014)</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-75889/" target="_blank">de Melo et al. (2015)</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-76130/" target="_blank">Jackson et al. (2016)</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-66217/" target="_blank">Johnson et al. (2015)</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-59725/" target="_blank">Lewis et al. (2014)</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-42880/" target="_blank">Mellén et al. (2013)</a></li>-->
			<#--<li>Phatnani et al. (2013) <a href="https://www.ncbi.nlm.nih.gov/pubmed/23388633" target="_blank">Pubmed</a> <a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-43879/" target="_blank">Data</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-62641/" target="_blank">Salinas-Riester et al. (2015)</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-53789/" target="_blank">Solga et al. (2015)</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-74724/" target="_blank">Sun et al. (2015)</a></li>-->
			<#--<li><a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-MTAB-1030/" target="_blank">Wu et al. (2012)</a></li>-->
			<#--<li>Zhang et al. (2014) <a href="http://www.ncbi.nlm.nih.gov/pubmed/25186741" target="_blank">Pubmed</a> <a href="http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-52564/" target="_blank">Data</a></li>-->
		<#--</ul>-->
		</table>
        <hr>
        <h4>Citation</h4>
		<ul>
			<li>Holtman et al. (2015). Glia Open Access Database (GOAD): A comprehensive gene expression encyclopedia of glia cells in health and disease. <br/>
                Glia 63:1495–1506 doi: 10.1002/glia.22810 <a href="https://onlinelibrary.wiley.com/doi/abs/10.1002/glia.22810" target="_blank">Pubmed</a>
            </li>

		</ul>
        <br>
        <h4>Acknowledgements</h4>
        We would like to thank the following people for the contribution of BRAIN-SAT: <br/>
        For supervising students from the Hanzehogeschool, we would like to thank M.A. Noback and R. Wedema. <br/>
        S. N. Dubbelaar for the creation of the BRAIN-SAT logo.
	</div>
</div>