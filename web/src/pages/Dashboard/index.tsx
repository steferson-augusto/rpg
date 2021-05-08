import React, { useCallback, useRef } from 'react'
import { Paper } from '@material-ui/core'

import { Container } from './styles'
import Pool from './Pool'
import Stat from './Stat'
import Dice from './Dice'
import useSwr from '../../hooks/useSWR'
import { usePlayer } from '../../contexts/player'
import Animation from '../../components/Animation'
import {
  AttributeData,
  // AdvancementData,
  SkillData,
  StatData
} from '../../models'
import DialogRoll, {
  DialogRollHandles,
  DialogValues
} from '../../components/DialogRoll'
// import Advancement from './Advancement'

const Dashboard: React.FC = () => {
  const dialogRef = useRef<DialogRollHandles>(null)
  const { selected } = usePlayer()

  const { data: character, loading: loadingCharacter } = useSwr(
    `/character/user/${selected?.id}`
  )

  const { data: pools, loading: loadingPools } = useSwr<StatData[]>(
    `/stats/user/${selected?.id}?energy=1`
  )

  const { data: stats, loading: loadingStats } = useSwr<StatData[]>(
    `/stats/user/${selected?.id}?energy=0`
  )

  // const { data: advancements, loading: loadingAdvancements } = useSwr<
  //   AdvancementData[]
  // >(`/advancements/user/${selected?.id}`)

  const { data: attributes, loading: loadingAttributes } = useSwr<
    AttributeData[]
  >(`/attributes/${selected?.id}`)

  const { data: skills, loading: loadingskills } = useSwr<SkillData[]>(
    `/skills/user/${selected?.id}?favorites=1`
  )

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
          <h3 className="title">Personagem</h3>
          {loadingCharacter ? (
            <Animation height="50px" />
          ) : (
            <>
              <ul>
                <li>{character?.name}</li>
                <li>{character?.race}</li>
              </ul>
              <p>{character?.xp} XP</p>
            </>
          )}
        </Paper>
        <Paper>
          <h3 className="title">Status</h3>
          {loadingStats ? (
            <Animation height="100px" />
          ) : (
            stats?.map(stat => <Stat key={stat.id} data={stat} />)
          )}
        </Paper>
        {/* <Paper className="advancements">
          <h3 className="title">
            <span>DES</span>Vantagens
          </h3>
          {loadingAdvancements ? (
            <Animation height="100px" />
          ) : (
            advancements?.map(advancement => (
              <Advancement key={advancement.id} data={advancement} />
            ))
          )}
        </Paper> */}
      </div>
      <div className="column">
        <Paper className="pools">
          <h3 className="title">Energias</h3>
          {loadingPools ? (
            <Animation height="100px" />
          ) : (
            pools?.map(pool => <Pool key={pool.id} data={pool} />)
          )}
        </Paper>
      </div>
      <div className="column">
        <Paper>
          <h3 className="title">Atributos</h3>
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
          <h3 className="title">Perícias</h3>
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
