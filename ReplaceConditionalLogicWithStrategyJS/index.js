function getRandom(min, max) {
  return (Math.random() * (max - min) + min);
}

module.exports = class Fighter {
    // AttackType = ['Sword', 'Bow', 'Spell'];

  constructor(attackType, range = 0.0, randomFunciton = getRandom) {
    this.health = 100.0;
    this.attackType = attackType;
    this.range = range;
    this.randomFunction = randomFunciton;
  }

  attack(opponent) {
    const range = this.rangeTo(opponent);
    switch (this.attackType) {
      case 'Sword':
        if (range < 3.0) {
          return opponent.applyDamage(this.attackType, 3);
        }
        break;
      case 'Bow':
        if (1.0 < this.range && this.range < 20.0) {
          return opponent.applyDamage(this.attackType, 3.0 - range/10.0);
        }
        break;
      case 'Spell':
        return opponent.applyDamage(this.attackType, this.randomFunction(0, 5));
    }
  }

  rangeTo(opponent) {
    return this.range;
  }

  applyDamage(type, damage) {
    this.health = this.health - damage;

    return `hit with ${type}, ${damage}`;
  }
}
