import React from 'react';
import { mount } from 'enzyme';
import Home from '../Home';
import Root from '../Root';

let wrapped;

beforeEach(() => {
    wrapped = mount(
      <Root>
        <Home />
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
  });

  describe('form data validation', () => {
  
    it('has a first name that users can type in', () => {
        wrapped.find('#firstName').simulate('change', {
        target: { value: 'input text' }
          });
          wrapped.update();
      expect(wrapped.find('#firstName').prop('value')).toEqual('input text');
    });

    it('has a last name that users can type in', () => {
        wrapped.find('#lastName').simulate('change', {
        target: { value: 'input text' }
          });
          wrapped.update();
      expect(wrapped.find('#lastName').prop('value')).toEqual('input text');
    });

    it('has a date of birth that users can type in', () => {
        wrapped.find('#dob').simulate('change', {
        target: { value: "2000-01-01" }
          });
          wrapped.update();
      expect(wrapped.find('#dob').prop('value')).toEqual("2000-01-01");
    });
});

  describe('form data initialization after submit', () => {
  
    it('when form is submitted, first name gets emptied', () => {
      wrapped.find('form').simulate('submit');
      wrapped.update();
      expect(wrapped.find('#firstName').prop('value')).toEqual('');
    });

    it('when form is submitted, last name gets emptied', () => {
        wrapped.find('form').simulate('submit');
        wrapped.update();
        expect(wrapped.find('#lastName').prop('value')).toEqual('');
      });

    it('when form is submitted, income gets initialized', () => {
        wrapped.find('form').simulate('submit');
        wrapped.update();
        expect(wrapped.find('#income').prop('value')).toEqual("");
      });

    it('when form is submitted, date of birth gets initialized to null', () => {
        wrapped.find('form').simulate('submit');
        wrapped.update();
        expect(wrapped.find('#dob').prop('value')).toEqual("");
      });

  });

  describe('form error message', () => {
  
    it('first name empty error message', () => {
        wrapped.find('#firstName').simulate('change', {
            target: { value: '' }
              });
              wrapped.update();
        expect(wrapped.find('#formErrorFirstName').html()).toContain('Should not be empty');
    });

    it('last name empty error message', () => {
        wrapped.find('#lastName').simulate('change', {
            target: { value: '' }
              });
              wrapped.update();
        expect(wrapped.find('#formErrorLastName').html()).toContain('Should not be empty');
    });

  });