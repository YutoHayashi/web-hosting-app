import React, { createRef } from 'react';
import { CommonInputAttribute } from './CommonInputAttribute';
import { CommonInputStates } from './CommonInputStates';
import { InputControl } from './InputControl';
type Props = Partial<CommonInputAttribute> & {
    maxLength?: number;
    minLength?: number;
}
type States = CommonInputStates & {  }
export class Text extends React.Component<Props, States> {
    private text: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>(  );
    public isValid(  ) {
        return InputControl.isValid( { context: this } );
    }
    public reset(  ) {
        return InputControl.reset( { context: this, input: this.text } );
    }
    public get value(  ) {
        return InputControl.value( { context: this } );
    }
    public render(  ) {
        const { onChange } = this.props;
        return (
            <input ref={ this.text } type='text' onChange={ onChange } />
        );
    }
}
