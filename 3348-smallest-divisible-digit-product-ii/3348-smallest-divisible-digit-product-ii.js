function smallestNumber(num, t) {
    // --------------------------------------------------
    // 1. Factor t into 2, 3, 5, 7
    // --------------------------------------------------

    let need2 = 0;
    let need3 = 0;
    let need5 = 0;
    let need7 = 0;

    while (t % 2 === 0) {
        need2++;
        t /= 2;
    }

    while (t % 3 === 0) {
        need3++;
        t /= 3;
    }

    while (t % 5 === 0) {
        need5++;
        t /= 5;
    }

    while (t % 7 === 0) {
        need7++;
        t /= 7;
    }

    // Product of digits can only contain
    // prime factors 2, 3, 5 and 7.
    if (t !== 1) {
        return "-1";
    }

    const n = num.length;

    // --------------------------------------------------
    // 2. Factor contribution of each digit
    // --------------------------------------------------

    const factors = [
        [0, 0, 0, 0], // 0
        [0, 0, 0, 0], // 1
        [1, 0, 0, 0], // 2
        [0, 1, 0, 0], // 3
        [2, 0, 0, 0], // 4
        [0, 0, 1, 0], // 5
        [1, 1, 0, 0], // 6
        [0, 0, 0, 1], // 7
        [3, 0, 0, 0], // 8
        [0, 2, 0, 0]  // 9
    ];

    // --------------------------------------------------
    // 3. Remove the factors supplied by a digit
    // --------------------------------------------------

    function subtract(a, b, c, d, digit) {
        const f = factors[digit];

        return [
            Math.max(0, a - f[0]),
            Math.max(0, b - f[1]),
            Math.max(0, c - f[2]),
            Math.max(0, d - f[3])
        ];
    }

    // --------------------------------------------------
    // 4. Minimum number of digits required
    // --------------------------------------------------

    const memo = new Map();

    function minDigits(a, b, c, d) {
        if (
            a === 0 &&
            b === 0 &&
            c === 0 &&
            d === 0
        ) {
            return 0;
        }

        const key = `${a},${b},${c},${d}`;

        if (memo.has(key)) {
            return memo.get(key);
        }

        let ans = Infinity;

        for (let digit = 2; digit <= 9; digit++) {

            const [na, nb, nc, nd] =
                subtract(a, b, c, d, digit);

            // Digit didn't help.
            if (
                na === a &&
                nb === b &&
                nc === c &&
                nd === d
            ) {
                continue;
            }

            const result =
                minDigits(na, nb, nc, nd);

            if (result !== Infinity) {
                ans = Math.min(ans, 1 + result);
            }
        }

        memo.set(key, ans);

        return ans;
    }

    // --------------------------------------------------
    // 5. Construct smallest zero-free number
    // --------------------------------------------------

    function buildSmallest(len, a, b, c, d) {
        let result = "";

        for (let pos = 0; pos < len; pos++) {

            const remaining = len - pos - 1;

            for (let digit = 1; digit <= 9; digit++) {

                const [na, nb, nc, nd] =
                    subtract(a, b, c, d, digit);

                const required =
                    minDigits(na, nb, nc, nd);

                if (required <= remaining) {

                    result += String(digit);

                    a = na;
                    b = nb;
                    c = nc;
                    d = nd;

                    break;
                }
            }
        }

        return result;
    }

    // --------------------------------------------------
    // 6. Calculate requirements after every prefix
    //
    // IMPORTANT:
    // prefixNeed only represents factors.
    // We separately track whether the prefix is zero-free.
    // --------------------------------------------------

    const prefixNeed = new Array(n + 1);

    const prefixValid = new Array(n + 1);

    prefixNeed[0] = [
        need2,
        need3,
        need5,
        need7
    ];

    prefixValid[0] = true;

    for (let i = 0; i < n; i++) {

        const digit = Number(num[i]);

        const [a, b, c, d] =
            subtract(
                prefixNeed[i][0],
                prefixNeed[i][1],
                prefixNeed[i][2],
                prefixNeed[i][3],
                digit
            );

        prefixNeed[i + 1] = [a, b, c, d];

        // Prefix is invalid forever after a zero.
        prefixValid[i + 1] =
            prefixValid[i] && digit !== 0;
    }

    // --------------------------------------------------
    // 7. Is num itself already a valid answer?
    // --------------------------------------------------

    if (
        prefixValid[n] &&
        prefixNeed[n][0] === 0 &&
        prefixNeed[n][1] === 0 &&
        prefixNeed[n][2] === 0 &&
        prefixNeed[n][3] === 0
    ) {
        return num;
    }

    // --------------------------------------------------
    // 8. Try to make a SAME-LENGTH answer
    //
    // Change the rightmost possible position.
    // --------------------------------------------------

    for (let i = n - 1; i >= 0; i--) {

        // Everything before i must already be zero-free.
        if (!prefixValid[i]) {
            continue;
        }

        const originalDigit = Number(num[i]);

        const [a, b, c, d] = prefixNeed[i];

        // We need a digit strictly greater than
        // the original digit.
        //
        // Since 0 is not allowed, start at 1.
        const startDigit =
            Math.max(1, originalDigit + 1);

        for (
            let digit = startDigit;
            digit <= 9;
            digit++
        ) {

            const [na, nb, nc, nd] =
                subtract(a, b, c, d, digit);

            const remaining = n - i - 1;

            // Can the suffix provide all remaining factors?
            if (
                minDigits(na, nb, nc, nd) <= remaining
            ) {

                return (
                    num.slice(0, i) +
                    String(digit) +
                    buildSmallest(
                        remaining,
                        na,
                        nb,
                        nc,
                        nd
                    )
                );
            }
        }
    }

    // --------------------------------------------------
    // 9. No same-length answer.
    //
    // Find the minimum possible length.
    // --------------------------------------------------

    const minLen =
        minDigits(
            need2,
            need3,
            need5,
            need7
        );

    const length =
        Math.max(n + 1, minLen);

    return buildSmallest(
        length,
        need2,
        need3,
        need5,
        need7
    );
}