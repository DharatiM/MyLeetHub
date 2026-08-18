/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function(nums, k) {
    const count = new Map();

    for (let i = 0; i <= nums.length - k; i++) {
        const seen = new Set();

        for (let j = i; j < i + k; j++) {
            seen.add(nums[j]);
        }

        for (const num of seen) {
            count.set(num, (count.get(num) || 0) + 1);
        }
    }

    let ans = -1;

    for (const [num, freq] of count) {
        if (freq === 1) {
            ans = Math.max(ans, num);
        }
    }

    return ans;
};