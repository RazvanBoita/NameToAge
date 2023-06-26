const input=document.querySelector(".search-bar input");
const searchBtn=document.querySelector(".search");
const searchBar=document.querySelector(".search-bar");
const afterSearch=document.querySelector(".after-search");
const thup=document.querySelector(".thumbs-up");
const thdown=document.querySelector(".thumbs-down");
const popup=document.querySelector(".popup");
const personalised=document.querySelector(".personalised");
const tryAgainButton=document.querySelector(".button");
const getCount=document.querySelector(".count");
const getAge=document.querySelector(".age");
searchBtn.addEventListener("click",performSearch);
input.addEventListener("keypress",function(Event){
    if(Event.key=="Enter")
        performSearch();
    else return;
});
function performSearch(){
    const name=input.value;
    //call the api
    
    const apiCall=`https://api.agify.io?name=${name}`;
    searchBar.style.visibility="visible";
    afterSearch.style.visibility="hidden";
    thup.style.visibility="hidden";
    thdown.style.visibility="hidden";
    popup.style.visibility="hidden";
    //getAge.style.visibility="hidden";
    //getCount.style.visibility="hidden";
    fetch(apiCall)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        const age=result.age;
        const count=result.count;
        getAge.innerText='Average age for this name is ' + age + ' years old';
        getCount.innerText='This name has been searched for ' + count + ' times.';
        getAge.classList.add("grow-in");
        getCount.classList.add("grow-in");
        thup.classList.add("slide-in");
        thdown.classList.add("slide-in");
        searchBar.style.visibility="hidden";
        afterSearch.style.visibility="visible";
        thup.style.visibility="visible";
        thdown.style.visibility="visible";
        getAge.style.visibility="visible";
        getCount.style.visibility="visible";
        thup.addEventListener("click",function(){
            popup.style.visibility="visible";
            popup.classList.add("grow-in");
            personalised.style.color="green";
            personalised.innerText="We are glad you liked the result!";
            tryAgainButton.style.background= "linear-gradient(220deg,#649173,#DBD5A4)";
        });
        thdown.addEventListener("click",function(){
            popup.style.visibility="visible";
            popup.classList.add("grow-in");
            personalised.style.color="red";
            personalised.innerText="Oops, sorry you didn't like the result...";
            tryAgainButton.style.background= "linear-gradient(220deg,#870000,#190A05)";
        });
        tryAgainButton.addEventListener("click",function(){
            popup.style.visibility="hidden";
            thdown.style.visibility="hidden";
            thup.style.visibility="hidden";
            searchBar.style.visibility="visible";
            getAge.style.visibility="hidden";
            getCount.style.visibility="hidden";
            input.value=""; 
            input.focus();
        })
    })
    
}