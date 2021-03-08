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
        if (data.world[0] == 0 && data.world[1] == 0)
            return true;

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
        let map = data.world; // [1, 0]
        let agentState = data.states[agentID];// {pos: 1}
        if (action == "A") {
            map[agentState.pos] = 0;
        }
        if (action == "L") {
            agentState.pos = 0;
        }
        if (action == "R") {
            agentState.pos = 1;
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

        return [agentState.pos, JSON.parse(JSON.stringify(map))];
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

