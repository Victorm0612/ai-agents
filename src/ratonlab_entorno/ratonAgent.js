const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        //LEFT, UP, RIGHT, DOWN, CELL
        this.table = {
            "0,0,0,0,0": "UP",
            "0,0,0,1,0": "UP",
            "0,0,1,0,0": "UP",
            "0,0,1,1,0": "LEFT",
            "0,1,0,0,0": "DOWN", //ORIGEN: LEFT -- se cambió por DOWN
            "0,1,0,1,0": "RIGHT",
            "0,1,1,0,0": "DOWN", //ORIGEN: LEFT -- se cambió por DOWN
            "0,1,1,1,0": "LEFT",
            "1,0,0,0,0": "UP",
            "1,0,0,1,0": "RIGHT",
            "1,0,1,0,0": "DOWN",
            "1,0,1,1,0": "UP",
            "1,1,0,0,0": "RIGHT",
            "1,1,0,1,0": "RIGHT",
            "1,1,1,0,0": "DOWN",
            "default": "TAKE"
        };
    }

/*  ---- POSICIONES PROBLEMA 1 ----
    { x: 0, y: 2 } DOWN,
    { x: 0, y: 1 } RIGHT,
    { x: 1, y: 1 } RIGHT,
    { x: 2, y: 1 } UP,
    { x: 2, y: 2 } RIGHT,
    { x: 3, y: 2 } UP,
    { x: 3, y: 3 } TAKE   

    ---- POSICIONES PROBLEMA 2 ----
    { x: 1, y: 7 },  
    { x: 2, y: 7 },
    { x: 2, y: 8 },  
    { x: 2, y: 9 },
    { x: 1, y: 9 },  
    { x: 1, y: 10 },
    { x: 1, y: 11 }, 
    { x: 2, y: 11 },
    { x: 2, y: 12 }, 
    { x: 2, y: 13 },
    { x: 3, y: 13 }, 
    { x: 4, y: 13 },
    { x: 4, y: 12 }, 
    { x: 4, y: 11 },
    { x: 4, y: 10 }, 
    { x: 4, y: 9 },
    { x: 4, y: 8 },  
    { x: 4, y: 7 },
    { x: 5, y: 7 },  
    { x: 6, y: 7 }    
    */

    setup(state0){
        this.x = state0.x
        this.y = state0.y
        this.mapPosition = [
            {
                x : this.x,
                y : this.y,
            },
        ]
    }
    repeat(x,y){
        for(let position of this.mapPosition){
            if(position.x == x && position.y == y){
                return true;
            }
        }
    }
    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */

    send() {
        let viewKey = this.perception.join();
        let action = this.table[viewKey];

        let position = 0;

        while(true){
            let new_X = this.x;
            let new_Y = this.y;

            if(action == "LEFT"){
                new_X = new_X-1;
                position = 0;

            }else if(action == "UP"){
                new_Y = new_Y+1;
                position = 1;

            }else if(action == "RIGHT"){
                new_X = new_X+1;
                position = 2;
            }else if(action == "DOWN"){
                new_Y = new_Y-1;
                position = 3;
            }
            else if(action == "TAKE"){
                break;
            }
            else{
                break;
            }

            if(this.repeat(new_X,new_Y)){
                this.perception[position] = 1;
                viewKey = this.perception.join();
                action = this.table[viewKey]
            }else{
                this.x = new_X;
                this.y = new_Y;
                this.mapPosition.push({
                    x: this.x,
                    y: this.y
                })
                break;
            }  
    }
        //let action = foo(this.internalState, this.perception)
        //this.internalState = updatex(this.internalState, this.perception, action)
        //return action;

        if (this.table[viewKey]) {
            console.log(this.mapPosition) // mapa de posiciones
            return this.table[viewKey];
        } else {
            return this.table["default"];
        }

    }

}

module.exports = CleanerAgent;