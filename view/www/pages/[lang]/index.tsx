import React from 'react';
import { i18nProps } from '@/types';
import i18next from 'i18next';
interface Props extends i18nProps {  }
export default class Index extends React.Component<Props, {  }> {
	public constructor( props: Props ) {
		super( props );
	}
	public render(  ) {
		const { lang } = this.props;
		return (
			<>{ i18next.t( 'language' ) }: { lang }</>
		);
	}
}
export { getStaticPaths, getStaticProps } from '@/middleware/i18n';
