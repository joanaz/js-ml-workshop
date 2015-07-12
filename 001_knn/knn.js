//Start off with what passes the first test.
function KNN(kSize) {
  this.kSize = kSize;
  this.points = [];
}

KNN.prototype.train = function(data) {
  var self = this
  data.forEach(function(datum) {

      self.points.push(datum)
    })
    // body...
};

KNN.prototype._distance = function(vector1, vector2) {
  var diff = []
  vector2.forEach(function(axisNum, index) {
    diff.push(axisNum - vector1[index])
  })
  return Math.sqrt(diff.reduce(function(old, n) {
    return old + n * n
  }, 0))
}

KNN.prototype._distances = function(vector1, array) {
  var distances = []
  var self = this
  array.forEach(function(datum) {
    distances.push([self._distance(vector1, datum[0]), datum[1]])
  })
  return distances
}

KNN.prototype._sorted = function(array) {
  var sortedArray = []
  var obj = {}
  array.forEach(function(element) {
    obj[element[0]] = element[1]
  })

  var sortedKeys = Object.keys(obj).sort(function(a, b) {
    return a - b;
  })
  sortedKeys.forEach(function(key) {
    sortedArray.push(obj[key])
  })
  return sortedArray
}

KNN.prototype._majority = function(k, array) {
  var frequency = {}; // array of frequency.
  var max = 0; // holds the max frequency.
  var result; // holds the max frequency element.
  for (var i = 0; i < k; i++) {
    frequency[array[i]] = (frequency[array[i]] || 0) + 1; // increment frequency.
    if (frequency[array[i]] > max) { // is this frequency > max so far ?
      max = frequency[array[i]]; // update max.
      result = array[i]; // update result.
    }
  }
  return result
}

KNN.prototype.predictSingle = function(datum) {
  return this._majority(this.kSize, this._sorted(this._distances(datum, this.points)))
}

KNN.prototype.predict = function(data) {
  var self = this
  return data.map(function(datum) {
    return self.predictSingle(datum)
  })
}

KNN.prototype.score = function(data) {
  var results = this.predict(data.map(function(datum) {
    return datum[0]
  }))
  var filtered = results.filter(function(result, index) {
    return (result === data[index][1])
  })
  return filtered.length / results.length
}

module.exports = KNN