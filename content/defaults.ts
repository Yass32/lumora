import type { Localized } from '@/lib/i18n'

/**
 * Starting content for the sections staff edit in the CMS.
 * The website shows these until the CMS has its own version,
 * and `npm run seed` copies them into the CMS so staff start with filled-in pages.
 */

export type ServiceItem = { stage: 1 | 2 | 3; title: Localized; description: Localized }

export const defaultServices: ServiceItem[] = [
  {
    stage: 1,
    title: { en: 'University & programme selection', sn: 'Kusarudza yunivhesiti nechidzidzo', tr: 'Üniversite ve bölüm seçimi', fr: "Choix de l'université et du programme" },
    description: {
      en: 'We match your grades, budget and goals to the right course.',
      sn: 'Tinoenzanisa mamakisi ako, bhajeti nezvinangwa zvako nechidzidzo chakakodzera.',
      tr: 'Notlarınıza, bütçenize ve hedeflerinize uygun programı birlikte buluyoruz.',
      fr: 'Nous associons vos résultats, votre budget et vos objectifs au bon cursus.',
    },
  },
  {
    stage: 1,
    title: { en: 'Applications & admission', sn: 'Kunyorera nekugamuchirwa', tr: 'Başvuru ve kabul', fr: 'Candidatures et admission' },
    description: {
      en: 'We prepare and submit your documents and follow up on your offer.',
      sn: 'Tinogadzirira nekutumira magwaro ako, uye tinotevera kusvikira wagamuchirwa.',
      tr: 'Belgelerinizi hazırlayıp gönderiyor, kabul sürecini takip ediyoruz.',
      fr: 'Nous préparons et déposons votre dossier, puis suivons votre admission.',
    },
  },
  {
    stage: 1,
    title: { en: 'Scholarship guidance', sn: 'Rubatsiro rwemari yechikoro', tr: 'Burs danışmanlığı', fr: 'Accompagnement pour les bourses' },
    description: {
      en: 'We find the scholarships you qualify for and help you apply.',
      sn: 'Tinotsvaga rubatsiro rwemari rwaunokodzera uye tinokubatsira kunyorera.',
      tr: 'Başvurabileceğiniz bursları bulur, başvurunuzda yardımcı oluruz.',
      fr: 'Nous trouvons les bourses auxquelles vous avez droit et vous aidons à postuler.',
    },
  },
  {
    stage: 1,
    title: { en: 'Visa application', sn: 'Kunyorera vhiza', tr: 'Vize başvurusu', fr: 'Demande de visa' },
    description: {
      en: 'Step-by-step help with your student visa file and appointment.',
      sn: 'Rubatsiro nhanho nenhanho negwaro revhiza yako yekudzidza uye musangano wako.',
      tr: 'Öğrenci vizesi dosyanız ve randevunuz için adım adım destek.',
      fr: 'Une aide pas à pas pour votre dossier de visa étudiant et votre rendez-vous.',
    },
  },
  {
    stage: 2,
    title: { en: 'Airport pickup & transfer', sn: 'Kuchingamidzwa panhandare yendege', tr: 'Havalimanı karşılama ve transfer', fr: "Accueil à l'aéroport et transfert" },
    description: {
      en: 'Someone from our team meets you at the airport.',
      sn: 'Mumwe wechikwata chedu anokuchingamidza panhandare yendege.',
      tr: 'Ekibimizden biri sizi havalimanında karşılar.',
      fr: "Un membre de notre équipe vous accueille à l'aéroport.",
    },
  },
  {
    stage: 2,
    title: { en: 'University registration', sn: 'Kunyoresa kuyunivhesiti', tr: 'Üniversite kaydı', fr: "Inscription à l'université" },
    description: {
      en: 'We go with you to complete registration and enrolment.',
      sn: 'Tinoenda newe kunopedzisa kunyoresa.',
      tr: 'Kayıt işlemlerinizi tamamlamak için sizinle birlikte gidiyoruz.',
      fr: 'Nous vous accompagnons pour finaliser votre inscription.',
    },
  },
  {
    stage: 2,
    title: { en: 'Accommodation', sn: 'Pekugara', tr: 'Konaklama', fr: 'Logement' },
    description: {
      en: 'A dorm or flat arranged before you land.',
      sn: 'Dormitori kana imba zvinorongwa usati wasvika.',
      tr: 'Siz gelmeden yurt veya ev ayarlanır.',
      fr: 'Une résidence ou un appartement réservé avant votre arrivée.',
    },
  },
  {
    stage: 3,
    title: { en: 'Residence permit', sn: 'Mvumo yekugara (residence permit)', tr: 'İkamet izni', fr: 'Titre de séjour' },
    description: {
      en: 'We guide you through your student residence permit application.',
      sn: 'Tinokutungamirira pakunyorera mvumo yekugara semudzidzi.',
      tr: 'Öğrenci ikamet izni başvurunuzda size rehberlik ederiz.',
      fr: 'Nous vous guidons dans votre demande de titre de séjour étudiant.',
    },
  },
  {
    stage: 3,
    title: { en: 'Settling-in support', sn: 'Rubatsiro rwekugadzikana', tr: 'Uyum desteği', fr: "Aide à l'installation" },
    description: {
      en: 'A SIM card, a bank account, getting around, and someone to call when you need help.',
      sn: 'SIM card, account yebhangi, kuziva nzira, uye munhu waunogona kufonera paunoda rubatsiro.',
      tr: 'SIM kart, banka hesabı, şehirde ulaşım ve ihtiyaç duyduğunuzda arayabileceğiniz biri.',
      fr: 'Carte SIM, compte bancaire, transports, et quelqu’un à appeler en cas de besoin.',
    },
  },
]

