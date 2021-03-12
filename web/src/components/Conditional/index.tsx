import React from 'react'

interface ConditionalProps {
  visible: boolean
}

const Conditional: React.FC<ConditionalProps> = ({ visible, children }) => {
  if (visible) return <>{children}</>
  else return null
}

export default Conditional
