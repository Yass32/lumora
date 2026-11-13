import type { Locale } from '@/lib/i18n'

/**
 * Fixed website text (navigation, hero, buttons, form labels).
 * This text is not edited in the CMS — change it here.
 * `{country}` is replaced with a destination's name.
 *
 * Shona (sn): written with care and checked against Shona sources,
 * but please have a native Shona speaker read it once before launch.
 */
const en = {
  meta: {
    title: 'Lumora Global Education — Study abroad from Zimbabwe',
    description:
      'Lumora Global Education guides Zimbabwean students through every step of studying in Türkiye, Poland, Belarus, Lithuania, the UK, Canada, Australia and Germany: university selection, applications, scholarships, visas, airport pickup, accommodation and settling in.',
  },
  topbar: { zimbabwe: 'Zimbabwe', turkiye: 'Türkiye', language: 'Language' },
  nav: {
    services: 'Services',
    destinations: 'Destinations',
    journey: 'Your journey',
    turkiye: 'Why study abroad',
    about: 'About us',
    stories: 'Student stories',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close menu',
  },
  cta: {
    book: 'Book a free consultation',
    whatsapp: 'Chat on WhatsApp',
    whatsappMessage: "Hi Lumora, I'm interested in studying abroad.",
    askAboutMessage: "Hi Lumora, I'm interested in studying in {country}.",
    whatsappFloat: 'Chat with Lumora on WhatsApp',
  },
  hero: {
    eyebrow: 'Study abroad from Zimbabwe',
    titleStart: 'Your future abroad, guided from',
    titleEmphasis: 'application to arrival.',
    intro:
      "We help students choose the right country and university, apply, secure scholarships and visas — then meet you at the airport and stay with you until you're settled in.",
    trust: ['Free first consultation', '8 study destinations', 'Support in 4 languages'],
    badgeLabel: 'Now enrolling',
    badgeTitle: '8 countries, one team',
    badgeText: 'Start your application today',
    imageAlt: 'Istanbul at sunset: a mosque skyline and the Bosphorus Bridge over the water',
  },
  partners: { title: 'Our partner universities' },
  services: {
    eyebrow: 'Our services',
    title: 'One team, every step of the way',
    intro:
      "Most agencies stop at the visa. We stay with you from your first question in Zimbabwe until you're registered, housed and settled in your new country.",
    stage: 'Stage',
    stages: ['Before you leave', 'When you arrive', 'Settling in & beyond'],
  },
  destinations: {
    eyebrow: 'Where you can study',
    title: 'Eight countries, one trusted team',
    intro: "Not sure where to go? We'll help you compare costs, programmes and visa requirements, and choose what fits you best.",
    ask: 'Ask about {country}',
  },
  about: { team: 'Our team' },
  stories: { eyebrow: 'Student stories', title: 'From Zimbabwe to campus' },
  contact: {
    eyebrow: 'Book a free consultation',
    title: "Let's plan your studies abroad",
    intro:
      "Tell us a little about yourself and we'll get back to you within one working day. Prefer to chat? Message us on WhatsApp.",
    whatsapp: 'WhatsApp',
    email: 'Email',
    office: 'Office',
  },
  form: {
    name: 'Full name',
    namePlaceholder: 'e.g. Tendai Moyo',
    phone: 'WhatsApp number',
    email: 'Email',
    destination: 'Preferred destination',
    notSure: 'Not sure yet — help me choose',
    level: 'Level of study',
    levels: ["Bachelor's degree", "Master's degree", 'PhD', 'Language / foundation year'],
    programme: 'Programme of interest',
    programmePlaceholder: 'e.g. Medicine, Engineering',
    intake: 'Preferred intake',
    intakes: ['September / autumn', 'January / February', 'Not sure yet'],
    message: 'Anything else we should know?',
    optional: '(optional)',
    privacy: "We'll only use your details to contact you about your studies.",
    submit: 'Request my free consultation',
    sending: 'Sending…',
    success: "Thank you! We've received your request and will contact you within one working day.",
    error: 'Something went wrong. Please try again or message us on WhatsApp.',
    required: 'Please fill in your name and WhatsApp number.',
  },
  footer: {
    explore: 'Explore',
    contact: 'Contact',
    follow: 'Follow us',
    rights: 'All rights reserved.',
    staff: 'Staff login',
  },
}

