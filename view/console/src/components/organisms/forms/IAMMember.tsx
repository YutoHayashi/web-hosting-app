import React from 'react';
import { Btn } from '@/components/atoms/commons/Btn';
import { Handler } from '@/components/atoms/input/types';
import { IAMMemberName } from '../../molecules/input/IAMMemberName';
import { IAMMemberEmail } from '../../molecules/input/IAMMemberEmail';
import { IAMMemberPassword } from '../../molecules/input/IAMMemberPassword';
import { IAM } from '@/types';
type Props = {
    onSubmit: ( e: React.MouseEvent<HTMLButtonElement>, params: { name: string; email: string; password: string; } ) => Promise<any>;
    defaultParams?: Pick<IAM, 'name' | 'email'>;
};
type States = {
    loading: boolean;
};
let state: States;
let setState: React.Dispatch<React.SetStateAction<States>>;
const name = React.createRef<HTMLInputElement & Handler>(  );
const email = React.createRef<HTMLInputElement & Handler>(  );
const password = React.createRef<HTMLInputElement & Handler>(  );
const validation = (  ) => {
    const nameIsValid = name.current?.validation(  ) || [  ];
    const emailIsValid = email.current?.validation(  ) || [  ];
    const passwordIsValid = password.current?.validation(  ) || [  ];
    return [ ...nameIsValid, ...emailIsValid, ...passwordIsValid ].map( e => e === true ).reduce( ( p, c ) => p && c );
};
export const IAMMember: React.FC<Props> = ( { onSubmit, defaultParams } ) => {
    [ state, setState ] = React.useState<States>( { loading: false, } );
    const { loading } = state;
    const onClick: React.MouseEventHandler<HTMLButtonElement> = e => {
        if ( validation(  ) ) {
            setState( { loading: true, } );
            onSubmit( e, {
                name: name.current?.getValue(  ) || '',
                email: email.current?.getValue(  ) || '',
                password: password.current?.getValue(  ) || '',
            } )
                .then( (  ) => setState( { loading: false, } ) )
                .catch( ( e ) => setState( { loading: false, } ) )
            ;
        }
    };
    return (
        <>
            <IAMMemberName ref={ name } value={ defaultParams?.name || '' } />
            <IAMMemberEmail ref={ email } value={ defaultParams?.email || '' } />
            { defaultParams ? null : <IAMMemberPassword ref={ password } /> }
            <Btn onClick={ onClick } loading={ loading }>validate</Btn>
        </>
    );
};
