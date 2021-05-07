import styled from 'styled-components'

interface Props {
  color: string
}

export const Container = styled.div<Props>`
  width: 100%;
  position: relative;

  p {
    width: 100%;
    position: absolute;
    text-align: center;
    font-size: 1.3rem;
    top: 1px;
    /* mix-blend-mode: difference; */
    /* color: white; */
    color: ${props => props.color || '#b0bec5'};
    /* text-shadow: 1px 0 0 #444, -1px 0 0 #444, 0 1px 0 #444, 0 -1px 0 #444,
      1px 1px #444, -1px -1px 0 #444, 1px -1px 0 #444, -1px 1px 0 #444; */

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .MuiLinearProgress-root {
    height: 16px;
    background-color: var(--surface-2);
    border-radius: 5px;

    .MuiLinearProgress-bar {
      /* background-color: ${props => props.color || '#b0bec5'}; */
      background-color: #555;
      border-radius: 5px;
    }
  }

  & + div {
    margin-top: 6px;
  }
`
