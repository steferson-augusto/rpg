import roll from './roll'
import mroll from './mroll'
import ring from './ring'
import attribute from './attribute'
import weaponSmithy from './weaponSmithy'
import until from './until'

const commands = {
  roll,
  mroll,
  anel: ring,
  atributo: attribute,
  'forja-arma': weaponSmithy,
  'ate-conseguir': until
}

export default commands
