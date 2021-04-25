import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;

    .search {
      display: flex;
      align-items: center;
      padding: 4px 8px;
    }

    .btn-add {
      position: absolute;
      top: 18px;
      right: 12px;

      @media screen and (max-width: 440px) {
        position: initial;
        top: 0;
        right: 0;
        margin-bottom: 4px;
      }
    }

    @media screen and (max-width: 560px) {
      justify-content: flex-start;
    }

    @media screen and (max-width: 440px) {
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 8px;
    overflow-y: auto;

    .skills {
      width: 100%;
      padding-top: 12px;

      .MuiAccordion-root {
      }

      .accordion-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          &::first-letter {
            text-transform: uppercase;
          }

          span {
            font-size: 1.4rem;
            font-weight: 500;
            padding-left: 8px;

            span {
              color: var(--primary);
            }
          }
        }

        .actions {
          color: var(--text-primary);

          @media screen and (max-width: 640px) {
            display: none;
          }
        }
      }
    }
  }
`
