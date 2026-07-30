var climbStairs = function(n) {
    if(n <= 2) {
        return n;
    }

    let prev1 = 1; // ways for n=1
    let prev2 = 2; // ways for n=2

    for(let i = 3; i <= n; i++) {
        let current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }

    return prev2;
};