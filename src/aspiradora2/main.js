const CleanerProblem = require('./CleanerProblem');
const CleanerAgent = require('./CleanerAgent');

let myProblem = new CleanerProblem({ maxIterations: 12 });

myProblem.addAgent("Roomba", CleanerAgent, { pos: 1 });
myProblem.solve([1, 1], {
    onFinish: (result) => {
        let agentID = result.actions[result.actions.length - 1].agentID;
        console.log("agent: " + agentID);
        console.log(result.actions);
        let world = JSON.parse(JSON.stringify(result.data.world));
        let agentState = result.data.states[agentID];
        //world[agentState.pos] = "X"
        console.log(agentState.pos)
        console.log(world)
        console.log("Agent could solve this problem :)")
    },
    onTurn: (result) => { console.log("Turn: " + JSON.stringify(result.actions[result.actions.length - 1])) }
});
