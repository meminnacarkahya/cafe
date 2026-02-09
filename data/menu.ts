export interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
  note?: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: "kahvalti",
    name: "Kahvaltı",
    items: [
      { name: "Veluna Gurmé Kahvaltı", price: "550,00 ₺", description: "Sınırsız çay eşliğinde, kişi başı" },
      { name: "Kahvaltı Tabağı", price: "400,00 ₺", description: "Fincan çay eşliğinde" },
    ],
    note: "Kahvaltımız en az 2 kişilik servis edilir. 0-6 yaş ücretsiz, 7-12 yaş 400 ₺",
  },
  {
    id: "extra-kahvalti",
    name: "Extra Kahvaltılıklar",
    items: [
      { name: "Izgara Hellim Peynir", price: "230,00 ₺" },
      { name: "Sosis Tava Soslu", price: "200,00 ₺" },
      { name: "Mıhlama", price: "250,00 ₺" },
      { name: "Sigara Böreği", price: "200,00 ₺" },
    ],
  },
  {
    id: "gozlemeler",
    name: "Gözlemeler",
    items: [
      { name: "Veluna Özel Gözleme (Kaşarlı, Kıymalı, Sebzeli)", price: "350,00 ₺" },
      { name: "Beyaz Peynirli", price: "260,00 ₺" },
      { name: "Patlıcanlı", price: "300,00 ₺" },
      { name: "Kaşarlı", price: "320,00 ₺" },
      { name: "Patatesli", price: "300,00 ₺" },
    ],
    note: "Domates, salatalık, patates kızartması eşliğinde",
  },
  {
    id: "sahanlar",
    name: "Sahanlar",
    items: [
      { name: "Sahanda Yumurta", price: "180,00 ₺" },
      { name: "Sahanda Sucuk", price: "250,00 ₺" },
      { name: "Sahanda Sucuklu Yumurta", price: "280,00 ₺" },
      { name: "Sahanda Kavurma", price: "300,00 ₺" },
      { name: "Sahanda Kavurmalı Yumurta", price: "330,00 ₺" },
      { name: "Menemen", price: "230,00 ₺" },
    ],
  },
  {
    id: "tostlar",
    name: "Tostlar",
    items: [
      { name: "Veluna Tost (Kavurmalı, Kaşarlı, Biberli)", price: "400,00 ₺" },
      { name: "Kaşarlı Tost", price: "250,00 ₺" },
      { name: "Karışık Tost", price: "290,00 ₺" },
      { name: "Beyaz Peynirli Domatesli Tost", price: "270,00 ₺" },
      { name: "Kaşarlı Bazlama Tost", price: "280,00 ₺" },
      { name: "Karışık Bazlama Tost", price: "320,00 ₺" },
      { name: "Kavurmalı Bazlama Tost", price: "380,00 ₺" },
    ],
    note: "Domates, salatalık, patates kızartması eşliğinde",
  },
  {
    id: "sicaklar",
    name: "Sıcaklar",
    items: [
      { name: "Çıtır Patates", price: "230,00 ₺" },
      { name: "Çıtır Tavuk Parçaları", price: "350,00 ₺" },
      { name: "Cajun Sepeti", price: "400,00 ₺" },
      { name: "Sosis Sepeti", price: "350,00 ₺" },
      { name: "Börek Sepeti", price: "400,00 ₺" },
      { name: "Combo Sepeti", price: "400,00 ₺", description: "Cajun, sosis, soğan halkası, kroket, sigara böreği, patates" },
    ],
    note: "Ketçap, mayonez ve özel soslar eşliğinde",
  },
  {
    id: "omletler",
    name: "Omletler",
    items: [
      { name: "Sade Omlet", price: "250,00 ₺" },
      { name: "Kaşarlı Omlet", price: "300,00 ₺" },
      { name: "Karışık Omlet (Biber, Kaşar, Sucuk, Mantar)", price: "320,00 ₺" },
      { name: "Sucuklu Omlet", price: "330,00 ₺" },
      { name: "Mantarlı Omlet", price: "280,00 ₺" },
    ],
    note: "Domates, salatalık, patates kızartması eşliğinde",
  },
  {
    id: "wraplar",
    name: "Wraplar",
    items: [
      { name: "Tavuk Wrap", price: "370,00 ₺" },
      { name: "Biftek Wrap", price: "480,00 ₺" },
      { name: "Biftek Quesadilla", price: "500,00 ₺" },
      { name: "Tavuk Quesadilla", price: "450,00 ₺" },
      { name: "Tavuk Taco", price: "440,00 ₺" },
      { name: "Biftekli Taco", price: "550,00 ₺" },
      { name: "Tacos Tavuk", price: "400,00 ₺" },
      { name: "Tacos Biftek", price: "500,00 ₺" },
    ],
    note: "Salata, patates kızartması eşliğinde",
  },
  {
    id: "makarnalar",
    name: "Makarnalar",
    items: [
      { name: "Fettuccine (Tavuk, Mantar, Krema, Parmesan)", price: "290,00 ₺" },
      { name: "Penne Arrabbiata", price: "230,00 ₺" },
      { name: "Kremalı Makarna", price: "240,00 ₺" },
      { name: "Pesto Soslu Makarna", price: "260,00 ₺" },
    ],
  },
  {
    id: "salatalar",
    name: "Salatalar",
    items: [
      { name: "Sezar Salata Biftek", price: "430,00 ₺" },
      { name: "Sezar Salata Tavuk", price: "320,00 ₺" },
      { name: "Tavuklu Salata", price: "310,00 ₺" },
      { name: "Ton Balıklı Salata", price: "300,00 ₺" },
      { name: "Hellim Peynirli Salata", price: "310,00 ₺" },
      { name: "Beyaz Peynirli Salata", price: "270,00 ₺" },
    ],
  },
  {
    id: "kofte",
    name: "Köfteler",
    items: [
      { name: "Balaban Köfte", price: "580,00 ₺" },
      { name: "Püreli Izgara Köfte", price: "500,00 ₺" },
      { name: "Kiremitte Köfte", price: "550,00 ₺" },
    ],
    note: "Mevsim salata, ezme eşliğinde",
  },
  {
    id: "ana-yemek-tavuk",
    name: "Ana Yemekler (Tavuk)",
    items: [
      { name: "Çeltik Kebabı Tavuk", price: "480,00 ₺" },
      { name: "Tavuk Çökertme", price: "480,00 ₺" },
      { name: "Tavuk Germenç", price: "490,00 ₺" },
      { name: "Tavuk Külbastı", price: "440,00 ₺" },
    ],
    note: "Mevsim salata, ezme eşliğinde",
  },
  {
    id: "ana-yemek-et",
    name: "Ana Yemekler (Et)",
    items: [
      { name: "Acılı Steak Antrikot", price: "770,00 ₺" },
      { name: "Kremalı Mantarlı Dana Bonfile", price: "790,00 ₺" },
      { name: "Demî-Glace Soslu Yaprak Bonfile", price: "780,00 ₺" },
      { name: "Hünkar Beğendi", price: "700,00 ₺" },
      { name: "Çoban Kavurma", price: "600,00 ₺" },
      { name: "Et Çökertme", price: "600,00 ₺" },
      { name: "Çeltik Kebabı Biftek", price: "600,00 ₺" },
    ],
    note: "Mevsim salata, ezme eşliğinde",
  },
  {
    id: "fajita",
    name: "Fajitalar",
    items: [
      { name: "Biftek Fajita", price: "600,00 ₺" },
      { name: "Tavuk Fajita", price: "500,00 ₺" },
    ],
  },
  {
    id: "hamburger",
    name: "Hamburgerler",
    items: [
      { name: "Hamburger", price: "370,00 ₺" },
      { name: "Mexican Burger", price: "420,00 ₺" },
      { name: "Cheese Burger", price: "420,00 ₺" },
      { name: "Chicken Burger", price: "330,00 ₺" },
      { name: "Cajun Burger", price: "340,00 ₺" },
    ],
  },
  {
    id: "tavada-tavuk",
    name: "Tavada Soslu Tavuklar",
    items: [
      { name: "Körü Soslu Tavuk", price: "390,00 ₺" },
      { name: "Acılı Meksika Usulü Tavuk", price: "420,00 ₺" },
      { name: "Tatlı Ekşi Soslu Tavuk", price: "400,00 ₺" },
      { name: "Barbekü Soslu Tavuk", price: "410,00 ₺" },
      { name: "Kremalı Mantarlı Tavuk", price: "410,00 ₺" },
    ],
    note: "Kremalı makarna, salata eşliğinde",
  },
  {
    id: "kebaplar",
    name: "Kebaplar",
    items: [
      { name: "Adana Kebap 180 gr", price: "500,00 ₺" },
      { name: "Urfa Kebap 180 gr", price: "500,00 ₺" },
      { name: "Beytî Kebap 180 gr", price: "550,00 ₺" },
      { name: "Ali Nazik 180 gr", price: "650,00 ₺" },
      { name: "Kuzu Çöp Şiş 180 gr", price: "600,00 ₺" },
      { name: "Kuzu Şiş 180 gr", price: "600,00 ₺" },
      { name: "Kuzu Pirzola 220 gr", price: "700,00 ₺" },
      { name: "Yaprak Kebabı 200 gr", price: "600,00 ₺" },
      { name: "Patlıcan Kebabı 250 gr", price: "600,00 ₺" },
      { name: "Karışık Kebap", price: "950,00 ₺" },
      { name: "Karışık Kebap 2 Kişilik", price: "1.850,00 ₺" },
      { name: "Karışık Kebap 3 Kişilik", price: "2.750,00 ₺" },
      { name: "Karışık Kebap 4 Kişilik", price: "3.600,00 ₺" },
    ],
    note: "Tabla salata, mevsim salata, ezme, bulgur pilavı, yoğurtlu patlıcan eşliğinde",
  },
  {
    id: "kebaplar-tava",
    name: "Kebaplar (Tava)",
    items: [
      { name: "Dana Bonfile 180 gr", price: "600,00 ₺" },
      { name: "Dana Antrikot 200 gr", price: "800,00 ₺" },
      { name: "Kuzu Kaburga 250 gr", price: "700,00 ₺" },
      { name: "Yağlı Kara 200 gr", price: "600,00 ₺" },
      { name: "Izgara Köfte 180 gr", price: "700,00 ₺" },
      { name: "Tavuk Kanat 250 gr", price: "450,00 ₺" },
      { name: "Tavuk Şiş 200 gr", price: "450,00 ₺" },
    ],
    note: "Tabla salata, mevsim salata, ezme, bulgur pilavı eşliğinde",
  },
  {
    id: "pideler",
    name: "Pideler",
    items: [
      { name: "Kıymalı", price: "350,00 ₺" },
      { name: "Kıymalı Kaşarlı", price: "380,00 ₺" },
      { name: "Kıymalı Yumurtalı", price: "390,00 ₺" },
      { name: "Kuşbaşı", price: "450,00 ₺" },
      { name: "Kuşbaşı Kaşarlı", price: "480,00 ₺" },
      { name: "Kaşarlı Pide", price: "450,00 ₺" },
      { name: "Kaşarlı Pide Yumurtasız", price: "470,00 ₺" },
      { name: "Karışık Pide", price: "470,00 ₺" },
      { name: "Karadeniz Trabzon Yağlısı", price: "450,00 ₺" },
      { name: "Vejetaryen Pide", price: "350,00 ₺" },
      { name: "Lahmacun", price: "220,00 ₺" },
      { name: "Acılı Lahmacun", price: "220,00 ₺" },
      { name: "Antep Lahmacun", price: "250,00 ₺" },
    ],
    note: "Mevsim salata, yoğurtlu patlıcan, ezme eşliğinde",
  },
  {
    id: "pizzalar",
    name: "Pizzalar",
    items: [
      { name: "Karışık Pizza", price: "340,00 ₺" },
      { name: "Margarita Pizza", price: "300,00 ₺" },
      { name: "Üç Peynirli Pizza", price: "320,00 ₺" },
      { name: "Mantarlı Pizza", price: "290,00 ₺" },
      { name: "Tavuklu Pizza", price: "330,00 ₺" },
    ],
  },
  {
    id: "corbalar",
    name: "Çorbalar",
    items: [
      { name: "Mercimek Çorbası", price: "150,00 ₺" },
      { name: "Günün Çorbası", price: "150,00 ₺" },
    ],
  },
  {
    id: "tatlilar",
    name: "Tatlılar",
    items: [
      { name: "Peynirli Künefe", price: "180,00 ₺" },
      { name: "Peynirli Künefe 2 Kişilik", price: "350,00 ₺" },
      { name: "Peynirli Künefe 4 Kişilik", price: "690,00 ₺" },
      { name: "Antep Fıstıklı Künefe", price: "250,00 ₺" },
      { name: "Antep Fıstıklı Künefe 2 Kişilik", price: "480,00 ₺" },
      { name: "Antep Fıstıklı Künefe 4 Kişilik", price: "950,00 ₺" },
      { name: "Katmer", price: "200,00 ₺" },
      { name: "Waffle", price: "300,00 ₺" },
      { name: "Sufle", price: "250,00 ₺" },
      { name: "Mozaik Pasta", price: "180,00 ₺" },
      { name: "Adet Pasta", price: "200,00 ₺" },
      { name: "Red Velvet", price: "200,00 ₺" },
      { name: "Mono Pasta", price: "200,00 ₺" },
      { name: "Dondurma", price: "200,00 ₺" },
      { name: "Devil's Cake", price: "200,00 ₺" },
      { name: "Cheesecake", price: "200,00 ₺" },
      { name: "Fıstık Rüyası", price: "200,00 ₺" },
      { name: "Ballı Cevizli", price: "200,00 ₺" },
      { name: "San Sebastian Cheesecake", price: "150,00 ₺" },
      { name: "Sütlaç", price: "150,00 ₺" },
    ],
  },
  {
    id: "extralar",
    name: "Extralar",
    items: [
      { name: "Sade Çerez", price: "200,00 ₺" },
      { name: "Karışık Çerez", price: "300,00 ₺" },
      { name: "Patlamış Mısır", price: "150,00 ₺" },
      { name: "Meyve Tabağı", price: "180,00 ₺" },
      { name: "Ballı Fındıklı Muz", price: "250,00 ₺" },
    ],
  },
  {
    id: "soguk-icecek",
    name: "Soğuk İçecekler",
    items: [
      { name: "Kola", price: "80,00 ₺" },
      { name: "Fanta", price: "80,00 ₺" },
      { name: "Sprite", price: "80,00 ₺" },
      { name: "Cappy (Vişne-Karışık)", price: "80,00 ₺" },
      { name: "Fuse Tea (Mango, Limon, Şeftali, Karpuz, Kavun-Çilek)", price: "80,00 ₺" },
      { name: "Ayran", price: "60,00 ₺" },
      { name: "Şalgam", price: "75,00 ₺" },
      { name: "Sade Soda", price: "50,00 ₺" },
      { name: "Meyveli Soda", price: "70,00 ₺" },
      { name: "Soda Limon Ayran", price: "150,00 ₺" },
      { name: "Churchill", price: "120,00 ₺" },
      { name: "Redbull (Original, Şekersiz, Ahududu)", price: "110,00 ₺" },
      { name: "Redbull (Fındıklı)", price: "150,00 ₺" },
      { name: "Sıkma Portakal", price: "150,00 ₺" },
      { name: "Havuç Suyu", price: "150,00 ₺" },
      { name: "Atom (Karışık, Meyve, Fındık)", price: "190,00 ₺" },
      { name: "Limonata (El Yapımı)", price: "140,00 ₺" },
      { name: "Çilekli Limonata", price: "150,00 ₺" },
      { name: "Naneli Limonata", price: "150,00 ₺" },
      { name: "Su (500 ml)", price: "30,00 ₺" },
      { name: "Su (1,5 LT)", price: "60,00 ₺" },
    ],
  },
  {
    id: "espresso-soguk",
    name: "Espresso Bazlı Soğuk İçecekler",
    items: [
      { name: "Iced Americano", price: "170,00 ₺" },
      { name: "Iced Latte", price: "190,00 ₺" },
      { name: "Iced Flat White", price: "195,00 ₺" },
      { name: "Iced White Chocolate Mocha", price: "200,00 ₺" },
      { name: "Iced Caramel Latte", price: "200,00 ₺" },
      { name: "Iced Mocha", price: "200,00 ₺" },
      { name: "Iced Chai Tea Latte", price: "200,00 ₺" },
      { name: "Iced Filter Coffee", price: "180,00 ₺" },
    ],
  },
  {
    id: "milkshake",
    name: "Milkshake Çeşitleri",
    items: [
      { name: "Çikolatalı", price: "190,00 ₺" },
      { name: "Vanilyalı", price: "190,00 ₺" },
      { name: "Karamelli", price: "190,00 ₺" },
      { name: "Oreolu", price: "190,00 ₺" },
      { name: "Çilekli", price: "190,00 ₺" },
      { name: "Orman Meyveli", price: "190,00 ₺" },
      { name: "Muzlu", price: "190,00 ₺" },
      { name: "Mangolu", price: "190,00 ₺" },
    ],
  },
  {
    id: "frozen",
    name: "Frozen Çeşitleri",
    items: [
      { name: "Karpuzlu", price: "180,00 ₺" },
      { name: "Mangolu", price: "180,00 ₺" },
      { name: "Orman Meyveli", price: "180,00 ₺" },
      { name: "Çilekli", price: "180,00 ₺" },
      { name: "Ananaslı", price: "180,00 ₺" },
      { name: "Frambuazlı", price: "180,00 ₺" },
      { name: "Yeşil Elmalı", price: "180,00 ₺" },
      { name: "Yaban Mersinli", price: "180,00 ₺" },
    ],
  },
  {
    id: "smoothie",
    name: "Smoothie",
    items: [
      { name: "Mangolu", price: "200,00 ₺" },
      { name: "Çilekli", price: "200,00 ₺" },
      { name: "Orman Meyveli", price: "200,00 ₺" },
    ],
  },
  {
    id: "frappe",
    name: "Frappelar",
    items: [
      { name: "Coffee Frappe", price: "195,00 ₺" },
      { name: "Karamel", price: "195,00 ₺" },
      { name: "Vanilya", price: "195,00 ₺" },
      { name: "Çikolata", price: "195,00 ₺" },
      { name: "Beyaz Çikolata", price: "195,00 ₺" },
      { name: "Çilek", price: "195,00 ₺" },
      { name: "Fındık", price: "195,00 ₺" },
    ],
  },
  {
    id: "bubble-tea",
    name: "Bubble Tea",
    items: [
      { name: "Strawberry", price: "180,00 ₺" },
      { name: "Blueberry", price: "180,00 ₺" },
      { name: "Lemon", price: "180,00 ₺" },
      { name: "Cool Lime", price: "180,00 ₺" },
      { name: "Berry Hibiscus", price: "180,00 ₺" },
      { name: "Mango Dragon Fruit", price: "180,00 ₺" },
      { name: "Mojito", price: "180,00 ₺" },
    ],
  },
  {
    id: "matcha",
    name: "Matcha",
    items: [
      { name: "Matcha Latte", price: "190,00 ₺" },
      { name: "Çilekli Matcha", price: "190,00 ₺" },
      { name: "Antep Fıstıklı Matcha", price: "190,00 ₺" },
      { name: "Patlayan Şekerli Matcha", price: "190,00 ₺" },
    ],
  },
  {
    id: "sicak-icecek",
    name: "Sıcak İçecekler",
    items: [
      { name: "Çay", price: "50,00 ₺" },
      { name: "Fincan Çay", price: "70,00 ₺" },
      { name: "Kupa Çay", price: "80,00 ₺" },
      { name: "Sütlü Nescafe", price: "150,00 ₺" },
      { name: "Nescafe", price: "130,00 ₺" },
      { name: "Salep", price: "150,00 ₺" },
      { name: "Sıcak Çikolata", price: "150,00 ₺" },
      { name: "Sıcak Beyaz Çikolata", price: "160,00 ₺" },
      { name: "Türk Kahvesi", price: "100,00 ₺" },
      { name: "Double Türk Kahvesi", price: "150,00 ₺" },
      { name: "Dibek Kahvesi", price: "110,00 ₺" },
      { name: "Tarsusi Türk Kahvesi", price: "125,00 ₺" },
      { name: "Menengiç Kahvesi", price: "120,00 ₺" },
      { name: "Fındıklı Dibek Kahvesi", price: "120,00 ₺" },
      { name: "Ballı Süt", price: "140,00 ₺" },
      { name: "Termos Çay", price: "440,00 ₺" },
      { name: "Demlik Çay (2 Kişilik)", price: "300,00 ₺" },
      { name: "Demlik Çay (4 Kişilik)", price: "600,00 ₺" },
    ],
  },
  {
    id: "bitki-cay",
    name: "Bitki Çayları",
    items: [
      { name: "Ada Çayı", price: "120,00 ₺" },
      { name: "Yeşil Çay", price: "120,00 ₺" },
      { name: "Hibiskus Çayı", price: "120,00 ₺" },
      { name: "Kış Çayı", price: "120,00 ₺" },
      { name: "Nane Limon", price: "120,00 ₺" },
      { name: "Ihlamur", price: "120,00 ₺" },
    ],
  },
  {
    id: "espresso-sicak",
    name: "Espresso Bazlı Sıcaklar",
    items: [
      { name: "Single Espresso", price: "100,00 ₺" },
      { name: "Double Espresso", price: "150,00 ₺" },
      { name: "Americano", price: "130,00 ₺" },
      { name: "Latte", price: "150,00 ₺" },
      { name: "Mocha", price: "170,00 ₺" },
      { name: "Cappucino", price: "150,00 ₺" },
      { name: "Cortado", price: "150,00 ₺" },
      { name: "Flat White", price: "160,00 ₺" },
      { name: "White Chocolate Mocha", price: "190,00 ₺" },
      { name: "Macchiato", price: "110,00 ₺" },
      { name: "Caramel Macchiato", price: "180,00 ₺" },
      { name: "Veluna Special Latte", price: "180,00 ₺" },
      { name: "Caramel Latte", price: "180,00 ₺" },
      { name: "Chai Tea Latte", price: "180,00 ₺" },
      { name: "Pumpkin Spiced Latte", price: "180,00 ₺" },
      { name: "Honey Hazelnut Latte", price: "180,00 ₺" },
      { name: "Brown Sugar Latte", price: "180,00 ₺" },
      { name: "Filtre Kahve", price: "150,00 ₺" },
      { name: "Sütlü Filtre Kahve", price: "170,00 ₺" },
    ],
  },
  {
    id: "oralet",
    name: "Oraletler",
    items: [
      { name: "Yaban Mersini", price: "50,00 ₺" },
      { name: "Kivi", price: "50,00 ₺" },
      { name: "Muz", price: "50,00 ₺" },
      { name: "Çilek", price: "50,00 ₺" },
      { name: "Portakal", price: "50,00 ₺" },
      { name: "Karadut", price: "50,00 ₺" },
      { name: "Elma", price: "50,00 ₺" },
      { name: "Sütlü Kako", price: "50,00 ₺" },
      { name: "Mix", price: "50,00 ₺" },
    ],
  },
];

