jQuery(document).ready(function() {
 //init glossary for table header
    generateGlossaryLink("#experiments th");
    //and than for the details too
    generateGlossaryLink(".expand-child div strong");
});