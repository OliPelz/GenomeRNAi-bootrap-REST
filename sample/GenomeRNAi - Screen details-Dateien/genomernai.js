//this is a collection of common used javascript functions for GenomeRNAI



//this method generates a library hoverbox for a 'anchor element' ,
//
// HTML element:
// <a class="callout"  title=""
// href="http://genomernai.de/GenomeRNAi/librarydetails/2">
// Dharmacon
// </a>
//
// than the corresponding  jQuery code would be
//  generateLibraryHoverbox('Dharamacon','Fischer Thermo','v1','bla','123122','rNA','http://thermo.fischer.com','a.callout')

//this function changes the tab from pages  in the left tab design tom davis provided
function changeTab(newName, tabNameID) {


		var newText = jQuery("#content div").find("." + newName);
        var content = jQuery("#content #sub").find("." + newName);

		var currentMenu = jQuery(tabNameID+" #sub li.selected1");   //jQuery("#page #sub li.selected1");
		var currentText = jQuery(tabNameID+" #content #main .selected1");  //jQuery("#page #content #main .selected1");

        //if we clicked on the same as we had do nothing:
           // Test equality
           if( newName.search("selected1$")!=-1 || ( currentMenu.length === content.length && currentMenu.length === currentMenu.filter(content).length) ) {
               // They are equal
               return;
           }


		//deselect currently selected menu item
		//and any currently selected text
		currentMenu.removeClass("selected1");
		currentText.removeClass("selected1");
		currentText.fadeOut(function(){
			newText.fadeIn();
		});
		
		
		
		//select new menu item and text
		content.addClass("selected1");
		newText.addClass("selected1");
    }

function changeTabWithoutFading(newName, tabNameID) {


	var newText = jQuery("#content div").find("." + newName);
    var content = jQuery("#content #sub").find("." + newName);

    var currentMenu = jQuery(tabNameID+" #sub li.selected1");   //jQuery("#page #sub li.selected1");
	var currentText = jQuery(tabNameID+" #content #main .selected1");  //jQuery("#page #content #main .selected1");

    //if we clicked on the same as we had do nothing or
       // Test equality
       if( newName.search("selected1$")!=-1 || (currentMenu.length === content.length && currentMenu.length === currentMenu.filter(content).length )) {
           // They are equal
           return;
       }


	//deselect currently selected menu item
	//and any currently selected text
	currentMenu.removeClass("selected1");
	currentText.removeClass("selected1");
	
	
	currentText.hide();
	newText.show();
	
	//select new menu item and text
	content.addClass("selected1");
	newText.addClass("selected1");
}
/*
 * 
 * 
 * this function creates a text hoverbox for the link which will have the link-text "textToShowInLink"
 * and with the text in the hover-box "textInHoverbox" and the hoverbox will be drawn in the
 * jQuery DOM element called "jQueryElement"
 * 
 */
function generateSimpleHoverbox(textToShowInLink, textInHoverbox, jQueryElement) {
    var link = "<a class='word' href='#' title='" + textInHoverbox + "'> <span class=\"my_tooltip\">" + textToShowInLink + "</span></a>";
    jQuery(jQueryElement).html(link);
    jQuery(jQueryElement).children().hoverbox()
    //disable clicking
    jQuery(jQueryElement).children().click(function() { return false; })
    return link;
}
/*
 * 
 * 
 * this function works as generateSimpleHoverbox() but preprocessed sentence in a way that it splits out the words and shows
 * the first word in textToShowInLink and the rest of the sentence in the textinHoverbox
 * 
 */
function generateSimpleHoverboxForSentence(sentence, jQueryElement) {
	//generate a hoverbox for the comment row if we have more than one word
    var txtArr = sentence.split(" ");
    var anchorText = txtArr[0];
    if(txtArr.length > 1) {
    	var textToShowInBox = txtArr; //.slice(1,txtArr.length).join(" ");
    	if (textToShowInBox.length > 100) {
    		var limiter = "[...]";
    		textToShowInBox.substring(0,
    							 limiter.length);
    		textToShowInBox = textToShowInBox
    				+ limiter;
    	}
    	return generateSimpleHoverbox(
						anchorText+"...",
						textToShowInBox.join(" "),
						jQueryElement);
    }
}

