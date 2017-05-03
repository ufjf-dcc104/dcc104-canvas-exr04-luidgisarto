function ImageLoader(){
    this.images = {};
    this.predios = ["predio1.png", "predio2.jpg", "predio3.jpg", "predio4.png", "predio5.png"];
}

ImageLoader.prototype.load = function (key, imgURL) {
  var img = new Image();
  img.src = imgURL;
  this.images[key] = img;
};

ImageLoader.prototype.inicializar = function (){
    this.load("nave", "images/nave.png");
    this.load("predio", "images/predio1.jpg");
    this.load("inimigo", "images/inimigo.png");
    // this.load("predio", "images/" + this.predios[parseInt(Math.random() * 5)]);
    this.load("tiro", "images/tiro.png");
}