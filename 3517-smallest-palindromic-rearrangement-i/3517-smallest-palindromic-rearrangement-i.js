/**
 * @param {string} s
 * @return {string}
 */
var smallestPalindrome = function(s) {
    const freq = new Array(26).fill(0);

    // Count frequencies
    for (const ch of s) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    let firstHalf = [];
    let middle = "";

    // Build first half and middle
    for (let i = 0; i < 26; i++) {
        if (freq[i] % 2 === 1) {
            middle = String.fromCharCode(i + 97);
        }

        firstHalf.push(
            String.fromCharCode(i + 97).repeat(Math.floor(freq[i] / 2))
        );
    }

    firstHalf = firstHalf.join("");
    const secondHalf = firstHalf.split("").reverse().join("");

    return firstHalf + middle + secondHalf;
};