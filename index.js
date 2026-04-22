  return this.fn + '(' + this.child.toString() + ')';
};
UnaryNode.prototype.clone = function() {
  return new UnaryNode(this.fn, this.child.clone());
};
UnaryNode.prototype.size = function() {
  return 1 + this.child.size();
};
function mulberry32(seed) {
  return function() {
    seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
var _rng = mulberry32(42);
function rand() { return _rng(); }
function randInt(n) { return Math.floor(rand() * n); }
function pick(arr) { return arr[randInt(arr.length)]; }
var USEFUL_CONSTANTS = [0, 1, 2, 3, -1, 0.5, Math.PI, Math.E, 10];
var BIN_OP_NAMES = ['+', '-', '*', '/', '**'];
var UNARY_FN_NAMES = ['sin', 'cos', 'abs', 'sqrt', 'neg', 'ln'];
function randomTree(vars, maxDepth, depth) {
  if (depth === undefined) depth = 0;
  if (depth >= maxDepth) {
    if (rand() < 0.6 && vars.length > 0) {
      return new VarNode(pick(vars));
    }
    return new ConstNode(rand() < 0.7 ? pick(USEFUL_CONSTANTS) : (rand() * 10 - 5));
  }
  var termProb = 0.3 + (depth / maxDepth) * 0.3;
  var r = rand();
  if (r < termProb) {
    if (rand() < 0.6 && vars.length > 0) {
      return new VarNode(pick(vars));
    }
    return new ConstNode(rand() < 0.7 ? pick(USEFUL_CONSTANTS) : (rand() * 10 - 5));
  } else if (r < termProb + 0.15) {
    return new UnaryNode(pick(UNARY_FN_NAMES), randomTree(vars, maxDepth, depth + 1));
  } else {
    return new BinOpNode(
      pick(BIN_OP_NAMES),
      randomTree(vars, maxDepth, depth + 1),
      randomTree(vars, maxDepth, depth + 1)
    );
  }
}
function allNodes(tree) {
  var nodes = [{node: tree, parent: null, field: null}];
  var stack = [{node: tree, parent: null, field: null}];
  while (stack.length > 0) {
    var cur = stack.pop();
    var n = cur.node;
    if (n.type === 'binop') {
      var lEntry = {node: n.left, parent: n, field: 'left'};
      var rEntry = {node: n.right, parent: n, field: 'right'};
      nodes.push(lEntry, rEntry);
      stack.push(lEntry, rEntry);
    } else if (n.type === 'unary') {
      var cEntry = {node: n.child, parent: n, field: 'child'};
      nodes.push(cEntry);
      stack.push(cEntry);
    }
  }
  return nodes;
}
function crossover(parent1, parent2) {
  var child1 = parent1.clone();
  var child2 = parent2.clone();
  var nodes1 = allNodes(child1);
  var nodes2 = allNodes(child2);
  var pick1 = nodes1[randInt(nodes1.length)];
  var pick2 = nodes2[randInt(nodes2.length)];
  if (pick1.parent && pick2.parent) {
    var temp = pick1.node.clone();
    pick1.parent[pick1.field] = pick2.node.clone();
    pick2.parent[pick2.field] = temp;
  } else if (pick1.parent) {
    pick1.parent[pick1.field] = pick2.node.clone();
  } else if (pick2.parent) {
    pick2.parent[pick2.field] = pick1.node.clone();
var x=1;
module.exports = {x:x};
