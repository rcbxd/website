class Reg{
  constructor(string){
    this.string = string;
  }

  removeQuotes () {
    for(let i = 0; i < this.string.length; i++){
      if(this.string.charAt(i) == "'"){
        this.string = this.string.substring(0,i) + "'" + this.string.substring(i);
        i++;
      }
      if(this.string.charAt(i) == '"'){
        this.string = this.string.substring(0,i) + '"' + this.string.substring(i);
        i++;
      }
    }
    return this.string;
  }

  getBody() {
    return this.body;
  }

}

module.exports = Reg;
