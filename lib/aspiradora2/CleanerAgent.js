const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        this.actions = ["L", "R", "A"];
        this.table = {
            "1,0": "L",
            "0,1": "A",
            "0,0": "R",
            "1,1": "A",
            "default": "A"
        };
    }

    setup(initialState = {}) {}

    //[1, [1, 1]]

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        let viewKey = this.perception[0] + ',' + [this.perception[1][this.perception[0]]];
        if (this.table[viewKey]) {
            return this.table[viewKey];
        } else {
            return this.table['default'];
        }
        //console.log(this.perception[1])
        //return this.actions[Math.floor(Math.random() * this.actions.length)]     
        // @TODO
        // Implement based on the cost of each action
        //return this.table[this.perception.join(",")]
    }

}

module.exports = CleanerAgent;