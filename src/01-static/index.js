const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;

import {ReactComponent as Logo} from "../bv-logo.svg";
import logoWhiteUrl from "../bv-logo-white.svg";

registerBlockType('podkit/static', {
    title: __('Like & Subscribe', 'podkit'),
    icon: {src: Logo},
    category: 'podkit',

    edit() {
        return (
            <div className="podkit-block podkit-static">
                <figure className="podkit-logo">
                    <img src={logoWhiteUrl} alt="logo"/>
                </figure>

                <div className="podkit-info">
                    <h3 className="podkit-title">
                        {__('The Binaryville Podcast', 'podkit')}
                    </h3>
                </div>

                <div className="podkit-cta">
                    <a href="#">{__('Like & Subscribe', 'podkit')}</a>
                </div>

            </div>
        )
    },

    save() {
        return (
            <div className="podkit-block podkit-static">
                <figure className="podkit-logo">
                    <img src={logoWhiteUrl} alt="logo"/>
                </figure>

                <div className="podkit-info">
                    <h3 className="podkit-title">
                        {__('The Binaryville Podcast', 'podkit')}
                    </h3>
                </div>

                <div className="podkit-cta">
                    <a href="#">{__('Like & Subscribe', 'podkit')}</a>
                </div>

            </div>
        )
    }
});