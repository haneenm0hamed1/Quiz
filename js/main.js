const btn_start = document.getElementById('btn-start')
const rules_box = document.getElementById('rules-box')
const exit = document.getElementById('exit')
const Continue= document.getElementById('begin');
const quiz_box= document.getElementById('quiz-box');
const next_Que=document.getElementById('next-btn')
const options=document.querySelector('.options')
const timeCount=document.getElementById('timer-sec')
//start btn

btn_start.onclick =function(){
    rules_box.style.display='block';
    btn_start.style.display='none';
}
//exit btn
exit.onclick=function(){
    rules_box.style.display='none';
    btn_start.style.display='block';
}
//continue
Continue.onclick=function(){
    rules_box.style.display='none';
    btn_start.style.display='none';
    quiz_box.style.display='block';
    ShowQuestions(0)
    Counter(1)
  startTime(5)
}
let Que_count=0;
let Que_num=1
let timer;
let timevalue=5
let UserScor=0;
let result_box=document.getElementById('result')
let Quit=result_box.querySelector('.buttons .exit')
Quit.onclick=function exit(){
   window.location.reload()

}


//nxt q
next_Que.onclick=function next(){
    next_Que.style.display='none'
    if(Que_count < Questions.length -1){
        Que_count++;
        Que_num++;
        clearInterval(calc)
        startTime(timevalue)
        ShowQuestions(Que_count)
        Counter(Que_num)
    }else{
        console.log('done')
        resultShowBox()
    }
}



//get questions
function ShowQuestions(index){
    const que_text= document.querySelector('.que-text');
    let Current_q=`<span>`+Questions[index].numb+`. `+Questions[index].question+`</span>`;
    let Current_O=`<div id='option' class="option"><span>`+Questions[index].options[0]+`</span></div>`
    +`<div id="option" class="option"><span>`+Questions[index].options[1]+`</</span></div>`
    +`<div id="option" class="option"><span>`+Questions[index].options[2]+`</</span></div>`
    +`<div id="option" class="option"><span>`+Questions[index].options[3]+`</</span></div>`
    que_text.innerHTML=Current_q
    options.innerHTML=Current_O
   const OptionList=document.querySelectorAll('.option')
   
   for (let i =0; i< OptionList.length; i++)
   {
    OptionList[i].setAttribute("onclick","selected(this)")
    
}

}


let Ticon= `<div class="icon t"><i class="fa-solid fa-check"></i></div>`
let Ficon=`<div class="icon f"><i class="fa-solid fa-x"></i></div>`

function selected(answer){
    clearInterval(calc)
    let Alloption=options.children.length
    let userans= answer.textContent;
    let Correctans= Questions[Que_count].answer
    if(userans==Correctans){
        UserScor+=1
    
        
answer.style.background='#33cc33'
answer.insertAdjacentHTML('beforeend',Ticon)

}else{
answer.classList.add('.wrong')
answer.style.background='#ff0000 '
answer.insertAdjacentHTML('beforeend',Ficon)


}
//one select
for(let i=0;i<Alloption;i++){
options.children[i].style.pointerEvents='none'
}
next_Que.style.display='block'
}  

//showbox
function resultShowBox(){
    rules_box.style.display='none';
    quiz_box.style.display='none';
    result_box.style.display='block'
let scoreText=document.getElementById('score-text')
if(UserScor>7){
    let scorTag=`<span> You Got <p>`+UserScor+`</p> Out of <p>`+Questions.length+`🤩</p></span>`
    scoreText.innerHTML=scorTag
}
else if(UserScor>3){
    let scorTag=`<span> You Got <p>`+UserScor+`</p> Out of <p>`+Questions.length+`🤓</p></span>`
    scoreText.innerHTML=scorTag
} 
else{
    let scorTag=`<span> You Got Only <p>`+UserScor+`</p> Out of <p>`+Questions.length+`😔</p></span>`
    scoreText.innerHTML=scorTag
}

}





//timer
function startTime(time){
    calc=setInterval(timer,1000)
    function timer(){
        timeCount.textContent=time
        time--;
        if(time<0){
            clearInterval(calc)
            next_Que.style.display='block';
            let Alloption=options.children.length
            for(let i=0;i<Alloption;i++){
                options.children[i].style.pointerEvents='none'
            }
            next_Que.style.display='block'
            
        }
    }
    
}

function Counter(index){
    const count=document.getElementById('total');
    let Current_Count=`<span><p>`+index+`</p>of<p>`+Questions.length+`</p>Questions</span>`
    count.innerHTML=Current_Count
}