function Sprite(x, y, w, h, cor) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.vx = 0;
    this.vy = 0;
    this.angulo = -90;
    this.va = 0;
}

Sprite.prototype.desenhar = function (ctx, img) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angulo * 2 * Math.PI / 360);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = this.color;
    ctx.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);
    if (this.debug) {
        ctx.strokeStyle = "grey";
        ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
    ctx.restore();
};

Sprite.prototype.mover = function (dt) {
    this.angulo = this.angulo + this.va * dt;
    this.vx = Math.cos(this.angulo);
    this.vy = Math.sin(this.angulo);
    this.x = parseInt(this.x + this.vx * dt);
    this.y = parseInt(this.y + this.vy * dt);
};

Sprite.prototype.colidiu = function (alvo) {
    if (this.x + this.width < alvo.x)
        return false;
    if (this.x > alvo.x + this.width)
        return false;
    if (this.y + this.height < alvo.y)
        return false;
    if (this.y > alvo.y + this.height)
        return false;
    return true;
};

