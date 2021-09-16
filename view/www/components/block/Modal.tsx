import React from 'react';
import { Alerts } from '@/types';
import { Mdi } from '@/components/utils/Mdi';
interface Props {
    type: Alerts;
    submit?: boolean;
    continueMessage?: string;
    stopMessage?: string;
    continueClicked?: (  ) => void;
    stopClicked?: (  ) => void;
    children: {
        heading: string;
        content: JSX.Element;
    };
}
const Icons: {
    [ K in Alerts ]: string
} = {
    success: 'checkbox-marked-circle-outline',
    warning: 'alert-circle-outline',
    danger: 'cancel',
    info: 'information-outline',
};
const Colors: {
    [ K in Alerts ]: string;
} = {
    success: 'green',
    warning: 'yellow',
    danger: 'red',
    info: 'blue',
};
export class Modal extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    private _continueClicked(  ) {
        //
        ( this.props.continueClicked || ( (  ) => null ) )(  );
    }
    private _stopClicked(  ) {
        //
        ( this.props.stopClicked || ( (  ) => null ) )(  );
    }
    public render(  ) {
        const { type, submit = false, continueMessage = 'continue', stopMessage, children } = this.props;
        const color = Colors[ type ];
        const icon = Icons[ type ];
        return (
            <div className={ `fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-center justify-center p-3` }>
                <div className={ `bg-white max-w-lg rounded-lg overflow-hidden px-3 lg:px-6 py-4 space-y-4` }>
                    <div className={ `flex justify-center` }>
                        <span className={ `flex justify-center items-center bg-${ color }-200 bg-opacity-75 rounded-full p-7` }>
                            <Mdi icon={ icon } className={ `text-${ color }-500 mdi-36px absolute` } />
                        </span>
                    </div>
                    <div className={ `flex flex-col items-center space-y-2` }>
                        <h1 className={ `font-semibold text-${ color }-500` }>{ children.heading }</h1>
                        <p className={ `leading-tight text-sm lg:text-base text-center"` }>{ children.content }</p>
                    </div>
                    <div className={ `flex justify-center pt-4` }>
                        { stopMessage ? ( <button type={ submit ? 'submit' : 'button' } className={ `mx-1 rounded-lg px-5 py-2 border-2 border-gray-300 focus:border-transparent focus:outline-none focus:shadow-outline font-medium` } onClick={ this._stopClicked }>{ stopMessage }</button> ) : <></> }
                        <button type={ submit ? 'submit' : 'button' } className={ `mx-1 rounded-lg px-5 py-2 border-2 border-gray-300 focus:border-transparent focus:outline-none focus:shadow-outline font-medium` } onClick={ this._continueClicked }>{ continueMessage }</button>
                    </div>
                </div>
            </div>
        );
    }
}
