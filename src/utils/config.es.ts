import type {TemplateConfig} from "./configType";
import en from "./config";

/**
 * Spanish version of the site, served under /es/.
 *
 * Same structure as `config.ts`: only texts and internal links change. Images,
 * store links and theme come from the English config so both stay in sync.
 * When you change a text in English, change it here too.
 */
const B = "/es";

const navLinks = [
  { href: `${B}/#features`, title: "Funciones" },
  { href: `${B}/#how-it-works`, title: "Cómo funciona" },
  { href: `${B}/#pricing`, title: "Precios" },
  { href: `${B}/#faq`, title: "Preguntas" },
];

const esConfig: TemplateConfig = {
  ...en,
  lang: "es",
  basePath: B,
  seo: {
    title: "Rally Hud — HUD de velocidad y fuerzas G en tiempo real",
    description:
      "Proyecta tu velocidad, las fuerzas G y tus tiempos en el parabrisas. Funciona sin conexión en Android e iOS. Gratis, con un plan Pro opcional.",
  },
  ui: {
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    toLightTheme: "Cambiar a tema claro",
    toDarkTheme: "Cambiar a tema oscuro",
    switchLanguage: "EN",
    switchLanguageLabel: "View in English",
    googlePlayBadge: "Disponible en Google Play",
    appStoreBadge: "Descárgalo en el App Store",
    appScreenAlt: "Pantalla de la app Rally Hud",
    footerNav: "Pie de página",
    terms: "Términos y condiciones",
    privacy: "Política de privacidad",
    cookies: "Política de cookies",
    rightsReserved: "Todos los derechos reservados",
    notIncluded: "No incluido:",
    testimonials: {
      prev: "Opinión anterior",
      next: "Opinión siguiente",
      goTo: "Ir a la opinión {{index}}",
      slide: "{{index}} de {{slidesLength}}",
      rating: "5 de 5",
      pause: "Pausar",
      play: "Reproducir",
      carousel: "el carrusel de opiniones",
    },
    notFound: {
      title: "Esta carretera no está en el mapa",
      text: "La página que buscas no existe. Puede que se haya movido o que el enlace esté mal.",
      home: "Volver al inicio",
      features: "Ver las funciones",
    },
    appRedirect:
      "Te llevamos a la tienda de tu móvil. Si no pasa nada, te redirigiremos en unos segundos.",
    breadcrumbHome: "Inicio",
  },
  footer: {
    ...en.footer,
    links: navLinks,
  },
  topNavbar: {
    ...en.topNavbar,
    cta: "Descarga la app",
    links: navLinks,
  },
  appBanner: {
    ...en.appBanner!,
    title: "Cronometra tu primer tramo",
    subtitle:
      "Gratis en Android e iOS, sin anuncios. Hazte Pro cuando quieras el análisis completo.",
  },
  home: {
    ...en.home,
    seo: {
      title: "Rally Hud — HUD de velocidad y fuerzas G para Android e iOS",
      description:
        "Velocidad, fuerzas G y telemetría en tiempo real en el parabrisas. Pensada para rallies, circuito y conducción nocturna. Gratis en Android e iOS, con un plan Pro opcional.",
    },
    testimonials: {
      ...en.home.testimonials!,
      title: "Lo que dicen los beta testers",
      subtitle:
        "Los primeros pilotos que probaron Rally Hud antes del lanzamiento, contándonos qué funciona y qué no.",
      cards: [
        {
          name: "Marta G.",
          role: "Piloto de subidas de montaña",
          comment:
            "Poder comparar mis tiempos entre pasadas es lo que me faltaba con las apps de velocímetro. Trazar mis propios tramos me costó dos intentos.",
        },
        {
          name: "Carlos H.",
          role: "Habitual de los track days",
          comment:
            "Lo que me convenció fue la precisión del GPS en metros. Cuando se pierde la señal me lo dice, en vez de enseñarme una velocidad que no es real.",
        },
        {
          name: "Juan P.",
          role: "Copiloto de rallies",
          comment:
            "La curva de fuerzas G junto a la de velocidad es lo que no sabía que necesitaba. Me enseña dónde perdí tiempo de verdad, no solo dónde fui lento.",
        },
      ],
    },
    howItWorks: {
      ...en.home.howItWorks!,
      title: "De la carretera a tu mejor tiempo",
      subtitle:
        "Elige un tramo, recórrelo con el HUD en el parabrisas y mira exactamente dónde ganaste o perdiste tiempo.",
      steps: [
        {
          title: "Elige o traza un tramo",
          subtitle:
            "Busca cerca de ti, explora los más populares o traza el tuyo entre dos puntos. Rally Hud ajusta la ruta a la carretera real.",
          image: "/screens/board/App-CrearTrazar.png",
        },
        {
          title: "Conduce con el HUD",
          subtitle:
            "Sujeta el móvil, abre el HUD y no apartes la vista de la carretera. Velocidad, tiempo, siguiente tramo y fuerzas G de un vistazo.",
          image: "/screens/board/HUD-Conduccion.png",
        },
        {
          title: "Consulta tu tiempo",
          subtitle:
            "Mira la curva de velocidad, las fuerzas G y la diferencia con tu mejor pasada. Guárdala o vuelve a intentarlo.",
          image: "/screens/board/App-Tiempo.png",
        },
      ],
    },
    features: {
      ...en.home.features!,
      title: "Instrumentos, no un juego",
      subtitle:
        "Todo está pensado para leerse de un vistazo mientras conduces, y para no pedirte atención cuando debe estar en la carretera.",
      cards: [
        {
          icon: "speedometer",
          title: "Velocidad",
          subtitle:
            "Velocidad actual con una barra que indica lo lejos que estás de tu máxima, más la velocidad media y la punta de la pasada.",
        },
        {
          icon: "gforce",
          title: "Fuerzas G",
          subtitle:
            "Fuerzas laterales, de frenada y de aceleración en un solo anillo, con los picos de la pasada y la opción de reiniciarlos.",
        },
        {
          icon: "segment",
          title: "Tramos",
          subtitle:
            "Traza los tuyos entre dos puntos, ajustados a la carretera real, o explora los tramos que otros pilotos han compartido cerca de ti.",
        },
        {
          icon: "timer",
          title: "Cronometraje",
          subtitle:
            "Cronómetro de vuelta y de trayecto con la distancia recorrida, para que cada pasada se mida igual.",
        },
        {
          icon: "trophy",
          title: "Ranking",
          subtitle:
            "Mira en qué posición estás en cada tramo y a cuánto estás de tu mejor tiempo.",
        },
        {
          icon: "noSignal",
          title: "GPS honesto",
          subtitle:
            "Precisión en metros, siempre visible. Si se pierde la señal, el HUD te avisa en vez de enseñarte datos viejos.",
        },
      ],
    },
    faq: {
      ...en.home.faq!,
      title: "Preguntas frecuentes",
      qa: [
        {
          question: "¿Qué es Rally Hud?",
          answer:
            "Un head-up display para tu móvil: muestra la velocidad, el tiempo y las fuerzas G en el parabrisas mientras conduces, y guarda los tiempos que haces en los tramos que eliges.",
        },
        {
          question: "¿Tengo que mirar el móvil mientras conduzco?",
          answer:
            "No. El HUD está pensado para leerse de un vistazo con el móvil sujeto en un soporte. Rally Hud no es un juego y no está hecho para tocarlo con el coche en marcha.",
        },
        {
          question: "¿Cómo creo un tramo?",
          answer:
            "Trázalo en el mapa entre una salida y una llegada. Rally Hud ajusta la línea a la carretera real para que tus tiempos sean comparables entre pasadas.",
        },
        {
          question: "¿Necesita conexión a internet?",
          answer:
            "El HUD usa el GPS del móvil y funciona sin conexión. Solo necesitas datos para descargar los mapas y consultar el ranking.",
        },
        {
          question: "¿Y si se pierde la señal del GPS?",
          answer:
            "El HUD muestra la precisión en metros y te avisa cuando la señal no es fiable, en vez de enseñarte números equivocados.",
        },
        {
          question: "¿Es gratis?",
          answer:
            "Sí. El HUD, el cronometraje, el ranking y los tramos públicos son gratis y sin anuncios. Rally Hud Pro (2,99 € al mes o 29,99 € al año, con 7 días de prueba gratis) añade el análisis de cada pasada, los tramos privados, vehículos ilimitados y todo tu historial.",
        },
        {
          question: "¿Qué incluye Pro y cómo lo cancelo?",
          answer:
            "Pro desbloquea el análisis de cada pasada (curvas de velocidad y fuerzas G), los tramos privados que puedes compartir con un enlace de invitación, más de 2 vehículos en el garaje y todo tu historial de tiempos. Lo cobra el App Store o Google Play, y lo cancelas cuando quieras desde las suscripciones de tu tienda. Quien invites a un tramo privado puede unirse sin ser Pro.",
        },
        {
          question: "¿Qué dispositivos son compatibles?",
          answer:
            "Cualquier iPhone o móvil Android reciente. Necesitas Android 8 o superior, o iOS 15.6 o superior, y un soporte que sujete bien el móvil.",
        },
        {
          question: "¿Cómo puedo informar de un problema?",
          answer:
            "Escribe a info@yapplic.com. Cualquier comentario sobre un tramo, una ruta o la propia app es bienvenido.",
        },
      ],
    },
    header: {
      ...en.home.header,
      headline: "Tu conducción, medida",
      subtitle:
        "Un HUD para el parabrisas y una herramienta de cronometraje completa para tus carreteras favoritas.",
      usersDescription: "Únete a los primeros pilotos",
      headlineMark: [2, 3],
    },
    showcase: {
      ...en.home.showcase!,
      title: "Míralo en acción",
      subtitle: "El HUD mientras conduces y las pantallas que usas antes y después.",
      items: [
        {
          image: "/screens/board/HUD-Conduccion.png",
          caption: "HUD · Conducción",
          note: "Velocidad, cronómetro, siguiente tramo y fuerzas G de un vistazo.",
        },
        {
          image: "/screens/board/App-Tiempo.png",
          caption: "Tiempos · Detalle",
          note: "Curva de velocidad, fuerzas G y la diferencia con tu mejor pasada.",
        },
        {
          image: "/screens/board/App-Ranking.png",
          caption: "Ranking",
          note: "Tu posición en el tramo y la diferencia con los tiempos de tu alrededor.",
        },
        {
          image: "/screens/board/HUD-Instrumentos.png",
          caption: "HUD · Instrumentos",
          note: "Rumbo, altitud y los últimos 60 segundos de velocidad.",
        },
      ],
    },
    proof: {
      ...en.home.proof!,
      title: "Hecha para la carretera, no para la tienda",
      subtitle:
        "En vez de una puntuación con estrellas, esto es lo que hace de verdad.",
      items: [
        {
          icon: "instruments",
          title: "Una pantalla, todo",
          text: "Velocidad, fuerzas G, rumbo, altitud y los últimos 60 segundos, sin salir del HUD.",
        },
        {
          icon: "segment",
          title: "Tus carreteras, no una lista fija",
          text: "Traza cualquier tramo entre dos puntos y Rally Hud ajusta la línea a la carretera real.",
        },
        {
          icon: "trophy",
          title: "Primero compites contigo",
          text: "Cada pasada se mide contra tu mejor tiempo, con la diferencia en décimas.",
        },
        {
          icon: "noSignal",
          title: "Honesta cuando no lo sabe",
          text: "La precisión del GPS se muestra en metros y el HUD te avisa cuando la señal no es fiable.",
        },
      ],
    },
    pricing: {
      ...en.home.pricing!,
      title: "Gratis para conducir. Pro para ir más allá.",
      subtitle:
        "Todo lo que necesitas en la carretera es gratis y sin anuncios. Pro añade el análisis y los extras para quien quiere más.",
      plans: [
        {
          name: "Gratis",
          price: "0 €",
          priceNote: "para siempre",
          features: [
            { text: "HUD, instrumentos y cronometraje de tramos", included: true },
            { text: "Ranking en todos los tramos", included: true },
            { text: "Explorar, conducir y crear tramos públicos", included: true },
            { text: "Compartir tu posición en el ranking", included: true },
            { text: "Unirte a tramos privados si te invitan", included: true },
            { text: "Garaje con 2 vehículos", included: true },
            { text: "Tus 5 últimas pasadas", included: true },
            { text: "Análisis de la pasada (curvas de velocidad y fuerzas G)", included: false },
            { text: "Crear tramos privados", included: false },
          ],
        },
        {
          name: "Pro",
          price: "2,99 €",
          priceNote: "al mes, o 29,99 € al año",
          highlight: true,
          badge: "7 días gratis",
          features: [
            { text: "Todo lo de Gratis", included: true },
            { text: "Análisis de cada pasada: curvas de velocidad y fuerzas G", included: true },
            { text: "Tramos privados, compartidos con enlace de invitación y sin límite de miembros", included: true },
            { text: "Vehículos ilimitados en el garaje", included: true },
            { text: "Todo tu historial de tiempos", included: true },
          ],
        },
      ],
      footnote:
        "Precios en euros; la tienda muestra el precio en tu moneda. La prueba gratis de 7 días es para nuevos suscriptores. Lo cobra el App Store o Google Play, se renueva automáticamente y se puede cancelar en cualquier momento desde las suscripciones de tu tienda.",
      actionText: "Descarga la app",
    },
  },
  app: {
    seo: {
      title: "Descarga Rally Hud",
      description:
        "Te llevamos a la tienda de tu dispositivo. Rally Hud se descarga gratis en el App Store y Google Play.",
    },
  },
  privacyPolicy: {
    seo: {
      title: "Política de privacidad - Rally Hud",
      description: "Política de privacidad de Rally Hud",
    },
    content: `# Política de privacidad

**Última actualización:** 3 de noviembre de 2026

Esta política explica qué datos personales recogen la app Rally Hud («la App») y la web rallyhud.yapplic.com, para qué los usamos y qué puedes hacer al respecto.

## Responsable

Rally Hud la desarrolla Jordi Toda (Yapplic), que es el responsable del tratamiento. Contacto: [info@yapplic.com](mailto:info@yapplic.com).

## Qué datos recogemos y para qué

**Cuenta.** Para guardar tus tiempos y usar las funciones en línea inicias sesión con correo y contraseña, Google o Apple. Guardamos tu identificador de usuario, tu correo y el nombre que elijas. *Finalidad:* mantener tus datos vinculados a ti en todos tus dispositivos. *Base legal:* la prestación del servicio que solicitas.

**Tus vehículos.** El nombre y los datos de los vehículos de tu garaje y, si la añades, una foto. *Finalidad:* mostrar qué vehículo usaste en cada pasada.

**Tus pasadas.** De cada pasada cronometrada en un tramo: el tramo, el vehículo, la fecha y hora, el tiempo total, la velocidad máxima y media, los tiempos intermedios y las series de velocidad y fuerzas G que se usan para el análisis. El recorrido GPS de la pasada **no** se sube: se procesa en tu móvil para detectar los tramos y calcular la velocidad.

**Tramos que creas.** La ruta (salida, llegada y los puntos de la línea), el nombre, la descripción y si es público o privado. Los tramos públicos, su ruta y tu nombre como creador son visibles para todos los usuarios. Los tramos privados solo los ves tú y las personas que invites.

**Ranking.** Tu mejor tiempo en cada tramo, con tu nombre y el de tu vehículo, aparece en el ranking del tramo para los demás usuarios que pueden ver ese tramo.

**Ubicación.** La App usa la ubicación precisa del móvil mientras la usas, para medir la velocidad, cronometrar los tramos y mostrar el mapa. No sigue tu ubicación en segundo plano ni envía tu historial de ubicaciones a nuestros servidores.

**Suscripción (Rally Hud Pro).** Las compras las procesan el App Store o Google Play. Nunca vemos tu tarjeta ni tus datos de pago. Recibimos, a través de RevenueCat, el estado de tu suscripción (plan y fechas de inicio, renovación y fin) vinculado a tu identificador de usuario, para desbloquear las funciones Pro.

**Notificaciones.** Si las permites, OneSignal recibe un identificador del dispositivo y tu identificador de usuario para enviarte avisos de la App.

**Datos de uso y errores.** Firebase Analytics y Firebase Crashlytics recogen el modelo del dispositivo, el sistema operativo, la versión de la App, eventos de uso aproximados e informes de errores. *Finalidad:* corregir errores y mejorar la App. *Base legal:* interés legítimo.

**Contacto.** Si nos escribes, guardamos tu correo y tu mensaje para responderte.

## Proveedores

Usamos estos proveedores, que tratan datos por cuenta nuestra:

* Google Firebase (autenticación, base de datos, almacenamiento de archivos, funciones en la nube, Analytics, Crashlytics) — [privacidad](https://firebase.google.com/support/privacy)
* RevenueCat (estado de la suscripción) — [privacidad](https://www.revenuecat.com/privacy)
* OneSignal (notificaciones) — [privacidad](https://onesignal.com/privacy_policy)
* App Store de Apple y Google Play (descargas y pagos) — con sus propias políticas
* OpenRouteService / HeiGIT (ajustar un tramo nuevo a la carretera: recibe los puntos que marcas en el mapa, sin tu identidad) — [privacidad](https://heigit.org/privacy/)
* OpenStreetMap (teselas del mapa: recibe tu dirección IP y la zona del mapa que miras) — [privacidad](https://osmfoundation.org/wiki/Privacy_Policy)

Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, con las garantías que prevé la ley (como las cláusulas contractuales tipo de la Comisión Europea).

No vendemos tus datos y la App no tiene anuncios.

## Cuánto tiempo los guardamos

Guardamos tus datos mientras tengas cuenta. Cuando la eliminas (ver abajo), borramos la cuenta, los vehículos, sus fotos y tus pasadas. Tus mejores tiempos siguen en los rankings y tus tramos públicos siguen disponibles, pero anonimizados como «Piloto eliminado», de forma que ya no se pueden vincular contigo. Los datos de errores y de uso se guardan durante el plazo que fija Firebase.

## Eliminar tu cuenta

Puedes eliminar tu cuenta en cualquier momento desde **Perfil › Eliminar cuenta** en la App. Si no puedes acceder a la App, escribe a [info@yapplic.com](mailto:info@yapplic.com) desde el correo de tu cuenta. Eliminar la cuenta no cancela una suscripción de la tienda: cancélala desde tus suscripciones del App Store o Google Play.

## Tus derechos

Puedes pedir acceder, rectificar, suprimir o exportar tus datos, y oponerte a su tratamiento o limitarlo, escribiendo a [info@yapplic.com](mailto:info@yapplic.com). Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos ([aepd.es](https://www.aepd.es)).

## Menores

La App no está dirigida a menores de 14 años y no recogemos sus datos a sabiendas.

## La web

rallyhud.yapplic.com no usa cookies ni analítica. Solo guarda en tu navegador si elegiste el tema claro u oscuro. Consulta la [Política de cookies](/es/cookies-policy/).

## Cambios

Si cambiamos esta política, actualizaremos esta página y la fecha de arriba. Si el cambio es importante, también te avisaremos en la App.
`,
  },
  cookiesPolicy: {
    seo: {
      title: "Política de cookies - Rally Hud",
      description: "Política de cookies de Rally Hud",
    },
    content: `# Política de cookies

**Última actualización:** 3 de noviembre de 2026

## La web

rallyhud.yapplic.com **no usa cookies**, ni analítica, ni rastreadores publicitarios.

Solo guarda un valor en el almacenamiento local de tu navegador, \`rally-theme\`, para recordar si elegiste el tema claro u oscuro. Es estrictamente necesario para esa elección, no se envía a ningún servidor y puedes borrarlo borrando los datos del sitio en tu navegador.

Los botones de las tiendas enlazan con el App Store y Google Play, que aplican sus propias políticas de cookies cuando los abres.

## La app

La app Rally Hud no usa cookies ni muestra anuncios. Los datos de uso y de errores que recoge se explican en la [Política de privacidad](/es/privacy-policy/).

## Contacto

[info@yapplic.com](mailto:info@yapplic.com)
`,
  },
  termsAndConditions: {
    seo: {
      title: "Términos y condiciones - Rally Hud",
      description: "Términos y condiciones de Rally Hud",
    },
    content: `# Términos y condiciones

**Última actualización:** 3 de noviembre de 2026

Estos términos se aplican a la app Rally Hud («la App»), desarrollada por Jordi Toda (Yapplic), contacto [info@yapplic.com](mailto:info@yapplic.com). Al descargar o usar la App los aceptas.

## 1. Conduce con seguridad y dentro de la ley

Rally Hud mide y cronometra tu conducción. **No** es una invitación a correr ni a competir en vías públicas.

* Respeta siempre las normas de tráfico y los límites de velocidad. Usa los tramos cronometrados solo donde sea legal y seguro, como carreteras cerradas, circuitos o eventos organizados.
* Sujeta bien el móvil y no lo manipules mientras conduces. La App está pensada para leerse de un vistazo.
* La velocidad, los tiempos y las fuerzas G salen de los sensores y el GPS del móvil y pueden no ser exactos. No te fíes de ellos para tu seguridad ni como cronometraje oficial.

Eres el único responsable de cómo conduces. En la medida que permita la ley, el desarrollador no responde de accidentes, multas o daños derivados del uso de la App.

## 2. Tu cuenta

Puedes usar el HUD sin cuenta, pero la necesitas para guardar tiempos, aparecer en los rankings, crear tramos o suscribirte a Pro. Mantén seguros tus datos de acceso; eres responsable de la actividad de tu cuenta. Puedes eliminarla en cualquier momento desde **Perfil › Eliminar cuenta**.

## 3. Contenido que compartes

Los tramos que haces públicos, y tu nombre, el nombre de tu vehículo y tus mejores tiempos en los rankings, son visibles para otros usuarios. No publiques tramos ni nombres ofensivos, que vulneren derechos de otros o que revelen lugares privados. Podemos retirar contenido o suspender cuentas que incumplan estos términos o que manipulen los rankings.

## 4. Versión gratuita y Rally Hud Pro

La App se descarga y se usa gratis. **Rally Hud Pro** es una suscripción opcional de renovación automática que desbloquea funciones extra (ahora: análisis de pasadas, tramos privados, vehículos ilimitados y todo el historial).

* **Planes:** mensual o anual. El precio se muestra en la App y en la tienda antes de comprar, en tu moneda.
* **Prueba gratis:** los nuevos suscriptores pueden tener 7 días de prueba gratis. Si no la cancelas al menos 24 horas antes de que termine, empieza la suscripción y se cobra.
* **Cobro y renovación:** el pago se carga en tu cuenta de Apple o de Google Play. La suscripción se renueva automáticamente por el mismo periodo salvo que la canceles al menos 24 horas antes de que termine el periodo en curso.
* **Cancelar:** gestiónala o cancélala desde los ajustes de tu cuenta del App Store o Google Play. Al cancelar se detienen las renovaciones; mantienes Pro hasta el final del periodo ya pagado. Borrar la App o tu cuenta no cancela la suscripción.
* **Reembolsos:** los gestionan Apple o Google según sus políticas. Esto no afecta a tus derechos legales como consumidor.
* **Si Pro termina:** conservas tus datos. Los vehículos y tramos privados que ya tienes se quedan, pero no puedes añadir más vehículos que el límite gratuito, crear tramos privados nuevos ni invitar a nuevos miembros, y el análisis y el historial completo se ocultan hasta que vuelvas a suscribirte.

Podemos cambiar las funciones o los precios de Pro. Un cambio de precio no se aplica a un periodo que ya hayas pagado y se comunicará como exigen las tiendas.

## 5. Propiedad intelectual

La App, su diseño y su marca pertenecen al desarrollador. No puedes copiar, modificar, descompilar ni redistribuir la App. Datos del mapa © colaboradores de OpenStreetMap.

## 6. Disponibilidad

Intentamos que la App funcione siempre, pero no garantizamos que esté siempre disponible o sin errores. Algunas funciones necesitan conexión a internet y pueden consumir datos móviles. Podemos actualizar la App o dejar de ofrecerla; si dejamos de ofrecer Pro, no renovaremos las suscripciones activas.

## 7. Apple

Si descargaste la App del App Store, también se aplica el [EULA estándar de Apple](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/). Apple no es responsable de la App ni de su soporte.

## 8. Privacidad

Cómo tratamos tus datos se explica en la [Política de privacidad](/es/privacy-policy/).

## 9. Cambios y ley aplicable

Podemos actualizar estos términos; publicaremos aquí la nueva versión con su fecha. Se rigen por la ley española, sin perjuicio de las protecciones obligatorias para consumidores de tu país de residencia.

## Contacto

[info@yapplic.com](mailto:info@yapplic.com)
`,
  },
};

export default esConfig;
