/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {

    const ans = [];
    const curr = [];
    const used = new Array(nums.length).fill(false);

    function backtrack() {

        if (curr.length === nums.length) {
            ans.push([...curr]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {

            if (used[i]) continue;

            used[i] = true;
            curr.push(nums[i]);

            backtrack();

            curr.pop();
            used[i] = false;
        }
    }

    backtrack();
    return ans;
};