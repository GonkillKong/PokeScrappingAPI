//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declaramos las variables auxiliares y llamamos a las funciones necesarias para inicializar la página
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
var principales = ["inicio", "pokedex", "cartas","enlaces"]; // Array que contiene todos los posibles id de los elementos principales
var principal = principales[0]; // Esta variable sirve para determinar el contenido que estará mostrando la página
document.getElementById("boton_inicio").style.backgroundColor = "#fffc30";
var id_pokemon=1; //Setteamos la variable id_pokemon para que el primer Pokémon mostrado sea el correspondiente
setCartaById(id_pokemon); //Declaramos la función al comienzo para que inicialmente scrappee los datos del primer Pokémon
replicarCaja("id_caja_"); //Utilizamos inicialmente la función clonar para crear las 151 cajitas
setPokedex(); //Inicializamos la Pokédex con todos los Pokémon
setColorTiposPokedex();
var filtro=null;


// Comenzamos gestionando los eventos de ratón sobre los botones del navegador
//-------------------------------------------
// Eventos onclick del menú de navegación:
//-------------------------------------------

//Gestionamos todos los eventos onclick del menú, iterando en el array que contiene todos los posibles id de los elementos principales, 
//Los strings resultantes serán contenidos en los otros id relacionados con cada uno
principales.forEach(function (contenido) {
    document.getElementById("boton_"+ contenido).onclick = function() { //*Por ejemplo: #boton_inicio, #boton_pokedex...
        if(filtro && contenido==principales[1]){ //Cuando pulsamos el botón de la Pokédex
            filtro=null; // Reseteamos para eliminar el filtro del buscador
            setPokedex();
        }
        setColorTiposPokedex();

        // Convertimos la HTMLCollection obtenida del getElements a un array para poder iterarlo con un forEach y gestionar, en un solo clic, la visibilidad de todos los bloques de contenido
        setPrincipal(contenido); //Función auxiliar creada después
        principal = contenido; // Esto hará que permanezca el color que le asignamos al botón después (en el onmouseover)
    };
});

// Implementamos la el escuchador de onclicks de los elementos de clase "pinchable"
Array.from(document.getElementsByClassName("pinchable")).forEach(function(img){
    img.onclick = function() {
        var alt = img.getAttribute("alt");
        getIdByNombre(alt, function(id, error) {
            if (error) {
                alert(error.message);
            }else {
                setCartaById(id);
                id_pokemon=id;
            }
        }); // Debemos añadir la función para llevarnos al frame deseado
        principal = principales[2];
        setPrincipal(principal);
        document.getElementById("boton_cartas").style.backgroundColor="#ffa930";
    };
});

// Funciones para los enlaces del inicio
document.getElementById("enlace1").onclick = function() {
    principal = principales[1];
    setPrincipal(principal);
    if(filtro){
        filtro=null;
        setPokedex();
    };
    setColorTiposPokedex();
    document.getElementById("boton_inicio").style.backgroundColor="#f0f0f0f8";
    document.getElementById("boton_pokedex").style.backgroundColor="#30a2ff";
};


document.getElementById("enlace2").onclick = function() {
    principal = principales[2];
    setPrincipal(principal);
    document.getElementById("boton_inicio").style.backgroundColor="#f0f0f0f8";
    document.getElementById("boton_cartas").style.backgroundColor="#ffa930";
};

document.getElementById("enlace3").onclick = function() {
    principal = principales[3];
    setPrincipal(principal);
    document.getElementById("boton_inicio").style.backgroundColor="#f0f0f0f8";
    document.getElementById("boton_enlaces").style.backgroundColor="#38ed87";
};


//Y aquí los botones del navegador oculto
document.getElementById("boton_enlaces1").onclick = function() {
    principal = principales[3];
    setPrincipal(principal);
    document.getElementById("boton_inicio").style.backgroundColor="#f0f0f0f8";
    document.getElementById("boton_enlaces").style.backgroundColor="#38ed87";
    window.location.href = "https://pokemongohub.net/";
};

document.getElementById("boton_enlaces2").onclick = function() {
    principal = principales[3];
    setPrincipal(principal);
    document.getElementById("boton_inicio").style.backgroundColor="#f0f0f0f8";
    document.getElementById("boton_enlaces").style.backgroundColor="#38ed87";
    window.location.href = "https://www.smogon.com/";
};