export type Dictionary = typeof en

const sn: Dictionary = {
  meta: {
    title: 'Lumora Global Education — Dzidza kunze kwenyika uchibva kuZimbabwe',
    description:
      'Lumora Global Education inotungamirira vadzidzi vekuZimbabwe nhanho imwe neimwe pakudzidza kuTürkiye, Poland, Belarus, Lithuania, UK, Canada, Australia neGermany: kusarudza yunivhesiti, kunyorera, rubatsiro rwemari yechikoro, vhiza, kuchingamidzwa panhandare yendege, pekugara nekugadzikana.',
  },
  topbar: { zimbabwe: 'Zimbabwe', turkiye: 'Türkiye', language: 'Mutauro' },
  nav: {
    services: 'Mabasa edu',
    destinations: 'Nyika',
    journey: 'Rwendo rwako',
    turkiye: 'Sei kunze kwenyika',
    about: 'Nezvedu',
    stories: 'Nyaya dzevadzidzi',
    contact: 'Bata nesu',
    menu: 'Menyu',
    close: 'Vhara menyu',
  },
  cta: {
    book: 'Kumbira zano remahara',
    whatsapp: 'Taura nesu paWhatsApp',
    whatsappMessage: 'Mhoro Lumora, ndinoda kudzidza kunze kwenyika.',
    askAboutMessage: 'Mhoro Lumora, ndinoda kudzidza ku{country}.',
    whatsappFloat: 'Taura neLumora paWhatsApp',
  },
  hero: {
    eyebrow: 'Dzidza kunze kwenyika uchibva kuZimbabwe',
    titleStart: 'Ramangwana rako kunze kwenyika, tichikutungamirira',
    titleEmphasis: 'kubva pakunyorera kusvikira wasvika.',
    intro:
      'Tinokubatsira kusarudza nyika neyunivhesiti zvakakodzera, kunyorera, kuwana rubatsiro rwemari yechikoro nevhiza — tozokuchingamidza panhandare yendege uye tinoramba tiri newe kusvikira wagadzikana.',
    trust: ['Zano rekutanga nemahara', 'Nyika sere dzekudzidzira', 'Rubatsiro mumitauro mina'],
    badgeLabel: 'Tava kugamuchira',
    badgeTitle: 'Nyika sere, chikwata chimwe',
    badgeText: 'Tanga kunyorera nhasi',
    imageAlt: 'Istanbul manheru: mamosque nebhiriji reBosphorus pamusoro pemvura',
  },
  partners: { title: 'Mayunivhesiti atinoshanda nawo' },
  services: {
    eyebrow: 'Mabasa edu',
    title: 'Chikwata chimwe, nhanho imwe neimwe',
    intro:
      'Vazhinji vanomira pavhiza. Isu tinoramba tiri newe kubva pamubvunzo wako wekutanga muZimbabwe kusvikira wanyoreswa kuyunivhesiti, wawana pekugara uye wagadzikana munyika yako itsva.',
    stage: 'Nhanho',
    stages: ['Usati waenda', 'Paunosvika', 'Kugadzikana nezvimwe'],
  },
  destinations: {
    eyebrow: 'Kwaunogona kudzidzira',
    title: 'Nyika sere, chikwata chimwe chakavimbika',
    intro: 'Hausati waziva kwekuenda? Tichakubatsira kuenzanisa mari, zvidzidzo nezvinodiwa nevhiza, uye kusarudza zvakakunakira.',
    ask: 'Bvunza nezve{country}',
  },
  about: { team: 'Chikwata chedu' },
  stories: { eyebrow: 'Nyaya dzevadzidzi', title: 'Kubva kuZimbabwe kusvika kuyunivhesiti' },
  contact: {
    eyebrow: 'Kumbira zano remahara',
    title: 'Ngatironge zvidzidzo zvako kunze kwenyika',
    intro:
      'Tiudze zvishoma nezvako, tichakupindura mukati mezuva rimwe chete rebasa. Unoda kutaura nesu? Titumire meseji paWhatsApp.',
    whatsapp: 'WhatsApp',
    email: 'Email',
    office: 'Hofisi',
  },
  form: {
    name: 'Zita rako rizere',
    namePlaceholder: 'semuenzaniso Tendai Moyo',
    phone: 'Nhamba yeWhatsApp',
    email: 'Email',
    destination: 'Nyika yaunoda',
    notSure: 'Handisati ndaziva — ndibatsirei kusarudza',
    level: 'Danho rezvidzidzo',
    levels: ['Dhigirii rekutanga (Bachelor’s)', 'Masters', 'PhD', 'Mutauro / gore rekugadzirira'],
    programme: 'Chidzidzo chaunoda',
    programmePlaceholder: 'semuenzaniso Medicine, Engineering',
    intake: 'Paunoda kutanga',
    intakes: ['Gunyana', 'Ndira / Kukadzi', 'Handisati ndaziva'],
    message: 'Pane chimwe chatinofanira kuziva here?',
    optional: '(hazvimanikidzwe)',
    privacy: 'Tichashandisa ruzivo rwako chete kuti tikubate nezvezvidzidzo zvako.',
    submit: 'Tumira chikumbiro',
    sending: 'Kutumira…',
    success: 'Tatenda! Tagamuchira chikumbiro chako, tichakubata mukati mezuva rimwe rebasa.',
    error: 'Pane chakanganisika. Edza zvakare kana kutitumira meseji paWhatsApp.',
    required: 'Ndapota nyora zita rako nenhamba yeWhatsApp.',
  },
  footer: {
    explore: 'Ongorora',
    contact: 'Bata nesu',
    follow: 'Titevere',
    rights: 'Kodzero dzese dzakachengetedzwa.',
    staff: 'Kupinda kwevashandi',
  },
}

