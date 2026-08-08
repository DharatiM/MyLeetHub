/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function(word1, word2) {
    const n = word1.length;
    const m = word2.length;

    // suffix[j] = latest index where word2[j...] can
    // be matched exactly.
    const suffix = new Array(m + 1);

    suffix[m] = n;

    let p = n - 1;

    for (let j = m - 1; j >= 0; j--) {
        while (p >= 0 && word1[p] !== word2[j]) {
            p--;
        }

        if (p < 0) {
            suffix[j] = -1;
        } else {
            suffix[j] = p;
            p--;
        }
    }

    const ans = [];

    let pos = 0;
    let usedMismatch = false;

    for (let j = 0; j < m; j++) {

        // If mismatch already used, we need exact matching.
        if (usedMismatch) {
            while (pos < n && word1[pos] !== word2[j]) {
                pos++;
            }

            if (pos === n) {
                return [];
            }

            ans.push(pos);
            pos++;
            continue;
        }

        /*
         * We haven't used mismatch.
         *
         * Try the smallest possible index.
         *
         * If word1[pos] == word2[j], taking pos is always
         * optimal if the remaining part can be completed.
         *
         * Otherwise pos can be our one mismatch.
         */

        if (pos < n) {
            // Option 1: use pos as the mismatch
            if (
                word1[pos] !== word2[j] &&
                (j === m - 1 ||
                 (suffix[j + 1] !== -1 && suffix[j + 1] > pos))
            ) {
                ans.push(pos);
                pos++;
                usedMismatch = true;
                continue;
            }

            // Option 2: exact match at pos
            if (word1[pos] === word2[j]) {
                /*
                 * Taking an exact match never makes the answer
                 * lexicographically worse. If the suffix cannot
                 * be completed exactly, the mismatch can still
                 * be used later.
                 */
                ans.push(pos);
                pos++;
                continue;
            }
        }

        /*
         * pos cannot be used.
         *
         * Find the next occurrence of word2[j].
         */
        while (pos < n && word1[pos] !== word2[j]) {
            pos++;
        }

        if (pos === n) {
            return [];
        }

        ans.push(pos);
        pos++;
    }

    return ans;
};