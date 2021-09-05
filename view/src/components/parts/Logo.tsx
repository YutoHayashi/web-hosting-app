import React from 'react';
export class Logo extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <strong className={ `logo text-3xl select-none text-blue-500` }>
                MOUSE
                &thinsp;
                <span className={ `font-normal text-xl text-black` }>
                    sitebuilder
                    <span className={ `text-base text-gray-500` }>(beta)</span>
                </span>
            </strong>
        );
    }
}