const tr: Dictionary = {
  meta: {
    title: "Lumora Global Education — Zimbabve'den yurt dışında eğitim",
    description:
      "Lumora Global Education, Zimbabveli öğrencilere Türkiye, Polonya, Belarus, Litvanya, Birleşik Krallık, Kanada, Avustralya ve Almanya'da eğitimin her adımında rehberlik eder: üniversite seçimi, başvuru, burs, vize, havalimanı karşılama, konaklama ve uyum.",
  },
  topbar: { zimbabwe: 'Zimbabve', turkiye: 'Türkiye', language: 'Dil' },
  nav: {
    services: 'Hizmetler',
    destinations: 'Ülkeler',
    journey: 'Yolculuğunuz',
    turkiye: 'Neden yurt dışı',
    about: 'Hakkımızda',
    stories: 'Öğrenci hikâyeleri',
    contact: 'İletişim',
    menu: 'Menü',
    close: 'Menüyü kapat',
  },
  cta: {
    book: 'Ücretsiz danışmanlık alın',
    whatsapp: "WhatsApp'tan yazın",
    whatsappMessage: 'Merhaba Lumora, yurt dışında okumak istiyorum.',
    askAboutMessage: 'Merhaba Lumora, {country} hakkında bilgi almak istiyorum.',
    whatsappFloat: "Lumora'ya WhatsApp'tan yazın",
  },
  hero: {
    eyebrow: "Zimbabve'den yurt dışında eğitim",
    titleStart: 'Yurt dışındaki geleceğiniz:',
    titleEmphasis: 'başvurudan varışa kadar yanınızdayız.',
    intro:
      'Doğru ülkeyi ve üniversiteyi seçmenize, başvurmanıza, burs ve vize almanıza yardımcı oluyoruz; sonra sizi havalimanında karşılıyor ve yerleşene kadar yanınızda oluyoruz.',
    trust: ['İlk danışmanlık ücretsiz', '8 eğitim ülkesi', '4 dilde destek'],
    badgeLabel: 'Kayıtlar açık',
    badgeTitle: '8 ülke, tek ekip',
    badgeText: 'Başvurunuzu bugün başlatın',
    imageAlt: 'Gün batımında İstanbul: cami silueti ve Boğaz Köprüsü',
  },
  partners: { title: 'Partner üniversitelerimiz' },
  services: {
    eyebrow: 'Hizmetlerimiz',
    title: 'Her adımda tek bir ekip',
    intro:
      "Çoğu danışmanlık vizede durur. Biz Zimbabve'deki ilk sorunuzdan, yeni ülkenizde kaydınız yapılıp yerleşene kadar yanınızdayız.",
    stage: 'Aşama',
    stages: ['Yola çıkmadan önce', 'Vardığınızda', 'Yerleşme ve sonrası'],
  },
  destinations: {
    eyebrow: 'Nerede okuyabilirsiniz',
    title: 'Sekiz ülke, güvenilir tek ekip',
    intro: 'Nereye gideceğinizden emin değil misiniz? Maliyetleri, programları ve vize koşullarını karşılaştırmanıza ve size en uygun olanı seçmenize yardımcı oluruz.',
    ask: '{country} hakkında sorun',
  },
  about: { team: 'Ekibimiz' },
  stories: { eyebrow: 'Öğrenci hikâyeleri', title: "Zimbabve'den kampüse" },
  contact: {
    eyebrow: 'Ücretsiz danışmanlık',
    title: 'Yurt dışındaki eğitiminizi birlikte planlayalım',
    intro:
      "Bize kendinizden biraz bahsedin, bir iş günü içinde size dönelim. Yazışmayı mı tercih edersiniz? WhatsApp'tan mesaj atın.",
    whatsapp: 'WhatsApp',
    email: 'E-posta',
    office: 'Ofis',
  },
  form: {
    name: 'Ad soyad',
    namePlaceholder: 'örn. Tendai Moyo',
    phone: 'WhatsApp numarası',
    email: 'E-posta',
    destination: 'Tercih edilen ülke',
    notSure: 'Henüz emin değilim — seçmeme yardım edin',
    level: 'Eğitim seviyesi',
    levels: ['Lisans', 'Yüksek lisans', 'Doktora', 'Dil / hazırlık yılı'],
    programme: 'İlgilendiğiniz bölüm',
    programmePlaceholder: 'örn. Tıp, Mühendislik',
    intake: 'Tercih edilen dönem',
    intakes: ['Eylül / güz', 'Ocak / Şubat', 'Henüz emin değilim'],
    message: 'Bilmemiz gereken başka bir şey var mı?',
    optional: '(isteğe bağlı)',
    privacy: 'Bilgilerinizi yalnızca eğitiminizle ilgili sizinle iletişim kurmak için kullanırız.',
    submit: 'Ücretsiz danışmanlık talep et',
    sending: 'Gönderiliyor…',
    success: 'Teşekkürler! Talebinizi aldık, bir iş günü içinde sizinle iletişime geçeceğiz.',
    error: "Bir sorun oluştu. Lütfen tekrar deneyin veya WhatsApp'tan yazın.",
    required: 'Lütfen adınızı ve WhatsApp numaranızı girin.',
  },
  footer: {
    explore: 'Keşfet',
    contact: 'İletişim',
    follow: 'Bizi takip edin',
    rights: 'Tüm hakları saklıdır.',
    staff: 'Personel girişi',
  },
}

