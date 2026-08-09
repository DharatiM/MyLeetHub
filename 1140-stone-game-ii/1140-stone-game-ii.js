/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    const n = piles.length;

    // suffix[i] = total stones from i to the end
    const suffix = new Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        suffix[i] = suffix[i + 1] + piles[i];
    }

    // dp[i][M] = maximum stones current player can get
    // starting at index i with current M
    const dp = Array.from(
        { length: n },
        () => new Array(n + 1).fill(0)
    );

    function solve(i, M) {
        // Can take all remaining piles
        if (i + 2 * M >= n) {
            return suffix[i];
        }

        if (dp[i][M] !== 0) {
            return dp[i][M];
        }

        let opponentBest = Infinity;

        // Try taking X piles
        for (let X = 1; X <= 2 * M && i + X <= n; X++) {
            const newM = Math.max(M, X);

            // Opponent's maximum score
            const opponentScore = solve(i + X, newM);

            opponentBest = Math.min(
                opponentBest,
                opponentScore
            );
        }

        // Total remaining stones - opponent's score
        dp[i][M] = suffix[i] - opponentBest;

        return dp[i][M];
    }

    return solve(0, 1);
};