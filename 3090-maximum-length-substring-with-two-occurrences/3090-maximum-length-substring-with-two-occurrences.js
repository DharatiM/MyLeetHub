/**
 * @param {string} s
 * @return {number}
 */
var maximumLengthSubstring = function(s) {
    let left = 0;
    let maxLen = 0;
    let freq = {};

    for (let right = 0; right < s.length; right++) {
        let ch = s[right];
        freq[ch] = (freq[ch] || 0) + 1;

        while (freq[ch] > 2) {
            freq[s[left]]--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};