import React, { useImperativeHandle, useState, forwardRef } from 'react'

//komponentti on kääritty forwardRefiin, jonka ainut tarkoitus on siirtää ref eteenpäin
const Toggle = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //mahdollistaa funktion kutsumisen komponentin ulkopuolelta
  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div id="togglecontainer">
      {!visible ? (
        <>
          <button className="togglebutton1" onClick={toggleVisibility}>
            {props.buttonLabel || 'open'}
          </button>
        </>
      ) : (
        <>
          {props.children}
          <button className="togglebutton2" onClick={toggleVisibility}>
            {props.secondButtonLabel || 'close'}
          </button>
        </>
      )}
    </div>
  )
})

Toggle.displayName = 'Toggle'

export default Toggle
