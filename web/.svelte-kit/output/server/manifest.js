export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.C29Zm4P1.js",app:"_app/immutable/entry/app.7gfmI0RV.js",imports:["_app/immutable/entry/start.C29Zm4P1.js","_app/immutable/chunks/C4ZJkBFU.js","_app/immutable/chunks/XJ6c69y-.js","_app/immutable/entry/app.7gfmI0RV.js","_app/immutable/chunks/XJ6c69y-.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CRaNB7TE.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
