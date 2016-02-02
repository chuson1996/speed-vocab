var Rx = require('rx');
var fs = require('fs');
var path = require('path');
var directoryTree = require('directory-tree').directoryTree;

module.exports = function(app) {
	// console.log(__dirname);
	var viewsDir = path.join(__dirname, '../templates/views');
	var dirTree = directoryTree(viewsDir).children;
	var dirArr = [];
	transmuteDirectoryTreeToArray(dirTree, dirArr, '/');
	console.log(dirArr);

	dirArr.forEach(function(item) {
		var routeUrl = item == '/index.jade' ? '/' : stripExt(item);
		var jadePath = path.join(viewsDir, item);
		console.log(routeUrl, jadePath);
		app.get(
			routeUrl,
			function(req, res) {
				res.render(jadePath);
			}
		);
	
	})

	///
	function transmuteDirectoryTreeToArray(arrInDir, arr, prefix) {
		arrInDir.forEach(function(child) {
			if (child.type == 'file') {
				arr.push((prefix || '') + child.name);
			} else if (child.type == 'directory' && child.children.length) {
				transmuteDirectoryTreeToArray(child.children, arr, (prefix || '') + child.name + '/')
			}
		})
	}

	function stripExt(itemPath) {
		return path.join(path.dirname(itemPath), path.basename(itemPath, '.jade'));
	}
}
