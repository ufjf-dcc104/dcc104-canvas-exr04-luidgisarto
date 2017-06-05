function Level() {
    this.inimigos = Math.random() * 5;
    this.totalPredios = 4;
    this.sprites = [];
    this.predios = [];
    this.tiros = [];
}

Level.prototype.inicializar = function () {
    for (var i = 0; i < this.inimigos; i++) {
        var inimigo = new Sprite();
        inimigo.x = Math.floor(Math.random() * 700) + 50;
        inimigo.y = Math.floor(Math.random() * 150) + 50;
        // inimigo.angulo = 500;
        // inimigo.va = 80;       
        inimigo.vx = 0;
        inimigo.vy = 500;
        inimigo.color = "red";
        inimigo.width = 100;
        inimigo.height = 70;
        inimigo.imgkey = "inimigo";
        this.sprites.push(inimigo);
    }
}

Level.prototype.inicializarPredios = function () {
    for (var i = 0; i < this.totalPredios; i++) {
        var predio = new Sprite();
        predio.x = 50 + 200*i + 20;
        if(predio.x > 270){
            predio.x += 60;
        }
        predio.y = 430;
        predio.width = 120;
        predio.height = 90;
        predio.imgkey = "predio";
        this.predios.push(predio);
    }
}

Level.prototype.atirar = function (alvo) {
    if(alvo.cooldown > 0){
        return;
    }
    var tiro = new Sprite();
    tiro.x = alvo.x;
    tiro.y = alvo.y;
    tiro.vy = -300;
    // tiro.angulo = alvo.x;
    tiro.width = 8;
    tiro.height = 8;
    tiro.imgkey = "tiro";
    alvo.cooldown = 0.2;
    this.tiros.push(tiro);
}

Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].desenhar(ctx, this.imageLib.images[this.sprites[i].imgkey]);
    }

    for (var i = 0; i < this.tiros.length; i++) {
        this.tiros[i].desenhar(ctx, this.imageLib.images[this.tiros[i].imgkey]);
    }

    for (var i = 0; i < this.predios.length; i++) {
        this.predios[i].desenhar(ctx, this.imageLib.images[this.predios[i].imgkey]);
    }

}

Level.prototype.mover = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
        var meteoro = this.sprites[i];
        if (parseInt(meteoro.y) > 500) {
            this.sprites.splice(this.sprites.indexOf(meteoro), 1);
        }
        else {
            meteoro.mover(dt);
        }
    }

    for (var i = 0; i < this.tiros.length; i++) {
        this.tiros[i].mover(dt);
    }
}

Level.prototype.atingido = function () {
    for (var i = this.tiros.length - 1; i >= 0; i--) {
        var tiro = this.tiros[i];

        for (var j = 0; j < this.sprites.length; j++) {
            var meteoro = this.sprites[j];

            if (meteoro.colidiu(tiro)) {
                this.tiros.splice(i, 1);
                this.sprites.splice(j, 1);
                return true;
            }
        }

        return false;
    }
}

Level.prototype.atingiuPredio = function (){
    for (var i = 0; i < this.predios.length; i++) {
        var predio = this.predios[i];

        for (var j = 0; j < this.sprites.length; j++) {
            var meteoro = this.sprites[j];
            
            if(predio.colidiu(meteoro)){
                this.predios.splice(i, 1);
                return true;
            }
        }
    }
    return false;
}
