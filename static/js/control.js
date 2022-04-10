
let topics = document.getElementsByClassName("topic");
for (let i = 0; i < topics.length; i++) {
    topics[i].addEventListener("click", () => {
        for (j = 0; j < topics.length; j++) {
            //reset all
            document.getElementById("t"+j).className = "topic center"
            document.getElementById("p"+j).style.display = "none"
        }
        //make special
        document.getElementById("p"+i).style.display = "block"
        document.getElementById("t"+i).className += " highlighted"
    })
}

//button click for login
document.getElementById("login").addEventListener("click", () => {
    if (document.getElementById("login").innerText == "Login") {
        document.getElementById("user_info").style.display = "block"
        document.getElementById("getkey").style.display = "none"
        document.getElementById("login").innerText = "Logout"
    } else {
        document.getElementById("user_info").style.display = "none"
        document.getElementById("getkey").style.display = "block"
        document.getElementById("login").innerText = "Login"
    }
})

//button click for get keys
document.getElementById("getkey").addEventListener("click", () => {
    alert("Here's your key: ###########")
})

