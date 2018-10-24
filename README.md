# Sudoku-Solver
Javascript Sudoku Solver

This is a Sudoku solver I wrote using javascript.  I initialy wrote a version for native android but I felt it would be easier to share if it were available in browser.

The solver uses a depth first algorithm and returns the first solution it finds.  

One challange when solving a problem like this in javascript is javascript's very limited multi-threading and avoiding locking the UI while the puzzle is solving. I used some sudo-multi-threading by solving the puzzle in increments.  This allowed for the feature of variable speeds, which lets one to see the steps the algorithm.

Using a depth first algorithm gaurantees a solution and is not affected by the difficulty of the puzzle.  It could potentially be quite time consuming especially if say the first line in the puzzle could only be solved as [9 8 7 6 5 4 3 2 1].  In this case, the algorithm would begin by guessing [1 2 3 4 5 6 7 8 9] and would have to cycle back exsesivly.  




