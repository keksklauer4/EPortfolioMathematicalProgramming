# E-Portfolio on Mathematical Programming
Presentation and examples of my E-Portfolio for Software Engineering lecture

Presentation can be found [here](https://github.com/keksklauer4/EPortfolioMathematicalProgramming/blob/master/presentation/julien_se_presentation.pdf). It is marvellous!

I added two examples in JS (awful language and awful module):
- [max independent set](https://github.com/keksklauer4/EPortfolioMathematicalProgramming/blob/master/js/src/maximum_independent_set.js)
- [chromatic number](https://github.com/keksklauer4/EPortfolioMathematicalProgramming/blob/master/js/src/chromatic_number.js) (graph coloring)

A lot of (much better) examples in a proper language can be found [here](https://github.com/keksklauer4/SCIP_Wrapper).

## How to run?
Just navigate to ```js/src/``` and execute ```node <file>.js``` with file either being
- ```chromatic_number``` for graph coloring (color nodes with adjacent nodes colored differently) or
- ```maximum_independent_set``` for calculating the maximum independent set (maximize the amount of nodes you can select with the constraint that no two selected nodes are allowed to be adjacent).

## Where can I find more material on this?
For a general introduction to concepts of linear programming, I advise to have a look at [Tim Roughgarden's lectures on Algorithms](https://youtube.com/playlist?list=PLEGCF-WLh2RJh2yDxlJJjnKswWdoO8gAc) (starts with max flow and other typical "simple" problems and then dives into the topic of linear programming) and use some wrapper around a (MI)LP solver.

In fact, I wrote a [wrapper for (MI)LPs](https://github.com/keksklauer4/SCIP_Wrapper) and started one for QUBO (not covered in this presentation). There are a lot of examples that could help getting started.
