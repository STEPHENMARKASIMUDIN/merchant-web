import React from 'react';
import { Delete } from '@material-ui/icons';
import { dispatch } from '../../store';
import { IconTooltip } from './IconUpload';
import { ButtonProps } from '@material-ui/core/Button';
import { toggleSnackBar } from '../../store/actions/actionHelpers';
import { Button, Typography } from '@material-ui/core';
import { IsFileAllowedResult } from '../../helpers/merchantTypes';
import { isFileAllowed, error, SnackBMsg, shortenedFilename } from '../../helpers';


const filterFileName = (files: { inputID: string, file: { name: string } }[] = [], inputID: string = ''): string => {
  if (!files.length) {
    return "";
  } else {
    const result = files.filter((o) => {
      return o.inputID === inputID;
    });
    if (!result.length) {
      return "";
    } else {
      return shortenedFilename(result[0].file[0].name);
    }
  }
}

interface BtnUpload extends ButtonProps {
  divClasses?: string
  btnLabel?: string
  inputID?: string
  files?: any[]
  hasRemoveBtn?: boolean
  handleRemoveBtnClick: (...params) => any
  handleFileChange: (files: FileList, inputID: string) => any
}


const BtnUpload = ({ divClasses = "", btnLabel = "", inputID = "", color = "secondary", files = [], handleFileChange, hasRemoveBtn = false, handleRemoveBtnClick }: BtnUpload) => {

  const fileName = filterFileName(files, inputID);
  return (
    <div className={divClasses}>
      <Button variant="contained"
        component="label"
        htmlFor={inputID}
        color={color}>
        {btnLabel}
        <input type="file" name={inputID} id={inputID} accept=".png,.jpeg,.jpg"
          onChange={(e) => {
            const fileAllowedResult = isFileAllowed(e.target.files) as IsFileAllowedResult;
            if (!fileAllowedResult.isAllowed) {
              return dispatch(toggleSnackBar(error, SnackBMsg(5)));
            } else {
              handleFileChange(e.target.files, inputID)
            }
          }}
          className="d-none" />
      </Button>
      <Typography className="d-inline ml-3" children={fileName} />
      {hasRemoveBtn ? <IconTooltip
        MIcon={Delete}
        handleClick={handleRemoveBtnClick}
        title="Remove"
        iconClasses="icon-product tooltip-btn ml-3"
      /> : null}
    </div>
  )
};


export default BtnUpload;

