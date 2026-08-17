/**
 * @param {number[]} stoneValue
 * @return {number}
 */
var stoneGameV = function(stoneValue) {
    const n = stoneValue.length;

    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + stoneValue[i];
    }

    const memo = Array.from({ length: n }, () =>
        Array(n).fill(-1)
    );

    function getSum(l, r) {
        return prefix[r + 1] - prefix[l];
    }

    function dfs(l, r) {
        if (l === r) return 0;

        if (memo[l][r] !== -1) {
            return memo[l][r];
        }

        let ans = 0;

        for (let k = l; k < r; k++) {
            const left = getSum(l, k);
            const right = getSum(k + 1, r);

            if (left < right) {
                ans = Math.max(ans, left + dfs(l, k));
            } else if (left > right) {
                ans = Math.max(ans, right + dfs(k + 1, r));
            } else {
                ans = Math.max(
                    ans,
                    left + Math.max(
                        dfs(l, k),
                        dfs(k + 1, r)
                    )
                );
            }
        }

        return memo[l][r] = ans;
    }

    return dfs(0, n - 1);
};