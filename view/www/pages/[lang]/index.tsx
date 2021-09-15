import React from 'react';
import { i18nProps } from '@/types';
import i18next from 'i18next';
interface Props extends i18nProps {  }
export default class Index extends React.Component<Props, {  }> {
	public constructor( props: Props ) {
		super( props );
		this.fn();
	}
	public render(  ) {
		const { lang } = this.props;
		return (
			<div>{ i18next.t( 'language' ) }: { lang }</div>
		);
	}
	public fn(  ) {
		const tasks: Array<( (  ) => Promise<any> )> = [
			(  ) => new Promise( ( resolve, reject ) => {
				setTimeout(() => {
					console.log( 'first 1000ms' );
					resolve( null );
				}, 1000);
			} ),
			(  ) => new Promise( ( resolve, reject ) => {
				setTimeout(() => {
					console.log( 'second 2000ms' );
					resolve( null );
				}, 2000);
			} ),
		];
		let promise = Promise.resolve(  );
		tasks.forEach( task => {
			promise = promise.then( (  ) => {
				return task(  );
			} );
		} );
		promise.then( (  ) => {
			console.log( 'all promise completed.' );
		} );
		
	}
}
export { getStaticPaths, getStaticProps } from '@/middleware/i18n';
