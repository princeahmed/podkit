const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {RichText} = wp.editor;

import {ReactComponent as Logo} from '../bv-logo.svg';
import logoWhiteUrl from '../bv-logo.svg';

registerBlockType('podkit/editable', {
    title: __('Custom Title', 'podkit'),
    icon: {src: Logo},
    category: 'podkit',
    attributes: {
        episodeTitle: {
            type: 'string',
            source: 'html',
            selector: '.podkit-title'
        }
    },

    edit: props => {
        const {
            className,
            attributes: {episodeTitle},
            setAttributes
        } = props;

        const onChangeEpisodeTtitle = newEpisodeTitle => {
            setAttributes({episodeTitle: newEpisodeTitle});
        };

        return (
            <div className={`${className} podkit-block podkit-static`}>
                <figure className="podkit-logo">
                    <img src={logoWhiteUrl} alt="logo"/>
                </figure>

                <div className="podkit-info">
                    <div className="podkit-nameplate">
                        {__('The Binaryville Podcast', 'podkit')}
                    </div>

                    <div className="podkit-title">
                        <RichText
                            placeholder={__('Enter your title', 'podkit')}
                            value={episodeTitle}
                            onChange={onChangeEpisodeTtitle}
                            tagName="h4"
                        />
                    </div>
                </div>

                <div className="podkit-cta">
                    <a href="#">{__('Like & Subscribe', 'podkit')}</a>
                </div>

            </div>
        )
    },

    save: props => {

        const {
            attributes: {episodeTitle},
        } = props;

        return (
            <div className={`podkit-block podkit-static`}>
                <figure className="podkit-logo">
                    <img src={logoWhiteUrl} alt="logo"/>
                </figure>

                <div className="podkit-info">
                    <div className="podkit-nameplate">
                        {__('The Binaryville Podcast', 'podkit')}
                    </div>

                    <div className="podkit-title">
                        <RichText.Content tagName="h4" value={episodeTitle} />
                    </div>
                </div>

                <div className="podkit-cta">
                    <a href="#">{__('Like & Subscribe', 'podkit')}</a>
                </div>

            </div>
        )
    }

});