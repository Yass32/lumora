import type { Locale } from '@/lib/i18n'

/**
 * Fixed website text (navigation, hero, buttons, form labels).
 * This text is not edited in the CMS — change it here.
 *
 * Shona (sn): written with care and checked against Shona sources,
 * but please have a native Shona speaker read it once before launch.
 */
const en = {
  meta: {
    title: 'Lumora Global Education — Study in Türkiye from Zimbabwe',
    description:
      'Lumora Global Education guides Zimbabwean students through every step of studying in Türkiye: university selection, applications, scholarships, visas, airport pickup, accommodation and settling in.',
  },
  topbar: { zimbabwe: 'Zimbabwe', turkiye: 'Türkiye', language: 'Language' },
  nav: {
    services: 'Services',
    journey: 'Your journey',
    turkiye: 'Why Türkiye',
    about: 'About us',
    stories: 'Student stories',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close menu',
  },
  cta: {
    book: 'Book a free consultation',
    whatsapp: 'Chat on WhatsApp',
    whatsappMessage: "Hi Lumora, I'm interested in studying in Türkiye.",
    whatsappFloat: 'Chat with Lumora on WhatsApp',
  },
  hero: {
    eyebrow: 'Study in Türkiye from Zimbabwe',
    titleStart: 'Your future in Türkiye, guided from',
    titleEmphasis: 'application to arrival.',
    intro:
      "We help students choose the right university, apply, secure scholarships and visas — then meet you at the airport and stay with you until you're settled in.",
    trust: ['Free first consultation', 'Support in 4 languages', 'On the ground in Türkiye'],
    badgeLabel: 'Now enrolling',
    badgeTitle: 'Fall & Spring intakes',
    badgeText: 'Start your application today',
    imageAlt: 'Istanbul at sunset: a mosque skyline and the Bosphorus Bridge over the water',
  },
  partners: { title: 'Our partner universities in Türkiye' },
  services: {
    eyebrow: 'Our services',
    title: 'One team, every step of the way',
    intro:
      "Most agencies stop at the visa. We stay with you from your first question in Zimbabwe until you're registered, housed and settled in Türkiye.",
    stage: 'Stage',
    stages: ['Before you leave', 'When you arrive', 'Settling in & beyond'],
  },
  about: { team: 'Our team' },
  stories: { eyebrow: 'Student stories', title: 'From Zimbabwe to Istanbul' },
  contact: {
    eyebrow: 'Book a free consultation',
    title: "Let's plan your studies in Türkiye",
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
    level: 'Level of study',
    levels: ["Bachelor's degree", "Master's degree", 'PhD', 'Turkish language / foundation year'],
    programme: 'Programme of interest',
    programmePlaceholder: 'e.g. Medicine, Engineering',
    intake: 'Preferred intake',
    intakes: ['Fall (September)', 'Spring (February)', 'Not sure yet'],
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
    title: 'Lumora Global Education — Dzidza kuTürkiye uchibva kuZimbabwe',
    description:
      'Lumora Global Education inotungamirira vadzidzi vekuZimbabwe nhanho imwe neimwe pakudzidza kuTürkiye: kusarudza yunivhesiti, kunyorera, rubatsiro rwemari yechikoro, vhiza, kuchingamidzwa panhandare yendege, pekugara nekugadzikana.',
  },
  topbar: { zimbabwe: 'Zimbabwe', turkiye: 'Türkiye', language: 'Mutauro' },
  nav: {
    services: 'Mabasa edu',
    journey: 'Rwendo rwako',
    turkiye: 'Sei Türkiye',
    about: 'Nezvedu',
    stories: 'Nyaya dzevadzidzi',
    contact: 'Bata nesu',
    menu: 'Menyu',
    close: 'Vhara menyu',
  },
  cta: {
    book: 'Kumbira zano remahara',
    whatsapp: 'Taura nesu paWhatsApp',
    whatsappMessage: 'Mhoro Lumora, ndinoda kudzidza kuTürkiye.',
    whatsappFloat: 'Taura neLumora paWhatsApp',
  },
  hero: {
    eyebrow: 'Dzidza kuTürkiye uchibva kuZimbabwe',
    titleStart: 'Ramangwana rako kuTürkiye, tichikutungamirira',
    titleEmphasis: 'kubva pakunyorera kusvikira wasvika.',
    intro:
      'Tinokubatsira kusarudza yunivhesiti yakakodzera, kunyorera, kuwana rubatsiro rwemari yechikoro nevhiza — tozokuchingamidza panhandare yendege uye tinoramba tiri newe kusvikira wagadzikana.',
    trust: ['Zano rekutanga nemahara', 'Rubatsiro mumitauro mina', 'Tiri kuTürkiye chaiko'],
    badgeLabel: 'Tava kugamuchira',
    badgeTitle: 'Gunyana neKukadzi',
    badgeText: 'Tanga kunyorera nhasi',
    imageAlt: 'Istanbul manheru: mamosque nebhiriji reBosphorus pamusoro pemvura',
  },
  partners: { title: 'Mayunivhesiti atinoshanda nawo kuTürkiye' },
  services: {
    eyebrow: 'Mabasa edu',
    title: 'Chikwata chimwe, nhanho imwe neimwe',
    intro:
      'Vazhinji vanomira pavhiza. Isu tinoramba tiri newe kubva pamubvunzo wako wekutanga muZimbabwe kusvikira wanyoreswa kuyunivhesiti, wawana pekugara uye wagadzikana kuTürkiye.',
    stage: 'Nhanho',
    stages: ['Usati waenda', 'Paunosvika', 'Kugadzikana nezvimwe'],
  },
  about: { team: 'Chikwata chedu' },
  stories: { eyebrow: 'Nyaya dzevadzidzi', title: 'Kubva kuZimbabwe kusvika kuyunivhesiti' },
  contact: {
    eyebrow: 'Kumbira zano remahara',
    title: 'Ngatironge zvidzidzo zvako kuTürkiye',
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
    level: 'Danho rezvidzidzo',
    levels: ['Dhigirii rekutanga (Bachelor’s)', 'Masters', 'PhD', 'ChiTurkey / gore rekugadzirira'],
    programme: 'Chidzidzo chaunoda',
    programmePlaceholder: 'semuenzaniso Medicine, Engineering',
    intake: 'Paunoda kutanga',
    intakes: ['Gunyana (Fall)', 'Kukadzi (Spring)', 'Handisati ndaziva'],
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
    title: "Lumora Global Education — Zimbabve'den Türkiye'de eğitim",
    description:
      "Lumora Global Education, Zimbabveli öğrencilere Türkiye'de eğitimin her adımında rehberlik eder: üniversite seçimi, başvuru, burs, vize, havalimanı karşılama, konaklama ve uyum.",
  },
  topbar: { zimbabwe: 'Zimbabve', turkiye: 'Türkiye', language: 'Dil' },
  nav: {
    services: 'Hizmetler',
    journey: 'Yolculuğunuz',
    turkiye: 'Neden Türkiye',
    about: 'Hakkımızda',
    stories: 'Öğrenci hikâyeleri',
    contact: 'İletişim',
    menu: 'Menü',
    close: 'Menüyü kapat',
  },
  cta: {
    book: 'Ücretsiz danışmanlık alın',
    whatsapp: "WhatsApp'tan yazın",
    whatsappMessage: "Merhaba Lumora, Türkiye'de okumak istiyorum.",
    whatsappFloat: "Lumora'ya WhatsApp'tan yazın",
  },
  hero: {
    eyebrow: "Zimbabve'den Türkiye'de eğitim",
    titleStart: "Türkiye'deki geleceğiniz:",
    titleEmphasis: 'başvurudan varışa kadar yanınızdayız.',
    intro:
      'Doğru üniversiteyi seçmenize, başvurmanıza, burs ve vize almanıza yardımcı oluyoruz; sonra sizi havalimanında karşılıyor ve yerleşene kadar yanınızda oluyoruz.',
    trust: ['İlk danışmanlık ücretsiz', '4 dilde destek', "Türkiye'de yanınızdayız"],
    badgeLabel: 'Kayıtlar açık',
    badgeTitle: 'Güz ve Bahar dönemleri',
    badgeText: 'Başvurunuzu bugün başlatın',
    imageAlt: 'Gün batımında İstanbul: cami silueti ve Boğaz Köprüsü',
  },
  partners: { title: "Türkiye'deki partner üniversitelerimiz" },
  services: {
    eyebrow: 'Hizmetlerimiz',
    title: 'Her adımda tek bir ekip',
    intro:
      "Çoğu danışmanlık vizede durur. Biz Zimbabve'deki ilk sorunuzdan, Türkiye'de kaydınız yapılıp yerleşene kadar yanınızdayız.",
    stage: 'Aşama',
    stages: ['Yola çıkmadan önce', 'Vardığınızda', 'Yerleşme ve sonrası'],
  },
  about: { team: 'Ekibimiz' },
  stories: { eyebrow: 'Öğrenci hikâyeleri', title: "Zimbabve'den kampüse" },
  contact: {
    eyebrow: 'Ücretsiz danışmanlık',
    title: "Türkiye'deki eğitiminizi birlikte planlayalım",
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
    level: 'Eğitim seviyesi',
    levels: ['Lisans', 'Yüksek lisans', 'Doktora', 'Türkçe hazırlık'],
    programme: 'İlgilendiğiniz bölüm',
    programmePlaceholder: 'örn. Tıp, Mühendislik',
    intake: 'Tercih edilen dönem',
    intakes: ['Güz (Eylül)', 'Bahar (Şubat)', 'Henüz emin değilim'],
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
    title: 'Lumora Global Education — Étudier en Turquie depuis le Zimbabwe',
    description:
      "Lumora Global Education accompagne les étudiants zimbabwéens à chaque étape de leurs études en Turquie : choix de l'université, candidatures, bourses, visa, accueil à l'aéroport, logement et installation.",
  },
  topbar: { zimbabwe: 'Zimbabwe', turkiye: 'Turquie', language: 'Langue' },
  nav: {
    services: 'Services',
    journey: 'Votre parcours',
    turkiye: 'Pourquoi la Turquie',
    about: 'À propos',
    stories: 'Témoignages',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Fermer le menu',
  },
  cta: {
    book: 'Réserver une consultation gratuite',
    whatsapp: 'Discuter sur WhatsApp',
    whatsappMessage: 'Bonjour Lumora, je souhaite étudier en Turquie.',
    whatsappFloat: 'Écrire à Lumora sur WhatsApp',
  },
  hero: {
    eyebrow: 'Étudier en Turquie depuis le Zimbabwe',
    titleStart: 'Votre avenir en Turquie, accompagné',
    titleEmphasis: "de la candidature à l'arrivée.",
    intro:
      "Nous vous aidons à choisir la bonne université, à postuler, à obtenir bourses et visa — puis nous vous accueillons à l'aéroport et restons à vos côtés jusqu'à votre installation.",
    trust: ['Première consultation gratuite', 'Accompagnement en 4 langues', 'Présents sur place en Turquie'],
    badgeLabel: 'Inscriptions ouvertes',
    badgeTitle: 'Rentrées d’automne et de printemps',
    badgeText: 'Commencez votre candidature dès aujourd’hui',
    imageAlt: 'Istanbul au coucher du soleil : mosquée et pont du Bosphore',
  },
  partners: { title: 'Nos universités partenaires en Turquie' },
  services: {
    eyebrow: 'Nos services',
    title: 'Une seule équipe, à chaque étape',
    intro:
      "La plupart des agences s'arrêtent au visa. Nous vous accompagnons de votre première question au Zimbabwe jusqu'à votre inscription, votre logement et votre installation en Turquie.",
    stage: 'Étape',
    stages: ['Avant le départ', 'À votre arrivée', 'Installation et au-delà'],
  },
  about: { team: 'Notre équipe' },
  stories: { eyebrow: 'Témoignages', title: 'Du Zimbabwe au campus' },
  contact: {
    eyebrow: 'Consultation gratuite',
    title: 'Préparons vos études en Turquie',
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
    level: "Niveau d'études",
    levels: ['Licence', 'Master', 'Doctorat', 'Langue turque / année préparatoire'],
    programme: 'Programme souhaité',
    programmePlaceholder: 'ex. Médecine, Ingénierie',
    intake: 'Rentrée souhaitée',
    intakes: ['Automne (septembre)', 'Printemps (février)', 'Pas encore décidé'],
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
