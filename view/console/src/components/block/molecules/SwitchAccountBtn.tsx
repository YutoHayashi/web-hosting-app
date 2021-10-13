import { Btn } from '@/components/parts/Btn';
import { AlertSetter } from '@/middleware/Alert';
import { WithoutAuthentication } from '@/middleware/Auth';
import { stopPropagation } from '@/services/stopPropagation';
import React from 'react';
interface Props {
    onSwitch?: (  ) => void;
    onSubmit: (  ) => ( { email: string; password: string; } );
}
interface States {
    loading: boolean;
}
export class SwitchAccountBtn extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
        this.state = {
            loading: false,
        };
    }
    public render(  ) {
        const { onSwitch = (  ) => null, onSubmit = (  ) => ( { email: '', password: '' } ) } = this.props;
        const { loading } = this.state;
        return (
            <WithoutAuthentication>
                { ( { change } ) => (
                    <AlertSetter>
                        { ( { alert } ) => (
                            <Btn
                                onClick={ stopPropagation<HTMLButtonElement>( e => {
                                    const { email, password } = onSubmit(  );
                                    this.setState( { ...this.state, ...{ loading: true, } } )
                                    change( { email, password, } )
                                        .then( (  ) => this.setState( { ...this.state, ...{ loading: false, } } ) )
                                        .then( (  ) => alert( { message: 'Account changed.', type: 'info', } ) )
                                        .then( onSwitch )
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
        )
    }
}
