import { i18nProps } from '@/types';
import { defaultLanguage, languages } from '@/services/i18n';
export const getStaticPaths = (  ) => {
	return {
		paths: languages.map( lang => ( { params: { lang, } } ) ),
		fallback: false,
	};
};
export const getStaticProps = async ( _p: { params: i18nProps } ) => {
	const _lang: string | undefined = _p.params.lang;
	return {
		props: {
			lang: languages.includes( _lang || '' ) ? _lang : defaultLanguage,
		},
	};
}
