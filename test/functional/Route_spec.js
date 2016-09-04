import React from 'react';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Route from '../../src/Route.jsx';

describe('Route', () => {

    it('should render RoutedComponent', () => {
        const Component = (props) => (
            <div className="routed-component">component</div>
        );

        const router = mount(
            <Route
                path="/path"
                component={Component} />
        );
        expect(router.find('Component').first().prop('path')).to.equal('/path');
        expect(router.find('.routed-component')).to.have.length(1);
    });

    it ('should render null', () => {
        const Component = (props) => (
            <div className="routed-component">component</div>
        );

        const router = mount(
            <Route
                path="/path"
                getComponent={() => {
                    return new Promise(function(resolve, reject) {
                        require.ensure([], (require) => {
                            setTimeout(() => {
                                resolve(Component);
                            }, 100);
                        }, 'account');
                    });
                }} />
        );

        expect(router.find('.routed-component')).to.have.length(0);
    });

    it('should render SplitComponent', () => {
        const Component = (props) => (
            <div className="routed-component">component</div>
        );

        const router = mount(
            <Route
                path="/path/:id"
                name="rainie"
                getComponent={() => {
                    return new Promise(function(resolve, reject) {
                        setTimeout(() => {
                            resolve(Component);
                        }, 100);
                    });
                }} />
        );

        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(router.find('.routed-component'));
            }, 200);
        }).then((component => {
            expect(component).to.have.length(1);
            expect(router.find('Component').prop('path')).to.equal('/path/:id');
            expect(router.find('Component').prop('name')).to.equal('rainie');
        }));
    });
});