export type WhyTurkiyeContent = {
  eyebrow: Localized
  heading: Localized
  body: Localized
  points: { title: Localized; text: Localized }[]
}

/** The "Why study abroad" section (stored under the id "whyTurkiye" from the first version of the site). */
export const defaultWhyTurkiye: WhyTurkiyeContent = {
  eyebrow: { en: 'Why study abroad', sn: 'Sei uchidzidza kunze kwenyika', tr: 'Neden yurt dışında eğitim', fr: 'Pourquoi étudier à l’étranger' },
  heading: {
    en: 'An international degree opens doors',
    sn: 'Dhigirii rekunze kwenyika rinokuvhurira mikana',
    tr: 'Uluslararası bir diploma yeni kapılar açar',
    fr: 'Un diplôme international ouvre des portes',
  },
  body: {
    en: 'Studying abroad gives you a quality education, a new culture and real career opportunities. We help you choose the country and university that fit your goals and your budget, and Lumora stays beside you the whole way.',
    sn: 'Kudzidza kunze kwenyika kunokupa dzidzo yepamusoro, ruzivo rwetsika itsva uye mikana yebasa. Tinokubatsira kusarudza nyika neyunivhesiti zvinoenderana nezvinangwa zvako nebhajeti yako, uye Lumora inenge iri newe nguva dzose.',
    tr: 'Yurt dışında eğitim size kaliteli bir eğitim, yeni bir kültür ve gerçek kariyer fırsatları sunar. Hedeflerinize ve bütçenize uygun ülkeyi ve üniversiteyi seçmenize yardımcı oluyoruz; Lumora da her adımda yanınızda.',
    fr: 'Étudier à l’étranger, c’est une formation de qualité, une nouvelle culture et de vraies perspectives de carrière. Nous vous aidons à choisir le pays et l’université adaptés à vos objectifs et à votre budget, et Lumora reste à vos côtés à chaque étape.',
  },
  points: [
    {
      title: { en: 'Recognised degrees', sn: 'Madhigirii anozivikanwa', tr: 'Tanınan diplomalar', fr: 'Diplômes reconnus' },
      text: {
        en: 'Study at accredited universities whose degrees are recognised internationally.',
        sn: 'Dzidza pamayunivhesiti anozivikanwa ane madhigirii anogamuchirwa pasi rose.',
        tr: 'Diplomaları uluslararası alanda tanınan akredite üniversitelerde okuyun.',
        fr: 'Étudiez dans des universités accréditées dont les diplômes sont reconnus à l’international.',
      },
    },
    {
      title: { en: 'Taught in English', sn: 'Zvidzidzo muChirungu', tr: 'İngilizce eğitim', fr: 'Cours en anglais' },
      text: {
        en: 'Many programmes in our destinations are taught fully in English.',
        sn: 'Zvidzidzo zvakawanda munyika dzatinoshanda nadzo zvinodzidziswa muChirungu chete.',
        tr: 'Ülkelerimizdeki pek çok program tamamen İngilizce verilir.',
        fr: 'De nombreux programmes dans nos destinations sont entièrement en anglais.',
      },
    },
    {
      title: { en: 'Options for every budget', sn: 'Sarudzo yebhajeti yega yega', tr: 'Her bütçeye uygun seçenekler', fr: 'Pour tous les budgets' },
      text: {
        en: 'From low-cost public universities to world-famous names, with scholarships where available.',
        sn: 'Kubva kumayunivhesiti ehurumende ane mari shoma kusvika kune anozivikanwa pasi rose, uye rubatsiro rwemari parunowanikwa.',
        tr: 'Uygun maliyetli devlet üniversitelerinden dünyaca ünlü okullara, mümkün olduğunda burslarla.',
        fr: 'Des universités publiques abordables aux établissements de renommée mondiale, avec des bourses quand elles existent.',
      },
    },
    {
      title: { en: 'Never on your own', sn: 'Hausi wega', tr: 'Asla yalnız değilsiniz', fr: 'Jamais seul' },
      text: {
        en: 'Our team supports you before you leave and after you arrive.',
        sn: 'Chikwata chedu chinokubatsira usati waenda uye mushure mekusvika.',
        tr: 'Ekibimiz yola çıkmadan önce ve vardıktan sonra yanınızda.',
        fr: 'Notre équipe vous accompagne avant le départ et après l’arrivée.',
      },
    },
  ],
}

