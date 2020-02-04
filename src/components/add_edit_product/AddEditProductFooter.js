import React, { Fragment, useReducer, useEffect } from 'react';
import BtnUpload from '../utils/BtnUpload';
import { connect } from 'react-redux';
import { dispatch } from '../../store';
import { Container } from '../utils/Containers';
import { AddOptions } from './AddOptions';
import { findDOMNode } from 'react-dom';
import { toggleSnackBar } from '../../store/actions/actionHelpers';
import { Button, Typography, Grow } from '@material-ui/core';
import { requestToAddProduct, clearOptions } from '../../store/actions/add-product/addProductActions';
import { warning, SnackBMsg, calcClassAddBtn } from '../../helpers';
import { ADD_UPLOAD_BTN, CHANGE_FILE, TOGGLE_ADD_BTN, REMOVE_UPLOAD_BTN, TOGGLE_ADD_OPTIONS, SET_LABEL_WIDTH, CLEAR_FILES } from '../../store/actionTypes';


const initState = {
  files: [],
  uploadBtns: [],
  classAddBtn: '',
  showAddOptionsSection: true,
  context: {
    labelWidth: 0,
    labelRef: null
  }
}



const reducer = (state = initState, action) => {
  let uploadBtns, files;
  switch (action.type) {
    case CHANGE_FILE:
      files = state.files.length ? state.files.filter((file) => file.inputID !== action.payload.inputID) : state.files;
      return { ...state, files: [...files, action.payload] };
    case ADD_UPLOAD_BTN:
      uploadBtns = [...state.uploadBtns, action.payload];
      return { ...state, uploadBtns, classAddBtn: calcClassAddBtn(uploadBtns) };
    case TOGGLE_ADD_BTN:
      return { ...state, classAddBtn: state.classAddBtn === '' ? 'd-none' : '' };
    case REMOVE_UPLOAD_BTN:
      uploadBtns = state.uploadBtns.filter((item, index) => index !== action.payload.index); files = state.files.filter((item, index) => index !== (action.payload.index + 1));
      return { ...state, uploadBtns, files, classAddBtn: calcClassAddBtn(uploadBtns) };
    case TOGGLE_ADD_OPTIONS:
      return { ...state, showAddOptionsSection: !state.showAddOptionsSection }
    case SET_LABEL_WIDTH:
      return { ...state, context: { ...state.context, labelWidth: action.payload } }
    case CLEAR_FILES:
      return { ...state, files: [], uploadBtns: [] }
    default:
      return state;
  }
};





const AddEditProductFooter = ({ idBody, submitCallBack, requestToAddNewProduct,
  optionValue0, optionValue1, optionValue2, clearOptions }) => {


  const [state, reactDispatch] = useReducer(reducer, initState);

  const setFile = (file, inputID) => reactDispatch({
    type: CHANGE_FILE,
    payload: {
      file,
      inputID
    }
  });

  const toggleAddOptionsSection = () => reactDispatch({
    type: TOGGLE_ADD_OPTIONS
  });


  const addProductSubmitCallback = (e, files, opts, clearFiles) => {
    e.preventDefault();
    return requestToAddNewProduct(files, opts, clearFiles);
  }

  const clearFiles = () => {
    return reactDispatch({ type: CLEAR_FILES });
  }


  useEffect(() => {
    if (state.context.labelWidth === 0 && idBody !== 'edit-product-body') {
      reactDispatch({
        type: SET_LABEL_WIDTH,
        payload: findDOMNode(state.context.labelRef).offsetWidth
      })
    }
  })


  return (
    <Fragment>
      {idBody !== 'edit-product-body' ? <Container wantPaper={false}>
        <Typography
          variant="subheading"
          className="d-inline"
          children="Feature Image"
        />
        <span className="text-primary"> *</span>
        <BtnUpload
          handleFileChange={setFile}
          divClasses="mt-1"
          inputID="addProductImage0"
          btnLabel="Upload Image"
          files={state.files}
        />
        <Button
          onClick={(e) => {
            if (!state.files.length) {
              return dispatch(toggleSnackBar(warning, SnackBMsg(26)))
            } else {
              return reactDispatch({
                type: ADD_UPLOAD_BTN, payload: (BtnUpload)
              });
            }
          }}
          className={`mt-2 ${state.classAddBtn}`}
          color="inherit"
          variant="contained"
          children="Add Other Images"
        />
        {state.uploadBtns.length ? state.uploadBtns.map((Btn, i) => (
          <Btn key={i}
            hasRemoveBtn
            files={state.files}
            inputID={`addProductImage${i + 1}`}
            btnLabel="Choose New Image"
            handleFileChange={setFile}
            handleRemoveBtnClick={() => {
              reactDispatch({
                type: REMOVE_UPLOAD_BTN, payload: {
                  index: i
                }
              })
            }}
            divClasses={i === 0 ? "mt-2" : "mt-1"}
            color="inherit" />
        )) : null}

      </Container> : null}
      <Container wantPaper={false}>
        <Grow in={isIn(idBody, state, 'btn_toggle')} timeout={1000}>
          <div className="float-right" style={{ transformOrigin: '100% 100% 100%' }}>
            {idBody !== 'edit-product-body' ? <Button
              variant="outlined"
              className="pr-2 pl-2 mr-2"
              color="secondary"
              onClick={toggleAddOptionsSection}
            >
              Save and add Options
          </Button> : null}
            <Button
              onClick={idBody === 'edit-product-body' ? submitCallBack : (e) => {
                return addProductSubmitCallback(e, state.files, [], clearFiles);
              }}
              variant="outlined"
              className="pr-2 pl-2  float-right"
              color="secondary">
              Save
        </Button>
          </div>
        </Grow>
      </Container>
      <AddOptions
        idBody={idBody}
        state={state}
        files={state.files}
        submitCallBack={addProductSubmitCallback}
        toggleAddOptionsSection={toggleAddOptionsSection}
        optionValue0={optionValue0}
        optionValue1={optionValue1}
        optionValue2={optionValue2}
        clearOptions={clearOptions}
        clearFiles={clearFiles}
      />
    </Fragment>
  )
}

export default connect((state) => ({
  optionValue0: state.addProd.data.optionValue0,
  optionValue1: state.addProd.data.optionValue1,
  optionValue2: state.addProd.data.optionValue2,
}), (dispatch, ownProps) => ({
  requestToAddNewProduct: (files, options, clearFiles) => dispatch(requestToAddProduct(ownProps.request, files, options, clearFiles)),
  clearOptions: () => dispatch(clearOptions())
}))(AddEditProductFooter);



export function isIn(idBody, state, section) {
  if (section === 'btn_toggle') {
    return idBody === 'edit-product-body' ? true : state.showAddOptionsSection;
  }
  return idBody === 'edit-product-body' ? false : !state.showAddOptionsSection;
}

