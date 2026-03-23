import { Category } from "../backend";

export interface OfflineShayari {
  id: bigint;
  text: string;
  author: string;
  category: Category;
  likes: bigint;
  createdAt: bigint;
}

export const offlineShayari: OfflineShayari[] = [
  // ❤️ LOVE
  {
    id: 1n,
    text: "तेरी आँखों में खो जाता हूँ मैं,\nजब भी देखता हूँ तेरा चेहरा,\nदिल की हर धड़कन कहती है,\nतू ही है मेरा पहला और आखिरी।",
    author: "मिर्ज़ा ग़ालिब",
    category: Category.love,
    likes: 847n,
    createdAt: 0n,
  },
  {
    id: 2n,
    text: "मोहब्बत में तेरी डूब गया हूँ,\nतेरे बिन अधूरा लगता हूँ,\nजब तू मुस्कुराती है यूँ,\nजन्नत से भी खूबसूरत लगता हूँ।",
    author: "राहत इन्दौरी",
    category: Category.love,
    likes: 723n,
    createdAt: 0n,
  },
  {
    id: 3n,
    text: "तेरे नाम की खुशबू आती है,\nहर सांस में तू समाई है,\nइश्क़ का यह मौसम नया है,\nतेरी यादों में मैंने दुनिया पाई है।",
    author: "जावेद अख्तर",
    category: Category.love,
    likes: 692n,
    createdAt: 0n,
  },
  {
    id: 4n,
    text: "प्यार की इस राह में चलते हैं,\nतेरे संग हर पल पलते हैं,\nचाँद सितारे गवाह हैं इस बात के,\nतेरे बिन हम अधूरे रहते हैं।",
    author: "गुलज़ार",
    category: Category.love,
    likes: 581n,
    createdAt: 0n,
  },
  {
    id: 5n,
    text: "तेरी एक नज़र ने दिल चुरा लिया,\nहर ख्वाब में तेरा नाम लिखा लिया,\nमोहब्बत क्या होती है पूछते हो,\nतुझे देखते ही समझ आ गया।",
    author: "बशीर बद्र",
    category: Category.love,
    likes: 634n,
    createdAt: 0n,
  },
  {
    id: 6n,
    text: "तेरी यादें रात को सताती हैं,\nदिन में भी चैन नहीं आता,\nइश्क़ में डूबा बैठा हूँ,\nतेरे सिवा कुछ न आता।",
    author: "फ़िराक़ गोरखपुरी",
    category: Category.love,
    likes: 498n,
    createdAt: 0n,
  },
  // 💔 SAD
  {
    id: 7n,
    text: "दर्द को लफ़्जों में बयाँ क्या करें,\nजो बात दिल में है वो ज़बाँ क्या करें,\nरो लेते हैं चुपके से अँधेरे में,\nआँसू छुपाकर यह ज़माना क्या करें।",
    author: "मिर्ज़ा ग़ालिब",
    category: Category.sad,
    likes: 912n,
    createdAt: 0n,
  },
  {
    id: 8n,
    text: "टूटे दिल की यह कहानी है,\nहर ख़ुशी बस एक निशानी है,\nजो बिछड़ गए वो याद आते हैं,\nतन्हाई भी अजनबी मेहमानी है।",
    author: "राहत इन्दौरी",
    category: Category.sad,
    likes: 756n,
    createdAt: 0n,
  },
  {
    id: 9n,
    text: "रात बहुत लम्बी होती है,\nजब यादें साथ होती हैं,\nनींद नहीं आती आँखों को,\nजब आँखें नम होती हैं।",
    author: "साहिर लुधियानवी",
    category: Category.sad,
    likes: 645n,
    createdAt: 0n,
  },
  {
    id: 10n,
    text: "खामोशी भी बोलती है कभी कभी,\nदर्द की अपनी ज़बान होती है,\nजो टूट जाते हैं मोहब्बत में,\nउनकी अलग पहचान होती है।",
    author: "बशीर बद्र",
    category: Category.sad,
    likes: 589n,
    createdAt: 0n,
  },
  {
    id: 11n,
    text: "वो चले गए छोड़कर यादें,\nदिल में बाकी रह गए इरादे,\nज़िन्दगी का यह सफ़र कठिन है,\nपर चलते रहेंगे बिना वादे।",
    author: "जावेद अख्तर",
    category: Category.sad,
    likes: 478n,
    createdAt: 0n,
  },
  {
    id: 12n,
    text: "बिछड़ने का दर्द सहते हैं हम,\nतन्हा राहों पर चलते हैं हम,\nमुस्कुराहट के पीछे छुपाते हैं,\nकितने ज़ख्म दिल में पालते हैं हम।",
    author: "गुलज़ार",
    category: Category.sad,
    likes: 534n,
    createdAt: 0n,
  },
  // 😎 ATTITUDE
  {
    id: 13n,
    text: "मेरी औकात मत आँको तुम,\nमैं वो आग हूँ जो शोला बनती है,\nजो समझे नहीं मेरी क़ीमत को,\nउनकी किस्मत ही बर्बाद होती है।",
    author: "हसरत मोहानी",
    category: Category.attitude,
    likes: 1024n,
    createdAt: 0n,
  },
  {
    id: 14n,
    text: "मुझे कम मत आँको ज़माने वालों,\nमैं वो तूफ़ान हूँ जो चुप रहता है,\nजब उठता हूँ तो सब देखते हैं,\nमेरा जलाल सबसे अलग रहता है।",
    author: "राहत इन्दौरी",
    category: Category.attitude,
    likes: 987n,
    createdAt: 0n,
  },
  {
    id: 15n,
    text: "शेर हूँ मैं जंगल का,\nकिसी के आगे झुकता नहीं,\nराह खुद बनाता हूँ अपनी,\nभीड़ के पीछे चलता नहीं।",
    author: "अकबर इलाहाबादी",
    category: Category.attitude,
    likes: 876n,
    createdAt: 0n,
  },
  {
    id: 16n,
    text: "मेरी ख़ामोशी को कमज़ोरी मत समझो,\nसमुन्दर भी शान्त होकर गहरा होता है,\nजब बोलता हूँ तो दुनिया सुनती है,\nहर लफ़्ज़ मेरा एक शोला होता है।",
    author: "बशीर बद्र",
    category: Category.attitude,
    likes: 812n,
    createdAt: 0n,
  },
  {
    id: 17n,
    text: "नज़रें झुकाकर चलना नहीं आता,\nकभी किसी से डरना नहीं आता,\nमैं वो हूँ जो टूटकर भी जुड़ता है,\nहार मानकर मरना नहीं आता।",
    author: "इक़बाल",
    category: Category.attitude,
    likes: 743n,
    createdAt: 0n,
  },
  {
    id: 18n,
    text: "अपनी धुन में जीता हूँ मैं,\nदुनिया की परवाह नहीं करता,\nजो सोचते हैं मुझे समझ लिया,\nउन्हें देखकर मैं हँसता हूँ।",
    author: "मिर्ज़ा ग़ालिब",
    category: Category.attitude,
    likes: 698n,
    createdAt: 0n,
  },
  // 🤝 FRIENDSHIP
  {
    id: 19n,
    text: "यारी है तो दुनिया है,\nदोस्त बिन सूना सफ़र है,\nहँसी-ख़ुशी के हर पल में,\nदोस्ती ही असली ज़ेवर है।",
    author: "साहिर लुधियानवी",
    category: Category.friendship,
    likes: 678n,
    createdAt: 0n,
  },
  {
    id: 20n,
    text: "दोस्त वो होता है जो,\nगिरने पर हाथ थामे,\nरास्ते अँधेरे हों तो,\nरोशनी बनकर आए।",
    author: "गुलज़ार",
    category: Category.friendship,
    likes: 623n,
    createdAt: 0n,
  },
  {
    id: 21n,
    text: "यारों का साथ हो तो,\nहर मुश्किल आसान लगे,\nहँसते-हँसाते रहो,\nज़िन्दगी गुलज़ार लगे।",
    author: "जावेद अख्तर",
    category: Category.friendship,
    likes: 567n,
    createdAt: 0n,
  },
  {
    id: 22n,
    text: "दोस्ती की इस रिश्ते को,\nकभी न टूटने देना,\nज़िन्दगी की राहों में,\nकभी न छूटने देना।",
    author: "राहत इन्दौरी",
    category: Category.friendship,
    likes: 512n,
    createdAt: 0n,
  },
  {
    id: 23n,
    text: "असली दोस्त वो है यार,\nजो सच बोले सीधे मुँह पर,\nबुरे वक़्त में साथ दे,\nचाहे लगे कितना भी कड़वा।",
    author: "अकबर इलाहाबादी",
    category: Category.friendship,
    likes: 489n,
    createdAt: 0n,
  },
  {
    id: 24n,
    text: "दोस्ती का यह बंधन है,\nदिलों का यह मिलन है,\nदूर रहें या पास रहें,\nयह रिश्ता अनमोल धन है।",
    author: "बशीर बद्र",
    category: Category.friendship,
    likes: 445n,
    createdAt: 0n,
  },
  // 🔥 MOTIVATIONAL
  {
    id: 25n,
    text: "उठो, जागो और मत रुको तब तक,\nजब तक मंज़िल न मिल जाए,\nहर गिरना सीखने का मौका है,\nहर तूफ़ान से गुज़रना पड़ता है।",
    author: "इक़बाल",
    category: Category.motivational,
    likes: 1156n,
    createdAt: 0n,
  },
  {
    id: 26n,
    text: "हिम्मत रख, हार मत माना,\nज़िन्दगी में संघर्ष ज़रूरी है,\nजो टूटकर भी खड़े रहते हैं,\nउनकी जीत निश्चित और ज़रूरी है।",
    author: "हसरत मोहानी",
    category: Category.motivational,
    likes: 1034n,
    createdAt: 0n,
  },
  {
    id: 27n,
    text: "सपने वो नहीं जो सोते में आएँ,\nसपने वो हैं जो सोने न दें,\nमेहनत कर, लगन लगा,\nकामयाबी खुद पास आए।",
    author: "राहत इन्दौरी",
    category: Category.motivational,
    likes: 978n,
    createdAt: 0n,
  },
  {
    id: 28n,
    text: "रास्ते कठिन हैं तो क्या,\nमंज़िलें मिलती हैं लड़ने वालों को,\nनाकामी एक सबक है,\nज़िन्दगी मिलती है जीने वालों को।",
    author: "जावेद अख्तर",
    category: Category.motivational,
    likes: 867n,
    createdAt: 0n,
  },
  {
    id: 29n,
    text: "आसमान को छूना है तो,\nज़मीन पर कदम मज़बूत रखो,\nहर मुश्किल एक परीक्षा है,\nहौसला हमेशा बुलंद रखो।",
    author: "साहिर लुधियानवी",
    category: Category.motivational,
    likes: 798n,
    createdAt: 0n,
  },
  {
    id: 30n,
    text: "कोशिश करने वालों की हार नहीं होती,\nलहरों से डरकर नौका नहीं होती,\nमेहनत करो, लगन लगाओ,\nमंज़िल पाने की राह भटकती नहीं होती।",
    author: "सोहनलाल द्विवेदी",
    category: Category.motivational,
    likes: 1289n,
    createdAt: 0n,
  },
];

export const CATEGORY_META: Record<
  string,
  { label: string; emoji: string; color: string }
> = {
  [Category.love]: {
    label: "Love",
    emoji: "❤️",
    color: "from-pink-600/30 to-rose-900/20 border-pink-500/30",
  },
  [Category.sad]: {
    label: "Sad",
    emoji: "💔",
    color: "from-blue-600/30 to-indigo-900/20 border-blue-500/30",
  },
  [Category.attitude]: {
    label: "Attitude",
    emoji: "😎",
    color: "from-purple-600/30 to-violet-900/20 border-purple-500/30",
  },
  [Category.friendship]: {
    label: "Friendship",
    emoji: "🤝",
    color: "from-green-600/30 to-emerald-900/20 border-green-500/30",
  },
  [Category.motivational]: {
    label: "Motivational",
    emoji: "🔥",
    color: "from-orange-600/30 to-amber-900/20 border-orange-500/30",
  },
};