function generateSimpleHoverboxForImageelement(textToShow, jQueryElement) {
    var link = "<a class='word' href='#' title='" + textToShow + "'> <span class=\"my_tooltip\">[..]</span></a>";
    jQuery(jQueryElement).wrap(link);
    jQuery("a.word").hoverbox();
    //disable clicking
    jQuery("a.word").click(function() { return false; })
    return link;
}

 function generateSimpleHoverboxForAnchorElement(jQueryElement) {
    var textToShow = jQuery(jQueryElement).text();
    var link = "<a class='word' href='#' title='" + textToShow + "'> <span class=\"my_tooltip\">[...]</span></a>";
    jQuery(jQueryElement).replaceWith(link);
    jQuery("a.word").hoverbox();
    //disable clicking
    jQuery("a.word").click(function() { return false; })
    return link;
}


function generateLibraryHoverboxForAnchorElement(name,vendor,version,anot,amount,type,url,jQueryElement) {
    var definition = generatelibraryDetails(name,vendor,version,anot,amount,type);
    var link ='';
    if(url != "") {
        link = "<a href='"+url+"' target='_blank'>"+name+"</a>";
    }
    else {
        link = url;
    }

    link = link+"<a class='word' href='#' title='" + definition + "'> <span class=\"my_tooltip\">[details]</span></a>";
    jQuery(jQueryElement).replaceWith(link);
    jQuery("a.word").hoverbox();
    //disable clicking
    jQuery("a.word").click(function() { return false; })
    return link;
}
function generateListHoverboxForPackedString(jQueryElement) {
   var text = jQuery(jQueryElement).text();
   var arr = text.split("\|");
   var sentence = arr.join(", ");
   // sentence+="</br>";
   var link = "<a class='word' href='#' title='" + sentence + "'> <span class=\"my_tooltip\"> [...]</span></a>";
   jQuery(jQueryElement).replaceWith(link);
   jQuery("a.word").hoverbox();
    //disable clicking
   jQuery("a.word").click(function() { return false; })
   return link;
}
function generateHoverboxListForArray(arr) {
   if(arr.length < 1) {
       return "";
   }
   var sentence = arr.join(", ");
   //sentence+="</br>";
   var link = "<a class='word' href='#' title='" + sentence + "'> <span class=\"my_tooltip\"> [...]</span></a>";      
   return link;
}

function generateLibraryHoverboxForPackedString(jQueryElement) {
    var text = jQuery(jQueryElement).text();
    var arr = text.split("\|");
    var definition = generatelibraryDetails(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5]);
    var link ='';
    var url = arr[6];
    if(url != "" && ! /null/i.test(url)) {
        link = "<a href='"+url+"' target='_blank'>"+arr[0]+"</a>";
    }
    else {
        link = arr[0];
    }
    link = link +"<a class='word' href='#' title='" + definition + "'> <span class=\"my_tooltip\"> [details]</span></a>";
    jQuery(jQueryElement).replaceWith(link);
    jQuery("a.word").hoverbox();
    //disable clicking
    jQuery("a.word").click(function() { return false; })
    return link;
}
function generatelibraryDetails(name,vendor,version,anot,amount,type) {
        
        var definition="";
        definition +=    "Provider: "+vendor+"<br/>" ;
        definition +=    "Library: "+name+"<br/>" ;
        definition +=    "Library Version: "+version+"<br/>" ;
        definition +=    "Reference Annotation: "+anot+"<br/>" ;
        definition +=    "Number of Reagents: "+amount+"<br/>" ;
        definition +=    "Type of Reagents: "+type+"<br/>" ;
        
        return definition;
}

