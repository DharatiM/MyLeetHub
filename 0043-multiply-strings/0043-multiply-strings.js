var multiply = function(num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";

    let m = num1.length;
    let n = num2.length;

    let result = new Array(m + n).fill(0);

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {

            let mul = (num1[i] - '0') * (num2[j] - '0');

            let p1 = i + j;
            let p2 = i + j + 1;

            let sum = mul + result[p2];

            result[p2] = sum % 10;
            result[p1] += Math.floor(sum / 10);
        }
    }

    let ans = "";

    for (let num of result) {
        if (!(ans === "" && num === 0)) {
            ans += num;
        }
    }

    return ans;
};