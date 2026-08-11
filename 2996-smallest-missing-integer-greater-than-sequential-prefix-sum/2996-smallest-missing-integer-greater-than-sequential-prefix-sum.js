/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function(nums) {
    let sum = nums[0];

    // Find longest sequential prefix
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1] + 1) {
            sum += nums[i];
        } else {
            break;
        }
    }

    // Find smallest missing integer >= sum
    let answer = sum;

    while (nums.includes(answer)) {
        answer++;
    }

    return answer;
};