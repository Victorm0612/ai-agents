/**
 * ai-agents - Framework to create virtual agents
 * @version v0.2.0
 * @link https://github.com/andcastillo/ai-agents
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["aiAgents"] = factory();
	else
		root["aiAgents"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class AgentController {
  constructor() {
    this.agents = {};
    this.world0 = null;
    this.world = null;
    this.actions = [];
    this.data = {
      states: [],
      world: {}
    };
  }
  /**
   * Setup the configuration for the agent controller
   * @param {Object} parameter 
   */


  setup(parameter) {
    this.problem = parameter.problem;
    this.world0 = JSON.parse(JSON.stringify(parameter.world));
    this.data.world = JSON.parse(JSON.stringify(parameter.world));
  }
  /**
   * Register the given agent in the controller pool. The second parameter stand for the initial state of the agent
   * @param {Agent} agent 
   * @param {Object} state0 
   */


  register(agent, state0) {
    if (this.agents[agent.getID()]) {
      throw 'AgentIDAlreadyExists';
    } else {
      this.agents[agent.getID()] = agent;
      this.data.states[agent.getID()] = state0; //TODO conver state0 to an inmutable object

      agent.setup(state0);
    }
  }
  /**
   * Remove the given agent from the controller pool
   * @param {Object} input 
   */


  unregister(input) {
    let id = "";

    if (typeof input == 'string') {
      id = input;
    } else if (typeof input == 'object') {
      id = input.getID();
    } else {
      throw 'InvalidAgentType';
    }

    let agent = this.agents[id];
    agent.stop();
    delete this.agents[id];
  }
  /**
  * This function start the virtual life. It will continously execute the actions
  * given by the agents in response to the perceptions. It stop when the solution function
  * is satisfied or when the max number of iterations is reached.
  * If it must to run in interactive mode, the start mode return this object, which is actually 
  * the controller
  * @param {Array} callbacks 
  */


  start(callbacks) {
    let interactive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    this.callbacks = callbacks;
    this.currentAgentIndex = 0;

    if (interactive === false) {
      this.loop();
      return null;
    } else {
      return this;
    }
  }
  /**
   * Executes the next iteration in the virtual life simulation
   */


  next() {
    if (!this.problem.goalTest(this.data)) {
      let keys = Object.keys(this.agents);
      let agent = this.agents[keys[this.currentAgentIndex]];
      agent.receive(this.problem.perceptionForAgent(this.getData(), agent.getID()));
      let action = agent.send();
      this.actions.push({
        agentID: agent.getID(),
        action
      });
      this.problem.update(this.data, action, agent.getID());

      if (this.problem.goalTest(this.data)) {
        this.finishAll();
        return false;
      } else {
        if (this.callbacks.onTurn) {
          this.callbacks.onTurn({
            actions: this.getActions(),
            data: this.data
          });
        }

        if (this.currentAgentIndex >= keys.length - 1) this.currentAgentIndex = 0;else this.currentAgentIndex++;
        return true;
      }
    }
  }
  /**
   * Virtual life loop. At the end of every step it executed the onTurn call back. It could b used for animations of login
   */


  loop() {
    let stop = false;

    while (!stop) {
      //Creates a thread for every single agent
      Object.values(this.agents).forEach(agent => {
        if (!this.problem.goalTest(this.data)) {
          agent.receive(this.problem.perceptionForAgent(this.getData(), agent.getID()));
          let action = agent.send();
          this.actions.push({
            agentID: agent.getID(),
            action
          });
          this.problem.update(this.data, action, agent.getID());

          if (this.problem.goalTest(this.data)) {
            stop = true;
          } else {
            if (this.callbacks.onTurn) this.callbacks.onTurn({
              actions: this.getActions(),
              data: this.data
            });
          }
        }
      });
    }

    this.finishAll();
  }
  /**
   * This function is executed once the virtual life loop is ended. It must stop every single agent in the pool
   * and execute the onFinish callback 
   */


  finishAll() {
    // Stop all the agents
    Object.values(this.agents).forEach(agent => {
      //agent.stop();
      this.unregister(agent);
    }); //Execute the callback

    if (this.callbacks.onFinish) this.callbacks.onFinish({
      actions: this.getActions(),
      data: this.data
    });
  }
  /**
   * Return a copu of the agent controller data. The returned object contains the data of the problem (world) and the
   * state of every single agent in the controller pool (states)
   */


  getData() {
    return this.data;
  }
  /**
   * Return the history of the actions performed by the agents during the current virtual life loop
   */


  getActions() {
    return JSON.parse(JSON.stringify(this.actions));
  }
  /**
   * This function stop all the threads started by the agent controller and stops registered agents
   */


  stop() {
    this.finishAll();
  }

}

