# Adventure Game

## Story and planning

- space themed
- rough plot
    - start at a space station
    - goal is to make it to next space station
    - first decision is gather supplies
        - this determines starting supplies level
    - face decisions which raise or lower you supplies level
    - reach one of three endings based on supplies level at the end
- every stage will list your current supplies, and choices to choose from based on an event

## Game State Planning

- game state stored as a pair of numbers
    - stage: stores values 0 to however many events there are
    - supplies: stores value 0-2 for supplies low, medium, and high
- IDEA: store a 2d array of where all options can lead to
    - so if you go to array[stage][supplylevel] = [where to go]

- all options flowchart
    - (0,0)[start] -> (1,0) or (1,1) or (1,2)
    - stage 1
        - (1,0) -> (2,0) or (2,1)
        - (1,1) -> (2,0) or (2,1) or (2,2)
        - (1,2) -> (2,1) or (2,1)
    - stage 2
        - (2,0) -> (3,0) or (3,1) 
        - (2,1) -> (3,1) or (3,2)
        - (2,2) -> (3,2)
    - stage 3 (end)
        - (3,0) = fail ending
        - (3,1) = medium ending
        - (3,2) = good ending
