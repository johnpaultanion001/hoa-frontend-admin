const webpack = require('webpack');

module.exports = {
	devServer: {
		compress: true,
		host: process.env.VUE_APP_HOST,
		port: process.env.VUE_APP_PORT,
		public: 'admin-test.localhost:'+process.env.VUE_APP_PORT,
	},
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				Popper: ['popper.js', 'default'],
				// In case you imported plugins individually, you must also require them here:
				Util: 'exports-loader?Util!bootstrap/js/dist/util',
				Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
				// ...
			}),
			// new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		],
	},

	pluginOptions: {},
};
