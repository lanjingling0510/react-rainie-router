import React from 'react';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Router, { Link, listenBefore, Route, route } from '../../src/index.js';


describe('Router', () => {
    let Home,
        Account,
        Default,
        App,
        router;

    before (function () {
        Home = ({url, title}) => {
            return (
                <section className="home">
                    <h2>Welcome to my {title}</h2>
                    <p>current link: {url}</p>
                    <Link href="/account/123">go account</Link>
                </section>
            );
        }

        Account = ({url, matches, name}) => {
            return (
                <section className="account">
                    <h2>Account: {matches.id}</h2>
                    <p>my name is : {name}</p>
                    <pre>current link: {url}</pre>
                    <Link href="/">go homepage</Link>
                </section>
            );
        }

        Default = () => (
            <div className="default">
                <p>default</p>
            <Link href="/">go homepage</Link>
            </div>
        )



        router = mount(
            <Router
                url="/default">
                <Home path="/" title="homepage" />
                <Account path="/account/:id?" name="rainie" />
                <Default default />
            </Router>
        );
    });


    it('should jump to another default route', () => {
        expect(router.find('.default')).to.have.length(1);
    });


    it('should jump to home router', () => {
        const spyFunction1 = sinon.spy(Router.prototype, 'shouldComponentUpdate');
        router.instance().routeTo('/');
        sinon.assert.calledOnce(spyFunction1);
        spyFunction1.restore();
        expect(router.find('.home')).to.have.length(1);
    });

    it('should jump to account router, and get param id', () => {
        router.instance().routeTo('/account/123');
        expect(router.find('Account')).to.have.length(1);
        expect(router.find('Account').props().matches).to.eql({ id: '123' });
    });

    it ('should not jump to home router', () => {
        listenBefore(() => {
            return Promise.reject();
        });
        route('/');
        expect(router.find('.home')).to.have.length(0);
    })


});
