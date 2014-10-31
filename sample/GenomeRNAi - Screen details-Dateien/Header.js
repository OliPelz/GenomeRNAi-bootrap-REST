jQuery(document).ready(function()
{

//this method gets current page and sets up the corresponding menu highlight
//get current url

    var referrer =  document.referrer;
    var pathName = window.location.href;
    var lastPath = "";
    if(/GenomeRNAi\/.+\//i.test(pathName)) {
        lastPath = /GenomeRNAi\/(.*)\//i.exec(pathName)[1];
    }
    var siteName = pathName.substring(pathName.lastIndexOf('/') + 1);
    if(/^GenomeRNAi$/i.test(siteName)) {  //if we requested the URL http://genomernai.dkfz.de/GenomeRNAi
    	siteName = "";
    }

    if(siteName.toLowerCase()=="siteindex") {
        //remove from everything
        var li = jQuery("#header #menu li").removeClass("selected");
        jQuery("#header #menu #siteindex_li").addClass("selected");
    }
    else if(siteName.toLowerCase()=="browseall") {
        var li = jQuery("#header #menu li").removeClass("selected");
        jQuery("#header #menu #browse_li").addClass("selected");
    }
    else if(siteName.toLowerCase()=="about") {
        var li = jQuery("#header #menu li").removeClass("selected");
        jQuery("#header #menu #about_li").addClass("selected");
    }
    else if(siteName.toLowerCase()=="downloadallexperimentsform") {
        var li = jQuery("#header #menu li").removeClass("selected");
        jQuery("#header #menu #download_li").addClass("selected");
    }
    else if(siteName.toLowerCase()=="otherresources") {
        var li = jQuery("#header #menu li").removeClass("selected");
        jQuery("#header #menu #otherresources_li").addClass("selected");
    }
    else if(siteName.toLowerCase()=="submission") {
        var li = jQuery("#header #menu li").removeClass("selected");
        jQuery("#header #menu #myspace_li").addClass("selected");
    }    
    //this is the index page
     else if(siteName.toLowerCase()=="" || siteName.toLowerCase()=="index"  ) {
        var li = jQuery("#header #menu li");
        li.removeClass("selected");
        var home = jQuery("#header #menu #home_li");
        home.addClass("selected");
    }   //if we are coming from home and heading to genedetails, reagentdetails or phenotype search
        //highlight the home button        
    /*else if(lastPath.toLowerCase()=="genedetails" || lastPath.toLowerCase()== "reagentdetails" || lastPath.toLowerCase()=="index.thesubmit3" )
                             {    //if we are on genedetails page show home button ...because we must have come from this page
        var li = jQuery("#header #menu li").removeClass("selected");
        jQuery("#header #menu #home_li").addClass("selected");                
    }*/
    else {  //we have the help page when nothing else is highlighted...because this is an external page
            //todo: if there will be any additional external links in the head this mechanism will no longer work
            //var li = jQuery("#header #menu li").removeClass("selected");
            //jQuery("#header #menu #help_li").addClass("selected");
    }

});


