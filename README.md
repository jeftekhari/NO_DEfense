##NO_DEfense.

A simulated tower defense game using NodeJS libraries.

#Prompt
Problem Statement:
We will simulate a game where the goal is to kill the enemies by using a tower.
You need to kill enemies faster as possible.
At each turn, first you fire one time, then each enemy moves to the tower.
If an ennemie reach the tower, you loose.
Input:
The first line is firing range.
Each next line represents an enemy.
First column, it’s the enemy name. The second column is the initial distance. And the last
column is the speed.
Output:
A each turn, you will info the killed enemy.
At the end, you will inform if you win or lose and the count of played turn.
In case of lost, calculate the minimal firing range to win the game agains same enemies.
Sample:
Sample Input
50m
BotA 100m 10m
BotB 50m 20m
BotC 30m 20m
Sample Output
Firing range is 50m
Turn 1: Kill BotC at 30m
Turn 2: Kill BotB at 30m
Turn 6: Kill BotA at 50m
You win in 6 turns

Tasks
- Write this game to be executed on NodeJs 0.12.14
- You can write unit tests
- NPM available libs are : lodash, winston, chance, should, mocha

#Instructions

Step 1: `npm install` the dependencies

Step 2: `npm start` starts the script with the default testcase. To add your own special test cases, add a `.txt` file to the tests folder and pass the path as an arguement.
