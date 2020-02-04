import React, { useReducer, Fragment } from 'react';
import Tags from '../utils/Tags';
import Container from '../utils/Container';
import AddOptionSelect from '../utils/AddOptionSelect';
import { isIn } from './AddEditProductFooter';
import { Delete } from '@material-ui/icons';
import { dispatch } from '../../store';
import { IconTooltip } from '../utils/IconUpload';
import { GridContainer } from '../utils/Containers';
import { toggleSnackBar } from '../../store/actions/actionHelpers';
import { Grow, Typography, Button, Grid } from '@material-ui/core';
import { warning, SnackBMsg, getNewOptions } from '../../helpers';
import { ADD_OPTION_ON_SELECT_CHANGE, ADD_ANOTHER_OPTION, REMOVE_ANOTHER_OPTION, CLEAR_OPTIONS } from '../../store/actionTypes';

const initState = {
  opts: [{ label: 'Title', value: 'Title' }, { label: 'Size', value: 'Size' },
  { label: 'Color', value: 'Color' }, { label: 'Material', value: 'Material' },
  { label: 'Style', value: 'Style' }, { label: 'Create New Option', value: 'cno' }],
  selectValue: '',
  selectValue1: '',
  selectValue2: '',
  otherOptions: [],
  opts1: [],
  opts2: [],
  addOptionClasses: ''
}

const reducer = (state = initState, action) => {
  let otherOptions = [], opts1 = [], opts2 = [], opts = [], value = '';
  switch (action.type) {
    case ADD_OPTION_ON_SELECT_CHANGE:
      [opts1, opts2] = getNewOptions(state, ADD_OPTION_ON_SELECT_CHANGE, { action });
      return { ...state, [action.payload.name]: action.payload.value, opts2, opts1 }
    case ADD_ANOTHER_OPTION:
      otherOptions = [...state.otherOptions, 1];
      [opts1, opts2] = getNewOptions(state, ADD_ANOTHER_OPTION, { otherOptions })
      return { ...state, otherOptions, addOptionClasses: otherOptions.length === 2 ? 'd-none' : '', opts1, opts2 };
    case REMOVE_ANOTHER_OPTION:
      otherOptions = state.otherOptions.filter((val, i) => i !== action.payload.i);
      return { ...state, otherOptions, addOptionClasses: otherOptions.length <= 1 ? '' : 'd-none', [action.payload.selectName]: '' };
    case CLEAR_OPTIONS:
      return { ...state, selectValue: '', selectValue1: '', selectValue2: '', }
    default:
      return state;
  }
}


export const AddOptions = ({ idBody, state, submitCallBack, toggleAddOptionsSection, files,
  optionValue0, optionValue1, optionValue2, clearOptions, clearFiles }) => {

  const [stato, reactDispatch] = useReducer(reducer, initState);


  const handleChange = (e) => reactDispatch({ type: ADD_OPTION_ON_SELECT_CHANGE, payload: e.target });


  const clearSelects = () => reactDispatch({ type: CLEAR_OPTIONS });

  if (idBody !== 'edit-product-body') {
    return (
      <Grow in={isIn(idBody, state)} timeout={1000}>
        <div style={{ transformOrigin: '100% 100% 100%' }}>
          <Container
            wantPaper classes="mt-2" isChildContainer parentSize={12} parentJustify="center">
            <GridContainer >
              <Typography
                variant="h5"
                children="Add Options"
                className="mt-small"
              />
            </GridContainer>
            <Grid item container xs={12} spacing={32}>
              <Grid item xs={4}>
                <AddOptionSelect
                  selectClasses="mt-2"
                  selectName="selectValue"
                  selectLabel="Option Name"
                  handleChange={handleChange}
                  state={state}
                  stato={stato}
                  isDisabled={stato.selectValue ? true : false}
                  labelWidth={state.context.labelWidth}
                />
              </Grid>
              <Grid item xs={8}>
                <Tags tags={optionValue0} optionName="optionValue0" id={idBody} classNames="mt-2" isDisabled={!stato.selectValue ? true : false} />
              </Grid>
              {
                stato.otherOptions.length ? stato.otherOptions.map((o, i) => {
                  let selectName = `selectValue${(i + 1)}`;
                  let selectValue = stato[selectName];
                  return (
                    <Fragment key={i}>
                      <Grid item xs={4}>
                        <AddOptionSelect
                          selectClasses="mt-2"
                          selectName={selectName}
                          selectLabel="Option Name"
                          handleChange={handleChange}
                          state={state}
                          isDisabled={selectValue ? true : false}
                          stato={{ selectValue, opts: stato[`opts${i + 1}`] }}
                          labelWidth={state.context.labelWidth}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <Tags tags={(i + 1) === 1 ? optionValue1 : optionValue2}
                          optionName={`optionValue${i + 1}`}
                          isDisabled={!selectValue}
                          id={idBody} classNames="mt-2" />
                      </Grid>
                      <Grid item xs={1}>
                        <IconTooltip title="Remove Option" handleClick={() => {
                          return reactDispatch({ type: REMOVE_ANOTHER_OPTION, payload: { i, selectName } })
                        }} MIcon={Delete}
                          iconClasses="icon-product tooltip-btn mt-3" />
                      </Grid>
                    </Fragment>
                  )
                }) : null
              }
            </Grid>
            <Grid item container xs={3} spacing={8} justify="flex-start">
              <Grid item>
                <Button
                  onClick={(e) => {
                    if (!stato.selectValue.trim()) {
                      return dispatch(toggleSnackBar(warning, SnackBMsg(27)))
                    } else {
                      return reactDispatch({ type: ADD_ANOTHER_OPTION })
                    }
                  }}
                  variant="contained"
                  className={`pr-2 pl-2 mt-1 ${stato.addOptionClasses}`}
                  color="default">
                  Add another option
            </Button>
              </Grid>
            </Grid>
            <GridContainer>
              <div className="float-right mt-1">
                <Button
                  onClick={(e) => {
                    return submitCallBack(e, files, [{
                      opt_name: stato.selectValue,
                      opt_value: optionValue0
                    },
                    {
                      opt_name: stato.selectValue1,
                      opt_value: optionValue1
                    },
                    {
                      opt_name: stato.selectValue2,
                      opt_value: optionValue2
                    }].filter((item) => (item.opt_name.length && item.opt_value.length)), () => {
                      clearFiles();
                      clearSelects();
                    });
                  }}
                  variant="outlined"
                  className="pr-2 pl-2 float-right"
                  color="secondary">
                  Save
            </Button>
                <Button
                  onClick={() => {
                    toggleAddOptionsSection();
                    setTimeout(() => {
                      clearSelects();
                      clearOptions();
                    }, 500)
                  }}
                  variant="outlined"
                  className="pr-2 pl-2  float-right  mr-2"
                  color="inherit">
                  Cancel
            </Button>
              </div>
            </GridContainer>
          </Container>
        </div>
      </Grow>
    )
  } else {
    return null;
  }
}