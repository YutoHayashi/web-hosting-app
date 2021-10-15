import React from 'react';
export class WithValidator<Props, States> extends React.Component<Props, States> {
    public requiredMessage: string = 'This is a required field.';
    public required( args: { required?: boolean } ) {
        return {
            validator: ( value: string | number | undefined ) => args.required ? !!value : true,
            message: this.requiredMessage,
        };
    }
}
