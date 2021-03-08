const Problem = require('../core/Problem');

/**
 * Simple reflex agent problem. Define a problem to be solved by a simple reflex agent 
 */
class CleanerProblem extends Problem {
    constructor(args) {
        super(args);
        this.env = args;
    }

    /**
     * Check if the given solution solves the problem. You must override.
     * The current state of the enviroment is maintained in data.world
     * @param {Object} solution 
     */
    goalTest(data) {
        let minX = min(data.world);
        if (data.iterations >= this.env.maxIterations) return true;
        if (minX == 0) {
            return true;
        }
        return false;
    }

    /**
     * The transition model. 
     * Tells how to change the state (data) based on the given actions. You must override
     * In this case, the actions can be one the four movements or the TAKE action.
     * In this case, what changes based on the movement actions is the x or y position of the agent
     * or the current cell if the action is TAKE
     * @param {} data 
     * @param {*} action 
     * @param {*} agentID 
     */
    update(data, action, agentID) {
        let map = data.world;
        let agentState = data.states[agentID];
        if (action == "UP") {
            agentState.raton.y -= 1;
        }
        if (action == "DOWN") {
            agentState.raton.y += 1;
        }
        if (action == "LEFT") {
            agentState.raton.x -= 1;
        }
        if (action == "RIGHT") {
            agentState.raton.x += 1;
        }
        if (action == "TAKE") {
            map[agentState.raton.y][agentState.raton.x] = 0;
        }
        if (!data.iterations) {
            data.iterations = 1;
        } else {
            data.iterations++;
        }
    }

    /**
     * Gives the world representation for the agent at the current stage.
     * Notice that the agent don't have access to the whole labyrinth. It only "see"
     * the cell around and under it. 
     * @param {*} agentID 
     * @returns and object with the information to be sent to the agent
     */
    perceptionForAgent(data, agentID) {
        let map = data.world;
        let agentState = data.states[agentID];
        let x = agentState.raton.x;
        let y = agentState.raton.y;
        let result = [];
        //LEFT
        result.push(x > 0 ? map[y][x - 1] : 1);
        //UP
        result.push(y > 0 ? map[y - 1][x] : 1);
        //RIGTH
        result.push(x < map[0].length - 1 ? map[y][x + 1] : 1);
        //DOWN
        result.push(y < map.length - 1 ? map[y + 1][x] : 1);

        result = result.map(value => value > 0 ? 1 : 0);

        //SMELL
        result.push(Math.abs(map[y][x]));

        // Pasar la información sobre donde está el queso
        result.push(agentState.raton.x);
        result.push(agentState.raton.y);
        result.push(agentState.queso.x);
        result.push(agentState.queso.y);

        return result;
    }

    /**
     * Solve the given problem. We don't need to change in this case
     * @param {*} problem 
     * @param {*} callbacks 
     */
    /*solve(problem, callbacks) {
        this.controller.setup({ world: problem, problem: this });
        this.controller.start(callbacks);
    }*/
}

module.exports = CleanerProblem;

function min(data) {
    let min = 9999999;
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        for (j = 0; j < row.length; j++) {
            if (row[j] < min) {
                min = row[j];
            }
        }
    }
    return min;
}