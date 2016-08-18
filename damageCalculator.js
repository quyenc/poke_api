/* 
  damageFormula(info)

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
  crt = info.crit ? 2 : 1;

  return ((2*lvl+10)/250 * att/def * pwr + 2) * stb * typ * crt;
}