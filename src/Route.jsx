import React from 'react';

function isPromise(obj) {
    return !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function';
}


class Route extends React.Component {
    static PropTypes = {
        component: React.PropTypes.node,
        getComponent: React.PropTypes.func,
    }

    state = {
        SplitComponent: undefined,
    }

    componentWillMount() {
        const { component, getComponent} = this.props;
        if (!component && getComponent) {
            const promise = getComponent();
            if (isPromise(promise)) {
                promise.then(SplitComponent => {
                    this.setState({ SplitComponent });
                });
            }
        }
    }

    render () {
        const {
            component: RoutedComponent,
            getComponent,
            ..._props,
        } = this.props;

        const { SplitComponent } = this.state;


        if (RoutedComponent)
            return <RoutedComponent {..._props} />;

        return SplitComponent ?
            <SplitComponent {..._props} /> : null;
    }
}

export default Route;
