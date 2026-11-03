export type Lang = "en" | "es";

/** Interface strings that live in components, not in page content. */
export type UiStrings = {
    openMenu: string;
    closeMenu: string;
    toLightTheme: string;
    toDarkTheme: string;
    /** Label of the link to the other language, e.g. "ES". */
    switchLanguage: string;
    switchLanguageLabel: string;
    googlePlayBadge: string;
    appStoreBadge: string;
    appScreenAlt: string;
    footerNav: string;
    terms: string;
    privacy: string;
    cookies: string;
    rightsReserved: string;
    notIncluded: string;
    testimonials: {
        prev: string;
        next: string;
        goTo: string;
        slide: string;
        rating: string;
        pause: string;
        play: string;
        carousel: string;
    };
    notFound: {
        title: string;
        text: string;
        home: string;
        features: string;
    };
    appRedirect: string;
    breadcrumbHome: string;
    /** Pages for the links the app shares: /s/{code} and /r/{segmentId}. */
    links: {
        inviteTitle: string;
        inviteIntro: string;
        codeLabel: string;
        copy: string;
        copied: string;
        inviteSteps: string[];
        inviteInvalid: string;
        rankingTitle: string;
        rankingIntro: string;
        rankingSteps: string[];
        getApp: string;
        pageTitleInvite: string;
        pageTitleRanking: string;
    };
};

export type TemplateConfig = {
    name: string;
    /** Page language. Spanish pages live under /es/. */
    lang: Lang;
    /** Path prefix for internal links: "" for English, "/es" for Spanish. */
    basePath: string;
    ui: UiStrings;
    seo: {
        title: string;
        description: string;
    };
    logo: string;
    /** Image for Open Graph. Must be raster (PNG/JPG), not SVG. */
    ogImage: string;
    theme: string;
    /** Theme the switch alternates to. Must exist in src/utils/theme.ts. */
    alternateTheme: string;
    backgroundGrid: boolean;
    forceTheme: boolean;
    showThemeSwitch: boolean;
    googlePlayLink?: string | undefined;
    appStoreLink?: string | undefined;
    app: {
        seo: {
            title: string;
            description: string;
        };
    };
    termsAndConditions: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    privacyPolicy: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    cookiesPolicy: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    footer: {
        links: {
            title: string;
            href: string;
        }[];
        legalLinks: {
            termsAndConditions: boolean;
            privacyPolicy: boolean;
            cookiesPolicy: boolean;
        };
        socials?: {
            facebook?: string | undefined;
            instagram?: string | undefined;
            twitter?: string | undefined;
        } | undefined;
    };
    topNavbar: {
        cta?: string | undefined;
        links: {
            title: string;
            href: string;
        }[];
        hideGooglePlay?: boolean | undefined;
        hideAppStore?: boolean | undefined;
    };
    appBanner?: {
        id?: string | undefined;
        title: string;
        subtitle: string;
        screenshots: string[];
    } | undefined;
    home: {
        seo: {
            title: string;
            description: string;
        };
        header: {
            id?: string | undefined;
            headline: string;
            subtitle: string;
            headlineMark?: number[] | undefined;
            screenshots: string[];
            rewards?: string[] | undefined;
            usersDescription?: string | undefined;
        };
        testimonials?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                name: string;
                /** Driver role. It's what gives credibility: "Rally driver". */
                role?: string | undefined;
                comment: string;
            }[];
        } | undefined;
        partners?: {
            id?: string | undefined;
            title: string;
            logos: string[];
        } | undefined;
        faq?: {
            id?: string | undefined;
            title: string;
            qa: {
                question: string;
                answer: string;
            }[];
        } | undefined;
        howItWorks?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            steps: {
                image: string;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        features?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                /** Key from src/components/icons (not a path: they are inline SVGs). */
                icon: import("../components/icons").IconName;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        showcase?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            items: {
                image: string;
                caption: string;
                note: string;
            }[];
        } | undefined;
        /**
         * Price block. The app is free (price 0 confirmed in both stores),
         * so this is not a plan comparison but the sales pitch for what's
         * included. ROADMAP.md E2.6.
         */
        /** Technical proof: verifiable facts instead of testimonials. */
        proof?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            items: {
                icon: import("../components/icons").IconName;
                title: string;
                text: string;
            }[];
        } | undefined;
        pricing?: {
            id?: string | undefined;
            title: string;
            actionText?: string | undefined;
            subtitle?: string | undefined;
            promises?: {
                icon: import("../components/icons").IconName;
                title: string;
                subtitle: string;
            }[] | undefined;
            /** Free vs Pro plans (v1.4). If present, rendered as two cards. */
            plans?: {
                name: string;
                price: string;
                priceNote?: string | undefined;
                highlight?: boolean | undefined;
                badge?: string | undefined;
                features: { text: string; included: boolean }[];
            }[] | undefined;
            /** Small print under the plans (trial, cancellation, store billing). */
            footnote?: string | undefined;
        } | undefined;
    };
}