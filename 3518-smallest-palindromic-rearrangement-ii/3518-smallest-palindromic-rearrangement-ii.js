function smallestPalindrome(s, k) {
    const freq = new Array(26).fill(0);
    for (const ch of s) freq[ch.charCodeAt(0) - 97]++;

    const half = new Array(26).fill(0);
    let middle = -1;
    for (let i = 0; i < 26; i++) {
        half[i] = Math.floor(freq[i] / 2);
        if (freq[i] % 2 === 1) middle = i;
    }

    const m = half.reduce((a, b) => a + b, 0);

    // multinomial(half) computed incrementally letter-by-letter using BigInt
    function computeMultinomial(counts) {
        let N = 1n;
        let usedN = 0;
        for (let c = 0; c < 26; c++) {
            const cnt = counts[c];
            if (cnt === 0) continue;
            let comb = 1n;
            for (let i = 1; i <= cnt; i++) {
                comb = comb * BigInt(usedN + i) / BigInt(i);
            }
            N = N * comb;
            usedN += cnt;
        }
        return N;
    }

    let N = computeMultinomial(half);
    let kk = BigInt(k);
    if (kk > N) return "";

    const counts = half.slice();
    let n = m;
    const resultChars = [];

    for (let pos = 0; pos < m; pos++) {
        for (let c = 0; c < 26; c++) {
            if (counts[c] === 0) continue;
            const branch = N * BigInt(counts[c]) / BigInt(n);
            if (kk <= branch) {
                resultChars.push(String.fromCharCode(97 + c));
                counts[c]--;
                n--;
                N = branch;
                break;
            } else {
                kk -= branch;
            }
        }
    }

    const halfStr = resultChars.join('');
    const reversedHalf = resultChars.slice().reverse().join('');
    const middleStr = middle === -1 ? '' : String.fromCharCode(97 + middle);

    return halfStr + middleStr + reversedHalf;
}