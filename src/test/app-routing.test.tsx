import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { properties, legacyPropertySlug, propertyPath, propertySlug } from "@/data/properties";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("uses concise, unique property URLs and retains legacy slug resolution", () => {
    const featured = properties.find((property) => property.id === "PH1024");
    expect(featured).toBeDefined();
    expect(propertyPath(featured!)).toBe("/imoveis/casa-venda-alphaville-ph1024");
    expect(legacyPropertySlug(featured!)).not.toBe(propertySlug(featured!));
    expect(new Set(properties.map(propertyPath)).size).toBe(properties.length);
    expect(properties.every((property) => /\/imoveis\/[a-z0-9-]+$/.test(propertyPath(property)))).toBe(true);
  });
});
