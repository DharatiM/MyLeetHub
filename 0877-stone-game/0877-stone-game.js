/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function(piles) {
    let n = piles.length;

    // dp[i][j] = maximum score difference current player can achieve
    let dp = Array.from({ length: n }, () => Array(n).fill(0));

    // Base case: one pile
    for (let i = 0; i < n; i++) {
        dp[i][i] = piles[i];
    }

    // Length of subarray
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;

            let takeLeft = piles[i] - dp[i + 1][j];
            let takeRight = piles[j] - dp[i][j - 1];

            dp[i][j] = Math.max(takeLeft, takeRight);
        }
    }

    return dp[0][n - 1] > 0;
};