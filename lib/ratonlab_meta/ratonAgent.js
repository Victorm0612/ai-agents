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
            "0,1,0,0,0": "LEFT",
            "0,1,0,1,0": "RIGHT",
            "0,1,1,0,0": "LEFT",
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

    setup(state0) {
        this.x1 = state0.raton.x;
        this.y1 = state0.raton.y;

        this.x2 = state0.queso.x;
        this.y2 = state0.queso.y;

        this.mapPosition = [{
            x: this.x1,
            y: this.y1
        }];
    }
    repeat(x, y) {
        for (let position of this.mapPosition) {
            if (position.x == x && position.y == y) {
                return true;
            }
        }
    }

    distance(x1, y1) {
        let distance_value = Math.sqrt((this.x2 - x1) ** 2 + (this.y2 - y1) ** 2);
        return distance_value;
    }
    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */

    send() {
        let viewKey = this.perception.slice(0, 5).join();

        // Todas las posibles opciones de movimiento
        let options = [];

        //"Calculo" los posibles lugares a donde puedo ir y su equivalente en accion ["LEFT","UP","RIGHT","DOWN"]
        for (let i = 0; i < 4; i++) {
            if (this.perception[i] == 0) {
                switch (i) {
                    case 0:
                        options.push({
                            x: this.x1 - 1,
                            y: this.y1,
                            a: 0
                        });
                        break;
                    case 1:
                        options.push({
                            x: this.x1,
                            y: this.y1 + 1,
                            a: 1
                        });
                        break;
                    case 2:
                        options.push({
                            x: this.x1 + 1,
                            y: this.y1,
                            a: 2
                        });
                        break;
                    case 3:
                        options.push({
                            x: this.x1,
                            y: this.y1 - 1,
                            a: 3
                        });
                        break;
                    default:
                        break;
                }
            }
        }

        //Declaro e inicializo las variables, esto con tal de hacer más legible el código.
        let best_option_X, best_option_Y, best_action, any_option_X, any_option_Y, any_action;

        best_option_X = options[0].x;
        best_option_Y = options[0].y;
        best_action = options[0].a;

        for (let i = 0; i < options.length - 1; i++) {

            any_option_X = options[i + 1].x;
            any_option_Y = options[i + 1].y;
            any_action = options[i + 1].a;

            if (this.distance(best_option_X, best_option_Y) < this.distance(any_option_X, any_option_Y)) {
                this.perception[any_action] = 1;
            } else if (this.distance(best_option_X, best_option_Y) >= this.distance(any_option_X, any_option_Y)) {
                if (this.repeat(best_option_X, best_option_Y)) {
                    this.perception[best_action] = 1;
                    best_option_X = any_option_X;
                    best_option_Y = any_option_Y;
                } else if (this.repeat(any_option_X, any_option_Y)) {
                    this.perception[any_action] = 1;
                }
            }
            viewKey = this.perception.slice(0, 5).join();
            this.x1 = best_option_X, this.y1 = best_option_Y;
            this.mapPosition.push({
                x: best_option_X,
                y: best_option_Y
            });
        }

        //let action = foo(this.internalState, this.perception)
        //this.internalState = updatex(this.internalState, this.perception, action)
        //return action;

        if (this.table[viewKey]) {
            console.log(this.mapPosition); // mapa de posiciones
            return this.table[viewKey];
        } else {
            return this.table["default"];
        }
    }

}

module.exports = CleanerAgent;