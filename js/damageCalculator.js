/* maps every type to an index for the type advantages table */
var type2id = {
  normal:   0,
  fire:     1,
  water:    2,
  electric: 3,
  grass:    4,
  ice:      5,
  fighting: 6,
  poison:   7,
  ground:   8,
  flying:   9,
  psychic:  10,
  bug:      11,
  rock:     12,
  ghost:    13,
  dragon:   14,
  dark:     15,
  steel:    16,
  fairy:    17
};

/* inverse of type2id */
var id2type = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy'
];

/* the type advantages table. the indices into the array and string
   are the indices for the attacking move type and the defending pokemon
   type respectively

   type[i][j] == '0':
     move of type i does not affect pokemon of type j

   type[i][j] == '<':
     move of type i does half damage against pokemon of type j

   type[i][j] == '=':
     move of type i does full damage against pokemon of type j

   type[i][j] == '>':
     move of type i does double damage against pokemon of type j
*/
var typeTable = [
  '============<0==<=',
  '=<<=>>=====><=<=>=',
  '=><=<===>===>=<===',
  '==><<===0>====<===',
  '=<>=<==<><=<>=<=<=',
  '=<<=><==>>====>=<=',
  '>====>=<=<<<>0=>><',
  '====>==<<===<<==0>',
  '=>=><==>=0=<>===>=',
  '===<>=>====><===<=',
  '======>>==<====0<=',
  '=<==>=<<=<>==<=><<',
  '=>===><=<>=>====<=',
  '0=========>==>=<==',
  '==============>=<0',
  '======<===>==>=<=<',
  '=<<<=>======>===<>',
  '=<====><======>><='
]

/* 
  function damageFormula(info)

  Computes actual damage given the following information:

  info = {
    attack    (int)
    defense   (int)
    power     (int)
    level     (int)
    stab      (bool)
    typeMod   {0,.25,.5,1,2,4}
    crit      (bool)
  }
*/

function damageFormula(info) {
  att = info.attack;
  def = info.defense;
  pwr = info.power;
  lvl = info.level || 100;
  stb = info.stab ? 1.5 : 1;
  typ = info.typeMod;
  crt = info.crit ? 1.5 : 1;

  console.log('damage formula using...');
  console.log('att: ' + att);
  console.log('def: ' + def);
  console.log('pwr: ' + pwr);
  console.log('lvl: ' + lvl);
  console.log('stb: ' + stb);
  console.log('typ: ' + typ);
  console.log('crt: ' + crt);

  return ((2*lvl+10)/250 * att/def * pwr + 2) * stb * typ * crt;
}

/*
  function computeTypeModifier(attType, defType1 [, defType2])

  Computes the type advantage multiplier for a move of type attType against a
  pokemon of types defType1 and defType2. Call with just the first two arguments
  if the target pokemon does not have a secondary type.

  attType:  string (lowercase)
  defType1: string (lowercase)
  defType2: string (lowercase)
*/

function computeTypeModifier(attType, defType1, defType2) {
  var mul1 = 1, mul2 = 1;
  var indexA = type2id[attType],
      index1 = type2id[defType1],
      index2;

  if (defType2) index2 = type2id[defType2];

  switch (typeTable[indexA][index1]) {
    case '0':
      return 0;
    case '<':
      mul1 = .5;
      break;
    case '=':
      mul1 = 1;
      break;
    default:
      mul1 = 2;
  }

  if (index2) {
    switch (typeTable[indexA][index2]) {
      case '0':
        return 0;
      case '<':
        mul2 = .5;
        break;
      case '=':
        mul2 = 1;
        break;
      default:
        mul2 = 2;
    }
  }

  return mul1 * mul2;
}

/*
  CALL THIS TO GET THE DAMAGE VALUES FOR THE MOVES

  damageExpectedValue(attackingPokemon, defendingPokemon, move)

  Computes the expected value of the damage given an attacking Pokemon, a
  defending Pokemon, and a move.

  attackingPokemon (Pokemon)
  defendingPokemon (Pokemon)
  move             (Move)
*/

function damageExpectedValue(attackingPokemon, defendingPokemon, move) {
  var att, def, pwr, lvl, stb, typ;

  switch (move.class) {
    case 'physical':
      console.log('using physical');
      att = attackingPokemon.attack;
      def = defendingPokemon.defense;
      break;
    default:
      att = attackingPokemon.spattack;
      def = defendingPokemon.spdefense;
  }

  pwr = move.power;
  lvl = 100;

  stb = (attackingPokemon.type1 == move.type || attackingPokemon.type2 == move.type);
  console.log('stab is ' + stb);
  typ = computeTypeModifier(move.type, defendingPokemon.type1, defendingPokemon.type2);

  var critEnabledParams = {
    attack:  att,
    defense: def,
    power:   pwr,
    level:   lvl,
    stab:    stb,
    typeMod: typ,
    crit:    true
  };
  console.log('crit params: ');
  for (var x in critEnabledParams) {
    console.log(x + ': ' + critEnabledParams[x]);
  }

  var critDisabledParams = {
    attack:  att,
    defense: def,
    power:   pwr,
    level:   lvl,
    stab:    stb,
    typeMod: typ,
    crit:    false
  };
  console.log('noncrit params: ');
  for (var x in critDisabledParams) {
    console.log(x + ': ' + critDisabledParams[x]);
  }

  var critChance = 1/16;
  return (critChance*damageFormula(critEnabledParams) 
           + (1-critChance)*damageFormula(critDisabledParams)) * move.accuracy/100;
}

/*************************************************************
 * Example
 */

// necessary attacking pokemon info
ap = {
  name: 'venusaur',
  attack: 185,
  defense: 153,
  spattack: 205,
  spdefense: 205,
  level: 100,       // default is 100
  type1: 'grass',
  type2: 'poison'
};

// necessary defending pokemon info
dp = {
  name: 'blastoise',
  attack: 188,
  defense: 184,
  spattack: 175,
  spdefense: 215,
  level: 100,       // default is 100
  type1: 'water',
  type2: null       // use null if second type does not exist
};

// necessary move info
move = {
  name: 'absorb',   // not necessary
  class: 'special',
  power: 20,
  accuracy: 100,
  type: 'grass'
};

console.log('absorb does an average of ' + damageExpectedValue(ap,dp,move)
            + ' damage');