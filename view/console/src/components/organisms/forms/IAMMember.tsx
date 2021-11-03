import React from 'react';
import { Btn } from '@/components/atoms/commons/Btn';
import { Handler } from '@/components/atoms/input/types';
import { IAMMemberName } from '../../molecules/input/IAMMemberName';
import { IAMMemberEmail } from '../../molecules/input/IAMMemberEmail';
import { IAMMemberPassword } from '../../molecules/input/IAMMemberPassword';
type Props = {
    onSubmit: ( e: React.MouseEvent<HTMLButtonElement>, params: { name: string; email: string; password: string; } ) => Promise<void>;
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
export const IAMMember: React.FC<Props> = ( { onSubmit } ) => {
    [ state, setState ] = React.useState<States>( { loading: false, } );
    const { loading } = state;
    const onClick: React.MouseEventHandler<HTMLButtonElement> = e => {
        if ( validation(  ) ) {
            setState( { loading: true, } );
            onSubmit( e, {
                name: name.current?.value || '',
                email: email.current?.value || '',
                password: password.current?.value || '',
            } )
                .then( (  ) => setState( { loading: false, } ) )
            ;
        }
    };
    return (
        <>
            <IAMMemberName ref={ name } />
            <IAMMemberEmail ref={ email } />
            <IAMMemberPassword ref={ password } />
            <Btn onClick={ onClick } loading={ loading }>validate</Btn>
        </>
    );
};