/** Trendyol tarzı ana menü grupları: sol sidebar + sağda çok sütunlu alt kategoriler */
export interface MainMenuGroup {
  id: string;
  name: string;
  categoryIds: string[];
}

export const mainMenuGroups: MainMenuGroup[] = [
  {
    id: "kahvalti-grup",
    name: "Kahvaltı",
    categoryIds: ["kahvalti", "extra-kahvalti", "gozlemeler", "sahanlar", "omletler"],
  },
  {
    id: "tost-sicak",
    name: "Tost & Ara Sıcak",
    categoryIds: ["tostlar", "sicaklar"],
  },
  {
    id: "ana-yemek",
    name: "Ana Yemek & Salata",
    categoryIds: ["wraplar", "makarnalar", "salatalar", "kofte", "ana-yemek-tavuk", "ana-yemek-et", "fajita", "hamburger", "tavada-tavuk"],
  },
  {
    id: "kebap-izgara",
    name: "Kebap & Izgara",
    categoryIds: ["kebaplar", "kebaplar-tava"],
  },
  {
    id: "pide-pizza",
    name: "Pide & Pizza",
    categoryIds: ["pideler", "pizzalar"],
  },
  {
    id: "corba-tatli",
    name: "Çorba & Tatlı",
    categoryIds: ["corbalar", "tatlilar", "extralar"],
  },
  {
    id: "icecekler",
    name: "İçecekler",
    categoryIds: ["soguk-icecek", "espresso-soguk", "milkshake", "frozen", "smoothie", "frappe", "bubble-tea", "matcha", "sicak-icecek", "bitki-cay", "espresso-sicak", "oralet"],
  },
];

export function getCategoriesByIds(ids: string[]): MenuCategory[] {
  return ids
    .map((id) => menuCategories.find((c) => c.id === id))
    .filter((c): c is MenuCategory => Boolean(c));
}

export function getCategoryById(id: string): MenuCategory | undefined {
  return menuCategories.find((c) => c.id === id);
}