export type AboutContent = { eyebrow: Localized; heading: Localized; paragraphs: Localized[] }

export const defaultAbout: AboutContent = {
  eyebrow: { en: 'About Lumora', sn: 'NezveLumora', tr: 'Lumora hakkında', fr: 'À propos de Lumora' },
  heading: {
    en: 'Making study abroad easier, smoother and more accessible',
    sn: 'Kuita kuti kudzidza kunze kwenyika kuve nyore, kutsetseka uye kuwanikwa nevazhinji',
    tr: 'Yurt dışında eğitimi daha kolay, daha sorunsuz ve daha erişilebilir kılıyoruz',
    fr: 'Rendre les études à l’étranger plus simples, plus fluides et plus accessibles',
  },
  paragraphs: [
    {
      en: 'Lumora Global Education is an education consultancy based in Zimbabwe. We help students pursue international education with reliable guidance and support, from application to arrival and beyond.',
      sn: 'Lumora Global Education isangano rinopa mazano ezvedzidzo riri muZimbabwe. Tinobatsira vadzidzi kuwana dzidzo kunze kwenyika nekutungamirirwa kwakavimbika, kubva pakunyorera kusvika pakusvika nemberi.',
      tr: 'Lumora Global Education, Zimbabve merkezli bir eğitim danışmanlığı şirketidir. Öğrencilerin yurt dışında eğitim almasına, başvurudan varışa ve sonrasına kadar güvenilir rehberlik ve destekle yardımcı oluyoruz.',
      fr: 'Lumora Global Education est un cabinet de conseil en éducation basé au Zimbabwe. Nous aidons les étudiants à poursuivre leurs études à l’étranger grâce à un accompagnement fiable, de la candidature à l’arrivée et au-delà.',
    },
    {
      en: "Our team works on both ends of the journey, in Harare and in Türkiye. Before you leave, you sit down with someone who knows your goals. When you land, someone who knows the country is waiting for you. We treat every student the way we'd want our own family to be treated: honestly, patiently, and with care.",
      sn: 'Chikwata chedu chinoshanda kumativi ese ari maviri erwendo, muHarare nekuTürkiye. Usati waenda, unogara pasi nemunhu anoziva zvinangwa zvako. Paunosvika, munhu anoziva nyika iyi anenge akakumirira. Tinobata mudzidzi wese sezvatingada kuti mhuri yedu ibatwe: nekutendeka, nemoyo murefu uye nerudo.',
      tr: "Ekibimiz yolculuğun iki ucunda çalışır: Harare'de ve Türkiye'de. Yola çıkmadan önce hedeflerinizi bilen biriyle oturup konuşursunuz. Vardığınızda ülkeyi tanıyan biri sizi bekler. Her öğrenciye kendi ailemize davranılmasını istediğimiz gibi davranırız: dürüstçe, sabırla ve özenle.",
      fr: 'Notre équipe travaille aux deux bouts du parcours, à Harare et en Turquie. Avant votre départ, vous échangez avec quelqu’un qui connaît vos objectifs. À votre arrivée, quelqu’un qui connaît le pays vous attend. Nous traitons chaque étudiant comme nous voudrions que notre propre famille soit traitée : avec honnêteté, patience et attention.',
    },
  ],
}

