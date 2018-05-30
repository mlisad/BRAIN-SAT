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