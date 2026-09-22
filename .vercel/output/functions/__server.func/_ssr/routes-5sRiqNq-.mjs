import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as FolderOpen, i as Play, n as X, o as AppWindow, t as Zap } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-5sRiqNq-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,opacity,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-surface",
			outline: "border border-border bg-transparent text-fg hover:bg-surface"
		},
		size: {
			default: "h-11 rounded-md px-5 text-sm",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-md px-6 text-base",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function GameCard({ game, onPlay }) {
	const Icon = game.type === "swf" ? Zap : AppWindow;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col items-center rounded-xl border border-border bg-bg-elevated p-5 text-center shadow-card transition-transform duration-150 ease-out hover:-translate-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-28 items-center justify-center rounded-lg bg-primary text-primary-fg sm:size-32",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-12",
					strokeWidth: 1.6
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 line-clamp-2 min-h-12 font-display text-lg font-semibold leading-snug text-fg",
				children: game.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-xs font-medium uppercase tracking-wider text-subtle",
				children: [game.type === "swf" ? "SWF" : "HTML", game.source === "local" ? " · Local" : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "w-full rounded-full",
				onClick: () => onPlay(game),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), "Play"]
			})
		]
	});
}
var ruffleLoader = null;
function loadRuffle() {
	if (window.RufflePlayer) return Promise.resolve();
	if (ruffleLoader) return ruffleLoader;
	ruffleLoader = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = "https://unpkg.com/@ruffle-rs/ruffle";
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(/* @__PURE__ */ new Error("Could not load Flash player"));
		document.head.appendChild(script);
	});
	return ruffleLoader;
}
function PlayerOverlay({ game, onClose }) {
	const stageRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	(0, import_react.useEffect)(() => {
		const stage = stageRef.current;
		if (!stage || game.type !== "swf") return;
		let cancelled = false;
		let player = null;
		loadRuffle().then(() => {
			if (cancelled || !stageRef.current || !window.RufflePlayer) return;
			player = window.RufflePlayer.newest().createPlayer();
			player.style.width = "100%";
			player.style.height = "100%";
			stageRef.current.innerHTML = "";
			stageRef.current.appendChild(player);
			player.load(game.file);
		}).catch((err) => {
			if (cancelled || !stageRef.current) return;
			stageRef.current.innerHTML = `<p class="p-6 text-muted text-center">${String(err.message ?? err)}</p>`;
		});
		return () => {
			cancelled = true;
			if (player?.parentNode) player.parentNode.removeChild(player);
			if (stage) stage.innerHTML = "";
		};
	}, [game]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-bg/95 p-3 sm:p-5",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "player-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl items-center justify-between gap-3 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-subtle",
					children: [game.type === "swf" ? "Flash" : "HTML", " · Now playing"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "player-title",
					className: "truncate font-display text-xl font-semibold",
					children: game.name
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "icon",
				onClick: onClose,
				"aria-label": "Close player",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-0 w-full max-w-6xl flex-1 overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-card",
			children: game.type === "html" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: game.name,
				src: game.file,
				className: "h-full w-full border-0 bg-bg",
				allow: "fullscreen; autoplay; gamepad"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: stageRef,
				className: "h-full w-full"
			})
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function displayName(filename) {
	return filename.replace(/\.(html?|swf)$/i, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());
}
function typeFromName(filename) {
	if (/\.swf$/i.test(filename)) return "swf";
	if (/\.html?$/i.test(filename)) return "html";
	return null;
}
var listArcadeFiles = createServerFn({ method: "GET" }).handler(createSsrRpc("ecf24bba301187fcccfeb9e656c1085dc149f38da1d7ce562ea6142cb1e00adb"));
function arcadeFileFromLocal(file, objectUrl) {
	const type = typeFromName(file.name);
	if (!type) return null;
	return {
		id: `local:${file.name}:${file.size}:${file.lastModified}`,
		name: displayName(file.name),
		file: objectUrl,
		type,
		source: "local"
	};
}
function ArcadePage() {
	const [games, setGames] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("loading");
	const [playing, setPlaying] = (0, import_react.useState)(null);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const localUrls = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		listArcadeFiles().then((files) => {
			if (cancelled) return;
			setGames(files);
			setStatus("ready");
		}).catch(() => {
			if (cancelled) return;
			setStatus("error");
		});
		return () => {
			cancelled = true;
			for (const url of localUrls.current) URL.revokeObjectURL(url);
		};
	}, []);
	const addFiles = (0, import_react.useCallback)((fileList) => {
		const next = [];
		for (const file of Array.from(fileList)) {
			const url = URL.createObjectURL(file);
			const entry = arcadeFileFromLocal(file, url);
			if (!entry) {
				URL.revokeObjectURL(url);
				continue;
			}
			localUrls.current.push(url);
			next.push(entry);
		}
		if (next.length === 0) return;
		setGames((prev) => {
			const ids = new Set(prev.map((g) => g.id));
			return [...next.filter((g) => !ids.has(g.id)), ...prev];
		});
		setStatus("ready");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg text-fg",
		onDragOver: (e) => {
			e.preventDefault();
			setDragOver(true);
		},
		onDragLeave: () => setDragOver(false),
		onDrop: (e) => {
			e.preventDefault();
			setDragOver(false);
			if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgb(181_107_255/0.18),transparent_60%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative mx-auto flex max-w-6xl flex-col gap-6 px-5 pb-8 pt-10 sm:flex-row sm:items-end sm:justify-between sm:pt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
							children: "Game library"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl",
							children: "Violet Arcade"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-md text-base leading-relaxed text-muted",
							children: "HTML and SWF files next to this page show up as playable tiles. Drop more onto the page, or open them from your device."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: ".html,.htm,.swf",
					multiple: true,
					className: "hidden",
					onChange: (e) => {
						if (e.target.files) addFiles(e.target.files);
						e.target.value = "";
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => fileRef.current?.click(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {}), "Open HTML or SWF"]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative mx-auto max-w-6xl px-5 pb-20",
				children: [
					status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "Scanning for games…"
					}),
					status === "error" && games.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "Could not scan the page folder. Open an HTML or SWF file to play."
					}),
					status !== "loading" && games.length === 0 && status !== "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-lg border border-border bg-bg-elevated px-5 py-8 text-center text-muted",
						children: "No HTML or SWF files found next to this page yet. Drop files here to play."
					}),
					games.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: games.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, {
							game,
							onPlay: setPlaying
						}, game.id))
					})
				]
			}),
			dragOver && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-4 z-40 flex items-center justify-center rounded-xl border-2 border-dashed border-primary bg-bg/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-semibold",
					children: "Drop HTML or SWF files"
				})
			}),
			playing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerOverlay, {
				game: playing,
				onClose: () => setPlaying(null)
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArcadePage, {});
}
//#endregion
export { Home as component };
