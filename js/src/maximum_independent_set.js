var lpsolve = require('lp_solve');
var Row = lpsolve.Row;

maxIndepGraph = {
  "nodes": [0,1,2,3,4,5,6,7],
  "edges": [
    [0,1],
    [1,2],
    [2,3],
    [3,0],

    [5,7],
    [7,6],
    [6,4],
    [4,5],

    [0,5],
    [1,7],
    [2,6],
    [3,4]
  ]
}

function solveMaxIndependentSet(graph)
{

  var lp = new lpsolve.LinearProgram();
  var nodes = {};

  var objectiveFunc = new Row();
  for (var n of graph["nodes"])
  {
    var nodeVar = lp.addColumn("x"+String(n), false, true);
    nodes[n] = nodeVar; // binary variable for each node

    objectiveFunc.Add(nodeVar, -1); // minimize the negative amount of nodes in the set
  }

  lp.setObjective(objectiveFunc);

  // create a constraint for each edge because at most one endpoint can be in the set.
  for (var edge of graph["edges"])
  {
    console.log(edge[0]);
    var constraint = new Row().Add(nodes[edge[0]], 1).Add(nodes[edge[1]], 1);
    lp.addConstraint(constraint, "LE", 1);
  }

  // solve and dump all values

  console.log(lp.dumpProgram());
  console.log(lp.solve());
  console.log("Amount nodes included: ", -lp.getObjectiveValue());

  var cardinality = 0;
  for (var [key, nodeVar] of Object.entries(nodes))
  {
    console.log("Node ", key, " has value ", lp.get(nodeVar));
    if (lp.get(nodeVar) == 1)
    {
      cardinality++;
    }
  }
  return cardinality;
}

solveMaxIndependentSet(maxIndepGraph);