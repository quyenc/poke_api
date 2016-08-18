/*
  Move Class

  power
  class
    class is the move's damage class (physical, special, or status)
  accuracy
*/

var Move = function(data) {
  if (!data) {
    data = {
      power: 0,
      class: 'physical',
      accuracy: 100
    };
  }

  this.power = data.power;
  this.class = data.class;
  this.accuracy = data.accuracy;
};

/*
  Pokemon Class

  attack
  defense
  level
  type1
  type2
*/
var Pokemon = function (data) {
  if (!data) {
    data = {
      attack: 0,
      defense: 0,
      level: 100,
      type1: '',
      type2: ''
    };
  }

  this.attack = data.attack;
  this.defense = data.defense;
  this.level = data.level;
  this.type1 = data.type1;
  this.type2 = data.type2;
};