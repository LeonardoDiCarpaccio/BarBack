
var Functions = {
  dateNow: function (onlyDate = false) {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours() + 2, date.getUTCMinutes(), date.getUTCSeconds());

    var finalDate = new Date(now_utc).toISOString().replace(/T/, " ").replace(/\..+/, "");
    finalDate = onlyDate ? finalDate.substring(0, 10) : finalDate
  
    return finalDate
  },

  cleanQuery: function (query) {
    var query_clean = query;
    for (const i in query_clean) {
      if (typeof (query_clean[i]) == "string") {
        if (query_clean[i].indexOf("'")) {
          query_clean[i] = query_clean[i].replace("'", "''");

        }
      }
    }
    return query_clean;
  },

}
module.exports = Functions