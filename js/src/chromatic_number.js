var lpsolve = require('lp_solve');
var Row = lpsolve.Row;

coloringGraph = {
  "nodes": [0,1,2,3,4,5,6,7,8,9],
  "edges": [
    [0,1],
    [1,2],
    [2,3],
    [3,4],
    [4,0],

    [0,5],
    [1,6],
    [2,7],
    [3,8],
    [4,9],

    [5,7],
    [5,8],
    [6,9],
    [6,8],
    [7,9]
  ]
};

function graphColoring(graph)
{
  var sufficientlyLarge = 2*graph["nodes"].length;
  var lp = new lpsolve.LinearProgram();
  var nodes = {};
  var edgeHelpers = {};

  var helperVar = lp.addColumn("lambda", false);

  for (var n of graph["nodes"])
  {
    var nodeVar = lp.addColumn("x"+String(n), true); // integer var as "color" for each node
    nodes[n] = nodeVar;
  }

  for (var edge of graph["edges"])
  {
    edgeHelpers[edge] = lp.addColumn("helper"+String(edge), false, true);
  }

  var objectiveFunc = new Row().Add(helperVar, 1);
  lp.setObjective(objectiveFunc);


  for (var [key, nodeVar] of Object.entries(nodes))
  {
    // "color" is defined to not be negative in our example
    var nonNegativeCst = new Row().Add(nodeVar, 1.0);
    lp.addConstraint(nonNegativeCst, "GE", 0, "nonnegativeCst"+String(key));

    // constraint nodeVar <= lambda (as in the pdf)
    // is the same as nodeVar - lambda <= 0
    var cst = new Row().Add(nodeVar, 1.0).Add(helperVar, -1.0);
    lp.addConstraint(cst, "LE", 0.0, "");
  }

  // adjacent nodes must be colored differently:
  for (var edge of graph["edges"])
  {
    // we need an inequality. For that we introduce a binary helper variable.
    // If you are interested in it, see
    // https://math.stackexchange.com/questions/37075/how-can-not-equals-be-expressed-as-an-inequality-for-a-linear-programming-model/1517850
    var binaryHelper = edgeHelpers[edge];
    var nodeVar1 = nodes[edge[0]];
    var nodeVar2 = nodes[edge[1]];

    var cst1 = new Row().Add(nodeVar1, 1.0).Add(nodeVar2, -1.0).Add(binaryHelper, sufficientlyLarge);
    lp.addConstraint(cst1, "GE", 1.0);

    var cst2 = new Row().Add(nodeVar1, 1.0).Add(nodeVar2, -1.0).Add(binaryHelper, sufficientlyLarge);
    lp.addConstraint(cst2, "LE", sufficientlyLarge - 1.0);
  }

  console.log(lp.solve());
  var colors = Math.round(lp.get(helperVar));
  for (var [key, nodeVar] of Object.entries(nodes))
  {
    console.log("Node ",key, " has color ", lp.get(nodeVar));
  }
  console.log("Used ", colors, " colors.");
  return colors;
}

graphColoring(coloringGraph);
