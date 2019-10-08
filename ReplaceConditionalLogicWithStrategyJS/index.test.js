const Fighter = require("./index.js");
let leonardo;
let shredder;

const randomFunctionMock = () => { return 4.0 };

describe("Fighter", () => {
  beforeEach(() => {
    leonardo = new Fighter("Sword");
  });

  it("has an attackType ", () => {
    expect(leonardo.attackType).toEqual("Sword");
  });

  describe("Attack", () => {
    describe("Sword", () => {
      beforeEach(() => {
        leonardo = new Fighter("Sword");
        shredder = new Fighter("Spell");
      })

      it("has a sword message", () => {
        expect(leonardo.attack(shredder)).toEqual("hit with Sword, 3");
      });

      it("Reduces the opoonent's health", () => {
        leonardo.attack(shredder)

        expect(shredder.health).toEqual(97);
      });
    });

    describe("Bow", () => {
      beforeEach(() => {
        donatello = new Fighter("Bow", 2.0);
        shredder = new Fighter("Spell");
      });

      it("has a bow message", () => {
        expect(donatello.attack(shredder)).toEqual("hit with Bow, 2.8");
      });

      it("Reduces the opoonent's health", () => {
        donatello.attack(shredder)

        expect(shredder.health).toEqual(97.2);
      });
    });

    describe("Spell", () => {
      beforeEach(() => {
        donatello = new Fighter("Bow", 2.0);
        shredder = new Fighter("Spell", 3.0, randomFunctionMock);
      });

      it("has a spell message", () => {
        expect(shredder.attack(donatello)).toEqual("hit with Spell, 4");
      });

      it("Reduces the opoonent's health", () => {
        shredder.attack(donatello)

        expect(donatello.health).toEqual(96);
      });
    });
  });
});
