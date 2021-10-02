import React from 'react';
import { ReactRouter, ReactRouterView } from '@/ReactRouter';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { state, action } from '@/store/types';
class _App extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <ReactRouter>
                <ReactRouterView />
            </ReactRouter>
        );
    }
}
const mapStateToProps = ( state: state, ownProps: {  } ) => state;
const mapDispatchToProps = ( dispatch: ThunkDispatch<state, {}, Action<action>> ) => dispatch;
export const App = connect( mapStateToProps, mapDispatchToProps )( _App )

