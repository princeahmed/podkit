const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {MediaUpload, RichText} = wp.editor;
const {Button} = wp.components;

import {ReactComponent as Logo} from '../bv-logo.svg';
import logoWhiteUrl from '../bv-logo-white.svg';

registerBlockType('podkit/media', {
    title: __('Custom Media & Title', 'podkit'),
    icon: {src: Logo},
    category: 'podkit',

    attributes: {
        episodeTitle: {
            type: 'string',
            source: 'html',
            selector: '.podkit-title'
        },
        episodeImage: {
            type: 'string',
            source: 'attribute',
            selector: '.podkit-logo img',
            attribute: 'src',
            default: logoWhiteUrl
        }
    },

    edit: props => {
        const {
            className,
            attributes: {episodeTitle, episodeImage},
            setAttributes
        } = props;

        const onChangeEpisodeTtitle = newEpisodeTitle => {
            setAttributes({episodeTitle: newEpisodeTitle});
        };

        const onImageSelect = media => {
            setAttributes({episodeImage: media.sizes.podkitFeatImg.url});
        };

        return (
            <div className={`${className} podkit-block podkit-static`}>
                <figure className="podkit-logo">
                    <img src={episodeImage} alt="logo"/>
                    <MediaUpload
                        onSelect={onImageSelect}
                        value={episodeImage}
                        render={({open}) => (
                            <Button onClick={open}>
                                Open Media Library
                            </Button>
                        )}
                    />
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
            attributes: {episodeTitle, episodeImage},
        } = props;

        return (
            <div className={`podkit-block podkit-static`}>
                <figure className="podkit-logo">
                    <img src={episodeImage} alt="logo"/>
                </figure>

                <div className="podkit-info">
                    <div className="podkit-nameplate">
                        {__('The Binaryville Podcast', 'podkit')}
                    </div>

                    <div className="podkit-title">
                        <RichText.Content value={episodeTitle}/>
                    </div>
                </div>

                <div className="podkit-cta">
                    <a href="#">{__('Like & Subscribe', 'podkit')}</a>
                </div>

            </div>
        )
    }
});