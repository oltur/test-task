import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  public x: number;

  static *getYears() {
    for (const x of [1900, 1901, 1902]) {
      yield x;
    }
  }
  constructor() { }
  ngOnInit() {
  }

  doIt() {

    // const t = new Circle(1, 1, 1, 1);
    // const y = t as Shape;
    // console.log(y.id);

    // const years = SandboxComponent.getYears();
    // console.log(years.next().value);
    // console.log(years.next().value);
    // console.log(years.next().value);
    // console.log(years.next().value);

    // let target = {
    //   foo: "Welcome, foo"
    // }
    // let proxy = new Proxy(target, {
    //   get(receiver, name) {
    //     return name in receiver ? receiver[name] : `Hello, ${name}`
    //   }
    // })

    var l10nUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
    var l10nGBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })
    var l10nEUR = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })
    var l10nUAH1 = new Intl.NumberFormat("de-DE", { style: "currency", currency: "UAH" })
    var l10nUAH2 = new Intl.NumberFormat("uk-UA", { style: "currency", currency: "UAH" })
    var l10nUAH3 = new Intl.NumberFormat("he-IL", { style: "currency", currency: "UAH" })
    var l10nNIS1 = new Intl.NumberFormat("he-IL", { style: "currency", currency: "NIS" })
    console.log(l10nUSD.format(100200300.40));
    console.log(l10nGBP.format(100200300.40));
    console.log(l10nEUR.format(100200300.40));
    console.log(l10nUAH1.format(100200300.40));
    console.log(l10nUAH2.format(100200300.40));
    
    console.log(l10nUAH3.format(100200300.40));
    console.log(l10nNIS1.format(100200300.40));

    var l10nHE = new Intl.DateTimeFormat("he-IL-u-ca-hebrew")
    console.log(l10nHE.format(new Date("2015-01-02")));
  }
}

class Shape {
  constructor(public id, public x, public y) {
  }
}
class Rectangle extends Shape {
  constructor(public id, public x, public y,
    public width, public height) {
    super(id, x, y);
  }
}
class Circle extends Shape {
  constructor(id, x, y, radius) {
    super(id, x, y);
  }
}
