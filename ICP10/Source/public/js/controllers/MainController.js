app.controller('MainController', ['$scope', '$http', function($scope, $http) { 
  	$scope.todo = {
  		title: "Things I Need to Do",
  		list: ["Clean my room", "Go to the store", "Study Cracking the Coding Interview"]
  	}

  	$scope.books = {
  		title: "Books I Need to Buy",
  		list: []
  	}

    function hasOnlyNumbers(item) {
      return /^[0-9]*$/.test(item)
    }
  	
    $scope.addItem = function(itemList, item) {
      // ISBN : 10 or 13 length and consisdt of only numbers
      if ((item.length == 10 || item.length == 13) && hasOnlyNumbers(item)) {
        console.log("ISBN");
        $http.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + item).success(function(data) {
          itemList.push("Title: " + data.items[0].volumeInfo.title + " // Author(s):" + data.items[0].volumeInfo.authors)
        })
      } else {
        console.log("Not an ISBN")
        itemList.push(item);
      }
  	}
    
    $scope.getStats = function() {
        import {GoogleCharts} from 'google-charts';
 
//Load the charts library with a callback
GoogleCharts.load(drawChart);
 
function drawChart() {
 
    // Standard google charts functionality is available as GoogleCharts.api after load
    const data = GoogleCharts.api.visualization.arrayToDataTable([
        ['Chart thing', 'Chart amount'],
        ['Lorem ipsum', 60],
        ['Dolor sit', 22],
        ['Sit amet', 18]
    ]);
    const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
    pie_1_chart.draw(data);
}
    } 

}]);