//------------------------------------------------------------
//define GLOBAL dictionary (list of words word:definition)
//This will be valid for every jscript which includes this file
var nextRNAiText = "This information is generated by nextRNAi";
var glossary_dictionary = {
        /*
            required fields
                - key (unique one-word ID for word) - only used as index
                - word (decapitalised)
                - definition (careful not to use double staight quotes)
        */

        assay_method: {
            name: "Method",
            definition: "Short description of the method from a technical point of view (readout). See Help."
	    },
        assay: {
            name: "Assay",
            definition: "Short description of the method from a biological point of view. See Help."
        },
        biosource: {
            name: "Biosource",
            definition: "Type of biomodel used in RNAi screen; controlled vocabulary (&apos;Cell line&apos;, &apos;Primary cells&apos;, &apos;Tissue&apos;, &apos;Organism&apos;). See Help."
        },
        conditions: {
            name: "Conditions",
            definition: "Only used when the same assay was done under different conditions. See Help."
        },
        gene_followed_up: {
            name: "Follow Up",
            definition: "Indicates whether any further experimental analysis has been performed with the gene (rather than the reagent). See Help."
        },
        gene_id: {
            name: "Gene ID",
            definition: "Gene identifiers as provided by the authors. Gene IDs separated by &apos;,&apos; indicate that two or more genes have been knocked down. See Help."
        },
        reagent_id: {
            name: "Reagent ID",
            definition: "Reagent IDs separated by &apos;,&apos; indicate that two or more reagents have been used for RNAi. See Help."
        },
        mapped_id: {
            name: "Mapped ID",
            definition: "Entrez IDs, obtained by multi-step mapping of author-provided reagent identifiers, gene identifiers or gene symbols to the Entrez database. See Help."
        },
        phenotype: {
            name: "Phenotype",
            definition: "Description of the actual observation upon knockdown of a gene, rather than an interpretation of the result. See Help."
        },
        score_cutoff: {
            name: "Cutoff",
            definition: "Score threshold or other criteria used by the authors to define hits and separate them from non-hits. See Help."
        },
        score_type: {
            name: "Score Type",
            definition: "Type of score used in the screen for defining hits. See Help."
        },
        score: {
            name: "Score",
            definition: "Score as provided by author, see also score type and cutoff under screen information. Graph displays distribution of all scores provided for this screen. Red line indicates position of score in question. See Help."
	    },
	    browseall_title: {
	    	name: "Title",
            definition: "Sort by publication date."
	    },
        getUniProtIDList: {
            name: "UniProtIDs",
            definition: "Get a list of mapped UniProtIDs as *.txt. If you want to submit the list to string-db.org, copy and paste the UniProtIDs into their `multiple names` text field. NOTE: The number of UniProtIDs may well exceed the number of genes indicated for this phenotype, due to multiple mappings."
        },
        sendToStringDB: {
            name: "StringDB",
            definition: "Send a list of UniProtIDs directly to string-db.org. If the number of IDs exceeds about 400, the transfer becomes unreliable and we suggest to manually extract and submit the list as described under `UniProtIDs`. NOTE: The number of UniProtIDs may well exceed the number of genes indicated for this phenotype, due to multiple mappings." 
        }
    };
//END OF GLOBAL dictionary (list of words word:definition)
//------------------------------------------------------------



function generateGlossaryLink(jQuerySelector) {
    //define where to search

    //search in the header and in the information areas

    var whatToSearch = jQuery(jQuerySelector);
    //    var whatToSearch = jQuery(".expand-child p, div strong");
    var textNodes = jQuery(whatToSearch).contents().filter(function()
    {
        return this.nodeType === 3 && jQuery(this).parent("a").length === 0;
    });

    //iterate through all text nodes replacing the content with the link:
    textNodes.each(function(index, element)
    {
        var contents = jQuery(element).text();

        //iterate through words in dictionary
        for (word in glossary_dictionary)
        {
            var name = glossary_dictionary[word].name;
            var definition = glossary_dictionary[word].definition;

            if ( contents == name) {
                var regex = new RegExp(name,"gi");
                var link = name+"<a class='word' href='#'; title='" + definition + "'> <span class=\"my_tooltip\"> [?]</span></a>";
                contents = contents.replace(regex, link);
                break;	
             }
        }

         //update element with new contents
        jQuery(element).replaceWith(contents);
    });

    //initialise tooltip
    //apply to all links with a class of 'word'
    jQuery("a.word").hoverbox();
    //disable clicking
    jQuery("a.word").click(function() { return false; })
}

