interface Person {
  pay: (amount: number) => void
  eat: (food: string) => void
  nap?: () => {}
}

class McDonaldsMeal {
  public meal: string
  public person: Person

  constructor(person: Person, meal: string) {
    this.meal = meal
    this.person = person
  }

  public charge() {
    this.person.pay(10)
  }

  public feed() {
    this.person.eat('Bigmac')
  }
}

class GuzmanYGomezMeal {
  public meal: string
  public person: Person

  constructor(person: Person, meal: string) {
    this.meal = meal
    this.person = person
  }

  public charge() {
    this.person.pay(17)
  }

  public feed() {
    this.person.eat('Burrito')
  }
}

class MomsHouseMeal {
  public meal: string
  public person: Person

  constructor(person: Person, meal: string) {
    this.meal = meal
    this.person = person
  }

  public charge() {
    this.person.pay(0)
  }

  public feed() {
    this.person.eat('Chicken')
  }

  public room() {
    this.person.nap && this.person.nap()
  }
}

export {McDonaldsMeal, GuzmanYGomezMeal, MomsHouseMeal}