module.exports = AgentController;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Problem = __webpack_require__(2);

const Agent = __webpack_require__(3);

const AgentController = __webpack_require__(0);

module.exports = {
  Problem,
  Agent,
  AgentController
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const AgentController = __webpack_require__(0);
/**
 * This class specifies the problem to be solved
 */


class Problem {
  constructor(initialState) {
    this.controller = new AgentController();
  }
  /**
   * Check if the given solution solves the problem. You must override
   * @param {Object} solution 
   */


  goalTest(solution) {} //TODO return boolean

  /**
   * The transition model. Tells how to change the state (data) based on the given actions. You must override
   * @param {} data 
   * @param {*} action 
   * @param {*} agentID 
   */


  update(data, action, agentID) {} //TODO modify data

  /**
   * Gives the world representation for the agent at the current stage
   * @param {*} agentID 
   * @returns and object with the information to be sent to the agent
   */


  perceptionForAgent(data, agentID) {} //TODO return the perception

  /**
   * Add a new agent to solve the problem
   * @param {*} agentID 
   * @param {*} agentClass 
   * @param {*} initialState 
   */


  addAgent(agentID, agentClass, initialState) {
    let agent = new agentClass(agentID);
    this.controller.register(agent, initialState);
  }
  /**
   * Solve the given problem
   * @param {*} world 
   * @param {*} callbacks 
   */


  solve(world, callbacks) {
    this.controller.setup({
      world: world,
      problem: this
    });
    this.controller.start(callbacks, false);
  }
  /**
  * Returns an interable function that allow to execute the simulation step by step
  * @param {*} world 
  * @param {*} callbacks 
  */


  interactiveSolve(world, callbacks) {
    this.controller.setup({
      world: world,
      problem: this
    });
    return this.controller.start(callbacks, true);
  }

}

module.exports = Problem;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

//const tf = require('@tensorflow/tfjs-node');
class Agent {
  constructor(name) {
    this.id = name;

    if (!name) {
      this.id = Math.round(Math.random() * 10e8);
    }

    this.state = null;
    this.perception = null;
    this.table = {
      "default": 0
    };
  }
  /**
   * Setup of the agent. Could be override by the class extension
   * @param {*} parameters 
   */


  setup() {
    let initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.initialState = initialState;
  }
  /**
   * Function that receive and store the perception of the world that is sent by the agent controller. This data is stored internally
   * in the this.perception variable
   * @param {Object} inputs 
   */


  receive(inputs) {
    this.perception = inputs;
  }
  /**
   * Inform to the Agent controller about the action to perform
   */


  send() {
    return table["deafult"];
  }
  /**
   * Return the agent id
   */


  getLocalName() {
    return this.id;
  }
  /**
    * Return the agent id
    */


  getID() {
    return this.id;
  }
  /**
   * Do whatever you do when the agent is stoped. Close connections to databases, write files etc.
   */


  stop() {}

}

module.exports = Agent;

/***/ })
/******/ ]);
});
//# sourceMappingURL=ai-agents.js.map