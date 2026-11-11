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

export const defaultWhyTurkiye: WhyTurkiyeContent = {
  eyebrow: { en: 'Why study in Türkiye', sn: 'Sei uchidzidza kuTürkiye', tr: "Neden Türkiye'de eğitim", fr: 'Pourquoi étudier en Turquie' },
  heading: {
    en: 'A world-class education where Europe meets Asia',
    sn: 'Dzidzo yepamusoro-soro panosangana Europe neAsia',
    tr: "Avrupa ile Asya'nın buluştuğu yerde dünya standartlarında eğitim",
    fr: "Une formation de niveau mondial, là où l'Europe rencontre l'Asie",
  },
  body: {
    en: 'Türkiye gives Zimbabwean students a quality international degree at a cost families can plan for. You get modern campuses, English-taught programmes and a safe, welcoming place to grow, with Lumora beside you the whole way.',
    sn: 'Türkiye inopa vadzidzi vekuZimbabwe dhigirii rinozivikanwa pasi rose, pamutengo unogoneka nemhuri. Unowana mayunivhesiti emazuva ano, zvidzidzo zvinodzidziswa muChirungu, nenzvimbo yakachengeteka inogamuchira vaenzi. Uye Lumora inenge iri newe nguva dzose.',
    tr: 'Türkiye, Zimbabveli öğrencilere ailelerin planlayabileceği bir maliyetle uluslararası geçerli, kaliteli bir diploma sunar. Modern kampüsler, İngilizce programlar ve güvenli, misafirperver bir ortam sizi bekliyor; Lumora da her adımda yanınızda.',
    fr: 'La Turquie offre aux étudiants zimbabwéens un diplôme international de qualité, à un coût que les familles peuvent anticiper. Campus modernes, programmes en anglais, cadre sûr et accueillant : et Lumora à vos côtés à chaque étape.',
  },
  points: [
    {
      title: { en: 'Recognised degrees', sn: 'Madhigirii anozivikanwa', tr: 'Tanınan diplomalar', fr: 'Diplômes reconnus' },
      text: {
        en: 'Universities that follow the Bologna Process, so your degree is recognised across Europe.',
        sn: 'Mayunivhesiti anotevera Bologna Process, saka dhigirii rako rinozivikanwa muEurope yose.',
        tr: "Bologna Süreci'ne dahil üniversiteler; diplomanız Avrupa genelinde tanınır.",
        fr: 'Des universités intégrées au processus de Bologne : votre diplôme est reconnu dans toute l’Europe.',
      },
    },
    {
      title: { en: 'English-taught programmes', sn: 'Zvidzidzo muChirungu', tr: 'İngilizce programlar', fr: 'Programmes en anglais' },
      text: {
        en: 'Many programmes are taught in English, and you can also learn Turkish.',
        sn: 'Zvidzidzo zvakawanda zvinodzidziswa muChirungu, uye unogona kudzidzawo ChiTurkey.',
        tr: 'Pek çok program İngilizce; dilerseniz Türkçe de öğrenebilirsiniz.',
        fr: 'De nombreux programmes sont enseignés en anglais, et vous pouvez aussi apprendre le turc.',
      },
    },
    {
      title: { en: 'Affordable tuition & living', sn: 'Mari inogoneka', tr: 'Uygun eğitim ve yaşam maliyeti', fr: 'Études et vie abordables' },
      text: {
        en: 'Costs are often lower than in the UK, Europe or North America, and scholarships are available.',
        sn: 'Mari yechikoro neyekurarama inowanzova pasi pane yekuUK, Europe kana North America, uye kune rubatsiro rwemari.',
        tr: 'Masraflar çoğu zaman İngiltere, Avrupa veya Kuzey Amerika’dan düşüktür; burs imkânları da vardır.',
        fr: 'Les coûts sont souvent inférieurs à ceux du Royaume-Uni, de l’Europe ou de l’Amérique du Nord, et des bourses existent.',
      },
    },
    {
      title: { en: 'A welcoming student life', sn: 'Upenyu hwevadzidzi hunogamuchira', tr: 'Sıcak bir öğrenci hayatı', fr: 'Une vie étudiante accueillante' },
      text: {
        en: 'Big international student communities, rich culture, and regular flights back to Zimbabwe.',
        sn: 'Nharaunda huru dzevadzidzi vekunze, tsika dzakapfuma, uye ndege dzinogara dzichienda kuZimbabwe.',
        tr: "Geniş uluslararası öğrenci toplulukları, zengin kültür ve Zimbabve'ye düzenli uçuşlar.",
        fr: 'De grandes communautés d’étudiants internationaux, une culture riche et des vols réguliers vers le Zimbabwe.',
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

/** Homepage sections, in display order. Staff can hide or reorder them in the CMS. */
export const sectionKeys = ['partners', 'services', 'turkiye', 'about', 'stories', 'contact'] as const
export type SectionKey = (typeof sectionKeys)[number]
