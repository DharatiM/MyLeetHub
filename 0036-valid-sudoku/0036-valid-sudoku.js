/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    let rows = Array.from({ length: 9 }, () => new Set());
    let cols = Array.from({ length: 9 }, () => new Set());
    let boxes = Array.from({ length: 9 }, () => new Set());

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {

            let value = board[r][c];

            // Ignore empty cells
            if (value === ".") continue;

            // Find corresponding box
            let boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

            // Check duplicates
            if (
                rows[r].has(value) ||
                cols[c].has(value) ||
                boxes[boxIndex].has(value)
            ) {
                return false;
            }

            // Add value
            rows[r].add(value);
            cols[c].add(value);
            boxes[boxIndex].add(value);
        }
    }

    return true;
};