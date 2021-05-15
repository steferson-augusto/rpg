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

const ShieldMaster: React.FC = () => {
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
          <CardActionArea onClick={handleClick('/escudo-do-mestre/vantagens')}>
            <CardMedia
              image="https://i.imgur.com/wfdyvG2.png"
              title="Vantagens"
              component="img"
            />
            <CardContent>
              <h4>Vantagens</h4>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Container>
  )
}

export default ShieldMaster
