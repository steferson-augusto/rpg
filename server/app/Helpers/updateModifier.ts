/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
import Advancement from 'App/Models/Advancement'
import Modifier from 'App/Models/Modifier'
import Stat from 'App/Models/Stat'
import UserAdvancement from 'App/Models/UserAdvancement'

interface ModifierValues {
  [key: string]: {
    add: {
      stat: string
      modifier: {
        label: string
        value: number
      }
    }
    remove: {
      stat: string
      modifier: string
    }
  }
}

const props: ModifierValues = {
  'bloquear': {
    add: {
      stat: 'aparar',
      modifier: {
        label: 'Vantagem (bloquear)',
        value: 1
      }
    },
    remove: {
      stat: 'aparar',
      modifier: 'Vantagem (bloquear)'
    }
  },
  'bloquear aprimorado': {
    add: {
      stat: 'aparar',
      modifier: {
        label: 'Vantagem (bloquear aprimorado)',
        value: 2
      }
    },
    remove: {
      stat: 'aparar',
      modifier: 'Vantagem (bloquear aprimorado)'
    }
  },
  'feio': {
    add: {
      stat: 'carisma',
      modifier: {
        label: 'Complicação (feio)',
        value: -2
      }
    },
    remove: {
      stat: 'carisma',
      modifier: 'Complicação (feio)'
    }
  }
}

export async function addModifier(userAdvancement: UserAdvancement): Promise<void> {
  const advancement = await Advancement.find(userAdvancement.advancementId)
  const label = advancement?.label?.toLowerCase() || ''

  const values = props?.[label]?.add

  if (!values) return
  const userId = userAdvancement.userId

  const stat = await Stat.firstOrCreate(
    { userId, label: values.stat },
    { userId, label: values.stat, current: 0 }
  )
  await Modifier.create({ statId: stat.id, ...values.modifier })
}

export async function removeModifier(userAdvancement: UserAdvancement): Promise<void> {
  const advancement = await Advancement.find(userAdvancement.advancementId)
  const label = advancement?.label?.toLowerCase() || ''

  const values = props?.[label]?.remove

  if (!values) return
  const userId = userAdvancement.userId

  const stat = await Stat.query().where({ userId, label: values.stat }).firstOrFail()
  await Modifier.query().where({ statId: stat?.id, label: values.modifier }).delete()
}
