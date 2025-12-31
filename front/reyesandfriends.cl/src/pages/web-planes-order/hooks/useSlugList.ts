import { useMemo } from "react";

const SLUG_LIST = [
    "landingpro",
];

export function useSlugList() {
    const slugs = useMemo(() => SLUG_LIST, []);
    const isValidSlug = (slug?: string) => !!slug && slugs.includes(slug);
    return { slugs, isValidSlug };
}
