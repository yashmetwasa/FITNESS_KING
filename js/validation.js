//alert("running");
// var inputs = document.querySelectorAll("input");
// console.log(inputs);

document.addEventListener("DOMContentLoaded",function(){
    
    //all form regular expression

var inputvalidate=document.querySelectorAll("input");
console.log(inputvalidate);

var patternvalidate={
    firstname:/^[a-z\s]{5,20}$/is,
    email:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/is,
    address:/^[\d\w.\s,-]{10,100}$/i,
    city:/^[a-z]{5,12}$/is,
    state:/^[A-Z]{2}$/s,
    zip:/^[a-z0-9\s]{7}$/is,
    cardnumber:/^[\d-]{19}$/s,
    telephone:/^[\d-]{12}$/s,
    expyear:/^[\d/]{5}$/s,
    cvv:/^[\d]{3}$/s,
    }
    
    function validate(field, regex)
    {
      if(regex.test(field.value)){
        field.className = "valid";
      }else{
        field.className = "invalid";
      }
    }
    
    inputvalidate.forEach(function(inputverify){
      inputverify.addEventListener("keyup",(e)=>{
        validate(e.target,patternvalidate[e.target.attributes.name.value])
      })
      
    })       


})