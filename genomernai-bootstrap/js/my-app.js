angular.module('my-app', [])
.controller('MyController', function($scope){
//initalize domain model
       $scope.name = 'Oli';
       //this will later come from a RESt source
       $scope.allData = [{"screenTitle":"Hh pathway regulation","publicationTitle":"A case study of the reproducibility of transcriptional reporter cell-based RNAi screens in Drosophila.","authors":"DasGupta et al.","publicationYear":1167606000000,"pubmedId":17903264,"organism":"Drosophila melanogaster","screenType":"Cell-based","bioSource":"Cell line","bioModel":"rp","assay":"rp","assayMethod":"Luminescence","libraryManufacturer":"DRSC","library":"DRSC-v","scope":"Selected genes","reagentType":"dsRNA","scoreType":"Average fractional change","scoreCutoff":"Complex criteria","notes":"","abstractText":"Off-target effects have been demonstrated to be a major source of false-positives in RNA interference (RNAi) high-throughput screens. In this study, we re-assess the previously published transcriptional reporter-based whole-genome RNAi screens for the Wingless and Hedgehog signaling pathways using second generation double-stranded RNA libraries. Furthermore, we investigate other factors that may influence the outcome of such screens, including cell-type specificity, robustness of reporters, and assay normalization, which determine the efficacy of RNAi-knockdown of target genes.","stableId":"GR00175-A","expWithPhenoOverview":[{"phenotypeName":"Downregulation of Hh pathway","amount":232},{"phenotypeName":"Upregulation of Hh pathway","amount":31},{"phenotypeName":"none","amount":373}]}];

//define scope methods
});