const fr: Dictionary = {
  meta: {
    title: 'Lumora Global Education — Étudier à l’étranger depuis le Zimbabwe',
    description:
      "Lumora Global Education accompagne les étudiants zimbabwéens à chaque étape de leurs études en Turquie, en Pologne, en Biélorussie, en Lituanie, au Royaume-Uni, au Canada, en Australie et en Allemagne : choix de l'université, candidatures, bourses, visa, accueil à l'aéroport, logement et installation.",
  },
  topbar: { zimbabwe: 'Zimbabwe', turkiye: 'Turquie', language: 'Langue' },
  nav: {
    services: 'Services',
    destinations: 'Destinations',
    journey: 'Votre parcours',
    turkiye: 'Pourquoi partir',
    about: 'À propos',
    stories: 'Témoignages',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Fermer le menu',
  },
  cta: {
    book: 'Réserver une consultation gratuite',
    whatsapp: 'Discuter sur WhatsApp',
    whatsappMessage: 'Bonjour Lumora, je souhaite étudier à l’étranger.',
    askAboutMessage: 'Bonjour Lumora, je m’intéresse aux études dans ce pays : {country}.',
    whatsappFloat: 'Écrire à Lumora sur WhatsApp',
  },
  hero: {
    eyebrow: 'Étudier à l’étranger depuis le Zimbabwe',
    titleStart: 'Votre avenir à l’étranger, accompagné',
    titleEmphasis: "de la candidature à l'arrivée.",
    intro:
      "Nous vous aidons à choisir le bon pays et la bonne université, à postuler, à obtenir bourses et visa — puis nous vous accueillons à l'aéroport et restons à vos côtés jusqu'à votre installation.",
    trust: ['Première consultation gratuite', '8 destinations d’études', 'Accompagnement en 4 langues'],
    badgeLabel: 'Inscriptions ouvertes',
    badgeTitle: '8 pays, une seule équipe',
    badgeText: 'Commencez votre candidature dès aujourd’hui',
    imageAlt: 'Istanbul au coucher du soleil : mosquée et pont du Bosphore',
  },
  partners: { title: 'Nos universités partenaires' },
  services: {
    eyebrow: 'Nos services',
    title: 'Une seule équipe, à chaque étape',
    intro:
      "La plupart des agences s'arrêtent au visa. Nous vous accompagnons de votre première question au Zimbabwe jusqu'à votre inscription, votre logement et votre installation dans votre nouveau pays.",
    stage: 'Étape',
    stages: ['Avant le départ', 'À votre arrivée', 'Installation et au-delà'],
  },
  destinations: {
    eyebrow: 'Où étudier',
    title: 'Huit pays, une équipe de confiance',
    intro: 'Vous hésitez ? Nous vous aidons à comparer les coûts, les programmes et les conditions de visa, et à choisir ce qui vous convient.',
    ask: 'Se renseigner : {country}',
  },
  about: { team: 'Notre équipe' },
  stories: { eyebrow: 'Témoignages', title: 'Du Zimbabwe au campus' },
  contact: {
    eyebrow: 'Consultation gratuite',
    title: 'Préparons vos études à l’étranger',
    intro:
      'Parlez-nous un peu de vous et nous vous répondrons sous un jour ouvré. Vous préférez discuter ? Écrivez-nous sur WhatsApp.',
    whatsapp: 'WhatsApp',
    email: 'E-mail',
    office: 'Bureau',
  },
  form: {
    name: 'Nom complet',
    namePlaceholder: 'ex. Tendai Moyo',
    phone: 'Numéro WhatsApp',
    email: 'E-mail',
    destination: 'Destination souhaitée',
    notSure: 'Pas encore décidé — aidez-moi à choisir',
    level: "Niveau d'études",
    levels: ['Licence', 'Master', 'Doctorat', 'Langue / année préparatoire'],
    programme: 'Programme souhaité',
    programmePlaceholder: 'ex. Médecine, Ingénierie',
    intake: 'Rentrée souhaitée',
    intakes: ['Septembre / automne', 'Janvier / février', 'Pas encore décidé'],
    message: 'Autre chose à nous dire ?',
    optional: '(facultatif)',
    privacy: 'Nous utilisons vos coordonnées uniquement pour vous contacter au sujet de vos études.',
    submit: 'Demander ma consultation gratuite',
    sending: 'Envoi…',
    success: 'Merci ! Nous avons bien reçu votre demande et vous contacterons sous un jour ouvré.',
    error: 'Une erreur s’est produite. Réessayez ou écrivez-nous sur WhatsApp.',
    required: 'Merci d’indiquer votre nom et votre numéro WhatsApp.',
  },
  footer: {
    explore: 'Explorer',
    contact: 'Contact',
    follow: 'Suivez-nous',
    rights: 'Tous droits réservés.',
    staff: 'Espace équipe',
  },
}

const dictionaries: Record<Locale, Dictionary> = { en, sn, tr, fr }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
