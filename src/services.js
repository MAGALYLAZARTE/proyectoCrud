const URL_API = "http://localhost:3000/zoo"
console.log("hola")
// son peticiones al servidor 
//read method : (get)
async function getAllCharacters() {
 const response = await fetch(URL_API,{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
const data = await response.json()  //pasar datos al formato
return data

}

const listTag = document.getElementById("charactersList")  

async function printCharacter () {
    
    const zoo = await getAllCharacters()
   
    //variable.innerHTML= "" 
    
    zoo.map ((animal) => {
        listTag.innerHTML +=
        `<li>
        <p>${animal.nombre}</p>
        <p>${animal.especie}</p>
        <p>${animal.años}</p>
    <button onclick= "deleteCharacter(${animal.id})">delete</button>
        </li>`

    })

}
printCharacter ()

 
//delete method : (delete)
async function deleteCharacter(id) {
    const response = await fetch(URL_API + `/${id}` , { 
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const deletedCharacter = await response.json()
    printZoo()
    return deletedCharacter
    
}

//create method : (post)

async function createCharacter() {
    const nombre = document.getElementById("nombre").value 
    const especie = document.getElementById ("especie").value 
    const años = document.getElementById("años").value = character.age;

    const newAnimal = {
        nombre: nombre,
        especie: especie,
        años: años
    }

   
    const response = await fetch (URL_API,{
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newAnimal),

      
    })
    if (response.ok){
        const data = response.json() 
        addAnimal(data)
    } 
}
async function addAnimal(animal) {
const characterAnimal = document.getElementById('charactersList');
const listAnimal = document.createElement('li');
listAnimal.textContent = `${animal.nombre},${animal.especie},${animal.años}`

characterAnimal.appendChild(listAnimal)   
}

    printCharacter()


// method : (put)
async function updateCharacter() {
    
    const id = document.getElementById('updateId').value;
    const nombre = document.getElementById('updateNombre').value;
    const especie = document.getElementById('updateEspecie').value;
    const años = document.getElementById('updateAños').value;

    const updatedData = {
        nombre: nombre,
        especie: especie,
        años: años
    };


     
        // Enviar la solicitud PUT al servidor para actualizar el personaje
        const response = await fetch(`${URL_API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        // Manejar la respuesta
        if (response.ok) {
            const data = await response.json();
            alert('Personaje actualizado exitosamente');
            printCharacter(); // Actualizar la lista de personajes
        } else {
            console.error('Error al actualizar el personaje:', response.statusText);
        }

} 

