/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function(stoneValue) {
    const n = stoneValue.length;
    const dp = new Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let take = 0;
        dp[i] = -Infinity;

        for (let k = 0; k < 3 && i + k < n; k++) {
            take += stoneValue[i + k];
            dp[i] = Math.max(dp[i], take - dp[i + k + 1]);
        }
    }

    if (dp[0] > 0) return "Alice";
    if (dp[0] < 0) return "Bob";
    return "Tie";
};