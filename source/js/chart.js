console.clear();

// sort with _createdTime ??
var airtable_read_endpoint = "https://api.airtable.com/v0/appNg7zxudMizwvbj/HIT-Table?maxRecords=100&view=Grid%20view&api_key=keyLBt6WtuDTOaZ72&sortField=_createdTime&sortDirection=desc";

var airtable_write_endpoint = "https://api.airtable.com/v0/appNg7zxudMizwvbj/all_poll_data?api_key=keyLBt6WtuDTOaZ72";

// Write API
var form = document.querySelector("#voting-form");
var select = document.querySelector("#emoji_choice");


var pollData = {};
var chartData = [];

function getDataAndBuild() {

  // zero out data
  pollData = {
    "Chest Press": 0,
    "Shoulder Press": 0,
    "Lat Pull Down": 0,
    "Seated Row": 0,
    "Leg Press": 0
  };
  emojis = ["👯", "🍑", "💥", "🍕", "☠️"];
  chartData = [0, 0, 0, 0, 0];

  console.log("Getting data");
  axios
    .get(airtable_read_endpoint)
    .then(function(result) {
      console.log("Got data (showing first record): ", result.data.records[0]);
      result.data.records.forEach(function(element, index) {
        pollData[el            mn.n˜ement.fields["Exercise"]]++;



      });
      console.log("Updated poll data: ", pollData);

      // Turn Object into Array (for chart)
      var i = 0;
      for (var prop in pollData) {
        chartData[i] = pollData[prop];
        i++;
      }

      console.log("Made chart data: ", chartData);

      buildChart(chartData);
    });
}

function buildChart(data) {
  console.log("Building chart with this data: ", data);

  var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 400]);

  d3
    .select(".chart")
    .selectAll("div")
    .remove();

  // Wait a sec? Apparently d3 needs to catch its breath.
  setTimeout(function() {
    d3
      .select(".chart")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .style("width", function(d) {
        return x(d) + "px";
      })
      .text(function(d, i) {
        return emojis[i] + " " + d;
      });
   }, 200);
}

// Kick things off!
getDataAndBuild();
