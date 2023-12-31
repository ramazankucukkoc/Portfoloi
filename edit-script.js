getData();
function getData(){
    fetch("./data.json")
    .then(res=> res.json())
    .then(data=> {
        setAboutInformationToElement(data.aboutMe);
        setNavigationToElement(data.navigations);
        setFormElementByData(data.aboutMe);
    });
}

let aboutMe = {};


function setAboutInformationToElement(aboutMe) {    
    const navNameElement = document.querySelector("nav div h1");    
    const avatarElement = document.querySelector("nav div img");
   
    navNameElement.innerText = aboutMe.name;   
    avatarElement.src = aboutMe.avatar;
}


function setNavigationToElement(navigations){
    document.querySelector("nav ul").innerHTML = "";
    for(const nav of navigations){
        document.querySelector("nav ul").innerHTML += 
        `<li>
            <a href="${nav.path}">
                <i class="${nav.icon}"></i>
                ${nav.name}
            </a>               
        </li>`
    }
}

function setFormElementByData(parameter){
    aboutMe = parameter;
    const nameEl = document.getElementById("name");

    nameEl.value = aboutMe.name;
}

async function save(event) {
   
    event.preventDefault();
    
    const nameEl = document.getElementById("name");
      
    aboutMe.name = nameEl.value;

    console.log(aboutMe);
    await fetch("http://localhost:8080/aboutMe", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aboutMe)
    });
}