document.getElementById("boton_enlaces3").onclick = function() {
    principal = principales[3];
    setPrincipal(principal);
    document.getElementById("boton_inicio").style.backgroundColor="#f0f0f0f8";
    document.getElementById("boton_enlaces").style.backgroundColor="#38ed87";
    window.location.href = "https://www.serebii.net/";
};


//Función auxiliar que selecciona el frame principal y quita el resto:
function setPrincipal(varPrinc){
    Array.from(document.getElementsByClassName("frames")).forEach(function(elemento) {
        if(elemento.id != varPrinc){ 
            elemento.style.display = "none"; 
        }else{
            elemento.style.display = "initial";
        };
    });
    Array.from(document.getElementsByClassName("boton_nav")).forEach(function(boton){
        if(!boton.id.includes(varPrinc)){ //*Por ejemplo: #boton_inicio
        boton.style.backgroundColor="#f0f0f0f8"; // Si hay algún botón con otro color fijado, se pondrá el color por defecto
        };
    });
};
//-------------------------------------------
// Eventos onmouseover del menú de navegación:
//-------------------------------------------

//Botón inicio
document.getElementById("boton_inicio").onmouseover = function() {
    document.getElementById("boton_inicio").style.backgroundColor = "#fffc30";
};

//Botón pokedex
document.getElementById("boton_pokedex").onmouseover = function() {
    document.getElementById("boton_pokedex").style.backgroundColor = "#30a2ff";
    const tipos = document.getElementById("tipos_ocultos");
    tipos.style.visibility = "visible"; // Desplegamos el menú oculto correspondiente
    tipos.style.opacity = 0.8; // Cambiamos también su opacidad para que se pueda implementar una transición gradual
    Array.from(document.getElementsByClassName("boton_oculto tipos")).forEach(function(elemento) {
        elemento.style.backgroundColor = "#30a2ff";
    }); // Iteramos para cambiar el color de los botones ocultos que estén dentro del menú
};

//Botón pokeCartas
document.getElementById("boton_cartas").onmouseover = function() {
    document.getElementById("boton_cartas").style.backgroundColor = "#ffa930";
};

//Botón enlaces
document.getElementById("boton_enlaces").onmouseover = function() {
    document.getElementById("boton_enlaces").style.backgroundColor = "#38ed87";
    const enlace = document.getElementById("enlace_ocultos");
    enlace.style.visibility = "visible";
    enlace.style.opacity = 0.8;
    Array.from(document.getElementsByClassName("boton_oculto enlace")).forEach(function(elemento) {
        elemento.style.backgroundColor = "#38ed87";
    });
};

// Mouseover para los menús ocultos, iterando 
Array.from(document.getElementsByClassName("menu_oculto")).forEach(function(menu) { // Hacemos lo mismo para cada menú oculto
    menu.onmouseover = function() {
        menu.style.visibility = "visible";
        menu.style.opacity = 0.8;
    }
});

//Iteramos en los botones ocultos para gestionar directamente los eventos de ratón
Array.from(document.getElementsByClassName("boton_oculto")).forEach(function(boton) {
    var color; // Variable para el color que corresponda en cada caso
    var botonNav = "boton_"; // Variable para el botón del menú de navegación asociado
    if (boton.id.includes("inicio")){ // Asignamos un color según donde nos encontremos
        color = "#fffc30";
        botonNav += "inicio";
    }else if (boton.id.includes("pokedex")){
        color = "#30a2ff";
        botonNav += "pokedex";
    }else if (boton.id.includes("cartas")){
        color = "#ffa930";
        botonNav += "cartas";
    }else if (boton.id.includes("enlaces")){
        color = "#38ed87";
        botonNav += "enlaces";
    };
    boton.onmouseover = function() {
        boton.style.backgroundColor = "#e6e6e6"; // 
        document.getElementById(botonNav).style.backgroundColor = color; // Este es el color del botón del menú de navegación de encima
    };
    boton.onmouseout = function() {
        boton.style.backgroundColor = color;
        if (!botonNav.includes(principal)){
        document.getElementById(botonNav).style.backgroundColor = "#e6e6e6";
        }
    };
});