export type DestinationItem = { code: string; name: Localized; summary: Localized }

export const defaultDestinations: DestinationItem[] = [
  {
    code: 'TR',
    name: { en: 'Türkiye', sn: 'Türkiye', tr: 'Türkiye', fr: 'Turquie' },
    summary: {
      en: 'Affordable tuition, English-taught programmes and city life where Europe meets Asia.',
      sn: 'Mari yechikoro inogoneka, zvidzidzo muChirungu, uye upenyu hweguta panosangana Europe neAsia.',
      tr: 'Uygun eğitim ücretleri, İngilizce programlar ve Avrupa ile Asya’nın buluştuğu bir şehir hayatı.',
      fr: 'Des frais de scolarité abordables, des cours en anglais et une vie urbaine entre l’Europe et l’Asie.',
    },
  },
  {
    code: 'PL',
    name: { en: 'Poland', sn: 'Poland', tr: 'Polonya', fr: 'Pologne' },
    summary: {
      en: 'A European Union degree at a reasonable cost, with many programmes taught in English.',
      sn: 'Dhigirii reEuropean Union pamutengo unonzwisisika, nezvidzidzo zvakawanda muChirungu.',
      tr: 'Makul bir maliyetle Avrupa Birliği diploması ve İngilizce eğitim veren pek çok program.',
      fr: 'Un diplôme de l’Union européenne à un coût raisonnable, avec de nombreux programmes en anglais.',
    },
  },
  {
    code: 'BY',
    name: { en: 'Belarus', sn: 'Belarus', tr: 'Belarus', fr: 'Biélorussie' },
    summary: {
      en: 'Low tuition and living costs, and medicine programmes taught in English.',
      sn: 'Mari shoma yechikoro neyekurarama, uye zvidzidzo zvemishonga (medicine) muChirungu.',
      tr: 'Düşük eğitim ve yaşam maliyeti, İngilizce tıp programları.',
      fr: 'Des frais de scolarité et un coût de la vie bas, et des études de médecine en anglais.',
    },
  },
  {
    code: 'LT',
    name: { en: 'Lithuania', sn: 'Lithuania', tr: 'Litvanya', fr: 'Lituanie' },
    summary: {
      en: 'A European Union degree, English-taught programmes and a safe, modern student life.',
      sn: 'Dhigirii reEuropean Union, zvidzidzo muChirungu, uye upenyu hwevadzidzi hwakachengeteka hwemazuva ano.',
      tr: 'Avrupa Birliği diploması, İngilizce programlar ve güvenli, modern bir öğrenci hayatı.',
      fr: 'Un diplôme de l’Union européenne, des programmes en anglais et une vie étudiante sûre et moderne.',
    },
  },
  {
    code: 'GB',
    name: { en: 'United Kingdom', sn: 'United Kingdom', tr: 'Birleşik Krallık', fr: 'Royaume-Uni' },
    summary: {
      en: 'World-famous universities and master’s degrees that take just one year.',
      sn: 'Mayunivhesiti anozivikanwa pasi rose, uye madhigirii eMasters anotora gore rimwe chete.',
      tr: 'Dünyaca ünlü üniversiteler ve yalnızca bir yıl süren yüksek lisans programları.',
      fr: 'Des universités de renommée mondiale et des masters en un an seulement.',
    },
  },
  {
    code: 'CA',
    name: { en: 'Canada', sn: 'Canada', tr: 'Kanada', fr: 'Canada' },
    summary: {
      en: 'High-quality universities and colleges in a welcoming, multicultural country.',
      sn: 'Mayunivhesiti nemakoreji emhando yepamusoro munyika inogamuchira vanhu vemarudzi ese.',
      tr: 'Sıcak ve çok kültürlü bir ülkede kaliteli üniversiteler ve kolejler.',
      fr: 'Des universités et collèges de qualité dans un pays accueillant et multiculturel.',
    },
  },
  {
    code: 'AU',
    name: { en: 'Australia', sn: 'Australia', tr: 'Avustralya', fr: 'Australie' },
    summary: {
      en: 'Top-ranked universities, a great climate and the chance to work part-time while you study.',
      sn: 'Mayunivhesiti epamusoro, mamiriro ekunze akanaka, uye mukana wekushanda nguva shoma uchidzidza.',
      tr: 'Üst sıralardaki üniversiteler, güzel bir iklim ve okurken yarı zamanlı çalışma imkânı.',
      fr: 'Des universités parmi les mieux classées, un climat agréable et la possibilité de travailler à temps partiel.',
    },
  },
  {
    code: 'DE',
    name: { en: 'Germany', sn: 'Germany', tr: 'Almanya', fr: 'Allemagne' },
    summary: {
      en: 'Little or no tuition at most public universities, and strong in engineering and science.',
      sn: 'Mari yechikoro shoma kana isipo pamayunivhesiti mazhinji ehurumende, uye inozivikanwa neinjiniya nesainzi.',
      tr: 'Devlet üniversitelerinin çoğunda düşük ya da hiç olmayan eğitim ücreti; mühendislik ve bilimde güçlü.',
      fr: 'Peu ou pas de frais de scolarité dans la plupart des universités publiques, et une référence en ingénierie et en sciences.',
    },
  },
]

/** Homepage sections, in display order. Staff can hide or reorder them in the CMS. */
export const sectionKeys = ['partners', 'services', 'destinations', 'turkiye', 'about', 'stories', 'contact'] as const
export type SectionKey = (typeof sectionKeys)[number]

/**
 * Takes the saved section order and adds any section the site has gained since it was saved
 * (e.g. "destinations"), in its default position. Unknown keys are dropped.
 */
export function normalizeSections(saved: { key: string; visible: boolean }[] | undefined): { key: SectionKey; visible: boolean }[] {
  const known = (saved ?? []).filter((s): s is { key: SectionKey; visible: boolean } => (sectionKeys as readonly string[]).includes(s.key))
  if (!known.length) return sectionKeys.map((key) => ({ key, visible: true }))
  const out = [...known]
  sectionKeys.forEach((key, i) => {
    if (out.some((s) => s.key === key)) return
    // Insert after the section that comes before it by default.
    const before = sectionKeys.slice(0, i).reverse().find((k) => out.some((s) => s.key === k))
    const at = before ? out.findIndex((s) => s.key === before) + 1 : 0
    out.splice(at, 0, { key, visible: true })
  })
  return out
}
