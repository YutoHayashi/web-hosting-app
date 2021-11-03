import React from 'react';
import { Colors } from '@/Colors';
import { Mdi } from '@/components/atoms/commons/Mdi';
type ModalType = keyof Partial<typeof Colors>;
type Props = {
    type: ModalType;
    submit?: boolean;
    continueMessage?: string;
    stopMessage?: string;
    continueClicked?: ( e: React.MouseEvent<HTMLButtonElement> ) => void;
    stopClicked?: ( e: React.MouseEvent<HTMLButtonElement> ) => void;
};
const Icons: {
    [ K in ModalType ]: string
} = {
    success: 'checkbox-marked-circle-outline',
    warning: 'alert-circle-outline',
    danger: 'cancel',
    info: 'information-outline',
};
export const Modal: React.FC<Props> = ( { type, submit = false, continueMessage = 'continue', stopMessage, continueClicked = e => null, stopClicked = e => null, children } ) => {
    return (
        <div className={ `fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-center justify-center p-3` }>
            <div className={ `bg-white max-w-lg rounded-lg overflow-hidden px-3 lg:px-6 py-4 space-y-4` }>
                <div className={ `flex justify-center` }>
                    <span className={ `flex justify-center items-center bg-${ Colors[ type ] }-200 bg-opacity-75 rounded-full p-7` }>
                        <Mdi icon={ Icons[ type ] } className={ `text-${ Colors[ type ] }-500 mdi-36px absolute` } />
                    </span>
                </div>
                <div className={ `flex flex-col items-center space-y-2` }>
                    <h1 className={ `font-semibold text-${ Colors[ type ] }-500` }>Payment Fail</h1>
                    <p className={ `leading-tight text-sm lg:text-base text-center"` }>{ children }</p>
                </div>
                <div className={ `flex justify-center pt-4` }>
                    { stopMessage ? ( <button type={ submit ? 'submit' : 'button' } className={ `mx-1 rounded-lg px-5 py-2 border-2 border-gray-300 focus:border-transparent focus:outline-none focus:shadow-outline font-medium` } onClick={ stopClicked }>{ stopMessage }</button> ) : <></> }
                    <button type={ submit ? 'submit' : 'button' } className={ `mx-1 rounded-lg px-5 py-2 border-2 border-gray-300 focus:border-transparent focus:outline-none focus:shadow-outline font-medium` } onClick={ continueClicked }>{ continueMessage }</button>
                </div>
            </div>
        </div>
    );
};
