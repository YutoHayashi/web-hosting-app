import React from 'react';
type Props = {
    icon: string;
    className?: string;
};
export const Mdi: React.FC<Props> = ( { icon, className } ) => {
    return (
        <i className={ `${ className || '' } mdi mdi-${ icon }` }></i>
    );
};
