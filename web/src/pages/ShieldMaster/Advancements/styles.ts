import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 8px;

  .content {
    width: 100%;
    max-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 8px;
    padding-top: 8px;
    overflow-y: auto;

    .advancement {
      width: 100%;
      max-width: 800px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px;
      border-radius: 4px;
      transition: all 0.3s;

      &:hover {
        background-color: var(--surface-1);
      }

      .actions {
        min-width: 96px;
      }

      h3 {
        color: var(--text-color);
        font-size: 2rem;

        &::first-letter {
          text-transform: uppercase;
        }

        &.hindrance {
          color: var(--error);
        }
      }

      p {
        color: #555;
        font-size: 1.3rem;
      }
    }
  }

  .empty-state {
    font-style: italic;
    color: var(--text-color);
  }
`
