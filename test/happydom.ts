/**
 * test/happydom.ts
 *
 * This file MUST be the first preloaded script.
 * It uses @happy-dom/global-registrator to register all DOM globals
 * (window, document, HTMLElement, etc.) into the Node/Bun process
 * BEFORE @testing-library/dom evaluates and captures `document`.
 */
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register({ url: "http://localhost/", width: 1280, height: 720 });
