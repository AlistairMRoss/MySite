
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SST_SERVER: string;
	export const NVM_INC: string;
	export const TERM_PROGRAM: string;
	export const PROJECT_CWD: string;
	export const INIT_CWD: string;
	export const NVM_CD_FLAGS: string;
	export const _P9K_TTY: string;
	export const WARP_HONOR_PS1: string;
	export const TERM: string;
	export const SHELL: string;
	export const SST_AWS_SESSION_TOKEN: string;
	export const HOMEBREW_REPOSITORY: string;
	export const TMPDIR: string;
	export const PULUMI_SKIP_UPDATE_CHECK: string;
	export const TERM_PROGRAM_VERSION: string;
	export const NODE_OPTIONS: string;
	export const MallocNanoZone: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const ZDOTDIR: string;
	export const ZSH: string;
	export const NVM_DIR: string;
	export const USER: string;
	export const LS_COLORS: string;
	export const SST_AWS_ACCESS_KEY_ID: string;
	export const COMMAND_MODE: string;
	export const SSH_AUTH_SOCK: string;
	export const WARP_IS_LOCAL_SHELL_SESSION: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const VSCODE_PROFILE_INITIALIZED: string;
	export const SST_AWS_SECRET_ACCESS_KEY: string;
	export const npm_execpath: string;
	export const AWS_PROFILE: string;
	export const WARP_USE_SSH_WRAPPER: string;
	export const PAGER: string;
	export const PULUMI_CONFIG_PASSPHRASE: string;
	export const LSCOLORS: string;
	export const PATH: string;
	export const npm_package_json: string;
	export const LaunchInstanceID: string;
	export const _: string;
	export const __CFBundleIdentifier: string;
	export const USER_ZDOTDIR: string;
	export const PWD: string;
	export const VSCODE_NONCE: string;
	export const npm_lifecycle_event: string;
	export const PULUMI_CONFIG: string;
	export const P9K_SSH: string;
	export const npm_package_name: string;
	export const LANG: string;
	export const P9K_TTY: string;
	export const PULUMI_DEBUG_COMMANDS: string;
	export const SST_AWS_REGION: string;
	export const XPC_FLAGS: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const PULUMI_PROJECT: string;
	export const npm_package_version: string;
	export const XPC_SERVICE_NAME: string;
	export const VSCODE_INJECTION: string;
	export const SHLVL: string;
	export const HOME: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const HOMEBREW_PREFIX: string;
	export const LOGNAME: string;
	export const LESS: string;
	export const BERRY_BIN_FOLDER: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const SSH_SOCKET_DIR: string;
	export const BUN_INSTALL: string;
	export const NVM_BIN: string;
	export const PULUMI_HOME: string;
	export const npm_config_user_agent: string;
	export const PULUMI_BACKEND_URL: string;
	export const INFOPATH: string;
	export const HOMEBREW_CELLAR: string;
	export const GIT_ASKPASS: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const _P9K_SSH_TTY: string;
	export const CONDA_CHANGEPS1: string;
	export const SECURITYSESSIONID: string;
	export const npm_node_execpath: string;
	export const COLORTERM: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SST_SERVER: string;
		NVM_INC: string;
		TERM_PROGRAM: string;
		PROJECT_CWD: string;
		INIT_CWD: string;
		NVM_CD_FLAGS: string;
		_P9K_TTY: string;
		WARP_HONOR_PS1: string;
		TERM: string;
		SHELL: string;
		SST_AWS_SESSION_TOKEN: string;
		HOMEBREW_REPOSITORY: string;
		TMPDIR: string;
		PULUMI_SKIP_UPDATE_CHECK: string;
		TERM_PROGRAM_VERSION: string;
		NODE_OPTIONS: string;
		MallocNanoZone: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		ZDOTDIR: string;
		ZSH: string;
		NVM_DIR: string;
		USER: string;
		LS_COLORS: string;
		SST_AWS_ACCESS_KEY_ID: string;
		COMMAND_MODE: string;
		SSH_AUTH_SOCK: string;
		WARP_IS_LOCAL_SHELL_SESSION: string;
		__CF_USER_TEXT_ENCODING: string;
		VSCODE_PROFILE_INITIALIZED: string;
		SST_AWS_SECRET_ACCESS_KEY: string;
		npm_execpath: string;
		AWS_PROFILE: string;
		WARP_USE_SSH_WRAPPER: string;
		PAGER: string;
		PULUMI_CONFIG_PASSPHRASE: string;
		LSCOLORS: string;
		PATH: string;
		npm_package_json: string;
		LaunchInstanceID: string;
		_: string;
		__CFBundleIdentifier: string;
		USER_ZDOTDIR: string;
		PWD: string;
		VSCODE_NONCE: string;
		npm_lifecycle_event: string;
		PULUMI_CONFIG: string;
		P9K_SSH: string;
		npm_package_name: string;
		LANG: string;
		P9K_TTY: string;
		PULUMI_DEBUG_COMMANDS: string;
		SST_AWS_REGION: string;
		XPC_FLAGS: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		PULUMI_PROJECT: string;
		npm_package_version: string;
		XPC_SERVICE_NAME: string;
		VSCODE_INJECTION: string;
		SHLVL: string;
		HOME: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		HOMEBREW_PREFIX: string;
		LOGNAME: string;
		LESS: string;
		BERRY_BIN_FOLDER: string;
		VSCODE_GIT_IPC_HANDLE: string;
		SSH_SOCKET_DIR: string;
		BUN_INSTALL: string;
		NVM_BIN: string;
		PULUMI_HOME: string;
		npm_config_user_agent: string;
		PULUMI_BACKEND_URL: string;
		INFOPATH: string;
		HOMEBREW_CELLAR: string;
		GIT_ASKPASS: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		_P9K_SSH_TTY: string;
		CONDA_CHANGEPS1: string;
		SECURITYSESSIONID: string;
		npm_node_execpath: string;
		COLORTERM: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
