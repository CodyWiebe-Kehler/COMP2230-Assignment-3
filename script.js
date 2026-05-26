currentState = {
    stage: 0,
    supplies: 0
} 
/**
 * flow is an array accessed by flow[stage,supplies]
 * output is an array of supplies values that are options for the next stage
 * Ex: at stage 1, supplies 1, you have 3 choices to go to: supplies 0,1, or 2
 *      so flow[1,1] returns [0,1,2]
 */
const flow = [
    [ //stage 0
        { //supplies 0 (Since its the start, you can only have 0 supplies here)
            question: "how much supplies do you want to start",
            options: [
                {
                    newSupplies: 0,
                    buttonText: "choose 0 supplies"
                },
                {
                    newSupplies: 1,
                    buttonText: "choose 1 supplies"
                },
                {
                    newSupplies: 2,
                    buttonText: "choose 2 supplies"
                }
            ]
        }
    ], 
    [ //stage 1
        { //supplies 0
            question: "how much supplies do you want",
            options: [
                {
                    newSupplies: 0,
                    buttonText: "choose 0 supplies"
                },
                {
                    newSupplies: 1,
                    buttonText: "choose 1 supplies"
                }
            ]
        },
        { //supplies 1
            question: "how much supplies do you want",
            options: [
                {
                    newSupplies: 0,
                    buttonText: "choose 0 supplies"
                },
                {
                    newSupplies: 1,
                    buttonText: "choose 1 supplies"
                },
                {
                    newSupplies: 2,
                    buttonText: "choose 2 supplies"
                }
            ]
        },
        { //supplies 2
            question: "how much supplies do you want",
            options: [
                {
                    newSupplies: 1,
                    buttonText: "choose 1 supplies"
                },
                {
                    newSupplies: 2,
                    buttonText: "choose 2 supplies"
                }
            ]
        }
    ],
    [ //stage 2
        { //supplies 0
            question: "how much supplies do you want",
            options: [
                {
                    newSupplies: 0,
                    buttonText: "choose 0 supplies ending"
                },
                {
                    newSupplies: 1,
                    buttonText: "choose 1 supplies ending"
                }
            ]
        },
        { //supplies 1
            question: "how much supplies do you want",
            options: [
                {
                    newSupplies: 1,
                    buttonText: "choose 1 supplies ending"
                },
                {
                    newSupplies: 2,
                    buttonText: "choose 2 supplies ending"
                }
            ]
        },
        { //supplies 2
            question: "how much supplies do you want",
            options: [
                {
                    newSupplies: 2,
                    buttonText: "choose 2 supplies ending"
                }
            ]
        }
    ],
    [ //stage 3
        { //supplies 0
            question: "0 supplies ending",
            options: [
                {
                    newSupplies: 0,
                    buttonText: "reset game"
                }
            ]
        },
        { //supplies 1
            question: "1 supplies ending",
            options: [
                {
                    newSupplies: 0,
                    buttonText: "reset game"
                }
            ]
        },
        { //supplies 2
            question: "2 supplies ending",
            options: [
                {
                    newSupplies: 0,
                    buttonText: "reset game"
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

renderQuestion()