/**
 * @param {number} n
 * @return {boolean}
 */
var winnerSquareGame = function(n) {
    const dp = new Array(n + 1).fill(false);

    // dp[0] = false
    // No stones -> player cannot move -> loses

    for (let i = 1; i <= n; i++) {

        for (let j = 1; j * j <= i; j++) {
            const square = j * j;

            // If opponent is in a losing state,
            // current player can win.
            if (dp[i - square] === false) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
};