const errors = (state = null, action) => {
  const { type, error } = action

  switch (type) {
    case 'HANDLE_SPECIAL_CASE':
      //is this needed, do something with raw error in the actions then dispatch a normal error?
      return error
    default:
      return gottaCatchEmAll()
  }

  function gottaCatchEmAll() {
    if (error) {
      return error
    }
    return null
  }
}

export default errors
