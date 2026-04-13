# CLAUDE.md — appsprint-react-native

## What This Is

**React Native bridge SDK** for AppSprint attribution. A thin TypeScript wrapper that delegates all work to pre-compiled native binaries (iOS XCFramework + Android AAR) via React Native's native module bridge.

This is a **bridge SDK** — it contains no attribution logic. All logic lives in the core iOS and Android SDKs.

**Code sensitivity: LOW** — only contains bridge code and type definitions. Repo can be public.

---

## Build & Test

```bash
npm ci                               # Install dependencies
npm run build                        # bob build (CJS + ESM + TypeScript declarations)
npm run typecheck                    # tsc --noEmit
npm test                             # Node.js built-in test runner
npm run validate:release             # Verify binaries + plugin files exist
```

---

## Architecture

```
src/                                 # TypeScript source
├── index.ts                        # Public exports
├── AppSprint.ts                    # Singleton class — validates config, delegates to native
├── NativeAppSprint.ts              # Platform-aware native module loader
└── types.ts                        # All TypeScript interfaces and types

ios/                                 # iOS native bridge
├── AppSprintBridge.swift           # RCTBridgeModule — calls AppSprintSDK
├── AppSprintBridge.m               # ObjC extern declarations
└── AppSprintSDK.xcframework/       # Pre-built iOS SDK binary (VENDORED)

android/                             # Android native bridge
├── src/main/kotlin/com/appsprint/
│   ├── AppSprintBridgeModule.kt    # ReactContextBaseJavaModule — calls AAR
│   └── AppSprintPackage.kt         # ReactPackage registration
├── libs/appsprint-sdk.aar          # Pre-built Android SDK binary (VENDORED)
└── build.gradle                    # Android build config

plugin/                              # Expo config plugin
├── src/index.ts                    # Modifies Info.plist for ATT
└── build/                          # Compiled plugin

lib/                                 # Build output (bob build)
├── commonjs/                       # CJS distribution
├── module/                         # ESM distribution
└── typescript/                     # .d.ts declarations
```

### Key Patterns

- **Thin bridge:** TypeScript validates `apiKey` then passes everything to native modules
- **Platform fallback:** Unsupported platforms (web) get safe no-op defaults
- **Zero dependencies:** No npm runtime dependencies
- **Multi-format output:** CommonJS + ESM + TypeScript via react-native-builder-bob
- **Prepack validation:** `npm run validate:release` ensures binaries exist before publish
- **Expo plugin:** Auto-adds `NSUserTrackingUsageDescription` to Info.plist

### Native Binaries (Vendored)

- `ios/AppSprintSDK.xcframework` — Built from `appsprint-ios` via `build-xcframework.sh`
- `android/libs/appsprint-sdk.aar` — Built from `appsprint-android` via Gradle

Update these with `make vendor-all` from the `SDKs/` directory.

---

## API Endpoints

The SDK doesn't talk to the API directly — it delegates to the native modules which handle all networking.

---

## Platform Details

- **TypeScript 5.7+**, react-native-builder-bob
- **Peer deps:** React >= 18.0.0, React Native >= 0.71.0
- **iOS native:** Swift bridge, requires iOS 14.0+
- **Android native:** Kotlin bridge, requires API 24+
- **Expo:** Config plugin for ATT permission

---

## CI/CD

- `ci.yml` — Typecheck + test on push to main and PRs
- `discord-notify.yml` — Post commit info to Discord
- `release.yml` — Build, test, publish to npm on `v*` tags

---

## Commits

- **Do not add `Co-Authored-By` lines** to commit messages. Only the person committing should be attributed.

---

## Anti-Patterns

- **No attribution logic in this repo.** All logic belongs in the core iOS/Android SDKs.
- **No npm runtime dependencies.** Keep dependencies at zero.
- **Do not modify vendored binaries** (xcframework, AAR) directly — rebuild from core SDKs.
- **No `any` types.** Use strict TypeScript throughout.
- **Do not add platform-specific logic** to the TypeScript layer.
