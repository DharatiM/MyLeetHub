/**
 * @param {number[]} stones
 * @return {boolean}
 */
var stoneGameIX = function(stones) {
    let c0 = 0, c1 = 0, c2 = 0;

    for (let stone of stones) {
        let rem = stone % 3;

        if (rem === 0) c0++;
        else if (rem === 1) c1++;
        else c2++;
    }

    if (c0 % 2 === 0) {
        return c1 > 0 && c2 > 0;
    }

    return Math.abs(c1 - c2) > 2;
};