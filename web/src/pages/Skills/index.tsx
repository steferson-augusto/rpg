import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  Button,
  IconButton,
  InputBase,
  Paper,
  Tooltip
} from '@material-ui/core'
import produce from 'immer'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'

import GenericState from '../../components/GenericState'
import { Container } from './styles'
import { usePlayer } from '../../contexts/player'
import useSwr from '../../hooks/useSWR'
import SkillData from '../../models/Skill'
import Drawer, { DrawerHandles } from '../../components/Drawer'
import FormSkill from './FormSkill'
import EmptyState from '../../components/EmptyState'
import Skill from './Skill'
import useDebounce from '../../hooks/useDebounce'
import DialogRoll, { DialogRollHandles } from '../../components/DialogRoll'
import Favorites from './Favorites'
import { useAuth } from '../../contexts/auth'
import Conditional from '../../components/Conditional'

const Skills: React.FC = () => {
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState<SkillData[]>([])
  const drawerRef = useRef<DrawerHandles>(null)
  const dialogRef = useRef<DialogRollHandles>(null)
  const { user } = useAuth()
  const { selected } = usePlayer()
  const debounceSearch = useDebounce(search, 300)

  const { data, loading, error, mutate } = useSwr<SkillData[]>(
    `/skills/user/${selected?.id}`
  )

  const favorites = useMemo(() => data?.filter(skill => skill.pinned), [data])

  useEffect(() => {
    let skills: SkillData[] | undefined = []
    if (!filtered) {
      skills = data
    }
    skills = data?.filter(skill => skill.label.includes(search.toLowerCase()))
    setFiltered(skills || [])
  }, [data, debounceSearch])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleAddSkill = useCallback(() => {
    drawerRef?.current?.open()
  }, [])

  const mutateSkill = useCallback(
    (newValue: SkillData) => {
      const newData = produce(data, draft => {
        draft?.push(newValue)
      })
      mutate(newData, false)
    },
    [data]
  )

  const mutateDeleteSkill = useCallback(
    (id: number) => {
      const newData = produce(data, draft => {
        const index = draft?.findIndex(skill => skill.id === id)
        if (index !== undefined) {
          draft?.splice(index, 1)
        }
      })
      mutate(newData, false)
    },
    [data]
  )

  const mutateFavoriteSkill = useCallback(
    (id: number) => {
      const newData = produce(data, draft => {
        const index = draft?.findIndex(skill => skill.id === id)
        if (index !== undefined && draft !== undefined) {
          draft[index].pinned = !draft?.[index].pinned
        }
      })
      mutate(newData, false)
    },
    [data]
  )

  if (loading || error) return <GenericState loading={loading} error={error} />

  return (
    <Container>
      <div className="header">
        <Tooltip title="Adicionar nova perícia">
          <Button
            className="btn-add"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddSkill}
          >
            Novo
          </Button>
        </Tooltip>

        <Paper className="search">
          <InputBase
            placeholder="Pesquisar"
            inputProps={{ 'aria-label': 'pesquisar' }}
            value={search}
            onChange={handleSearchChange}
          />
          <IconButton aria-label="botão de pesquisa">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      <div className="content">
        <Conditional visible={!user?.isMaster}>
          <Favorites
            data={favorites || []}
            openDialog={dialogRef.current?.open}
            mutateFavoriteSkill={mutateFavoriteSkill}
          />
        </Conditional>

        {filtered?.length === 0 ? (
          <EmptyState label="Não encontramos nenhuma perícia..." />
        ) : (
          <div className="skills">
            {filtered?.map(skill => (
              <Skill
                key={skill.id}
                data={skill}
                openDialog={dialogRef.current?.open}
                mutateDeleteSkill={mutateDeleteSkill}
                mutateFavoriteSkill={mutateFavoriteSkill}
              />
            ))}
          </div>
        )}
      </div>

      <Drawer ref={drawerRef}>
        <FormSkill
          handleCancel={drawerRef?.current?.close}
          mutate={mutateSkill}
        />
      </Drawer>
      <DialogRoll ref={dialogRef} />
    </Container>
  )
}

export default Skills
