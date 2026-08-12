/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function(nums, k) {
    let left = 0;
    let maxLength = 0;
    const freq = new Map();

    for (let right = 0; right < nums.length; right++) {
        // Add current element
        freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);

        // If frequency exceeds k, shrink window
        while (freq.get(nums[right]) > k) {
            freq.set(nums[left], freq.get(nums[left]) - 1);
            left++;
        }

        // Current window is valid
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};