//------------------------------------------
// Eventos onmouseout del menú de navegación:
//-------------------------------------------
// Para gestionar todos los eventos onmouseout de los botones del navegador, iteramos con un forEach en un array todos ellos para gestionar cada evento
Array.from(document.getElementsByClassName("boton_nav")).forEach(function(boton) {
    boton.onmouseout = function() {
        if (!boton.id.includes(principal)){ //Cuando el botón no coincide con el asignado al contenido principal
            boton.style.backgroundColor = "#f0f0f0f8"; // Reseteamos el color que tenía antes el botón
        };
        Array.from(document.getElementsByClassName("menu_oculto")).forEach(function(elemento) {
            if(elemento.style.visibility==="visible"){
                elemento.style.visibility = "hidden"; // Cada evento ocultará todos los menús ocultos desplegados
                elemento.style.opacity = 0; // Volvemos a poner la opacidad a 0 para que
            };
        });
    }
});

// Hacemos lo mismo para cada menú oculto, iterando en cada elemento
Array.from(document.getElementsByClassName("menu_oculto")).forEach(function(menu) { 
    menu.onmouseout = function() {
        menu.style.visibility = "hidden";
        menu.style.opacity = 0;
    }
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Botones y funcionalidades
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Funcionamiento del botón "anterior" y "siguiente"
function anteriorPokemon() {
    if(id_pokemon>=2 && id_pokemon<=151){
        id_pokemon-=1;
        setCartaById(id_pokemon);
    };
};

function siguientePokemon() {
    if(id_pokemon<=150 && id_pokemon>=1){
        id_pokemon+=1;
        setCartaById(id_pokemon);
    };
};

// Evento onclick del buscador para las cartas
document.getElementById("buscador_submit").onclick = function() {
    var busqueda = document.getElementById("buscador_texto").value;
    var num = parseInt(busqueda, 10); //Parseamos el texto a número decimal
    if(!isNaN(num) && num>=1){
        setCartaById (num);
        id_pokemon=num;
    }else if(isNaN(num)){ //En los casos que la búsqueda sea un string no numérico
        getIdByNombre(busqueda, function(id, error) {
            if (error) {
                alert(error.message);
            }else {
                setCartaById(id);
                id_pokemon=id;
            };
        });
    }else {
        alert("No se encontró el Pokémon con ese número");
    }
};

// Buscador para la pokédex
document.getElementById("buscador_submit_pokedex").onclick = function() {
    filtro = document.getElementById("buscador_texto_pokedex").value;
    setPokedex();
};
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
/*Parte de las llamadas a la API Fetch y funciones adicionales*/
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

function setCartaById (id){ //Consideramos inicialmente el rango de las acciones permitidas según el id
    if(id>1 && id<151){
        document.getElementById("boton_anterior_pokemon").style.display = "initial";
        document.getElementById("boton_siguiente_pokemon").style.display = "initial";
    }else if(id==1){
        document.getElementById("boton_anterior_pokemon").style.display = "none";
        document.getElementById("boton_siguiente_pokemon").style.display = "initial";
    }else if(id==151){
        document.getElementById("boton_siguiente_pokemon").style.display = "none";
        document.getElementById("boton_anterior_pokemon").style.display = "initial";
    }else {
        document.getElementById("boton_siguiente_pokemon").style.display = "none";
        document.getElementById("boton_anterior_pokemon").style.display = "none";
    };

    // Llamamos al fetch para hacerle una petición sobre la página asociada con el id del Pokémon
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(function(response) {
            return response.json(); // Esperamos hasta que consigamos extraer el JSON de la respuesta
        })
        .then(function(datos) {
            document.getElementById("id_carta").innerText = datos.id; //Comenzamos asignando al texto del elemento, el id asociado al Pokémon buscado
            if (datos.name){ // Comprobamos que el string original no es undefined o null
                let nombre_pokemon = datos.species.name.charAt(0).toUpperCase() + datos.species.name.slice(1); // Cambiamos la primera letra del nombre a mayúscula y esto será lo que imprimamos en el documento
                document.getElementById("n_carta").innerText = nombre_pokemon;
                document.getElementById("img_carta").setAttribute("alt", nombre_pokemon);
                document.getElementById("img_carta").setAttribute("title", nombre_pokemon);
            };           
            document.getElementById("img_carta").setAttribute("src", datos.sprites.front_default);
            document.getElementById("h_carta").innerText = datos.height;
            document.getElementById("p_carta").innerText = datos.weight;
            asignarSexo(datos.id);
            
            if(datos.abilities){ //Para las habilidades debemos realizar la comprobación de que los campos existen antes de intentar scrapearlos
                if(datos.abilities[0]){ //Buscamos por la url asociada al campo ability del Pokémon
                    document.getElementById("a1_carta").style.visibility = "visible";
                    obtenerNombreHabilidad(datos.abilities[0].ability.url, function(nombreHabilidad) { // Usamos la función creada, que utiliza métodos de la API fetch, para scrappear los datos de esa nueva url
                        document.getElementById("a1_carta").innerText = nombreHabilidad;
                    });
                    obtenerTextoHabilidad(datos.abilities[0].ability.url, function(textoHabilidad) {
                        document.getElementById("a1_carta").setAttribute("title", textoHabilidad);
                    });
                }else{
                    document.getElementById("a1_carta").style.visibility = "hidden";
                };
                if(datos.abilities[1]){
                    document.getElementById("a2_carta").style.visibility = "visible";
                    obtenerNombreHabilidad(datos.abilities[1].ability.url, function(nombreHabilidad) {
                        document.getElementById("a2_carta").innerText = nombreHabilidad;
                    });
                    obtenerTextoHabilidad(datos.abilities[1].ability.url, function(textoHabilidad) {
                        document.getElementById("a2_carta").setAttribute("title", textoHabilidad);
                    });
                }else{
                    document.getElementById("a2_carta").style.visibility = "hidden";
                };
                if(datos.abilities[2]){
                    document.getElementById("a3_carta").style.visibility = "visible";
                    obtenerNombreHabilidad(datos.abilities[2].ability.url, function(nombreHabilidad) {
                        document.getElementById("a3_carta").innerText = nombreHabilidad;
                    });
                    obtenerTextoHabilidad(datos.abilities[2].ability.url, function(textoHabilidad) {
                        document.getElementById("a3_carta").setAttribute("title", textoHabilidad);
                    });
                }else{
                    document.getElementById("a3_carta").style.visibility = "hidden";
                };
            }else{
                document.getElementById("a1_carta").style.visibility = "hidden";
                document.getElementById("a2_carta").style.visibility = "hidden";
                document.getElementById("a3_carta").style.visibility = "hidden";
            };
            
            resetTiposCarta(); //Reseteamos para que las tags de todos los tipos de Pokémon sean visibles inicialmente
            if(datos.types){
                for (let i = 3; i > 0; i--) {
                    if(datos.types.length<=i){
                        document.getElementById("tipo" + (i+1).toString()).style.display = "none";
                    };
                };
            };

            for (let i=0; i<datos.types.length && i<4; i++){
                obtenerNombreTipo(datos.types[i].type.url, function(nombreTipo) {
                    var elemento = document.getElementById("tipo" + (i+1).toString());
                    elemento.innerText = nombreTipo;
                    asignarColorTipo(elemento);
                    elemento.setAttribute("title", elemento.innerText);
                });
            };
        
            //Recorremos el array de stats para fijar las estadísticas de combate del Pokémon
            for (let i=0; i<datos.stats.length; i++){
                document.getElementById("stat"+(i+1).toString()).style.width = datos.stats[i].base_stat + "%";
                document.getElementById("stat"+(i+1).toString()).setAttribute("title", datos.stats[i].base_stat  + "%");
            };

            obtenerArbolEvolucion(datos.id, function(arbol) {
                for(let i=0; i<3; i++){ // Iteramos en las 3 evoluciones posibles
                    if(arbol[i]){ //En principio siempre debería encontrar el primer elemento; el propio Pokémon
                        document.getElementById("evolucion" + (i+1).toString()).style.display = "initial"; // Reseteamos
                        if(i!=0){
                            document.getElementById("flecha" + i.toString()).style.display = "initial";
                        };
                        document.getElementById("evolucion" + (i+1).toString()).setAttribute("src", arbol[i].imagen);
                        document.getElementById("evolucion" + (i+1).toString()).setAttribute("title", arbol[i].nombre.charAt(0).toUpperCase() + arbol[i].nombre.slice(1));
                        document.getElementById("evolucion" + (i+1).toString()).setAttribute("alt", arbol[i].nombre.charAt(0).toUpperCase() + arbol[i].nombre.slice(1));
                    }else{ // Cuando no encuentra evolución eliminamos los elementos dispuestos para ella
                        document.getElementById("evolucion" + (i+1).toString()).style.display = "none";
                        if(i!=0){
                        document.getElementById("flecha" + i.toString()).style.display = "none";
                        };
                    };
                };
            });
        })  
        .catch(function(error) {
            console.error("Error al obtener datos:", error);
        });
};

function asignarSexo(id){ //Asignamos manualmente el sexo de los Pokémon que sólo existen de uno determinado, ya que son pocos
    if(id==124 || id==29 || id==30 || id==31 ){
        document.getElementById("sM_carta").style.display="none";
        document.getElementById("sF_carta").style.display="initial";
    }else if(id==128 || id==32 || id==33 || id==34 ){
        document.getElementById("sF_carta").style.display="none";
        document.getElementById("sM_carta").style.display="initial";
    }else{
        document.getElementById("sF_carta").style.display="initial";
        document.getElementById("sM_carta").style.display="initial";
    };
};

function resetTiposCarta(){
    for(let i=1; i<=4;i++){
        document.getElementById("tipo" + i.toString()).style.display = "block";
    }
};

function resetTiposPokedex(id){
    for(let i=1; i<=4;i++){
        document.getElementById("tipo" + i.toString() + "_" + id).style.display = "block";
    }
};

// Asignamos manualmente
function asignarColorTipo(elemento){
    switch(elemento.innerText) {
        case "Normal":
            elemento.style.backgroundColor = "#A8A77A";
            break;
        case "Fuego":
            elemento.style.backgroundColor = "#EE8130";
            break;
        case "Agua":
            elemento.style.backgroundColor = "#6390F0";
            break;
        case "Eléctrico":
            elemento.style.backgroundColor = "#F7D02C";
            break;
        case "Planta":
            elemento.style.backgroundColor = "#7AC74C";
            break;
        case "Hielo":
            elemento.style.backgroundColor = "#96D9D6";
            break;
        case "Lucha":
            elemento.style.backgroundColor = "#C22E28";
            break;
        case "Veneno":
            elemento.style.backgroundColor = "#A33EA1";
            break;
        case "Tierra":
            elemento.style.backgroundColor = "#E2BF65";
            break;
        case "Volador":
            elemento.style.backgroundColor = "#A98FF3";
            break;
        case "Psíquico":
            elemento.style.backgroundColor = "#F95587";
            break;
        case "Bicho":
            elemento.style.backgroundColor = "#A6B91A";
            break;
        case "Roca":
            elemento.style.backgroundColor = "#B6A136";
            break;
        case "Fantasma":
            elemento.style.backgroundColor = "#735797";
            break;
        case "Dragón":
            elemento.style.backgroundColor = "#6F35FC";
            break;
        case "Hada":
            elemento.style.backgroundColor = "#FFB6C1";
            break;
        case "Acero":
            elemento.style.backgroundColor = "#909090";
            break;
        default:
            break;
    };
};

/*Para simplificarnos (mucho) otras funciones que usan la API fetch, crearemos algunas funciones que iteran sobre el json devuelto
  por otra api con url obtenido a través de algún otro json. Esto quiere decir que trataremos de crear funciones para limpiar el código.
  Como necesitamos que estas funciones devuelvan la información, y dada la naturaleza asíncrona del fetch, al cual no podemos tratar
  como a una función estándar, que puede devolver un resultado al momento (de forma síncrona); entonces la forma de conseguirlo debe ser
  con una función callback, que hace de promesa a la petición del return de la función, por lo que, para llamar a la función correctamente,
  tendremos que proporcionar una función de callback que se ejecute cuando se recupere el texto deseado. Este modo de funcionamiento es similar
  al de las peticiones al fetch.
  */
 //Función que obtiene el nombre (en español) de una habilidad innata de un Pokémon
function obtenerNombreHabilidad(url, callback){
    fetch(url)
        .then(function(response) {
            return response.json(); 
        })
        .then(function(datos) {
            if (datos.names){
                for (let i=0; i < datos.names.length;i++){  //Elementos de la API de cada habilidad
                    if (datos.names[i].language.name=="es"){
                        if (datos.names[i].name && typeof callback === "function") { //Debug 
                            callback(datos.names[i].name);
                            return;
                        } else {
                        console.error("El callback proporcionado no es una función");
                        }
                    };
                };
            };
        })
        .catch(function(error) {
            console.error("Error al obtener datos:", error);
        }); 
};

//Ya que estamos, obtenemos también el texto asociado a cada habilidad...
function obtenerTextoHabilidad(url, callback){
    fetch(url)
        .then(function(response) {
            return response.json(); 
        })
        .then(function(datos) {
            if(datos.flavor_text_entries){
                for (let i=0; i < datos.flavor_text_entries.length;i++){
                    if (datos.flavor_text_entries[i].language.name=="es"){
                        if (datos.flavor_text_entries[i].flavor_text && typeof callback === "function") {
                            callback(datos.flavor_text_entries[i].flavor_text);
                            return;
                        } else {
                            console.error("El callback proporcionado no es una función");
                        }
                    };
                };
            };
        })
        .catch(function(error) {
            console.error("Error al obtener datos:", error);
        }); 
};

function obtenerNombreTipo(url, callback){
    fetch(url)
        .then(function(response) {
            return response.json(); 
        })
        .then(function(datos) {
            if(datos.names){
                for (let i=0; i < datos.names.length;i++){
                    if (datos.names[i].language.name=="es"){
                        if (datos.names[i].name && typeof callback === "function") {
                            callback(datos.names[i].name);
                            return;
                        } else {
                            console.error("El callback proporcionado no es una función");
                        }
                    };
                };
            };
        })
        .catch(function(error) {
            console.error("Error al obtener datos:", error);
        }); 
};
/*
// Para el arbol evolutivo de cada pokemon, necesitamos implementar una función compleja con múltiples llamadas fetch sucesivas a distintas APIS
function obtenerArbolEvolucion(idPokemon, callback) {
    // Obtenemos información básica del Pokémon para encontrar el ID de su especie
    fetch("https://pokeapi.co/api/v2/pokemon/" + idPokemon)
        .then(function(response) {
            return response.json()
        })
        .then(function(datosPokemon) {
            // Obtenemos información de la especie para acceder a la cadena de evolución
            return fetch(datosPokemon.species.url);
        })

        .then(function(response) {
            return response.json()
        })
        .then(function(datosEspecie) {
            // Obtenemos la cadena de evolución
            return fetch(datosEspecie.evolution_chain.url);
        })

        .then(function(response) {
            return response.json()
        })
        .then(function(datosEvolucion) {
            // Procesamos la cadena de evolución
            let resultados = [];
            function procesarEvolucion(nodoEvolucion) {
                // Obtenemos información adicional para cada forma
                fetch("https://pokeapi.co/api/v2/pokemon/" + nodoEvolucion.species.name)
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(datosForma) {
                        resultados.push({ // Almacenamos la información del nombre y la imagen del Pokémon perteneciente al árbol
                            nombre: datosForma.name,
                            imagen: datosForma.sprites.front_default
                        });

                        if (nodoEvolucion.evolves_to.length > 0) {
                            procesarEvolucion(nodoEvolucion.evolves_to[0]); // Hacemos una llamada recursiva para cada forma evolutiva
                            // Si nodoEvolucion.evolves_to.length > 0, significa que hay más etapas de evolución disponibles. Entonces, la función se vuelve a llamar a sí misma
                        } else {
                            // Llamamos al callback con los resultados una vez completado todo el proceso
                            callback(resultados);
                        }
                    });
            }
            // Iniciamos el proceso al recibir el nodo raíz de la cadena evolutiva, que representa la primera etapa evolutiva del Pokémon.
            procesarEvolucion(datosEvolucion.chain);
        })
        .catch(error => console.error("Error al obtener datos de la evolución:", error));
};*/

// Para el arbol evolutivo de cada pokemon, necesitamos implementar una función compleja con múltiples llamadas fetch sucesivas a distintas APIS
function obtenerArbolEvolucion(idPokemon, callback) {
    // Obtenemos información básica del Pokémon para encontrar el ID de su especie
    fetch("https://pokeapi.co/api/v2/pokemon/" + idPokemon)
        .then(function(response) {
            return response.json()
        })
        .then(function(datosPokemon) {
            // Obtenemos información de la especie para acceder a la cadena de evolución
            return fetch(datosPokemon.species.url);
        })

        .then(function(response) {
            return response.json()
        })
        .then(function(datosEspecie) {
            // Obtenemos la cadena de evolución
            return fetch(datosEspecie.evolution_chain.url);
        })

        .then(function(response) {
            return response.json()
        })
        .then(function(datosEvolucion) {
            // Procesamos la cadena de evolución
            let resultados = [];
            function procesarEvolucion(nodoEvolucion) {
                
                fetch(nodoEvolucion.species.url)
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(Especie) {
                        // Obtenemos información adicional para cada forma (Variante default***)
                        return fetch(Especie.varieties[0].pokemon.url);
                    })
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(datosForma) {
                        resultados.push({ // Almacenamos la información del nombre y la imagen del Pokémon perteneciente al árbol
                            nombre: datosForma.name,
                            imagen: datosForma.sprites.front_default
                        });

                        if (nodoEvolucion.evolves_to.length > 0) {
                            procesarEvolucion(nodoEvolucion.evolves_to[0]); // Hacemos una llamada recursiva para cada forma evolutiva
                            // Si nodoEvolucion.evolves_to.length > 0, significa que hay más etapas de evolución disponibles. Entonces, la función se vuelve a llamar a sí misma
                        } else {
                            // Llamamos al callback con los resultados una vez completado todo el proceso
                            callback(resultados);
                        }
                    });
            }
            // Iniciamos el proceso al recibir el nodo raíz de la cadena evolutiva, que representa la primera etapa evolutiva del Pokémon.
            procesarEvolucion(datosEvolucion.chain);
        })
        .catch(error => console.error("Error al obtener datos de la evolución:", error));
};


