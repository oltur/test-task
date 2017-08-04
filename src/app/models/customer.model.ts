
export class Customer {
  constructor(
    public id: number,
    public firstName: number,
    public lastName: string,
    public birthday: Date,
    public gender: string,

    public lastContactDate?: Date,
    public lifetimeValue: Number = 0
  ) { }

  public get age(): number {
    var ageDifMs = Date.now() - this.birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}


