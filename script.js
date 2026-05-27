currentState = {
    stage: 0,
    supplies: 0
} 
/**
 * flow is an array accessed by flow[stage,supplies]
 * output is an array of supplies values that are options for the next stage
 * Ex: at stage 1, supplies 1, you have 3 choices to go to: supplies 0,1, or 2
 *      so flow[1,1] returns dictionary containing content for stage 2 with supplies 0,1, or 2
 */
const flow = [
    [ //stage 0
        { //supplies 0 (Since its the start, you can only have 0 supplies here)
            question: `Congratulations, your officially the captain of your brand new spaceship!
            In order to celebrate, you decide to take your ship on a trip to saturn. You suppose you
            should pack some stuff first though. How much supplies do you choose to bring?`,
            options: [
                {
                    newSupplies: 0,
                    buttonText: "I don't need supplies, Saturn here I come!"
                },
                {
                    newSupplies: 1,
                    buttonText: "I guess i should spend some time gathering food and fuel."
                },
                {
                    newSupplies: 2,
                    buttonText: "I will make sure I am adequately prepared before going out."
                }
            ]
        }
    ], 
    [ //stage 1
        { //supplies 0
            question: `You head out in a rush to explore the stars! Before long 
            you find yourself a feeling a bit hungry.`,
            options: [
                {
                    newSupplies: 0,
                    buttonText: "I'll be fine, I will not delay my trip any longer!"
                },
                {
                    newSupplies: 1,
                    buttonText: `I should stop for food somewhere, maybe something from The Red Burger${String.fromCharCode(8482)}.`
                }
            ]
        },
        { //supplies 1
            question: "You head out after grabbing some food and refueling the ship. Before long you find yourself feeling a bit hungry.",
            options: [
                {
                    newSupplies: 0,
                    buttonText: "Im too busy to eat!"
                },
                {
                    newSupplies: 1,
                    buttonText: "I'll eat my food supplies so I do not have to stop."
                },
                {
                    newSupplies: 2,
                    buttonText: `I should stop for food somewhere and conserve my emergency food.
                     Maybe something from The Red Burger${String.fromCharCode(8482)}?`
                }
            ]
        },
        { //supplies 2
            question: "You spend your time making sure you have gathered everything you will need for your long trip. Once you have left you start to feel hungry.",
            options: [
                {
                    newSupplies: 1,
                    buttonText: "I'll eat from my food supplies and save some time on my trip."
                },
                {
                    newSupplies: 2,
                    buttonText: `I should stop for food somewhere and conserve my emergency food.
                     Maybe something from The Red Burger${String.fromCharCode(8482)}?`
                }
            ]
        }
    ],
    [ //stage 2
        { //supplies 0
            question: "Your almost there, but your fuel tank is running low!",
            options: [
                {
                    newSupplies: 0,
                    buttonText: "It will be ok, its just a little further..."
                },
                {
                    newSupplies: 1,
                    buttonText: "I should check for some emergency fuel in my storage."
                }
            ]
        },
        { //supplies 1
            question: "Your fuel tank is looking a little bit empty, maybe you should stop and refuel?",
            options: [
                {
                    newSupplies: 1,
                    buttonText: "I am sure it has enough fuel to make it to Saturn."
                },
                {
                    newSupplies: 2,
                    buttonText: "Topping up the tank would be a good decision."
                }
            ]
        },
        { //supplies 2
            question: "You notice your fuel is running low.",
            options: [
                {
                    newSupplies: 2,
                    buttonText: "Good thing I packed some extra fuel for the trip!"
                }
            ]
        }
    ],
    [ //stage 3
        { //supplies 0
            question: "Out of fuel and running low on food reserves, you realize you wont make it to Saturn. Begrudgingly you decide to call a tow ship for some help.",
            options: [
                {
                    newSupplies: -1,
                    buttonText: "Unfortunate. Next time maybe consider conserving your supplies better."
                }
            ]
        },
        { //supplies 1
            question: "Your fuel and food supplies barely made it to Saturn, the trip was longer than you thought! Saturns rings are beutiful, but you might need a tow home...",
            options: [
                {
                    newSupplies: -1,
                    buttonText: "Congratulations on making it to saturn! Consider retrying and conserving some more supplies"
                }
            ]
        },
        { //supplies 2
            question: "You make it to Saturn! With plenty of food and fuel to spare for the trip home too.",
            options: [
                {
                    newSupplies: -1,
                    buttonText: "Saturn's rings are beautiful!"
                }
            ]
        },
    ]
]

//example of flow array accessing with log statements
/* 
console.log(flow[currentState.stage][currentState.supplies])
console.log("current supplies: ",currentState.supplies)
console.log(flow[currentState.stage][currentState.supplies]["question"])
options = flow[currentState.stage][currentState.supplies]["options"].forEach((option,index) => {
    console.log(option.buttonText)
    console.log("button with nextQuestion(",option.newSupplies,")")
});
*/

function nextQuestion(newSupplies){
    /**
     * takes in the new supplies value, and then moves to the next stage
     * also displays appropriate screen for that stage and supplies value
     */

    currentState.stage += 1
    currentState.supplies = newSupplies

    if (newSupplies === -1){
        currentState.stage = 0
        currentState.supplies = 0
    }

    renderQuestion()
}

function renderQuestion(){
    //renders the appropriate screen given the current stage and supplies level

    clearOldContent()

    //grabs new state information from flow based on currentState
    state = flow[currentState.stage][currentState.supplies]
    questionText = state["question"]
    options = state["options"]

    //creates new HTML elements based on new state information
    question = document.getElementById("question")
    question.innerHTML = questionText

    answersList = document.getElementById("answers")
    options.forEach((option,index) => {
        newButton = document.createElement("button")
        newButton.setAttribute("class","next-btn")
        newButton.setAttribute("onclick",`nextQuestion(${option.newSupplies})`)
        newButton.innerHTML = option.buttonText

        //appends to buttons list
        answersList.appendChild(newButton)
    });

    updateGraphics()

}

function clearOldContent(){
    //grab old objects
    question = document.getElementById("question")
    oldAnswerButtons = document.getElementsByClassName("next-btn")
    //console.log(oldAnswerButtons)

    //clears current stage of old content
    question.innerHTML = ""
    Array.from(oldAnswerButtons).forEach((element,index) => { //array.from converts getElements list to a real array
        element.remove();
    });
}

function updateGraphics(){
    //updates progress bar fill based on stage
    progressBar = document.getElementById("progress-bar-fill")
    progressBar.style.width = `${(currentState.stage)*33}%`
    progressBar.style.backgroundColor = "rgb(84, 104, 255)"
    //updates the images with the stage to make saturn moving closer
    saturn = document.getElementById("saturn-container")
    if (currentState.stage === 0){
        saturn.style.height = "10%"; 
    }
    else if (currentState.stage === 1){
        saturn.style.height = "50%"; 
    }
    else if (currentState.stage === 2){
        saturn.style.height = "100%"; 
    }
    else if (currentState.stage === 3){
        saturn.style.height = "200%"; 
        progressBar.style.width = `100%`;
        progressBar.style.backgroundColor = "green";
        //special case where on failure ending, you dont make it all the way to saturn
        if (currentState.supplies === 0){
            //return saturn to stage 2 size
            saturn.style.height = "100%";
            //dont completely fill progress bar
            progressBar.style.width = `${(currentState.stage)*33}%`
            progressBar.style.backgroundColor = "red";
        }
    }
}
//renders the first question on page load
renderQuestion()