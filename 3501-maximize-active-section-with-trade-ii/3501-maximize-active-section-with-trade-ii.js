/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var maxActiveSectionsAfterTrade = function(s, queries) {
    const n = s.length;

    // ---- 1. Compress s into runs ----
    const runChar = [], runStart = [], runEnd = [], runLen = [];
    {
        let i = 0;
        while (i < n) {
            let j = i;
            while (j < n && s[j] === s[i]) j++;
            runChar.push(s[i]);
            runStart.push(i);
            runEnd.push(j - 1);
            runLen.push(j - i);
            i = j;
        }
    }
    const m = runChar.length;

    let totalOnes = 0;
    for (let k = 0; k < m; k++) if (runChar[k] === '1') totalOnes += runLen[k];

    // ---- 2. G[i] = gain of removing run i (a '1' run) using GLOBAL (unclipped) neighbors ----
    const NEG = -Infinity;
    const G = new Array(m).fill(NEG);
    for (let k = 1; k < m - 1; k++) {
        if (runChar[k] === '1') G[k] = runLen[k - 1] + runLen[k + 1];
    }

    // ---- 3. Sparse table over G for range-max ----
    const LOG = new Array(m + 1).fill(0);
    for (let k = 2; k <= m; k++) LOG[k] = LOG[k >> 1] + 1;
    const K = Math.max(1, LOG[m] + 1);
    const sparse = [G.slice()];
    for (let p = 1; p < K; p++) {
        const prev = sparse[p - 1];
        const cur = new Array(m);
        const half = 1 << (p - 1);
        const span = 1 << p;
        for (let k = 0; k + span <= m; k++) cur[k] = Math.max(prev[k], prev[k + half]);
        sparse.push(cur);
    }
    function rangeMax(l, r) { // inclusive; l > r means empty
        if (l > r) return NEG;
        const len = r - l + 1;
        const p = LOG[len];
        return Math.max(sparse[p][l], sparse[p][r - (1 << p) + 1]);
    }

    // ---- 4. Binary search: run index containing position p ----
    function findRun(p) {
        let lo = 0, hi = m - 1;
        while (lo < hi) {
            const mid = (lo + hi + 1) >> 1;
            if (runStart[mid] <= p) lo = mid; else hi = mid - 1;
        }
        return lo;
    }

    // ---- 5. Answer each query ----
    const answer = new Array(queries.length);
    for (let qi = 0; qi < queries.length; qi++) {
        const l = queries[qi][0], r = queries[qi][1];
        const idxL = findRun(l);
        const idxR = findRun(r);

        let bestGain = 0;

        if (idxR > idxL + 1) {
            // fully-interior runs -> RMQ over precomputed global gains
            const midMax = rangeMax(idxL + 2, idxR - 2);
            if (midMax > bestGain) bestGain = midMax;

            // left-most interior run: left neighbor is the (clipped) boundary run at idxL
            const end1 = idxL + 1;
            if (runChar[end1] === '1') {
                const leftLen = runEnd[idxL] - l + 1;
                const rightLen = (end1 + 1 === idxR) ? (r - runStart[idxR] + 1) : runLen[end1 + 1];
                const cand = leftLen + rightLen;
                if (cand > bestGain) bestGain = cand;
            }

            // right-most interior run: right neighbor is the (clipped) boundary run at idxR
            const end2 = idxR - 1;
            if (end2 !== end1 && runChar[end2] === '1') {
                const leftLen = (end2 - 1 === idxL) ? (runEnd[idxL] - l + 1) : runLen[end2 - 1];
                const rightLen = r - runStart[idxR] + 1;
                const cand = leftLen + rightLen;
                if (cand > bestGain) bestGain = cand;
            }
        }

        answer[qi] = totalOnes + bestGain;
    }

    return answer;
};