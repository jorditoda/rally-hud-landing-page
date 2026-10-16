export type TemplateConfig = {
    name: string;
    seo: {
        title: string;
        description: string;
    };
    logo: string;
    /** Imagen para Open Graph. Debe ser raster (PNG/JPG), no SVG. */
    ogImage: string;
    theme: string;
    /** Tema al que alterna el switch. Debe existir en src/utils/theme.ts. */
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
                /** Rol del piloto. Es lo que da credibilidad: "Piloto de rally". */
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
                /** Clave de src/components/icons (no una ruta: son SVG en línea). */
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
         * Bloque de precio. La app es gratuita (precio 0 confirmado en ambas
         * stores), asi que esto no es una comparativa de planes sino el
         * argumento de venta de lo que incluye. ROADMAP.md E2.6.
         */
        /** Prueba tecnica: hechos verificables en vez de testimonios. */
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
        } | undefined;
    };
}