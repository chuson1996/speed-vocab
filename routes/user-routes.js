module.exports = function (stormpath) {
    return [
		{
			routeUrl: '/',
			middlewares: [],
			callback: (function (req, res) {
				res.render(this.jadePath, req.user || {});
			})
		},
		// {
		//     routeUrl: '/test',
		//     middlewares: [stormpath.loginRequired]
		// },
		// {
		// 	routeUrl: '/app',
		// 	middlewares: [stormpath.loginRequired]
		// }
	];
};