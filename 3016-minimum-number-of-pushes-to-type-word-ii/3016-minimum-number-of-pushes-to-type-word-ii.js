/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    let freq = new Array(26).fill(0);

    // Count frequencies
    for (let ch of word) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    // Sort descending
    freq.sort((a, b) => b - a);

    let ans = 0;

    for (let i = 0; i < 26; i++) {
        if (freq[i] === 0) break;

        // Every 8 letters require one extra push
        let pushes = Math.floor(i / 8) + 1;
        ans += freq[i] * pushes;
    }

    return ans;
};