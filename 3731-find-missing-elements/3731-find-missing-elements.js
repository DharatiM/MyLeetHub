/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findMissingElements = function(nums) {
    let min=Math.min(...nums)
    let max=Math.max(...nums)
        result=[]
          let set=new Set(nums)

    for(let i=min;i<=max;i++){
        if(!set.has(i)){
            result.push(i)
        }
    }
    return result

    
};