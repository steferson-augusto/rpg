import styled from 'styled-components'

interface Props {
  color: string
}

export const Container = styled.div<Props>`
  width: 100%;
  position: relative;
  margin-top: 7px;

  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 2px;
    cursor: pointer;

    p {
      text-align: center;
      font-size: 1.3rem;
      padding-right: 4px;
      /* mix-blend-mode: difference; */
      /* color: white; */
      color: ${props => props.color || '#b0bec5'};
      /* text-shadow: 1px 0 0 #444, -1px 0 0 #444, 0 1px 0 #444, 0 -1px 0 #444,
    1px 1px #444, -1px -1px 0 #444, 1px -1px 0 #444, -1px 1px 0 #444; */

      &:first-letter {
        text-transform: uppercase;
      }
    }

    svg {
      opacity: 0;
      transition: all 0.4s ease;
    }

    &:hover svg {
      opacity: 1;
    }
  }

  .MuiLinearProgress-root {
    height: 20px;
    background-color: var(--surface-2);
    border-radius: 5px;

    .MuiLinearProgress-bar {
      /* background-color: ${props => props.color || '#b0bec5'}; */
      background-color: #555;
      border-radius: 5px;
    }
  }
`
