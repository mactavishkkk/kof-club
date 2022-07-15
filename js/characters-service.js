//Consumo da API mockada
export async function getCharacter(){
    let response = await fetch('http://localhost:5501/api/characters.json');
    const result = await response.json();
    return result['characters']
}