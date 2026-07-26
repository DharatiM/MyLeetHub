/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countMajoritySubarrays = function(nums, target) {
    const n = nums.length;

    const prefix = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + (nums[i] === target ? 1 : -1);
    }

    let ans = 0;

    for (let i = 0; i <= n; i++) {
        for (let j = i + 1; j <= n; j++) {
            if (prefix[j] > prefix[i]) {
                ans++;
            }
        }
    }

    return ans;
};