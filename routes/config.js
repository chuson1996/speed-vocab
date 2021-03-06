var path = require('path');
var directoryTree = require('directory-tree').directoryTree;
var _ = require("lodash");

module.exports = function(app, stormpath) {
	// console.log(require('./user.js')());
	startRoutes(require('./user-routes.js')(stormpath));
	
	function startRoutes(routesExtension) {
		var viewsDir = path.join(__dirname, '../templates/views');
		var dirTree = directoryTree(viewsDir).children;
		var dirArr = [];
		transmuteDirectoryTreeToArray(dirTree, dirArr, '/');
		var routes = dirArr.map(function(item) {
			var routeUrl = stripExt(item.replace('/index.jade', '')
					);
			routeUrl == '.' && (routeUrl = '/');
			var jadePath = path.join(viewsDir, item);
			// console.log(routeUrl, jadePath);
			return {
				routeUrl: routeUrl,
				jadePath: jadePath
			};
		});
		
		// Merge routes + routesExtension
		routes = routes.map(function (route) {
			// Find the correct extension
			var extPiece = _.find(routesExtension, function (ext) {
				return ext.routeUrl == route.routeUrl;
			});
			
			if (extPiece) {
				// Assign the extension to route
				_.assign(route, extPiece);
			}
			_.defaults(route, {
				middlewares : [],
				callback : (function(req, res){
					res.render(route.jadePath);
				})
			})
			
			// Bind callback
			if (route.callback) {
				route.callback = route.callback.bind(route);
			}
			
			return route;
		});
		// console.log('Routes: ', routes);
		routes.forEach(function (route) {
			// console.log(route);
			var params = [route.routeUrl];
			params.push(route.middlewares);
			params = _.flatten(params);
			
			params.push(route.callback);
			
			// console.log('params:', params);
	
			app.get.apply(app, params);
		});
	}
	
	function transmuteDirectoryTreeToArray(arrInDir, arr, prefix) {
		arrInDir.forEach(function(child) {
			if (child.type == 'file') {
				arr.push((prefix || '') + child.name);
			} else if (child.type == 'directory' && child.children.length) {
				transmuteDirectoryTreeToArray(child.children, arr, (prefix || '') + child.name + '/');
			}
		});
	}

	function stripExt(itemPath) {
		return path.join(path.dirname(itemPath), path.basename(itemPath, '.jade'));
	}
};
