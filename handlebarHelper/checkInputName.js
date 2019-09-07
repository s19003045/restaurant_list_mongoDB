Handlebars.registerHelper('checkInputName', function (object) {
  var url = Handlebars.escapeExpression(object.url),
    text = Handlebars.escapeExpression(object.text);

  return new Handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
  );
})

