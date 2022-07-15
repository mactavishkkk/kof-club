import character from "./character.js";
import { getCharacter } from "./characters-service.js";

//Ceate a array of save the characters of archive JSON
async function loadCharacter() {
    let characters = [];
    let charactersJSON = await getCharacter();

    charactersJSON.forEach(n => {
        const newCharacter = new character(n['id'], n['name'], n['description'], n['image']);
        characters.push(newCharacter);
    });
    
    //Sistema de pesquisa
    let text = renderCharacter(characters);

    for (let i in characters) {
        text += characters[i].name;
        characters[i].name = characters[i].name.toLowerCase();
    }

    search.onkeyup = function (e) {
        text = this.value;

        let r = new RegExp(text, "g");
        for (let i in characters) {
            if (characters[i].name.match(r)) {
                sectionCards.children[i].removeAttribute("style");
            } else {
                sectionCards.children[i].style.display = "none";
            }
        }
    }
}

//DOM Manipulation
async function renderCharacter(characters) {
    const sectionElement = document.getElementById("sectionCards")
    characters.forEach(element => {
        const DIVelement = document.createElement('div');
        const Helement = document.createElement('h4');
        const IMGelement = document.createElement('img');
        const HRelement = document.createElement('hr');
        const Pelement = document.createElement('p');

        const Hcontent = element.name;
        const Pcontent = element.description;

        Helement.innerText = Hcontent;
        Pelement.innerText = Pcontent;

        DIVelement.setAttribute("class", "card-chars");
        Helement.setAttribute("class", "card-title");
        Pelement.setAttribute("class", "card-description");
        IMGelement.setAttribute("src", element.img);
        IMGelement.setAttribute("alt", element.img);
        IMGelement.setAttribute("class", "card-img");

        DIVelement.appendChild(Helement);
        DIVelement.appendChild(IMGelement);
        DIVelement.appendChild(HRelement);
        DIVelement.appendChild(Pelement);

        sectionElement.appendChild(DIVelement);
    })
}

loadCharacter();