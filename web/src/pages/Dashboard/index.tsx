import React, { useCallback, useRef } from 'react'
import { Paper } from '@material-ui/core'

import { Container } from './styles'
import useSwr from '../../hooks/useSWR'
import { usePlayer } from '../../contexts/player'
import Animation from '../../components/Animation'
import Pool from './Pool'
import Stat from '../../models/Stat'
import { AttributeData } from '../../models'
import Dice from './Dice'
import DialogRoll, {
  DialogRollHandles,
  DialogValues
} from '../../components/DialogRoll'
import Skill from '../../models/Skill'

const Dashboard: React.FC = () => {
  const dialogRef = useRef<DialogRollHandles>(null)
  const { selected } = usePlayer()

  const { data: character, loading: loadingCharacter } = useSwr(
    `/character/user/${selected?.id}`
  )

  const { data: pools, loading: loadingPools } = useSwr<Stat[]>(
    `/stats/user/${selected?.id}?energy=1`
  )

  const { data: attributes, loading: loadingAttributes } = useSwr<
    AttributeData[]
  >(`/attributes/${selected?.id}`)

  const { data: skills, loading: loadingskills } = useSwr<Skill[]>(
    `/skills/user/${selected?.id}?favorites=1`
  )

  console.log(skills)

  const handleOpenDialog = useCallback(
    (values: DialogValues) => {
      dialogRef.current?.open(values)
    },
    [dialogRef]
  )

  return (
    <Container>
      <div className="column">
        <Paper className="character">
          {loadingCharacter ? (
            <Animation height="50px" />
          ) : (
            <>
              <ul>
                <li>{character?.name}</li>
                <li>{character?.race}</li>
              </ul>
              <p>{character.xp} XP</p>
            </>
          )}
        </Paper>
        <Paper style={{ height: 200 }}>teste</Paper>
      </div>
      <div className="column">
        <Paper className="pools">
          {loadingPools ? (
            <Animation height="100px" />
          ) : (
            pools?.map(pool => <Pool key={pool.id} data={pool} />)
          )}
        </Paper>
      </div>
      <div className="column">
        <Paper>
          {loadingAttributes ? (
            <Animation height="100px" />
          ) : (
            attributes?.map(attribute => (
              <Dice
                key={attribute.id}
                data={attribute}
                handleOpenDialog={handleOpenDialog}
              />
            ))
          )}
        </Paper>
        <Paper>
          {loadingskills ? (
            <Animation height="100px" />
          ) : (
            skills?.map(skill => (
              <Dice
                key={skill.id}
                data={skill}
                handleOpenDialog={handleOpenDialog}
              />
            ))
          )}
        </Paper>
        <div className="spacer" />
      </div>
      <DialogRoll ref={dialogRef} />
    </Container>
  )
}

export default Dashboard
