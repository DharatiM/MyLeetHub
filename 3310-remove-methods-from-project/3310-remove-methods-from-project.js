/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function(n, k, invocations) {
    // Build graph
    const graph = Array.from({ length: n }, () => []);

    for (const [u, v] of invocations) {
        graph[u].push(v);
    }

    // Find all suspicious methods using DFS
    const suspicious = new Array(n).fill(false);
    const stack = [k];

    while (stack.length) {
        const node = stack.pop();

        if (suspicious[node]) continue;

        suspicious[node] = true;

        for (const next of graph[node]) {
            if (!suspicious[next]) {
                stack.push(next);
            }
        }
    }

    // Check if any outside method invokes a suspicious one
    for (const [u, v] of invocations) {
        if (!suspicious[u] && suspicious[v]) {
            const ans = [];
            for (let i = 0; i < n; i++) ans.push(i);
            return ans;
        }
    }

    // Return remaining methods
    const ans = [];
    for (let i = 0; i < n; i++) {
        if (!suspicious[i]) ans.push(i);
    }

    return ans;
};