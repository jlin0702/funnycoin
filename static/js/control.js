const members = []

let topics = document.getElementsByClassName("topic");
for (let i = 0; i < topics.length; i++) {
    topics[i].addEventListener("click", () => {
        for (j = 0; j < topics.length; j++) {
            document.getElementById("t"+j).className = "topic center"
            document.getElementById("p"+j).style.display = "none"
        }
        document.getElementById("p"+i).style.display = "block"
        document.getElementById("t"+i).className += " highlighted"
    })
}


document.getElementById("login").addEventListener("click", () => {
    let key = prompt("Please enter your key")
    let key2 = prompt("Please enter key 2")
})

document.getElementById("getkey").addEventListener("click", () => {
    let member = new Member()
    alert("Here's your key:\n" + "Private: " + member.privateKey + "\nPublic: " + member.publicKey)
    members.append(member)
})