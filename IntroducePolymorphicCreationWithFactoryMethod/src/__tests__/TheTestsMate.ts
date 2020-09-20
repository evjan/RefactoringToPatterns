let {McDonaldsMeal, GuzmanYGomezMeal, MomsHouseMeal} = require('../TheCode')

const mockPerson = {
  pay: jest.fn(),
  eat: jest.fn()
}

describe('McDonaldsMeal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets a meal and a person', () => {
    const mcD = new McDonaldsMeal(mockPerson, 'lunch')

    expect(mcD.meal).toEqual('lunch')
    expect(mcD.person).toEqual(mockPerson)
  })

  it("takes a person's money", () => {
    const mcD = new McDonaldsMeal(mockPerson, 'lunch')
    mcD.charge()

    expect(mockPerson.pay).toHaveBeenCalledWith(10)
  })

  it('gives a person food', () => {
    const mcD = new McDonaldsMeal(mockPerson, 'lunch')
    mcD.feed()

    expect(mockPerson.eat).toHaveBeenCalledWith('Bigmac')
  })
})

describe('GuzmanYGomezMeal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets a meal and a person', () => {
    const gYG = new GuzmanYGomezMeal(mockPerson, 'lunch')

    expect(gYG.meal).toEqual('lunch')
    expect(gYG.person).toEqual(mockPerson)
  })

  it("takes a person's money", () => {
    const gYG = new GuzmanYGomezMeal(mockPerson, 'lunch')
    gYG.charge()

    expect(mockPerson.pay).toHaveBeenCalledWith(17)
  })

  it('gives a person food', () => {
    const gYG = new GuzmanYGomezMeal(mockPerson, 'lunch')
    gYG.feed()

    expect(mockPerson.eat).toHaveBeenCalledWith('Burrito')
  })
})

describe('MomsHouseMeal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const son = {
    pay: jest.fn(),
    eat: jest.fn(),
    nap: jest.fn()
  }

  it('sets a meal and a person', () => {
    const momsHouse = new MomsHouseMeal(son, 'lunch')

    expect(momsHouse.meal).toEqual('lunch')
    expect(momsHouse.person).toEqual(son)
  })

  it("takes a person's money", () => {
    const momsHouse = new MomsHouseMeal(son, 'lunch')
    momsHouse.charge()

    expect(son.pay).toHaveBeenCalledWith(0)
  })

  it('gives a person food', () => {
    const momsHouse = new MomsHouseMeal(son, 'lunch')
    momsHouse.feed()

    expect(son.eat).toHaveBeenCalledWith('Chicken')
  })

  it('has a room where a person a nap', () => {
    const momsHouse = new MomsHouseMeal(son, 'lunch')
    momsHouse.room()

    expect(son.nap).toHaveBeenCalledWith()
  })
})
