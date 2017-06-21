function Sprite(x, y, w, h, cor) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.vx = 0;
    this.vy = 0;
    this.angulo = 0;
    this.va = 0;
    this.cooldown = 0;
}

Sprite.prototype.desenhar = function (ctx, img) {
    ctx.fillStyle = this.color;
    ctx.drawImage(img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    ctx.strokeStyle = "white";


    // ctx.save();
    // ctx.translate(this.x, this.y);
    // ctx.rotate(this.angulo * 2 * Math.PI / 360);
    // ctx.rotate(Math.PI / 2);
    // ctx.fillStyle = this.color;
    // ctx.drawImage(img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    // ctx.restore();
};

Sprite.prototype.desenharNave = function (ctx, img) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angulo * 2 * Math.PI / 360);
    ctx.fillStyle = "white";
    ctx.drawImage(img, - this.width / 2, -this.height / 2, this.width, this.height);
    ctx.beginPath();
    // ctx.moveTo(-this.width / 2, -this.height / 2);
    // ctx.lineTo(-this.width / 2, +this.height / 2);
    // ctx.lineTo(+this.width / 2, 0);
    //  ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
    ctx.closePath();
    ctx.restore();
}

Sprite.prototype.moverNave = function (dt) {
    this.angulo = parseInt(this.angulo + this.va * dt);
    // console.log(parseInt(this.angulo));
    this.vx = this.vx * Math.cos(Math.PI * this.angulo / 180);
    this.vy = this.vy * Math.sin(Math.PI * this.angulo / 180);
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    if (this.cooldown > 0) {
        this.cooldown -= dt;
    } else {
        this.cooldown = 0;
    }
}

Sprite.prototype.mover = function (dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    if (this.cooldown > 0) {
        this.cooldown -= dt;
    } else {
        this.cooldown = 0;
    }
    // this.angulo = this.angulo + this.va * dt;
    // this.vx = Math.floor(Math.sin(this.angulo) * Math.PI/360);
    // this.vy = Math.floor(Math.cos(this.angulo) * Math.PI/360);
    // this.x = Math.floor(this.x + this.vx * dt);
    // this.y = Math.floor(this.y + this.vy * dt);
};

Sprite.prototype.colidiu = function (alvo) {
    if (this.x + this.width / 2 < alvo.x - alvo.width / 2) return false;
    if (this.x - this.width / 2 > alvo.x + alvo.width / 2) return false;
    if (this.y + this.height / 2 < alvo.y - alvo.height / 2) return false;
    if (this.y - this.height / 2 > alvo.y + alvo.height / 2) return false;
    return true;
};

