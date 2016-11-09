
// A [] queue of ppl and their weights
// B [] floors each person is going to
// M maximum floors of building
// X maximum people on elv
// Y maximum wight on elv


function elevator(A,B,M,X,Y){

    var totalPersons = A.length;
    var currentPerson = 0;
    var totalWeight = 0;
    var currentIn = 0;
    var totalStops = 0;
    var stops = [];
    var go = false;

    //remove floor
    /*for(var i=0; i < B.length; i++){
        if(B[i] > M){
           console.log('remove');
            remove(B, B[i]);
            remove(A, A[i]);
        }
    }*/
    console.log(B);
    console.log(A);

    while (totalPersons > currentPerson) {

        //if (B[currentPerson] <= M) {

            if (totalWeight + A[currentPerson] <= Y && currentIn + 1 <= X) {
                totalWeight = totalWeight + A[currentPerson];
                currentIn = currentIn + 1;
                stops.push(B[currentPerson]);

                console.log('in ' + A[currentPerson]);
                if (currentPerson + 1 == totalPersons) {
                    go = true;
                }
                currentPerson++;
            } else {
                go = true;
            }


            if (go) {
                totalWeight = 0;
                currentIn = 0;
                console.log(stops);
                //toUnique(stops);
                totalStops += stops.length + 1;
                stops = [];
                go = false;
            }

        //}
    }

    return totalStops;

}

function remove(array, element) {
    let index = array.indexOf(element);

    while (index !== -1) {
        array.splice(index, 1);
        index = array.indexOf(element);
    }
}





function toUnique(a,b,c){//array,placeholder,placeholder
    b=a.length;
    while(c=--b)while(c--)a[b]!==a[c]||a.splice(c,1);
    return a // not needed ;)
}
//var array=[1,2,3,4,5,6,7,8,9,0,1,2,1];
//toUnique(array)
//console.log(array);

var A = [60,80,40,50];
var B = [2,3,5,10];
var M = 5;
var X = 2;
var Y = 200;

//console.warn(elevator(A,B,M,X,Y));