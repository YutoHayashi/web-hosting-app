import i18next from 'i18next';
import React from 'react';
export class Required extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <span className={ 'bg-red-500 rounded text-xs text-white py-1 px-2 m-1 font-bold tracking-wide inline-block select-none' }>{ i18next.t( 'required' ) }</span>
        );
    }
}
