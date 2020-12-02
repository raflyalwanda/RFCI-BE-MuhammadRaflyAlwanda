function Sort(X) {
 var s = 0; 
 var tukar,
 len = array.length;
 
  do {
    tukar = false;
    for (var i = 1; i < len; i++) {
      if (X[i - 1] > X[i]) {
        var y = X[i];
        X[i] = X[i - 1];
        X[i - 1] = y;
        tukar = true;
        s += 1;
        console.log(String(s) + ".", [array[i - 1], array[i]], "->", array);
      }
    }
  } while (tukar);
  
  console.log("Jumlah Swap : " + String(s));
  
}

var array = [4, 9, 7, 5, 8, 9, 3];
Sort(array);
