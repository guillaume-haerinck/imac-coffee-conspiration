import "./hacked.scss";


document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById(`mac-crash`).style.display = 'block';
});

document.onmousedown = function() {
    console.log("man");
    
    setTimeout(function(){ 
        document.getElementById(`mac-crash`).style.display = 'none';
    }, 3000);
}
