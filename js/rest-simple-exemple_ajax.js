//from http://sasajovancic.blogspot.fr/2011/06/javascript-rest-client.html
function RestServiceJs(newurl, postfix) {
  this.myurl = newurl;
  this.postfix = postfix||"";

  this.add = function(model, callback) {
    $.ajax({
      type: 'POST',
      url: this.myurl+this.postfix,
      data: model, // '{"name":"' + model.name + '"}',
      dataType: 'text',
      processData: false,
      contentType: 'application/json',
      success: callback,
      error: function(req, status, ex) { console.log(req,status,ex) },
      timeout:60000
    });
  };

  this.update = function(model, id, callback) {
    $.ajax({
      type: 'PUT',
      url: this.myurl+ '/' + id+this.postfix,
      data: JSON.stringify(model), // '{"name":"' + model.name + '"}',
      dataType: 'text',
      processData: false,
      contentType: 'application/json',
      success: callback,
      error: function(req, status, ex)  { console.log(req,status,ex) },
      timeout:60000
    });
  };

  this.find = function(id, callback) {
    $.ajax({
      type: 'GET',
      url: this.myurl + '/' + id+this.postfix,
      contentType: 'application/json',
      success: callback,
      error: function(req, status, ex)  { console.log(req,status,ex) },
      timeout:60000
    });
  };

  this.findAll = function(callback) {
    $.ajax({
      type: 'GET',
      url: 'http://tutoninja.fr/etudiants?code=xxxx',
      contentType: 'application/json',
      success: callback,
      error: function(req, status, ex) {},
      timeout:60000
    });
  };

  this.remove = function(id, callback) {
    $.ajax({
      type: 'DELETE',
      url: this.myurl + '/' + id+this.postfix,
      contentType: 'application/json',
      success: callback,
      error: function(req, status, ex)  { console.log(req,status,ex) },
      timeout:60000
    });
  };


}
