<?php
/**
 * Plugin Name: Podkit
 * Author: Prince
 * Version: 1.0.0
 * Description: A custom Gutenberg Block :)
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translation for our plugin from MO file
 */
add_action( 'init', 'podkit_load_textdoamin' );
function podkit_load_textdoamin() {
	load_plugin_textdomain( 'podkit', false, plugin_basename( __FILE__ ) . '/languages' );
}

/**
 * Add custom image size for block featured image
 */
add_action( 'init', 'podkit_add_image_size' );
function podkit_add_image_size() {
	add_image_size( 'podkitFeatImg', 250, 250, [ 'center', 'center' ] );
}

/**
 * Register custom image size with sizes list to make it available
 */
add_filter( 'image_size_names_choose', 'podkit_custom_sizes' );
function podkit_custom_sizes( $sizes ) {
	return array_merge( $sizes, [ 'podkitFeatImg' => __( 'Podkit Featured Image', 'podkit' ) ] );
}

/**
 * Add Custom "Podkit" block category
 */
add_filter( 'block_categories', 'podkit_block_categories', 10, 2 );
function podkit_block_categories( $categories, $post ) {
	if ( $post->post_type !== 'post' ) {
		return $categories;
	}

	return array_merge( $categories, [
		[
			'slug'  => 'podkit',
			'title' => __( 'Podkit', 'podkit' ),
			'icon'  => 'microphone'
		]
	] );

}

/**
 * Register all the block assets so that they can be enqueued through the block editor
 * in the corresponding context
 */
add_action( 'init', 'podkit_register_blocks' );
function podkit_register_blocks() {
	// If block editor is not active, bail.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Register the block editor scripts
	wp_register_script( 'podkit-editor-script',                                             //label
		plugins_url( 'build/index.js', __FILE__ ),                          //script file
		[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ],              //dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ) //set version as file
	);

	// Register the block editor styles
	wp_register_style( 'podkit-editor-style', plugins_url( 'build/editor.css', __FILE__ ), [ 'wp-edit_blocks' ], filemtime( plugin_dir_path( __FILE__ ) . 'build/editor.css' ) );

	// Register the front-end styles
	wp_register_style( 'podkit-frontend-styles', plugins_url( 'build/style.css', __FILE__ ), [], filemtime( plugin_dir_path( __FILE__ ) . 'build/style.css' ) );

	//Array of blocks created in this plugin
	$blocks = [
		'podkit/static',
		'podkit/editable',
		'podkit/media',
	];

	// Loop through the $blocks and register each block with the same script and styles
	foreach ( $blocks as $block ) {
		register_block_type( $block, [
			'editor_script' => 'podkit-editor-script',
			'editor_style'  => 'podkit-editor-style',
			'style'         => 'podkit-frontend-styles',
		] );
	}

	if ( function_exists( 'wp_set_script_translations' ) ) {
		/**
		 * Adds internalization support
		 */
		wp_set_script_translations( 'podkit-editor-script', 'podkit' );
	}
}