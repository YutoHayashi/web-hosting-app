import React from 'react';
export class Required extends React.PureComponent {
    public render(  ) {
        return (
            <span className={ `px-3 text-xs text-white text-bold bg-red-500 rounded select-none` }>Required</span>
        )
    }
}
