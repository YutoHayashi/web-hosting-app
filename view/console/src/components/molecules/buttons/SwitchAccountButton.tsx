import { Btn } from '@/components/atoms/commons/Btn';
import { AlertSetter } from '@/middleware/Alert';
import { WithoutAuthentication } from '@/middleware/Auth';
import { stopPropagation } from '@/services/stopPropagation';
import React from 'react';
type Props = {
    onSwitch?: (  ) => void;
    getParams: (  ) => ( { email: string; password: string; } );
}
type States = {
    loading: boolean;
}
let state: States;
let setState: React.Dispatch<React.SetStateAction<States>>;
export const SwitchAccountButton: React.FC<Props> = ( { onSwitch = (  ) => null, getParams } ) => {
    [ state, setState ] = React.useState<States>( { loading: false } );
    const { loading } = state;
    return (
        <WithoutAuthentication>
            { ( { change } ) => (
                <AlertSetter>
                    { ( { alert } ) => (
                        <Btn
                            onClick={ stopPropagation<HTMLButtonElement>( e => {
                                setState( { ...state, ...{ loading: true, } } )
                                change( getParams(  ) )
                                    .then( (  ) => setState( { ...state, ...{ loading: false, } } ) )
                                    .then( (  ) => alert( { message: 'Account changed.', type: 'info', } ) )
                                    .then( onSwitch )
                                    .catch( e => alert( { type: 'error', message: e } ) )
                                ;
                            } ) }
                            color="blue"
                            className="ml-auto my-2 outline-noen"
                            loading={ loading }
                        >
                            Logout and Switch
                        </Btn>
                    ) }
                </AlertSetter>
            ) }
        </WithoutAuthentication>
    );
};
