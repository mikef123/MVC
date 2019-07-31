//Evento
var Evento = function(sujeto) {
    this._sujeto = sujeto;
    this._observadores = [];
};

Evento.prototype = {
    suscribir: function(observador) {
        this._observadores.push(observador);
    },
    notificar: function(args) {
        for (var i = 0; i < this._observadores.length; i++) {
            this._observadores[i](this._sujeto, args);
        }
    }
};


/*
 * Controlador
 */
var Controlador = function(model) {
    this.modelo = model;
};

Controlador.prototype = {
    contadorClickeado: function() {
        this.modelo.incrementarContador();
    },
    contadorDecrementarClickeado: function() {
        this.modelo.decrementarContador();
    }

};

var Vista = function(modelo, controlador) {
    this.modelo = modelo;
    this.controlador = controlador;
    this.boton = $('#boton');
    this.botonDecrementar = $('#boton-decrementar')
    var that = this;
    this.boton.click(function() {
        that.controlador.contadorClickeado()
    });

    this.botonDecrementar.click(function() {
        that.controlador.contadorDecrementarClickeado();
    });

    this.modelo.contadorModificado.suscribir(function() {
        $('#contador').text(that.modelo.contador);
    })

};

var Modelo = function() {
    this.contador = 0;
    this.contadorModificado = new Evento();
    this.incrementarContador = function() {
        this.contador++;
        this.contadorModificado.notificar();
    }
    this.decrementarContador = function() {
        this.contador--;
        this.contadorModificado.notificar();
    }
}

var modelo = new Modelo();
var controlador = new Controlador(modelo);
var vista = new Vista(modelo, controlador);