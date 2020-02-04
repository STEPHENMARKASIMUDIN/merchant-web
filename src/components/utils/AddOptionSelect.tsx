import React, { Fragment, useReducer, useEffect } from 'react';
import CustomSelect from './CustomSelect';
import { MerchantFormField } from './Forms';
import { TOGGLE_INPUT_FIELD, UPDATE_VALUE } from '../../store/actionTypes';


interface AddOptionSelectProps {
  handleChange?: (...args: any[]) => any
  stato?: {
    selectValue: string
    opts: [{ label: string, value: string }]
  },
  state?: {
    context: {
      labelWidth: number
    }
  }
  selectClasses: string
  selectName: string
  selectLabel: string
  inputName: string
  inputLabel: string
  isDisabled?: boolean
}

interface AddOptionInitState {
  toggleInputField: boolean
  inputValue: string
}

const initState = {
  toggleInputField: false,
  inputValue: ''
}

const reducer = (state: AddOptionInitState = initState, action: { type: string, payload: any }): AddOptionInitState => {
  switch (action.type) {
    case TOGGLE_INPUT_FIELD:
      return { ...state, toggleInputField: action.payload }
    case UPDATE_VALUE:
      return { ...state, inputValue: action.payload }
    default:
      return state;
  }
}

const AddOptionSelect = (props: AddOptionSelectProps): JSX.Element => {
  const { handleChange, state, stato, selectClasses, selectName, selectLabel, inputName, inputLabel, isDisabled = false } = props;

  const [aosState, reactDispatch] = useReducer(reducer, initState);

  useEffect(() => {
    reactDispatch({ type: TOGGLE_INPUT_FIELD, payload: stato.selectValue === 'cno' ? true : false });
  }, [stato.selectValue])

  return (
    <Fragment>
      <CustomSelect
        classes={selectClasses}
        name={selectName}
        selectLabel={selectLabel}
        defaultSelectVal="Choose an Option Name"
        handleChange={handleChange}
        isDisabled={isDisabled}
        context={state.context}
        labelWidth={state.context.labelWidth}
        value={stato.selectValue}
        options={stato.opts}
      />
      {aosState.toggleInputField ?
        <MerchantFormField
          label={inputLabel && " "}
          isSmall
          isText
          name={inputName}
          value={aosState.inputValue}
          handleChange={(e) => {
            reactDispatch({ type: UPDATE_VALUE, payload: e.target.value })
          }}
          error={{}}
        /> : null
      }
    </Fragment>
  )
};


export default AddOptionSelect;