/**
 * @param {number[]} nums
 * @return {number}
 */
var uniqueXorTriplets = function(nums) {
    const n = nums.length;

    if (n === 1) return 1;
    if (n === 2) return new Set(nums).size;

    const MAX = 2048;

    // all possible xor of two numbers
    const two = new Uint8Array(MAX);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            two[nums[i] ^ nums[j]] = 1;
        }
    }

    // xor the third number
    const ans = new Uint8Array(MAX);

    for (let x = 0; x < MAX; x++) {
        if (!two[x]) continue;

        for (const v of nums) {
            ans[x ^ v] = 1;
        }
    }

    let count = 0;
    for (let i = 0; i < MAX; i++) {
        if (ans[i]) count++;
    }

    return count;
};