//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Parte de la asignación de datos a las cajitas de la pokédex
//----------------------------------------------------------------------------------------------------------------------------------------------------------------


/*Tenemos varias opciones para mostrar todos los Pokémon en la Pokédex. Podríamos crear 151 cajas en el html y rellenarlas iterando entre los distintos IDs,
  sin embargo, lo más simple es, sin ninguna duda, crear un bloque y clonarlo las veces que deseemos, aportando una mayor flexibilidad al conjunto*/
function replicarCaja(idCaja) {
    eliminarClones(); //Primero eliminamos los clones que hayamos creado ya. Así podremos gestionar con facilidad el dinamismo
    const contenedor = document.querySelector(".contenedor"); // Seleccionamos el contenedor dentro del cuál replicaremos el bloque div
    const original = document.getElementById(idCaja); // Obtenemos el div original a replicar

    if (!original) { // Comprobamos que existe
        console.error("El elemento original no existe");
        return;
    }
    for (let i = 1; i <= 151; i++) {
        const clon = original.cloneNode(true); // Clonamos el div, incluyendo todos los elementos internos (deep clone)
        clon.id = idCaja + i; // Ajustamos el ID del div clonado

        clon.classList.add("clon"); //Añadimos una clase nueva a cada clon para manejarlos con mayor facilidad

        // Seleccionamos los elementos internos para modificar sus IDs
        clon.querySelector("img").id = "img_caja_" + i;
        clon.querySelector("h2 span").id = "n_caja_" + i;
        clon.querySelector("h3 span").id = "idPok_caja_" + i;
        
        // Actualizamos IDs de los tipos iterando en el conjunto devuelto por todos los tipos
        const tipos = clon.querySelectorAll(".span_tipo_caja");
        tipos.forEach((tipo, index) => {
            tipo.id = "tipo" + (index + 1) + "_" + i;
            tipo.style.backgroundColor = "grey";
        });
        contenedor.appendChild(clon); // Añadimos el clon al contenedor
    };
};

