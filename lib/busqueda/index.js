let maze = [[2, 1, 1], [2, 3, 3], [2, 3, 1], [1, 1, 1]];
let start = [3, 0];
let goal = [0, 2];
const OPERATORS = ["U", "D", "L", "R"]; // Priotity in case

let problem = { maze, goal

    // Avoid come back
    // root: {pos: [3, 0], cost: 0, parent: null, action: null}
    // node: {pos: [x, y], cost: number, parent: node, action: string}
};function testGoal(node, problem) {
    if (node.pos[0] == problem.goal[0] && node.pos[1] == problem.goal[1]) {
        return true;
    }
    return false;
}

function solve(problem, root) {
    let solution = [];
    let cost = 0;
    // START CODE HERE

    // END CODE HERE
    return { solution, cost };
}

console.log(solve(problem, start));