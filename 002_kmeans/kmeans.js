//Again, I'll start this off with the very beginning of the constructor function.
function KMeans(options) {
  if (options == undefined) {
    options = {};
  }
  this.minClusterMove = options.minClusterMove || 0.0001;
  this.clusterAttempts = 10;
  this.points = [];
}

KMeans.prototype.train = function() {

}

KMeans.prototype.clusters = function() {

}

KMeans.prototype._distance = function(one, two) {
  return Math.sqrt(one.reduce(function(old, _, index) {
    return old + Math.pow(one[index] - two[index], 2)
  }, 0));
}

KMeans.prototype._max = function(array, func) {
  var max = func(array[0], 0);
  var result;

  array.forEach(function(element, index) {
    if (max <= func(element, index)) {
      max = func(element, index)
      result = element
    }
  })
  return result
}

KMeans.prototype._clusterEvaluator = function(centroids, vectors) {
  var distances = []
  var self = this

  vectors.forEach(function(vector) {
    var closestCentroid = self._max(centroids, function(centroid) {
      return -self._distance(centroid, vector)
    })
    distances.push(self._distance(closestCentroid, vector))
  })
  return distances.reduce(function(sumOfSq, distance) {
    return sumOfSq + distance * distance
  }, 0)
}

KMeans.prototype._averageLocation = function(array) {
  return array.reduce(function(previous, datum) {
    return datum.map(function(_, index) {
      return previous[index] + datum[index]
    })
  }).map(function(element) {
    return element / array.length
  })
}

KMeans.prototype._shiftCentroids = function(centroids, vectors) {}

module.exports = KMeans