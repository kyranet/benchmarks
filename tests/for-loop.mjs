/**
 * @param {number[]} array 
 */
 export default function(array){
    let highest = 0;
    for (let i = 0; i < array.length; i++) {
        if(array[i] > highest) highest = array[i]; 
    }

    return highest;
}
