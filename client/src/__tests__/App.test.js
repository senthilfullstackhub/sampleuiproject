import React from 'react';
import App from '../App';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Root from '../Root';
import Home from '../Home';
import BarclayPage from '.././Component/pages/BarclayPage';
import VanquisPage from '.././Component/pages/VanquisPage';
import NotEligiblePage from '.././Component/pages/NotEligiblePage';


describe('router test', () => {

    let wrapper;

it('Home router Test',() => {

    wrapper = mount(
        <MemoryRouter initialEntries={[ '/' ]}>
         <Root>
          <Home/>
          </Root>
        </MemoryRouter>
      );
      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(BarclayPage)).toHaveLength(0);
      expect(wrapper.find(VanquisPage)).toHaveLength(0);  
      expect(wrapper.find(NotEligiblePage)).toHaveLength(0); 

      wrapper.unmount();
})


it('Barclay router Test',() => {

    wrapper = mount(
        <MemoryRouter initialEntries={[ '/pages/Barclay' ]}>
         <Root>
          <BarclayPage/>
          </Root>
        </MemoryRouter>
      );


      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(BarclayPage)).toHaveLength(1);
      expect(wrapper.find(VanquisPage)).toHaveLength(0);
      expect(wrapper.find(NotEligiblePage)).toHaveLength(0); 

      wrapper.unmount();
})


it('Vanquis router Test',() => {
    wrapper = mount(
        <MemoryRouter initialEntries={[ '/pages/Vanquis' ]}>
         <Root>
          <VanquisPage/>
          </Root>
        </MemoryRouter>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(BarclayPage)).toHaveLength(0);
      expect(wrapper.find(VanquisPage)).toHaveLength(1);   
      expect(wrapper.find(NotEligiblePage)).toHaveLength(0);   
      wrapper.unmount();
})

it('NotEligiblePage router Test',() => {
  wrapper = mount(
      <MemoryRouter initialEntries={[ '/pages/NotEligible' ]}>
       <Root>
        <NotEligiblePage/>
        </Root>
      </MemoryRouter>
    );
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(BarclayPage)).toHaveLength(0);
    expect(wrapper.find(VanquisPage)).toHaveLength(0);   
    expect(wrapper.find(NotEligiblePage)).toHaveLength(1);   
    wrapper.unmount();
})

it('notfound link ',() => {
    wrapper = mount(
        <MemoryRouter initialEntries={[ '/unknown' ]}>
         <Root>
          <App/>
          </Root>
        </MemoryRouter>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(BarclayPage)).toHaveLength(0);
      expect(wrapper.find(VanquisPage)).toHaveLength(0); 
      expect(wrapper.find(NotEligiblePage)).toHaveLength(0);     
      wrapper.unmount();
})

});
