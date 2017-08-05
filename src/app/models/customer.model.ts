
export class Customer {
  constructor(
    public id: number,
    public firstName: string = "",
    public lastName: string = "",
    public birthday?: Date,
    public gender: string = "f",

    public lastContactDate?: Date,
    public lifetimeValue?: Number
  ) { }

  public get age(): number {
    if(!this.birthday){
      return 0;
    }

    var ageDifMs = Date.now() - this.birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}


