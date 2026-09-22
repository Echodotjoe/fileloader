import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-BPgA_JmP.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SKIP_NAMES = /* @__PURE__ */ new Set([
	"index.html",
	"og.jpg",
	"x-banner.jpg",
	"favicon.svg",
	"favicon.ico",
	"robots.txt"
]);
function displayName(filename) {
	return filename.replace(/\.(html?|swf)$/i, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());
}
function typeFromName(filename) {
	if (/\.swf$/i.test(filename)) return "swf";
	if (/\.html?$/i.test(filename)) return "html";
	return null;
}
var listArcadeFiles_createServerFn_handler = createServerRpc({
	id: "ecf24bba301187fcccfeb9e656c1085dc149f38da1d7ce562ea6142cb1e00adb",
	name: "listArcadeFiles",
	filename: "src/lib/catalog.ts"
}, (opts) => listArcadeFiles.__executeServer(opts));
var listArcadeFiles = createServerFn({ method: "GET" }).handler(listArcadeFiles_createServerFn_handler, async () => {
	const { readdir } = await import("node:fs/promises");
	const { join } = await import("node:path");
	const roots = [
		join(process.cwd(), "public"),
		join(process.cwd(), "dist", "client"),
		process.cwd()
	];
	const seen = /* @__PURE__ */ new Set();
	const files = [];
	for (const root of roots) {
		let names = [];
		try {
			names = await readdir(root);
		} catch {
			continue;
		}
		for (const name of names) {
			if (SKIP_NAMES.has(name) || name.startsWith("__") || name.startsWith(".")) continue;
			const type = typeFromName(name);
			if (!type) continue;
			const key = name.toLowerCase();
			if (seen.has(key)) continue;
			seen.add(key);
			files.push({
				id: `dir:${name}`,
				name: displayName(name),
				file: `/${name}`,
				type,
				source: "directory"
			});
		}
		if (files.length > 0) break;
	}
	files.sort((a, b) => a.name.localeCompare(b.name));
	return files;
});
//#endregion
export { listArcadeFiles_createServerFn_handler };
