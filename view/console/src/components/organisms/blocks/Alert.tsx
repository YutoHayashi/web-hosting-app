import React from 'react';
import { AlertManager, AlertType } from '@/middleware/Alert';
import { Mdi } from '@/components/atoms/commons/Mdi';
type Props = {}
type States = {}
const Icons: {
    [ K in AlertType ]: string;
} = {
    success: 'checkbox-marked-circle-outline',
    warn: 'alert-circle-outline',
    error: 'cancel',
    info: 'information-outline',
};
const getColor = ( type: AlertType ) => {
    switch( type ) {
        case 'info':
            return 'blue';
        case 'error':
            return 'red';
        case 'warn':
            return 'yellow';
        case 'success':
            return 'green';
        default:
            return 'gray';
    }
};
export const Alert: React.FC<Props> = ( {  } ) => {
    return (
        <AlertManager>
            { ( { message, type, active, close } ) => {
                const color = getColor( type );
                const icon = Icons[ type ];
                return (
                    <div className={ `p-1 ${ active ? 'block' : 'hidden' }` } >
                        <div className={ `flex items-center justify-between py-1 px-3 md:px-3 border-l-4 border-${ color }-500 bg-${ color }-100 w-full text-gray-600 font-bold text-sm rounded` } >
                            <div className={ `flex items-start` } >
                                <Mdi icon={ icon } className={ `text-${ color }-400 mdi-18px inline mr-1` } />
                                { message }
                            </div>
                            <button className={ `text-${ color }-500 font-bold cursor-pointer` } onClick={ close } >
                                <Mdi icon='close'/>
                            </button>
                        </div>
                    </div>
                );
            } }
        </AlertManager>
    );
};