function hideDetailsWhenOnlyOnePageDatatables(jQuerySelectorsToHide,fnDrawCallbackObj) {
     var pageCount = Math.ceil((fnDrawCallbackObj.fnSettings().fnRecordsDisplay()) / fnDrawCallbackObj.fnSettings()._iDisplayLength);
     var cssStyle = "block";
     if (pageCount <= 1)  {
        cssStyle = "none";
     }

     var paginationToHide =  jQuery(fnDrawCallbackObj).parent().children().children().filter(jQuerySelectorsToHide);
     jQuery.each(paginationToHide, function(index, value) {
          jQuery(value).css("display",cssStyle);
     });
    //also we will hide the "showing xxx of" when we have only one page left
}
function createTableLinksWithoutAnchorForDataTables(myString,nRow,rowCount) {
        if (myString == "") {
            return "";
        }
        var map = myString.split('\|');


        var firstAnchor = "";
        var restAnchors = new Array();
        for (var i = 0; i < map.length; i++) {           //http://genomernai.de/GenomeRNAi/reagentdetails/HFA10761
            if (i == 0) {
                firstAnchor = map[i];
            }
            if( map.length > 1) {   //...create a hoverbox for the rest if more than one
                restAnchors.push(map[i]);
            }

        }
        var restHTMLAnchors = generateHoverboxListForArray(restAnchors);
        jQuery("td:eq("+rowCount+")", nRow).html(
                                firstAnchor + restHTMLAnchors
                                );
        jQuery("td:eq("+rowCount+")", nRow).children().hoverbox();
        //disable clicking
        jQuery("td:eq("+rowCount+")", nRow).children().filter("a.word").click(function() { return false; })

    }
    function createTableLinksWithOneAnchorForDataTables(myString,nRow,webpage,rowCount) {
         if (myString == "") {
            return "";
        }
        var map = myString.split('\|');


        var firstAnchor = "";
        var restHTMLAnchors = "";
        var restAnchors = new Array();

        if(map.length == 1) {
            firstAnchor = "<a class=\"myclass\" href=\""+webpage+"/" + map[0] + "\">" + map[0] + "</a>";
        }
        else {
            for (var i = 0; i < map.length; i++) {           //http://genomernai.de/GenomeRNAi/reagentdetails/HFA10761
                if (i == 0) {
                    firstAnchor = map[i];
                }
                if( map.length > 1) {   //...create a hoverbox for the rest if more than one
                    restAnchors.push(map[i]);
                }
            }
            restHTMLAnchors = generateHoverboxListForArray(restAnchors);
        }
        jQuery("td:eq("+rowCount+")", nRow).html(
                                firstAnchor + restHTMLAnchors
                                );
        jQuery("td:eq("+rowCount+")", nRow).children().hoverbox();
        //disable clicking
        jQuery("td:eq("+rowCount+")", nRow).children().filter("a.word").click(function() { return false; });
    
    }

    function createTableLinksWithAnchorForDataTables(myString,nRow,webpage,rowCount) {
        if (myString == "") {
            return "";
        }
        var map = myString.split('\|');
        var firstAnchor = "";
        var restAnchors = new Array();
        for (var i = 0; i < map.length; i++) {           //http://genomernai.de/GenomeRNAi/reagentdetails/HFA10761
            if (i == 0) {
                firstAnchor = "<a class=\"myclass\" href=\""+webpage+"/" + map[i] + "\">" + map[i] + "</a>";
            }
            if(map.length > 1) {    //if we got more than one id ...create a hoverbox for the rest
                restAnchors.push(map[i]);
            }

        }
        var restHTMLAnchors = generateHoverboxListForArray(restAnchors);
        jQuery("td:eq("+rowCount+")", nRow).html(
                                firstAnchor + restHTMLAnchors
                                );
        jQuery("td:eq("+rowCount+")", nRow).children().hoverbox();
        //disable clicking
        jQuery("td:eq("+rowCount+")", nRow).children().filter("a.word").click(function() { return false; });
    }
    //this is a combination of the functions with and without anchor... here we will supply two lists: the first  list
    // is a potential "|" seperated string of ALL elements, the second one a "|" list of elements which a link can be made
