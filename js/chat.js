$(document).ready(function(){

const responses=[

"That's a great question!",
"I can help you with that.",
"Let me explain that.",
"Interesting idea!",
"Here is something useful."

];


/* SCROLL CHAT TO BOTTOM */

function scrollBottom(){

let container=$("#messages");

container.scrollTop(container[0].scrollHeight);

}


/* FORMAT MESSAGE (BOLD / ITALIC / CODE) */

function formatMessage(text){

text=text.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>");

text=text.replace(/\*(.*?)\*/g,"<i>$1</i>");

text=text.replace(/`(.*?)`/g,"<code>$1</code>");

return text;

}


/* ADD MESSAGE */

function addMessage(text,sender){

let time=new Date().toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
});

let html=`
<div class="message ${sender}">
<div class="bubble">
<p>${formatMessage(text)}</p>
<small>${time}</small>
</div>
</div>
`;

$("#messages").append(html);

scrollBottom();

}


/* AI TYPING ANIMATION */

function typeMessage(text){

let i=0;

let msg=$(`
<div class="message ai">
<div class="bubble"><p></p></div>
</div>
`);

$("#messages").append(msg);

let interval=setInterval(function(){

msg.find("p").append(text.charAt(i));

i++;

if(i>=text.length){
clearInterval(interval);
}

scrollBottom();

},40);

}


/* SEND MESSAGE */

function sendMessage(){

let text=$("#input").val().trim();

if(text==="") return;

addMessage(text,"user");

/* clear input */

$("#input").val("");

$("#sendBtn").prop("disabled",true);

/* hide welcome screen */

$("#welcome").hide();

/* show typing indicator */

$("#typing").show();


setTimeout(function(){

$("#typing").hide();

let reply=responses[Math.floor(Math.random()*responses.length)];

typeMessage(reply);

},1500);

}


/* SEND BUTTON */

$("#sendBtn").click(sendMessage);


/* INPUT TYPING */

$("#input").on("input",function(){

let text=$(this).val().trim();

$("#sendBtn").prop("disabled",text==="");

/* auto resize textarea */

this.style.height="auto";
this.style.height=this.scrollHeight+"px";

});


/* ENTER KEY */

$("#input").keydown(function(e){

if(e.key==="Enter" && !e.shiftKey){

e.preventDefault();

sendMessage();

}

});


/* SIDEBAR TOGGLE */

$(".hamburger").click(function(){
$(".sidebar").addClass("active");
$(".overlay").fadeIn();
});

$(".overlay").click(function(){
$(".sidebar").removeClass("active");
$(".overlay").fadeOut();
});


/* DARK MODE */

$("#darkMode").click(function(){

$("body").toggleClass("dark");

});


/* EXPORT CHAT */

$("#exportChat").click(function(){

let chat="";

$(".bubble p").each(function(){

chat += $(this).text()+"\n";

});

let blob=new Blob([chat],{type:"text/plain"});

let link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="chat.txt";

link.click();

});

$(".suggestion").click(function(){

let text=$(this).find("p").text();

$("#input").val(text);

$("#sendBtn").prop("disabled",false);

$("#sendBtn").click();

});

});