const socket = io.connect(); // habilita los sockets desde el cliente

document.querySelector("button").addEventListener("click", p=> {
    p.preventDefault();
    socket.emit("nuevoprod", {
        nombre: document.querySelector("input[name=nombre]").value,
        precio: document.querySelector("input[name=precio]").value,
        foto: document.querySelector("input[name=foto]").value
    })
})

socket.on('allproducts', msjs => {  //cuando recibo todos los Productos desde el server, hago un map porque recibo un array
    let productosHTML = "";
    msjs.forEach(element => {
        productosHTML += `<tr><td>${element.id}</td><td>${element.nombre}</td><td>${element.precio}</td><td>${element.foto}</td></tr>`
    });
    document.querySelector('tbody').innerHTML = productosHTML //y lo muestro en el browser
});
