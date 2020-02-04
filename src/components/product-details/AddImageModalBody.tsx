import React from 'react';
import IconUpload from '../utils/IconUpload';
import { Grid } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';

interface ImagesContainerProps {
  imagesLeftToUpload: number
  onFileChange: any
  fileLabels: string[]
}


interface AddImageModalBodyProps extends ImagesContainerProps {
  currentImages?: string[]

}


const AddImageModalBody = (props: AddImageModalBodyProps) => {

  return (
    <Grid item container>
      <Grid item>
        <ImagesContainer
          fileLabels={props.fileLabels}
          onFileChange={props.onFileChange}
          imagesLeftToUpload={props.imagesLeftToUpload} />
      </Grid>
    </Grid>
  )
};



const ImagesContainer = (props: ImagesContainerProps) => {
  let imagesEl = Array.from({ length: props.imagesLeftToUpload }, (v, i) => i);
  return (
    <>
      {imagesEl.map((i) => {
        let name = `newFile${i + 1}`;
        return (
          <div className="mr-2 d-inline" key={i + 'a'}>
            <IconUpload
              key={name}
              placement="bottom"
              Icon={AddAPhoto}
              handleChangeFile={props.onFileChange}
              toolTipTitle="Only jpg, png and jpeg are the allowed extensions."
              label={props.fileLabels[name]}
              name={name}
              acceptPattern=".jpg, .png, .jpeg"
            />
          </div>
        )
      })}
    </>
  )
}

export default AddImageModalBody;