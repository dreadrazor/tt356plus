var app = angular.module(window[APP_NAMESPACE].CONFIG.APP_NAME, ['ui.bootstrap', 'ngCookies', 'ngWebSocket']).config(['$sceProvider', function($sceProvider){
  // Completely disable SCE.
  $sceProvider.enabled(false);
}]);
