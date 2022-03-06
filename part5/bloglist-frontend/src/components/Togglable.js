import { forwardRef, useImperativeHandle, useState } from "react"

const Togglable = forwardRef(({ children, showButtonLabel="show", hideButtonLabel="hide" }, ref) => {
  const [visible, setVisible] = useState(false)
  
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const toggleVisibility = () => setVisible(visible => !visible)

  useImperativeHandle(ref, () => { 
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={ hideWhenVisible }>
        <button onClick={ toggleVisibility }>{ showButtonLabel }</button>
      </div>
      <div style={ showWhenVisible }>
        { children }
        <button onClick={ toggleVisibility }>{ hideButtonLabel }</button>
      </div>
    </div>
  )
})

export default Togglable