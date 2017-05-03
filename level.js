function Level() {
    this.inimigos = 8;
    this.sprites = [];
    this.predios = [];
    this.tiros = [];
}

Level.prototype.inicializar = function () {
    for (var i = 0; i < this.inimigos; i++) {
        var inimigo = new Sprite();
        inimigo.x = 20 + parseInt(Math.floor(Math.random() * 450));
        inimigo.y = 20 + parseInt(Math.floor(Math.random() * 150));
        inimigo.angulo = Math.PI*Math.random();
        inimigo.va = 30;
        inimigo.color = "red";
        inimigo.width = 100;
        inimigo.height = 70;
        inimigo.imgkey = "inimigo";
        this.sprites.push(inimigo);
    }
}

Level.prototype.inicializarPredios = function(total, posicao) {
    for (var i = 0; i < total; i++) {
        var predio = new Sprite();
        var posicaoAtual = parseInt(70 + 100*i);
        if(posicaoAtual > 200){
            predio.x = posicaoAtual + 150;
        }
        else{
            predio.x = posicaoAtual;
        }
        predio.y = 430;
        predio.width = 120;
        predio.height = 90;
        predio.imgkey = "predio";
        this.predios.push(predio);
    }
}

Level.prototype.atirar = function (alvo) {
    var tiro = new Sprite();
    tiro.x = alvo.x;
    tiro.y = alvo.y;
    tiro.vy = 100;
    // tiro.angulo = alvo.angulo;
    tiro.width = 15;
    tiro.height = 15;
    tiro.imgkey = "tiro";
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
        this.sprites[i].mover(dt);
    }

    for (var i = 0; i < this.tiros.length; i++) {
        this.tiros[i].mover(dt);

    }
}


Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i].colidiu(alvo)){
        resolveColisao(this.sprites[i], alvo);
      }
    }
};

Level.prototype.atingido = function () {
    for (var i = this.tiros.length - 1; i >= 0; i--) {
        this.colidiuCom(this.tiros[i],
            (
                function (that) {
                    return function (alvo) {
                        alvo.color = "green";
                        that.tiros.splice(i, 1);
                        x = that.sprites.indexOf(alvo);
                        that.sprites.splice(x, 1);
                    }
                }
            )(this));
    }
}
