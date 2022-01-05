let timer
let deleteFirstPhotoDelay
 const form = document.getElementById("inputForm")

 form.addEventListener('submit',function (e){
     e.preventDefault()
})

async function get(){
        const response=await fetch("https://foodish-api.herokuapp.com/api/")
        console.log(response)
        let data= await response.json()
         console.log(data)
}

get()

fetch('https://foodish-api.herokuapp.com/api/')
.then(function (response){
    return response.json();
}).then(function (obj){
    console.log(obj);
    console.log(obj.image);
   
document.getElementById('value1').innerHTML = '<div>' + obj.image +'</div>';

 
})
function createDishList(foodList) {
    document.getElementById("value1").innerHTML = `
    <select onchange="loadByDish(this.value)">
          <option>Choose a dish</option>
          ${Object.keys(images).map(function (value1) {
            return `<option>${value1}</option>`
          }).join('')}
        </select>
    `
  }
  
  async function loadByDish(value1) {
    if (value1 != "Choose a dish") {
      const response = await fetch("https://foodish-api.herokuapp.com/images/")
      const data = await response.json()
      createSlideshow(data.message)
    }
  }
  
  function createSlideshow(images) {
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    
    if (images.length > 1) {
      document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    currentPosition += 2
    if (images.length == 2) currentPosition = 0
    timer = setInterval(nextSlide, 3000)
    } else {
      document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `
    }
  
    function nextSlide() {
      document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
      deleteFirstPhotoDelay = setTimeout(function () {
        document.querySelector(".slide").remove()
      }, 1000)
      if (currentPosition + 1 >= images.length) {
        currentPosition = 0
      } else {
        currentPosition++
      }
    }
  }



// get Data
const nameInput= document.querySelector("#name");
const email= document.querySelector("#email");
const message= document.querySelector("#message");
const success= document.querySelector("#success");
const errorNodes= document.querySelectorAll(".error");

// validate data
function validateForm(){

    clearMessage();
   let  errorR = true;

 if(nameInput.value.length< 1){
    errorNodes[0].innerText= "to be filled";
    nameInput.classList.add('error-border');
    errorR= true;
}

if( !validEmail(email.value)){
    errorNodes[1].innerText= " invalid";
    email.classList.add('error-border');
    errorR= true;
}
if(message.value.length < 1){
    errorNodes[2].innerText= "type message";
    message.classList.add('error-border');
    errorR= true;
}
if(!errorR){
    success.innerText= "success!";
}
}
// clear error / success messages
function clearMessage(){
    for(i=0; 1< errorNodes.length; i++){
        errorNodes[i].innerText="";
    }
    success.innerText=" "
    nameInput.classList.remove("error-border");
    email.classList.remove("error-border");
    message.classList.remove("error-border");


}

