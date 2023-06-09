/**
 * @param {number[]} array 
 */
 export default function(array){
    return array.sort((a, b) => b - a)[0];
}
