const confirm_sent = document.getElementById("contactStatus");
const confirm_sent_no = document.getElementById("contactStatusno");
const sent_msg = document.getElementById("submit");
const namein = document.getElementById("name");
const emailin = document.getElementById("email");
const emailin = document.getElementById("message");

sent_msg.addEventListener("click", function (e) {
   e.preventDefault();
});

const name =namein.value.trim();
const email =emailin.value.trim();
const message =emailin.value.trim();
if(name && email && message === ""){
        confirm_sent.classList.remove("hidden")
        confirm_sent.classList.remove("block")
}else{
        confirm_sentno.classList.remove("hidden")
        confirm_sentno.classList.remove("block")
}

  setTimeout(() => {
            successMsg.classList.add("block");
            successMsg.classList.remove("hidden");
        }, 40);