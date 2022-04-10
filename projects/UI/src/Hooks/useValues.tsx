import { useState } from "react"

export function useValues<InitialState extends object>(
  initialState: InitialState
) {
  const [values, setValues] = useState<InitialState>(initialState)

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((curr) => ({
      ...curr,
      [e.target.name]: e.target.value,
    }))
  }

  function getValue(key: keyof InitialState) {
    return values[key]
  }

  function clear() {
    setValues(initialState)
  }

  function getPropsForInput(name: keyof InitialState) {
    const value = values[name]

    return {
      value,
      onChange: onInputChange,
    }
  }

  return [
    values,
    {
      getValue,
      clear,
      onInputChange,
      getPropsForInput,
    },
  ] as const
}
