import { Guest } from '@/layouts/Guest';
import React from 'react';
export class Login extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <Guest>
                <div className={ `grid lg:grid-cols-2` }>
                    <div></div>
                    <div className={ `m-5 p-5` }>
                        <div className={ `relative py-3 sm:max-w-xl sm:mx-auto` }>
                            <div className={ `absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl` }></div>
                            <div className={ `relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:px-10 sm:py-15` }>
                                <div className={ `max-w-md mx-auto` }>
                                    <h2 className={ `text-xl lg:text-2xl font-bold tracking-wider mb-2` }>Login</h2>
                                    <p className={ `tracking-wide text-sm text-gray-400` }>With your valid account to continue.</p>
                                    <div className="">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Guest>
        );
    }
}
