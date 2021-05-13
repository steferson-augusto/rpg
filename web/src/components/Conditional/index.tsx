import React from 'react'

interface ConditionalProps {
  visible: unknown
}

const Conditional: React.FC<ConditionalProps> = ({ visible, children }) => {
  if (visible) return <>{children}</>
  else return null
}

export default Conditional
