function changeKeyInStateKey(i, stateKey, keyToChange, newValue) {
  const oldItem = stateKey[i]
  const newItem = { ...oldItem, [keyToChange]: newValue }
  const newArr = [...stateKey.slice(0, i), newItem, ...stateKey.slice(i + 1)]
  return {
    stateKey: newArr,
  }
}

export default changeKeyInStateKey
