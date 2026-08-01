/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function(nums) {
    const n = nums.length;
    const memo = Array.from({ length: n }, () => Array(n).fill(undefined));

    function solve(i, j) {
        if (i === j) return nums[i];

        if (memo[i][j] !== undefined) {
            return memo[i][j];
        }

        const takeLeft = nums[i] - solve(i + 1, j);
        const takeRight = nums[j] - solve(i, j - 1);

        memo[i][j] = Math.max(takeLeft, takeRight);
        return memo[i][j];
    }

    return solve(0, n - 1) >= 0;
};