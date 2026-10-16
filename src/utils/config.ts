import type { TemplateConfig } from "./configType";
import { THEME_ALTERNATE, THEME_DEFAULT } from "./theme";

const templateConfig: TemplateConfig = {
  name: "Rally Hud",
  seo: {
    title: "Rally Hud — Real-Time Speed & G-Force HUD App",
    description:
      "Project your speed, G-forces and lap data onto your windscreen. Works fully offline on Android and iOS. Free, no subscription.",
  },
  // Grid tecnico de fondo, muy tenue (usa el token ln del sistema). ROADMAP.md E2.12
  backgroundGrid: true,
  // SVG: el PNG arrastraba fondo blanco y en tema oscuro salia un cuadrado.
  // Generado por scripts/build-logo.py a partir de la geometria medida.
  logo: "/logo.svg",
  // Las plataformas sociales no aceptan SVG en og:image, asi que va aparte.
  // Generada por scripts/build-og-image.py: 1200x630 con los tokens del tema.
  ogImage: "/og.png",
  // Tema por defecto: oscuro y primero, porque la app se usa conduciendo de
  // noche y su UI es navy. Debe coincidir con una clave de src/utils/theme.ts.
  theme: THEME_DEFAULT,
  // Tema al que salta el switch de tema. Mismo origen.
  alternateTheme: THEME_ALTERNATE,
  // Forces theme to be chosen above, no matter what user prefers
  forceTheme: false,
  // Shows switch to toggle between dark and light modes
  showThemeSwitch: true,
  appStoreLink: "https://apps.apple.com/us/app/rally-hud/id6739874068",
  googlePlayLink:
    "https://play.google.com/store/apps/details?id=com.stormfkrs.rally_hud",
  footer: {
    legalLinks: {
      termsAndConditions: true,
      cookiesPolicy: true,
      privacyPolicy: true,
    },
    socials: {
//       instagram: "https://instagram.com/google",
//       facebook: "https://facebook.com/google",
//       twitter: "https://x.com/google",
    },
    links: [
      { href: "/#features", title: "Features" },
      { href: "/#how-it-works", title: "How it works" },
      { href: "/#pricing", title: "Free" },
      { href: "/#faq", title: "FAQ" },
    ],
  },
  topNavbar: {
    cta: "Get the app",
    hideAppStore: false,
    hideGooglePlay: false,
    links: [
      { href: "/#features", title: "Features" },
      { href: "/#how-it-works", title: "How it works" },
      { href: "/#pricing", title: "Free" },
      { href: "/#faq", title: "FAQ" },
    ],
  },
  appBanner: {
    id: "app-banner",
    title: "Start timing your first segment",
    subtitle:
      "Free on Android and iOS. No subscription, no ads and no account needed.",
    screenshots: [
      "/screens/board/App-Explorar.png",
      "/screens/board/App-Tiempo.png",
      "/screens/board/App-Garaje.png",
    ],
  },
  home: {
    seo: {
      title: "Rally Hud — Speed & G-Force HUD for Android and iOS",
      description:
        "Real-time speed, G-force and telemetry projected onto your windscreen. Built for rally, track and night driving. Free on Android and iOS.",
    },
    testimonials: {
      id: "testimonials",
      title: "From the beta testers",
      subtitle:
        "Rally Hud is still early. These are the people driving the pre-release build, telling us what works and what does not.",
      cards: [
        {
          name: "Marta G.",
          role: "Hillclimb competitor",
          comment:
            "Being able to compare my times between runs is what I was missing with the plain speedometer apps. Tracing my own segments took me two tries.",
        },
        {
          name: "Carlos H.",
          role: "Track day regular",
          comment:
            "What convinced me was the GPS accuracy in metres. When the signal drops it tells me instead of quietly showing me a speed that is not true.",
        },
        {
          name: "Juan P.",
          role: "Rally navigator",
          comment:
            "The G-force trace next to the speed line is the part I did not know I needed. It shows me where I actually lost time, not just where I was slow.",
        },
      ],
    },
    howItWorks: {
      id: "how-it-works",
      title: "From the road to your best time",
      subtitle:
        "Choose a segment, drive it with the HUD on the windscreen, and see exactly where you gained or lost time.",
      steps: [
        {
          title: "Pick or trace a segment",
          subtitle:
            "Search near you, browse popular ones, or trace your own between two points. Rally Hud snaps the route to the real road.",
          image: "/screens/board/App-CrearTrazar.png",
        },
        {
          title: "Drive with the HUD",
          subtitle:
            "Mount the phone, open the HUD and keep your eyes on the road. Speed, lap time, next segment and G-force in a glance.",
          image: "/screens/board/HUD-Conduccion.png",
        },
        {
          title: "Read your time",
          subtitle:
            "Get the speed trace, the G-forces and the delta against your best. Keep the run, or try again.",
          image: "/screens/board/App-Tiempo.png",
        },
      ],
    },
    features: {
      id: "features",
      title: "Instruments, not a game",
      subtitle:
        "Everything is designed to be read at a glance while driving, and never to ask for your attention when it should stay on the road.",
      cards: [
        {
          icon: "speedometer",
          title: "Speed",
          subtitle:
            "Current speed with a bar showing how far you are from your maximum, plus average and top speed for the run.",
        },
        {
          icon: "gforce",
          title: "G-force",
          subtitle:
            "Lateral, braking and acceleration forces on a single ring, with the peaks of the run and the option to reset them.",
        },
        {
          icon: "segment",
          title: "Segments",
          subtitle:
            "Trace your own between two points, snapping to the real road, or browse the segments other drivers have shared near you.",
        },
        {
          icon: "timer",
          title: "Timing",
          subtitle:
            "Lap and trip timer with the distance covered, so every run is measured on the same basis.",
        },
        {
          icon: "trophy",
          title: "Ranking",
          subtitle:
            "See where you stand on each segment and how far you are from your own best time.",
        },
        {
          icon: "noSignal",
          title: "Honest GPS",
          subtitle:
            "Accuracy in metres, always visible. When the signal drops the HUD tells you instead of showing you stale data.",
        },
      ],
    },
    faq: {
      id: "faq",
      title: "Frequently Asked Questions",
      qa: [
        {
          question: "What is Rally Hud?",
          answer:
            "A heads-up display for your phone: it shows speed, lap time and G-force on the windscreen while you drive, and keeps the times you set on the segments you choose.",
        },
        {
          question: "Do I have to look at the phone while driving?",
          answer:
            "No. The HUD is designed to be read in glances from a mounted phone. Rally Hud is not a game and is not meant to be touched while the car is moving.",
        },
        {
          question: "How do I create a segment?",
          answer:
            "Trace it on the map between a start and a finish. Rally Hud snaps the line to the real road so your times stay comparable between runs.",
        },
        {
          question: "Does it need an internet connection?",
          answer:
            "The HUD uses your phone's GPS and works without a connection. You only need data to download maps and to look at the ranking.",
        },
        {
          question: "What if the GPS signal is lost?",
          answer:
            "The HUD shows the accuracy in metres and warns you when the signal is not reliable, instead of quietly showing you wrong numbers.",
        },
        {
          question: "Is it free?",
          answer:
            "Yes. Rally Hud is free and has no subscription. Your vehicle and your times stay on your device.",
        },
        {
          question: "Which devices are supported?",
          answer:
            "Any recent iPhone or Android phone. You need Android 8 or later, or iOS 15.6 or later, and a mount that holds the phone firmly.",
        },
        {
          question: "How can I report a problem?",
          answer:
            "Write to info@yapplic.com. Feedback about a segment, a route or the app itself is always welcome.",
        },
      ],
    },
    header: {
      headline: "Your driving, measured",
      subtitle:
        "A HUD for the windscreen and a full timing tool for your favourite roads.",
      // El mockup de movil del hero es vertical (292x632), asi que aqui solo
      // pueden ir pantallas de app 390x844. Meter una captura de HUD (844x390)
      // la deformaba: object-fit fill la estiraba a un hueco vertical.
      screenshots: [
        "/screens/board/App-Explorar.png",
        "/screens/board/App-Tiempo.png",
        "/screens/board/App-Ranking.png",
      ],
      usersDescription: "Join the early adopters",
      headlineMark: [2, 3],
    },
    showcase: {
      id: "showcase",
      title: "See it in action",
      subtitle: "The HUD while you drive, and the screens you use around it.",
      items: [
        {
          image: "/screens/board/HUD-Conduccion.png",
          caption: "HUD · Driving",
          note: "Speed, trip timer, next segment and G-force in a single glance.",
        },
        {
          image: "/screens/board/App-Tiempo.png",
          caption: "Times · Detail",
          note: "Speed trace, G-forces and your delta against your best run.",
        },
        {
          image: "/screens/board/App-Ranking.png",
          caption: "Ranking",
          note: "Your position on the segment and the gap to the times around you.",
        },
        {
          image: "/screens/board/HUD-Instrumentos.png",
          caption: "HUD · Instruments",
          note: "Heading, altitude and the last 60 seconds of speed.",
        },
      ],
    },
    proof: {
      id: "proof",
      title: "Built for the road, not for the store",
      subtitle:
        "Rally Hud is still early, so instead of a star rating here are the things it actually does.",
      items: [
        {
          icon: "instruments",
          title: "One screen, everything",
          text: "Speed, G-force, heading, altitude and the last 60 seconds, without leaving the HUD.",
        },
        {
          icon: "segment",
          title: "Your roads, not a fixed list",
          text: "Trace any segment between two points and Rally Hud snaps the line to the real road.",
        },
        {
          icon: "trophy",
          title: "You race yourself first",
          text: "Every run is measured against your own best, with the gap shown in tenths.",
        },
        {
          icon: "noSignal",
          title: "Honest when it cannot know",
          text: "GPS accuracy is shown in metres, and the HUD warns you when the signal is not reliable.",
        },
      ],
    },
    pricing: {
      id: "pricing",
      title: "Free forever",
      subtitle:
        "No subscription, no ads and no account. Your vehicle and your times stay on your device.",
      promises: [
        {
          icon: "timer",
          title: "Every segment, unlimited",
          subtitle:
            "Trace as many segments as you want and run each of them as many times as you like.",
        },
        {
          icon: "noSignal",
          title: "Works offline",
          subtitle:
            "The HUD reads your phone's GPS, so a stretch with no coverage does not stop the timing.",
        },
        {
          icon: "phone",
          title: "No account, no ads",
          subtitle:
            "Nothing to sign up for and nothing to watch over your shoulder. Download it and drive.",
        },
      ],
      actionText: "Download the app",
    },
  },
  app: {
    seo: {
      title: "Download Rally Hud",
      description:
        "Taking you to the right store for your device. Rally Hud is free on the App Store and Google Play.",
    },
  },
  privacyPolicy: {
    seo: {
      title: "Privacy Policy - Rally Hud",
      description: "Privacy Policy",
    },
    content: `# Privacy Policy

This privacy policy applies to the Rally Hud app (hereby referred to as "Application") for mobile devices that was created by Jordi Toda (hereby referred to as "Service Provider") as a Free service. This service is intended for use "AS IS".

**Information Collection and Use**

The Application collects information when you download and use it. This information may include information such as

*   Your device's Internet Protocol address (e.g. IP address)
*   The pages of the Application that you visit, the time and date of your visit, the time spent on those pages
*   The time spent on the Application
*   The operating system you use on your mobile device

The Application does not gather precise information about the location of your mobile device.

The Application collects your device's location, which helps the Service Provider determine your approximate geographical location and make use of in below ways:

*   Geolocation Services: The Service Provider utilizes location data to provide features such as personalized content, relevant recommendations, and location-based services.
*   Analytics and Improvements: Aggregated and anonymized location data helps the Service Provider to analyze user behavior, identify trends, and improve the overall performance and functionality of the Application.
*   Third-Party Services: Periodically, the Service Provider may transmit anonymized location data to external services. These services assist them in enhancing the Application and optimizing their offerings.

The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices and marketing promotions.

For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information. The information that the Service Provider request will be retained by them and used as described in this privacy policy.

**Third Party Access**

Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.

Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:

*   [Google Play Services](https://www.google.com/policies/privacy/)
*   [Google Analytics for Firebase](https://firebase.google.com/support/privacy)
*   [Firebase Crashlytics](https://firebase.google.com/support/privacy/)

The Service Provider may disclose User Provided and Automatically Collected Information:

*   as required by law, such as to comply with a subpoena, or similar legal process;
*   when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;
*   with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.

**Opt-Out Rights**

You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.

**Data Retention Policy**

The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at info@yapplic.com and they will respond in a reasonable time.

**Children**

The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.

The Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discover that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider (info@yapplic.com) so that they will be able to take the necessary actions.

**Security**

The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.

**Changes**

This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.

This privacy policy is effective as of 2025-01-02

**Your Consent**

By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.

**Contact Us**

If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at info@yapplic.com.

* * *

This privacy policy page was generated by [App Privacy Policy Generator](https://app-privacy-policy-generator.nisrulz.com/)
`,
  },
  cookiesPolicy: {
    seo: {
      title: "Cookies Policy - Rally Hud",
      description: "Cookies Policy",
    },
    content: `# Cookies Policy

**Effective Date:** 17/12/2024

## Introduction

This Cookies Policy explains how Yapplic ("we," "our," or "us") uses cookies and similar technologies to recognize you when you visit our app, Rally Hud (the "App"). It explains what these technologies are and why we use them, as well as your rights to control their use.

## What Are Cookies?

Cookies are small data files that are placed on your device when you visit a website or use an app. Cookies are widely used by online service providers to facilitate and help to make the interaction between users and websites/apps faster and easier, as well as to provide reporting information.

### Types of Cookies We Use

We use the following types of cookies in our App:

1. **Strictly Necessary Cookies:**  
   These cookies are essential for you to use some of the features of our App. Without these cookies, some services cannot be provided.

2. **Performance and Analytics Cookies:**  
   These cookies collect information about how users interact with our App, including which pages are visited most often. We use this information to improve how our App works.

3. **Functionality Cookies:**  
   These cookies allow our App to remember choices you make when you use the App, such as remembering your login details or language preference.

4. **Targeting and Advertising Cookies:**  
   These cookies are used to deliver advertisements that are relevant to you. They also limit the number of times you see an ad and help measure the effectiveness of advertising campaigns.

### Cookies From Third Parties

In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the App and to deliver advertisements on and through the App.

## How We Use Cookies

We use cookies to:

- **Remember your login details and preferences.**
- **Analyze usage patterns and improve the functionality of our App.**
- **Deliver relevant content and advertisements.**
- **Understand your preferences based on previous or current App activity.**

## Your Choices Regarding Cookies

You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by adjusting the settings in your browser. Most browsers allow you to:

- **View what cookies are stored on your device and delete them individually.**
- **Block third-party cookies.**
- **Block cookies from particular websites.**
- **Block all cookies from being set.**
- **Delete all cookies when you close your browser.**

Please note that if you block or delete cookies, some features of the App may not function properly.

## Changes to This Cookies Policy

We may update this Cookies Policy from time to time. We will notify you of any changes by posting the new Cookies Policy on this page and updating the "Effective Date" above. Your continued use of the App after such changes signifies your acceptance of the revised Cookies Policy.

## Contact Us

If you have any questions or concerns about our use of cookies, please contact us at:

Yapplic
Jordi Toda
info@yapplic.com
`,
  },
  termsAndConditions: {
    seo: {
      title: "Terms and conditions - Rally Hud",
      description: "Terms and conditions",
    },
    content: `# Terms and Conditions

These terms and conditions apply to the Rally Hud app (hereby referred to as "Application") for mobile devices that was created by Jordi Toda (hereby referred to as "Service Provider") as a Free service.

Upon downloading or utilizing the Application, you are automatically agreeing to the following terms. It is strongly advised that you thoroughly read and understand these terms prior to using the Application. Unauthorized copying, modification of the Application, any part of the Application, or our trademarks is strictly prohibited. Any attempts to extract the source code of the Application, translate the Application into other languages, or create derivative versions are not permitted. All trademarks, copyrights, database rights, and other intellectual property rights related to the Application remain the property of the Service Provider.

The Service Provider is dedicated to ensuring that the Application is as beneficial and efficient as possible. As such, they reserve the right to modify the Application or charge for their services at any time and for any reason. The Service Provider assures you that any charges for the Application or its services will be clearly communicated to you.

The Application stores and processes personal data that you have provided to the Service Provider in order to provide the Service. It is your responsibility to maintain the security of your phone and access to the Application. The Service Provider strongly advise against jailbreaking or rooting your phone, which involves removing software restrictions and limitations imposed by the official operating system of your device. Such actions could expose your phone to malware, viruses, malicious programs, compromise your phone's security features, and may result in the Application not functioning correctly or at all.

Please note that the Application utilizes third-party services that have their own Terms and Conditions. Below are the links to the Terms and Conditions of the third-party service providers used by the Application:

*   [Google Play Services](https://policies.google.com/terms)
*   [Google Analytics for Firebase](https://www.google.com/analytics/terms/)
*   [Firebase Crashlytics](https://firebase.google.com/terms/crashlytics)

Please be aware that the Service Provider does not assume responsibility for certain aspects. Some functions of the Application require an active internet connection, which can be Wi-Fi or provided by your mobile network provider. The Service Provider cannot be held responsible if the Application does not function at full capacity due to lack of access to Wi-Fi or if you have exhausted your data allowance.

If you are using the application outside of a Wi-Fi area, please be aware that your mobile network provider's agreement terms still apply. Consequently, you may incur charges from your mobile provider for data usage during the connection to the application, or other third-party charges. By using the application, you accept responsibility for any such charges, including roaming data charges if you use the application outside of your home territory (i.e., region or country) without disabling data roaming. If you are not the bill payer for the device on which you are using the application, they assume that you have obtained permission from the bill payer.

Similarly, the Service Provider cannot always assume responsibility for your usage of the application. For instance, it is your responsibility to ensure that your device remains charged. If your device runs out of battery and you are unable to access the Service, the Service Provider cannot be held responsible.

In terms of the Service Provider's responsibility for your use of the application, it is important to note that while they strive to ensure that it is updated and accurate at all times, they do rely on third parties to provide information to them so that they can make it available to you. The Service Provider accepts no liability for any loss, direct or indirect, that you experience as a result of relying entirely on this functionality of the application.

The Service Provider may wish to update the application at some point. The application is currently available as per the requirements for the operating system (and for any additional systems they decide to extend the availability of the application to) may change, and you will need to download the updates if you want to continue using the application. The Service Provider does not guarantee that it will always update the application so that it is relevant to you and/or compatible with the particular operating system version installed on your device. However, you agree to always accept updates to the application when offered to you. The Service Provider may also wish to cease providing the application and may terminate its use at any time without providing termination notice to you. Unless they inform you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must cease using the application, and (if necessary) delete it from your device.

**Changes to These Terms and Conditions**

The Service Provider may periodically update their Terms and Conditions. Therefore, you are advised to review this page regularly for any changes. The Service Provider will notify you of any changes by posting the new Terms and Conditions on this page.

These terms and conditions are effective as of 2025-01-02

**Contact Us**

If you have any questions or suggestions about the Terms and Conditions, please do not hesitate to contact the Service Provider at info@yapplic.com.

* * *

This Terms and Conditions page was generated by [App Privacy Policy Generator](https://app-privacy-policy-generator.nisrulz.com/)
`,
  },
};

export default templateConfig;
