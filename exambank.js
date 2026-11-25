// Banco de preguntas con el formato oficial del examen HSK 1 (H10901 y siguientes).
// Las fotos del examen se representan con emojis.
window.HSK_EXAM = {
// Palabra → imagen (听力/阅读 第一部分)
pics: {"猫":"🐱","狗":"🐶","苹果":"🍎","水果":"🍇","米饭":"🍚","茶":"🍵","水":"💧","杯子":"🥛","飞机":"✈️","出租车":"🚕","火车站":"🚉","医院":"🏥","学校":"🏫","商店":"🏪","饭馆":"🍜","电视":"📺","电脑":"💻","电影":"🎬","书":"📖","衣服":"👕","椅子":"🪑","钱":"💰","打电话":"📞","睡觉":"😴","下雨":"🌧️","热":"🥵","冷":"🥶","写":"✍️","医生":"🧑‍⚕️","老师":"🧑‍🏫","学生":"🧑‍🎓","爸爸":"👨","妈妈":"👩","儿子":"👦","女儿":"👧","高兴":"😄","月":"🌙","日":"☀️","爱":"❤️","菜":"🥗","喝":"🥤","北京":"🏯","星期":"📅","东西":"🛍️","听":"🎧","朋友":"🧑‍🤝‍🧑"},
// Frase → imagen (听力 第二部分, 阅读 第二部分)
picSent: [
 ["我喜欢喝茶。","Wǒ xǐhuan hē chá.","Me gusta beber té.","🍵"],
 ["她在医院工作。","Tā zài yīyuàn gōngzuò.","Trabaja en el hospital.","🏥"],
 ["我们坐飞机去北京。","Wǒmen zuò fēijī qù Běijīng.","Vamos a Pekín en avión.","✈️"],
 ["今天下雨了。","Jīntiān xià yǔ le.","Hoy ha llovido.","🌧️"],
 ["我家有一只猫。","Wǒ jiā yǒu yì zhī māo.","En mi casa hay un gato.","🐱"],
 ["爸爸在看电视。","Bàba zài kàn diànshì.","Papá está viendo la tele.","📺"],
 ["我想吃米饭。","Wǒ xiǎng chī mǐfàn.","Quiero comer arroz.","🍚"],
 ["他在打电话。","Tā zài dǎ diànhuà.","Está hablando por teléfono.","📞"],
 ["儿子在睡觉。","Érzi zài shuìjiào.","Mi hijo está durmiendo.","😴"],
 ["我去商店买东西。","Wǒ qù shāngdiàn mǎi dōngxi.","Voy a la tienda a comprar.","🏪"],
 ["妈妈买了很多苹果。","Māma mǎile hěn duō píngguǒ.","Mamá compró muchas manzanas.","🍎"],
 ["这是我的新电脑。","Zhè shì wǒ de xīn diànnǎo.","Este es mi ordenador nuevo.","💻"],
 ["今天太热了！","Jīntiān tài rè le!","¡Hoy hace muchísimo calor!","🥵"],
 ["我们去看电影吧。","Wǒmen qù kàn diànyǐng ba.","Vamos a ver una película.","🎬"],
 ["我坐出租车去火车站。","Wǒ zuò chūzūchē qù huǒchēzhàn.","Voy a la estación en taxi.","🚕"],
 ["她在写汉字。","Tā zài xiě Hànzì.","Está escribiendo caracteres.","✍️"],
 ["这件衣服很漂亮。","Zhè jiàn yīfu hěn piàoliang.","Esta ropa es muy bonita.","👕"],
 ["我女儿七岁了。","Wǒ nǚ'ér qī suì le.","Mi hija tiene siete años.","👧"],
 ["桌子上有一个杯子。","Zhuōzi shang yǒu yí ge bēizi.","Hay un vaso sobre la mesa.","🥛"],
 ["他是我们的老师。","Tā shì wǒmen de lǎoshī.","Es nuestro profesor.","🧑‍🏫"],
 ["我们去饭馆吃饭吧。","Wǒmen qù fànguǎn chī fàn ba.","Vamos a comer al restaurante.","🍜"],
 ["认识你很高兴！","Rènshi nǐ hěn gāoxìng!","¡Encantado de conocerte!","😄"],
 ["小狗在椅子下面。","Xiǎo gǒu zài yǐzi xiàmiàn.","El perrito está debajo de la silla.","🐶"],
 ["今天天气很冷。","Jīntiān tiānqì hěn lěng.","Hoy hace mucho frío.","🥶"],
 ["我在学校学习汉语。","Wǒ zài xuéxiào xuéxí Hànyǔ.","Estudio chino en la escuela.","🏫"],
 ["这本书是我朋友的。","Zhè běn shū shì wǒ péngyou de.","Este libro es de mi amigo.","📖"],
 ["我喜欢听音乐。","Wǒ xǐhuan tīng yīnyuè.","Me gusta escuchar música.","🎧"]
],
// Diálogo → imagen (听力 第三部分)
dialogs: [
 [["女","你好！你叫什么名字？"],["男","我叫王明，认识你很高兴。"],"Nǚ: Nǐ hǎo! Nǐ jiào shénme míngzi? Nán: Wǒ jiào Wáng Míng, rènshi nǐ hěn gāoxìng.","🧑‍🤝‍🧑"],
 [["男","你想喝什么？"],["女","我想喝茶，谢谢。"],"Nán: Nǐ xiǎng hē shénme? Nǚ: Wǒ xiǎng hē chá, xièxie.","🍵"],
 [["女","喂，你在哪儿？"],["男","我在火车站，现在回家。"],"Nǚ: Wèi, nǐ zài nǎr? Nán: Wǒ zài huǒchēzhàn, xiànzài huí jiā.","🚉"],
 [["男","这些苹果多少钱？"],["女","十块。"],"Nán: Zhèxiē píngguǒ duōshao qián? Nǚ: Shí kuài.","🍎"],
 [["女","你的猫在哪儿？"],["男","在椅子上睡觉呢。"],"Nǚ: Nǐ de māo zài nǎr? Nán: Zài yǐzi shang shuìjiào ne.","🐱"],
 [["男","明天天气怎么样？"],["女","明天会下雨。"],"Nán: Míngtiān tiānqì zěnmeyàng? Nǚ: Míngtiān huì xià yǔ.","🌧️"],
 [["女","你看见我的书了吗？"],["男","在桌子上。"],"Nǚ: Nǐ kànjiàn wǒ de shū le ma? Nán: Zài zhuōzi shang.","📖"],
 [["男","你怎么去北京？"],["女","坐飞机去。"],"Nán: Nǐ zěnme qù Běijīng? Nǚ: Zuò fēijī qù.","✈️"],
 [["女","你爸爸做什么工作？"],["男","他是医生，在医院工作。"],"Nǚ: Nǐ bàba zuò shénme gōngzuò? Nán: Tā shì yīshēng, zài yīyuàn gōngzuò.","🧑‍⚕️"],
 [["男","你在做什么呢？"],["女","我在看电影。"],"Nán: Nǐ zài zuò shénme ne? Nǚ: Wǒ zài kàn diànyǐng.","🎬"],
 [["女","你几点睡觉？"],["男","晚上十一点。"],"Nǚ: Nǐ jǐ diǎn shuìjiào? Nán: Wǎnshang shíyī diǎn.","😴"],
 [["男","你喜欢小狗吗？"],["女","很喜欢，我家有两只。"],"Nán: Nǐ xǐhuan xiǎo gǒu ma? Nǚ: Hěn xǐhuan, wǒ jiā yǒu liǎng zhī.","🐶"],
 [["女","我们去哪儿吃饭？"],["男","去前面那个饭馆吧。"],"Nǚ: Wǒmen qù nǎr chī fàn? Nán: Qù qiánmiàn nàge fànguǎn ba.","🍜"],
 [["男","这是谁的电脑？"],["女","是我女儿的。"],"Nán: Zhè shì shéi de diànnǎo? Nǚ: Shì wǒ nǚ'ér de.","💻"],
 [["女","你要去哪儿？"],["男","我去商店买衣服。"],"Nǚ: Nǐ yào qù nǎr? Nán: Wǒ qù shāngdiàn mǎi yīfu.","👕"],
 [["男","喂，你好！请问王老师在吗？"],["女","她不在，下午来。"],"Nán: Wèi, nǐ hǎo! Qǐngwèn Wáng lǎoshī zài ma? Nǚ: Tā bú zài, xiàwǔ lái.","📞"]
],
// Frase + pregunta + 3 opciones (听力 第四部分)
listen4: [
 ["我叫李月，我是中国人。","Wǒ jiào Lǐ Yuè, wǒ shì Zhōngguó rén.","她是哪国人？","Tā shì nǎ guó rén?",["中国|Zhōngguó","美国|Měiguó","日本|Rìběn"],0],
 ["我明天上午去北京。","Wǒ míngtiān shàngwǔ qù Běijīng.","他什么时候去北京？","Tā shénme shíhou qù Běijīng?",["今天|jīntiān","明天|míngtiān","昨天|zuótiān"],1],
 ["我家有五个人。","Wǒ jiā yǒu wǔ ge rén.","他家有几个人？","Tā jiā yǒu jǐ ge rén?",["三个|sān ge","四个|sì ge","五个|wǔ ge"],2],
 ["这个杯子十八块钱。","Zhège bēizi shíbā kuài qián.","杯子多少钱？","Bēizi duōshao qián?",["八块|bā kuài","十块|shí kuài","十八块|shíbā kuài"],2],
 ["我女儿在学校学习汉语。","Wǒ nǚ'ér zài xuéxiào xuéxí Hànyǔ.","她女儿在哪儿？","Tā nǚ'ér zài nǎr?",["学校|xuéxiào","医院|yīyuàn","商店|shāngdiàn"],0],
 ["我喜欢小猫，不喜欢小狗。","Wǒ xǐhuan xiǎo māo, bù xǐhuan xiǎo gǒu.","她喜欢什么？","Tā xǐhuan shénme?",["猫|māo","狗|gǒu","苹果|píngguǒ"],0],
 ["现在是下午三点十分。","Xiànzài shì xiàwǔ sān diǎn shí fēn.","现在几点？","Xiànzài jǐ diǎn?",["3:00|sān diǎn","3:10|sān diǎn shí fēn","10:03|shí diǎn sān fēn"],1],
 ["王老师是我的朋友，她很漂亮。","Wáng lǎoshī shì wǒ de péngyou, tā hěn piàoliang.","王老师怎么样？","Wáng lǎoshī zěnmeyàng?",["很漂亮|hěn piàoliang","很高兴|hěn gāoxìng","很热|hěn rè"],0],
 ["昨天我去商店买了一些衣服。","Zuótiān wǒ qù shāngdiàn mǎile yìxiē yīfu.","他昨天买了什么？","Tā zuótiān mǎile shénme?",["衣服|yīfu","书|shū","水果|shuǐguǒ"],0],
 ["今天太冷了，我不想出去。","Jīntiān tài lěng le, wǒ bù xiǎng chūqu.","今天天气怎么样？","Jīntiān tiānqì zěnmeyàng?",["很热|hěn rè","很冷|hěn lěng","下雨|xià yǔ"],1],
 ["我在医院工作，我是医生。","Wǒ zài yīyuàn gōngzuò, wǒ shì yīshēng.","他做什么工作？","Tā zuò shénme gōngzuò?",["老师|lǎoshī","医生|yīshēng","学生|xuésheng"],1],
 ["我坐出租车去火车站。","Wǒ zuò chūzūchē qù huǒchēzhàn.","他怎么去火车站？","Tā zěnme qù huǒchēzhàn?",["坐飞机|zuò fēijī","坐出租车|zuò chūzūchē","开车|kāi chē"],1],
 ["我儿子今年九岁了。","Wǒ érzi jīnnián jiǔ suì le.","他儿子几岁了？","Tā érzi jǐ suì le?",["七岁|qī suì","八岁|bā suì","九岁|jiǔ suì"],2],
 ["星期六我们去看电影吧。","Xīngqīliù wǒmen qù kàn diànyǐng ba.","他们星期几去看电影？","Tāmen xīngqī jǐ qù kàn diànyǐng?",["星期一|xīngqīyī","星期六|xīngqīliù","星期日|xīngqīrì"],1],
 ["我会说一点儿汉语，但是不会写汉字。","Wǒ huì shuō yìdiǎnr Hànyǔ, dànshì bú huì xiě Hànzì.","他不会做什么？","Tā bú huì zuò shénme?",["说汉语|shuō Hànyǔ","写汉字|xiě Hànzì","读书|dú shū"],1],
 ["桌子上有三本书，是我同学的。","Zhuōzi shang yǒu sān běn shū, shì wǒ tóngxué de.","书是谁的？","Shū shì shéi de?",["他的|tā de","老师的|lǎoshī de","同学的|tóngxué de"],2],
 ["我中午在饭馆吃了米饭和菜。","Wǒ zhōngwǔ zài fànguǎn chīle mǐfàn hé cài.","他中午在哪儿吃饭？","Tā zhōngwǔ zài nǎr chī fàn?",["家|jiā","学校|xuéxiào","饭馆|fànguǎn"],2],
 ["妈妈在家里看电视，爸爸在睡觉。","Māma zài jiā li kàn diànshì, bàba zài shuìjiào.","爸爸在做什么？","Bàba zài zuò shénme?",["看电视|kàn diànshì","睡觉|shuìjiào","打电话|dǎ diànhuà"],1],
 ["我住在北京，我的家在学校后面。","Wǒ zhù zài Běijīng, wǒ de jiā zài xuéxiào hòumiàn.","他的家在哪儿？","Tā de jiā zài nǎr?",["学校前面|xuéxiào qiánmiàn","学校后面|xuéxiào hòumiàn","学校里|xuéxiào li"],1],
 ["我想喝水，不想喝茶。","Wǒ xiǎng hē shuǐ, bù xiǎng hē chá.","她想喝什么？","Tā xiǎng hē shénme?",["水|shuǐ","茶|chá","苹果|píngguǒ"],0],
 ["我九月一号去中国。","Wǒ jiǔ yuè yī hào qù Zhōngguó.","他几号去中国？","Tā jǐ hào qù Zhōngguó?",["一号|yī hào","七号|qī hào","九号|jiǔ hào"],0],
 ["我有一个女儿，没有儿子。","Wǒ yǒu yí ge nǚ'ér, méiyǒu érzi.","她有几个儿子？","Tā yǒu jǐ ge érzi?",["没有|méiyǒu","一个|yí ge","两个|liǎng ge"],0],
 ["我们是同学，都学习汉语。","Wǒmen shì tóngxué, dōu xuéxí Hànyǔ.","他们学习什么？","Tāmen xuéxí shénme?",["汉语|Hànyǔ","电脑|diànnǎo","医生|yīshēng"],0],
 ["你好，我想买一本书和一个杯子。","Nǐ hǎo, wǒ xiǎng mǎi yì běn shū hé yí ge bēizi.","他想买什么？","Tā xiǎng mǎi shénme?",["书和杯子|shū hé bēizi","书和衣服|shū hé yīfu","水果|shuǐguǒ"],0]
],
// Pregunta → respuesta (阅读 第三部分)
qa: [
 ["你叫什么名字？","Nǐ jiào shénme míngzi?","我叫王明。","Wǒ jiào Wáng Míng."],
 ["你是哪国人？","Nǐ shì nǎ guó rén?","我是中国人。","Wǒ shì Zhōngguó rén."],
 ["你家有几个人？","Nǐ jiā yǒu jǐ ge rén?","三个人。","Sān ge rén."],
 ["今天几号？","Jīntiān jǐ hào?","今天九号。","Jīntiān jiǔ hào."],
 ["现在几点？","Xiànzài jǐ diǎn?","现在八点。","Xiànzài bā diǎn."],
 ["你在哪儿工作？","Nǐ zài nǎr gōngzuò?","我在医院工作。","Wǒ zài yīyuàn gōngzuò."],
 ["这个多少钱？","Zhège duōshao qián?","十块。","Shí kuài."],
 ["你想喝什么？","Nǐ xiǎng hē shénme?","我想喝茶。","Wǒ xiǎng hē chá."],
 ["你会说汉语吗？","Nǐ huì shuō Hànyǔ ma?","会说一点儿。","Huì shuō yìdiǎnr."],
 ["今天天气怎么样？","Jīntiān tiānqì zěnmeyàng?","很冷。","Hěn lěng."],
 ["你怎么去北京？","Nǐ zěnme qù Běijīng?","坐飞机去。","Zuò fēijī qù."],
 ["他是谁？","Tā shì shéi?","他是我爸爸。","Tā shì wǒ bàba."],
 ["你什么时候回家？","Nǐ shénme shíhou huí jiā?","下午三点。","Xiàwǔ sān diǎn."],
 ["你女儿几岁了？","Nǐ nǚ'ér jǐ suì le?","她六岁了。","Tā liù suì le."],
 ["谢谢你！","Xièxie nǐ!","不客气。","Bú kèqi."],
 ["对不起！","Duìbuqǐ!","没关系。","Méi guānxi."],
 ["你吃饭了吗？","Nǐ chī fàn le ma?","还没吃。","Hái méi chī."],
 ["桌子上有什么？","Zhuōzi shang yǒu shénme?","有一本书。","Yǒu yì běn shū."],
 ["你住在哪儿？","Nǐ zhù zài nǎr?","我住在北京。","Wǒ zhù zài Běijīng."],
 ["你喜欢什么水果？","Nǐ xǐhuan shénme shuǐguǒ?","我喜欢苹果。","Wǒ xǐhuan píngguǒ."],
 ["你认识那个人吗？","Nǐ rènshi nàge rén ma?","认识，她是我同学。","Rènshi, tā shì wǒ tóngxué."],
 ["你的猫呢？","Nǐ de māo ne?","在桌子下面。","Zài zhuōzi xiàmiàn."]
],
// Rellenar con un banco de 6 palabras (阅读 第四部分): [palabras, frases [texto con （ ）, pinyin, índice correcto]]
bank: [
 [["名字|míngzi","商店|shāngdiàn","喜欢|xǐhuan","前面|qiánmiàn","漂亮|piàoliang","没关系|méi guānxi"],[
  ["你叫什么（　）？","Nǐ jiào shénme míngzi?",0],["我想去（　）买东西。","Wǒ xiǎng qù shāngdiàn mǎi dōngxi.",1],["我（　）喝茶，不喜欢喝水。","Wǒ xǐhuan hē chá, bù xǐhuan hē shuǐ.",2],["医院在学校（　）。","Yīyuàn zài xuéxiào qiánmiàn.",3],["你的衣服很（　）。","Nǐ de yīfu hěn piàoliang.",4],["男：对不起！　女：（　）。","Nán: Duìbuqǐ! Nǚ: Méi guānxi.",5]]],
 [["岁|suì","点|diǎn","本|běn","都|dōu","吗|ma","在|zài"],[
  ["我儿子今年八（　）了。","Wǒ érzi jīnnián bā suì le.",0],["男：现在几（　）？　女：十点。","Nán: Xiànzài jǐ diǎn? Nǚ: Shí diǎn.",1],["桌子上有三（　）书。","Zhuōzi shang yǒu sān běn shū.",2],["我们（　）是中国人。","Wǒmen dōu shì Zhōngguó rén.",3],["你是老师（　）？","Nǐ shì lǎoshī ma?",4],["妈妈（　）家里做饭。","Māma zài jiā li zuò fàn.",5]]],
 [["飞机|fēijī","下雨|xià yǔ","认识|rènshi","时候|shíhou","多少|duōshao","电影|diànyǐng"],[
  ["我坐（　）去北京。","Wǒ zuò fēijī qù Běijīng.",0],["今天（　）了，我们不去商店了。","Jīntiān xià yǔ le, wǒmen bú qù shāngdiàn le.",1],["（　）你很高兴！","Rènshi nǐ hěn gāoxìng!",2],["男：你什么（　）回家？　女：下午。","Nán: Nǐ shénme shíhou huí jiā? Nǚ: Xiàwǔ.",3],["这个杯子（　）钱？","Zhège bēizi duōshao qián?",4],["我们去看（　）吧。","Wǒmen qù kàn diànyǐng ba.",5]]],
 [["会|huì","叫|jiào","住|zhù","打|dǎ","坐|zuò","谢谢|xièxie"],[
  ["我（　）写汉字。","Wǒ huì xiě Hànzì.",0],["她（　）王小月。","Tā jiào Wáng Xiǎoyuè.",1],["我（　）在北京。","Wǒ zhù zài Běijīng.",2],["他在（　）电话。","Tā zài dǎ diànhuà.",3],["请（　）！","Qǐng zuò!",4],["男：（　）你！　女：不客气。","Nán: Xièxie nǐ! Nǚ: Bú kèqi.",5]]],
 [["后面|hòumiàn","昨天|zuótiān","少|shǎo","怎么样|zěnmeyàng","谁|shéi","和|hé"],[
  ["小狗在椅子（　）。","Xiǎo gǒu zài yǐzi hòumiàn.",0],["我（　）去医院了。","Wǒ zuótiān qù yīyuàn le.",1],["这个饭馆人很（　），我们去别的吧。","Zhège fànguǎn rén hěn shǎo, wǒmen qù bié de ba.",2],["男：这个菜（　）？　女：很好吃。","Nán: Zhège cài zěnmeyàng? Nǚ: Hěn hǎochī.",3],["那个人是（　）？","Nàge rén shì shéi?",4],["我（　）爸爸都喜欢看书。","Wǒ hé bàba dōu xǐhuan kàn shū.",5]]],
 [["衣服|yīfu","几|jǐ","能|néng","汉语|Hànyǔ","热|rè","茶|chá"],[
  ["这件（　）是我妈妈的。","Zhè jiàn yīfu shì wǒ māma de.",0],["男：你家有（　）个人？　女：四个。","Nán: Nǐ jiā yǒu jǐ ge rén? Nǚ: Sì ge.",1],["我今天有工作，不（　）去。","Wǒ jīntiān yǒu gōngzuò, bù néng qù.",2],["我在学校学习（　）。","Wǒ zài xuéxiào xuéxí Hànyǔ.",3],["北京七月很（　）。","Běijīng qī yuè hěn rè.",4],["中国人喜欢喝（　）。","Zhōngguó rén xǐhuan hē chá.",5]]]
]
};
