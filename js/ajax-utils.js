(function (global) {

  var ajaxUtils = {};

  // Get XMLHttpRequest object
  function getRequestObject() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      return (new ActiveXObject("Microsoft.XMLHTTP"));
    } else {
      global.alert("Ajax is not supported!");
      return null;
    }
  }

  // Sends GET request to 'requestUrl'
  ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
    var request = getRequestObject();
    request.onreadystatechange = function () {
      handleResponse(request, responseHandler, isJsonResponse);
    };
    request.open("GET", requestUrl, true);
    request.send(null);
  };

  // Handle response
  function handleResponse(request, responseHandler, isJsonResponse) {
    if ((request.readyState == 4) && (request.status == 200)) {
      if (isJsonResponse == undefined) {
        isJsonResponse = true;
      }

      if (isJsonResponse) {
        responseHandler(JSON.parse(request.responseText));
      } else {
        responseHandler(request.responseText);
      }
    }
  }

  global.$ajaxUtils = ajaxUtils;

})(window);
