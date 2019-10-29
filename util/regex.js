class Reg{
  constructor(string){
    this.string = string;
  }

  removeQuotes () {
    for(let i = 0; i < this.string.length; i++){
      if(this.string.charAt(i) == "'"){
        this.string = this.string.substring(0,i) + "'" + this.string.substring(i);
        i+=2;
      }
      if(this.string.charAt(i) == '"'){
        this.string = this.string.substring(0,i) + '"' + this.string.substring(i);
        i+=2;
      }
    }
    return this.string;
  }

  getBody() {
    return this.body;
  }

}

module.exports = Reg;
