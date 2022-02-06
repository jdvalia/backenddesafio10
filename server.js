const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const PORT = 8080;
let id = 1;

const app = new express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const allproducts = [] //es el array que el cliente recibe del Servidor

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!')
    socket.emit('allproducts', allproducts) // Envio los Productos ya existentes al cliente que se conecta

    // Escucho los Productos que van agregando cada cliente y hago un broadcast a todos los conectados
    socket.on('nuevoprod', data => { //cuando el cliente apretó el BOTON - click
        if(data.nombre !== "" && data.precio !== "" && data.foto !== ""){ //reviso si alguno de los campos está vacío
            allproducts.push({ id: id, nombre: data.nombre, precio: data.precio, foto: data.foto}) //con el Producto agregado por un cliente armo el array para enviarlo al Server
            id++
            io.sockets.emit('allproducts', allproducts) //desde el SERVER mando el ARRAY a todos los clientes
        }
        else{
            console.log("Error: Hay un campo vacio");//Terminé poniendo un console log porque el alert que está abajo daba error.
            //alert ("Revisar los datos"); 
        } 
    })
})

const connectedServer = httpServer.listen(PORT, function () {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
