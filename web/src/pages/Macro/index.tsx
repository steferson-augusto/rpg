import React, { useCallback } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  InputBase,
  Paper
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { Container } from './styles'
import { useHistory } from 'react-router'

const Macro: React.FC = () => {
  const history = useHistory()

  const handleClick = useCallback(
    (destiny: string) => () => {
      history.push(destiny)
    },
    []
  )

  return (
    <Container>
      <Paper className="search">
        <InputBase
          placeholder="Pesquisar"
          inputProps={{ 'aria-label': 'pesquisar' }}
        />
        <IconButton aria-label="botão de pesquisa">
          <SearchIcon />
        </IconButton>
      </Paper>

      <div className="content">
        <Card className="card">
          <CardActionArea onClick={handleClick('/macros/forja-de-armas')}>
            <CardMedia
              image="https://i.imgur.com/eeuZhZy.png"
              title="Forja de armas"
              component="img"
            />
            <CardContent>
              <h4>Forja de armas</h4>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Container>
  )
}

export default Macro