function createTableLinksWithAndWithoutAnchorForDataTables(myListAll,myListAnchors,nRow,webpage,rowCount) {
    if (myListAll == "") {
            return "";
        }
        var map = myListAll.split('\|');
        var anchors = myListAnchors.split('\|');
    //store the anchors in an associative array  for fast access
        var anchorAsso = new Object();
        for (var i = 0; i < anchors.length; i++) {
            var key = anchors[i];
            if(key == "") {
                continue;
            }
            anchorAsso[key] = 1;
        }
    
        var firstAnchor = "";
        var restAnchors = new Array();
        for (var i = 0; i < map.length; i++) {           //http://genomernai.de/GenomeRNAi/reagentdetails/HFA10761
            if (i == 0) {
                if(map[i] in anchorAsso) {  //only create a link if we have a mapped id for it with the same name...see if key exists in assoc array
                    firstAnchor = "<a class=\"myclass\" href=\""+webpage+"/" + map[i] + "\">" + map[i] + "</a>";
                }
                else {
                    firstAnchor = map[i];
                }
            }
            if(map.length > 1) {    //if we got more than one id ...create a hoverbox for the rest
                restAnchors.push(map[i]);
            }

        }
        var restHTMLAnchors = generateHoverboxListForArray(restAnchors);
        jQuery("td:eq("+rowCount+")", nRow).html(
                                firstAnchor + restHTMLAnchors
                                );
        jQuery("td:eq("+rowCount+")", nRow).children().hoverbox();
        //disable clicking
        jQuery("td:eq("+rowCount+")", nRow).children().filter("a.word").click(function() { return false; });
}
function createTableLinksForEveryDefinedAnchorForDataTables(myListAll,myListAnchors,nRow,webpage,rowCount) {
    if (myListAll == "") {
            return "";
        }
        var map = myListAll.split('\|');
        var anchors = myListAnchors.split('\|');
    //store the anchors in an associative array  for fast access
        var anchorAsso = new Object();
        for (var i = 0; i < anchors.length; i++) {
            var key = anchors[i];
            if(key == "") {
                continue;
            }
            anchorAsso[key] = 1;
        }
        var allAnchors = "";
        for (var i = 0; i < map.length; i++) {                 
                if(map[i] in anchorAsso) {  //only create a link if we have a mapped id for it with the same name...see if key exists in assoc array
                    allAnchors += "<div><a class=\"myclass\" href=\""+webpage+"/" + map[i] + "\">" + map[i] + "</a></div>";

                }
                else {
                    if(allAnchors == "" ) {
                        allAnchors +=  map[i];
                    }
                    else {
                        allAnchors +=  "&#32;"+map[i];    
                    }
                }


        }

        jQuery("td:eq("+rowCount+")", nRow).html(
                                allAnchors
                                );
        jQuery("td:eq("+rowCount+")", nRow).children().hoverbox();
        //disable clicking
        jQuery("td:eq("+rowCount+")", nRow).children().filter("a.word").click(function() { return false; });
}



