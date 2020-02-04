import React from 'react';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import Header from '../components/utils/Header';
import ReportCard from '../components/utils/ReportCard';
import LoadingModal from "../components/utils/LoadingModal";
import { Divider, Typography, Button } from '@material-ui/core';

describe('Test Components', () => {

  describe('Test LoadingModal component', () => {
    let wrapper: ShallowWrapper
    beforeAll(() => {
      wrapper = shallow(<LoadingModal />);
    });


    it('prop "open" should have a default of false', () => {
      expect(wrapper.prop('open')).toBe(false);
    });

    it('should have a element with a className of "modal-loading"', () => {
      expect(wrapper.find('.modal-loading')).toHaveLength(1);
    });


    it('should have a element with property "alt" with value of "Loading Image"', () => {
      expect(wrapper.find('[alt="Loading Image"]')).toHaveLength(1);
    });


    it('should have a element with property "aria-labelledby" with "Merchant Loading"', () => {
      expect(wrapper.find('[aria-labelledby="Merchant Loading"]')).toHaveLength(1);
    });


    it('prop "open" should be true when changing prop open', () => {
      wrapper.setProps({ open: !wrapper.prop('open') });
      expect(wrapper.prop('open')).toBeTruthy();
    });

  });


  describe('Test ReportCard component', () => {
    let wrapper: ReactWrapper;
    beforeAll(() => {
      wrapper = mount(<ReportCard btnLabel="Submit" classes={{ reportCard: 'big', reportMedia: 'small' }} imgSrc="path/to/image" handleClick={() => { }} />);
    })


    it('should have prop btnLabel with value of "Submit"', () => {
      expect(wrapper.prop('btnLabel')).toBe('Submit');
    });


    it('should have text with value of "Submit"', () => {
      expect(wrapper.text()).toBe('Submit');
    });



    it('should have button inside this a component', () => {
      expect(wrapper.find('button').type()).toBe('button');
    });


    it('should have prop imgSrc', () => {
      expect(wrapper.prop('imgSrc')).toBeTruthy();
    });



    it('should have prop imgSrc', () => {

      expect(wrapper.find('img[alt="Report"]')).toHaveLength(1);
    });



  });


  describe('Test Header component', () => {
    let wrapper: ReactWrapper;
    beforeAll(() => {
      wrapper = mount(<Header
        withButton
        variant="h1"
        dividerClass="divider"
        label="Title Label"
        handleClick={() => { }} />);
    });



    it('should have a default prop of "dividerClass" with a value of "divider"', () => {
      expect(wrapper.prop('dividerClass')).toBe('divider');

    });

    it('should have a default prop of "label" with a value of "Title Label"', () => {
      expect(wrapper.prop('label')).toBe('Title Label');
    });


    it('should have a default prop of "variant" with a value of "h1"', () => {
      expect(wrapper.prop('variant')).toBe('h1');
    });


    it('should have a default prop of "variant" with a value of "h1"', () => {
      expect(typeof wrapper.prop('handleClick')).toBe('function');
    });


    it('should have an element with a class of "d-inline"', () => {

      expect(wrapper.exists('.d-inline')).toBeTruthy();

    });


    it('should have an element with a type of button', () => {

      expect(wrapper.find('button')).toHaveLength(1);

    });

    it('should have an element with the text "Title Label"', () => {

      expect(wrapper.text()).toBe("Title Label");

    });


    it('should have a button element with the text "Security"', () => {

      expect(wrapper.find('button').text()).toBe("Security");

    });


    it('should have a component <Divider className="divider"></Divider>"', () => {

      expect(wrapper.containsAllMatchingElements([
        <Divider className="divider"></Divider>,
        <Button
          style={{ float: 'right' }}
          color="secondary"
          variant="contained"
          children="Security"
        />
      ])).toBeTruthy();

    });









  });

});