// La asignación de los colores de los tipos en la Pokédex la hacemos por separado
function setColorTiposPokedex(){
    for(var pok=1;pok<=151;pok++){
        var caja = document.getElementById("id_caja_" + pok);
        if(caja && caja.style.display!="hidden"){
            for (var i=1; i<=4; i++){
                var elemento = document.getElementById("tipo" + i + "_" + pok);
                asignarColorTipo(elemento);
                elemento.setAttribute("title", elemento.innerText);
            };
        };
    };
};


function setPokedex(){
    //Iteramos en un for que recorre todos los Pokémon para añadirlos a su correspondiente caja, dependiente del índice de Pokémon y la caja que le corresponda
    for(var pok=1;pok<=151;pok++){
        (function(idCaja) { // Usamos una función inmediatamente invocada para asegurarnos de que el valor de i (en este caso pok) es capturado correctamente en cada iteración del bucle
        fetch("https://pokeapi.co/api/v2/pokemon/" + idCaja)
            .then(function(response) {
                return response.json();
            })
            .then(function(datos) {
                var id=datos.id;
                document.getElementById("idPok_caja_" + idCaja).innerText = datos.id;
                if (datos.name){ 
                    var nombre_pokemon = datos.name.charAt(0).toUpperCase() + datos.name.slice(1);
                    document.getElementById("n_caja_" + idCaja).innerText = nombre_pokemon;
                };
                if(!filtro || id.toString().toLowerCase().includes(filtro.toLowerCase()) || nombre_pokemon.toString().toLowerCase().includes(filtro.toLowerCase())){       
                    document.getElementById("id_caja_" + idCaja).style.display="initial"; //Cambiamos el display para mostrar el elemento que cumpla con el filtro  
    
                    document.getElementById("img_caja_" + idCaja).setAttribute("alt", nombre_pokemon);
                    document.getElementById("img_caja_" + idCaja).setAttribute("title", nombre_pokemon);
                    document.getElementById("img_caja_" + idCaja).setAttribute("src", datos.sprites.front_default);
                    
                    resetTiposPokedex(idCaja);
                    if(datos.types){
                        for (let i = 3; i > 0; i--) {
                            if(datos.types.length<=i){
                                document.getElementById("tipo" + (i+1) + "_" + idCaja).style.display = "none";
                            };
                        };
                    };
        
                    for (var i=0; i<datos.types.length && i<4; i++){
                        (function(j){ // Es necesario volver a hacer uso de una función inmediatamente invocada
                            obtenerNombreTipo(datos.types[j].type.url, function(nombreTipo) {
                                document.getElementById("tipo" + (j + 1) + "_" + idCaja).innerText = nombreTipo;
                            });
                        })(i);
                    };
                }else{
                    document.getElementById("id_caja_" + idCaja).style.display = "none";
                }  
            })  
            .catch(function(error) {
                console.error("Error al obtener datos:", error);
            });
    })(pok);
    };
    setColorTiposPokedex();
};


function eliminarClones() {
    const clones = document.querySelector(".contenedor").querySelectorAll(".clon"); // Seleccionamos todos los clones (pertenecientes a la clase="clon")

    clones.forEach(function(clon) {
        document.querySelector(".contenedor").removeChild(clon); // Iteramos para eliminar cada clon del contenedor
    });
};


function getIdByNombre(nombrePokemon, callback) {
    var nombreFormateado = nombrePokemon.toLowerCase();
    fetch("https://pokeapi.co/api/v2/pokemon/" + nombreFormateado)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }else {
                throw new Error("No se encontró el Pokémon");
            };
        })
        .then(function(datos) {
            callback(datos.id); // Si se encontró el Pokémon, pasamos el ID al callback
        })
        .catch(function(error) {
            callback(null, error); // Pasamos null y el error al callback si hay un fallo
        });
};


/*
function getJson(urlApi) {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(datos) {

        })
        .catch(function(error) {
            console.error("Error al obtener datos:", error);
        });
};
*/