function createTableLinksWithoutAnchor(jQueryDIV) {
        var myString = jQuery(jQueryDIV).text();
        if (myString == "") {
            return "";
        }
        var map = myString.split('\|');


        var firstAnchor = "";
        var restAnchors = new Array();
        for (var i = 0; i < map.length; i++) {           //http://genomernai.de/GenomeRNAi/reagentdetails/HFA10761
            if (i == 0) {
                firstAnchor = map[i];
            }
            if( map.length > 1) {   //...create a hoverbox for the rest if more than one
                restAnchors.push(map[i]);
            }

        }
        var restHTMLAnchors = generateHoverboxListForArray(restAnchors);
        jQuery(jQueryDIV).html(
                                firstAnchor + restHTMLAnchors
                                );
        if(restHTMLAnchors != "") {
            jQuery(jQueryDIV).find("a.word").hoverbox();
            //disable clicking
            jQuery(jQueryDIV).find("a.word").click(function() { return false; });
        }

    }
    function createTableLinksWithAnchor(jQueryDIV,webpage) {
        var myString = jQuery(jQueryDIV).text();
        if (myString == "" || !/\w/.test(myString)) {
            return "";
        }
        var map = myString.split('\|');
        var thisPath = window.location.pathname.split("/");
        var host = window.location.host;
       // var url = "http://"+host+"/"+thisPath[1]+"/"+webpage+"/";
        var url = "/"+webpage+"/";
        
        var firstAnchor = "";
        var restAnchors = new Array();
        for (var i = 0; i < map.length; i++) {           //http://genomernai.de/GenomeRNAi/reagentdetails/HFA10761
            if (i == 0) {
                firstAnchor = "<a  class=\"myclass\" href=\"" +url+map[i]+ "\">" + map[i] + "</a>";
            }
            if(map.length > 1) {    //if we got more than one id ...create a hoverbox for the rest
                restAnchors.push(map[i]);
            }

        }
        var restHTMLAnchors = generateHoverboxListForArray(restAnchors);
        jQuery(jQueryDIV).html(
                                firstAnchor + restHTMLAnchors
                                );
        if(restHTMLAnchors != "") {
            jQuery(jQueryDIV).find("a.word").hoverbox();
            //disable clicking
            jQuery(jQueryDIV).find("a.word").click(function() { return false; });

        }
    }
function createTableLinksWithOneAnchor(jQueryDIV,webpage) {
        var myString = jQuery(jQueryDIV).text();
        if (myString == "") {
            return "";
        }
        var map = myString.split('\|');
        var thisPath = window.location.pathname.split("/");
        var host = window.location.host;
        //var url = "http://"+host+"/"+thisPath[1]+"/"+webpage+"/";
        var url = "/"+webpage+"/";

        var firstAnchor = "";
        var restAnchors = new Array();
        var restHTMLAnchors = "";
        if(map.length == 1) {
             firstAnchor = "<a  class=\"myclass\" href=\"" +url+map[0]+ "\">" + map[0] + "</a>";
        }
        else {

            for (var i = 0; i < map.length; i++) {           //http://genomernai.de/GenomeRNAi/reagentdetails/HFA10761
                if (i == 0) {
                    firstAnchor = map[i];
                }
                if( map.length > 1) {   //...create a hoverbox for the rest if more than one
                  restAnchors.push(map[i]);
                }

            }
            restHTMLAnchors = generateHoverboxListForArray(restAnchors);
        }
        jQuery(jQueryDIV).html(
                                firstAnchor + restHTMLAnchors
                                );
        if(restHTMLAnchors != "") {
            jQuery(jQueryDIV).find("a.word").hoverbox();
            //disable clicking
            jQuery(jQueryDIV).find("a.word").click(function() { return false; });
        }

    }
function singleImageLoaded(){
    var loader = document.getElementById("gbrowse_loader");
    loader.style.display = "none";
}
function imageLoaded(myid){
    var loader = document.getElementById("gbrowse_loader_"+myid);
    loader.style.display = "none";
}
function getServerHostURL() {
	var myURL = location.protocol + '//' + location.hostname;
	var myPort = location.port;
	if(myPort != "80") {
		myURL += ":"+myPort;
	}
	return myURL;
}
// this function pretty-prints the servers hostname
function prettyPrintServerHostURL() {
	var myURL = getServerHostURL();
	var formattedURL = myURL.replace(".inet.dkfz-heidelberg.de", ".dkfz.de");
	//add further rules....
	return formattedURL;
}

 