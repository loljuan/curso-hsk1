// Temario del curso. Bloques: p, ex (ejemplos), g (gramática), table, dialog, tip, tones, pinyin, strokes, radicals
// Ejemplos: [hanzi, pinyin, español]
window.HSK_LESSONS = [
{
 n:0, title:"Cómo funciona el HSK 1", zh:"汉语水平考试一级", goal:"Saber qué vas a aprender y cómo es el examen.",
 blocks:[
  {t:"p",html:"El <b>HSK</b> (汉语水平考试 <i>Hànyǔ Shuǐpíng Kǎoshì</i>) es el examen oficial de chino mandarín. El <b>nivel 1</b> demuestra que entiendes y usas frases muy sencillas: saludar, presentarte, contar, decir la hora, hablar de tu familia, comprar o pedir comida."},
  {t:"table",head:["Lo que necesitas","Cantidad"],rows:[["Palabras oficiales","151 (estándar HSK 2.0)"],["Caracteres distintos","178"],["Puntos de gramática","≈ 30"],["Horas de estudio recomendadas","60–80 h (unas 8–10 semanas)"]]},
  {t:"g",title:"El examen",html:"<b>40 preguntas · ~40 minutos · 200 puntos · apruebas con 120.</b> Todo el examen lleva pinyin debajo de los caracteres.",items:[]},
  {t:"table",head:["Parte","Preguntas","Qué hacer"],rows:[["Comprensión oral 1","5","Oyes una palabra: ¿coincide con la foto? (✓/✗)"],["Comprensión oral 2","5","Oyes una frase: elige la foto (A/B/C)"],["Comprensión oral 3","5","Oyes un diálogo: relaciónalo con una foto"],["Comprensión oral 4","5","Oyes una frase y una pregunta: elige la respuesta"],["Lectura 1","5","¿La palabra coincide con la foto? (✓/✗)"],["Lectura 2","5","Relaciona frases con fotos"],["Lectura 3","5","Relaciona preguntas con respuestas"],["Lectura 4","5","Rellena el hueco con la palabra correcta"]]},
  {t:"tip",html:"<b>Cómo usar este curso:</b> sigue las lecciones en orden. Cada una presenta palabras, gramática y un diálogo, y termina con un test. Después repasa con las <b>Tarjetas</b>, practica con los <b>Ejercicios</b> y consulta las fichas de cada carácter en <b>Caracteres</b>. Pulsa cualquier 🔊 para escuchar la pronunciación."},
  {t:"tip",html:"Existe un nuevo estándar (HSK 3.0, con 500 palabras en el nivel 1). Este curso sigue la lista clásica de 150 palabras, que es la de los manuales HSK Standard Course y la base de ambos estándares."}
 ],
 quiz:[
  {q:"¿Cuántos puntos necesitas para aprobar el HSK 1?",o:["100","120","150","180"],a:1},
  {q:"¿El examen HSK 1 incluye escritura a mano?",o:["Sí, una redacción","Sí, copiar caracteres","No, solo comprensión oral y lectura"],a:2},
  {q:"¿Cuántas palabras tiene la lista clásica del HSK 1?",o:["≈ 50","≈ 150","≈ 300","≈ 600"],a:1}
 ]
},
{
 n:1, title:"Pinyin y tonos", zh:"拼音和声调", goal:"Leer cualquier sílaba en pinyin y distinguir los cuatro tonos.",
 blocks:[
  {t:"p",html:"El <b>pinyin</b> es la transcripción oficial del chino con letras latinas. Cada sílaba tiene tres partes: <b>inicial</b> (consonante), <b>final</b> (vocal o vocal + n/ng) y <b>tono</b>. Por ejemplo <b>mā</b> = inicial <i>m</i> + final <i>a</i> + primer tono."},
  {t:"tones"},
  {t:"g",title:"Los 4 tonos + el neutro",html:"Los tonos cambian el significado. <b>mā</b> (妈 mamá), <b>má</b> (麻 cáñamo), <b>mǎ</b> (马 caballo), <b>mà</b> (骂 regañar), <b>ma</b> (吗 partícula de pregunta). En este curso cada tono tiene su color.",items:[]},
  {t:"table",head:["Tono","Marca","Cómo suena"],rows:[["1.º","ā","Alto y plano, como cantar una nota larga"],["2.º","á","Sube, como «¿eh?» al preguntar"],["3.º","ǎ","Baja y vuelve a subir; en la frase suele quedarse abajo"],["4.º","à","Cae fuerte, como una orden: «¡ya!»"],["Neutro","a","Corto y suave, sin marca"]]},
  {t:"pinyin"},
  {t:"g",title:"Sonidos difíciles para hispanohablantes",html:"",items:[]},
  {t:"table",head:["Pinyin","Suena parecido a…","Ejemplo"],rows:[["b / d / g","p / t / k suaves, sin aire","爸 bà"],["p / t / k","p / t / k con un soplo de aire","怕 pà"],["zh / ch / sh / r","con la lengua curvada hacia atrás","中 zhōng, 吃 chī, 是 shì, 人 rén"],["z / c / s","ds / ts (con aire) / s","字 zì, 菜 cài"],["j / q / x","«ch» suave / «ch» con aire / «sh» con sonrisa","几 jǐ, 七 qī, 写 xiě"],["h","como la j española, pero más suave","好 hǎo"],["ü (yu, ju, qu, xu)","una «i» con labios de «u», como la u francesa","女 nǚ, 去 qù"],["e","como una «e» relajada de garganta","喝 hē"],["-n / -ng","n en la punta / n nasal del fondo (como en «tengo»)","饭 fàn / 房 fáng"]]},
  {t:"g",title:"Reglas de cambio de tono",html:"Algunos tonos cambian según la sílaba siguiente. Se escribe el tono original en los diccionarios, pero en este curso marcamos el tono real.",items:[["你好","nǐ hǎo → ní hǎo","3.º + 3.º: el primero pasa a 2.º"],["不是","bù + shì → bú shì","不 delante de 4.º tono pasa a 2.º"],["一个","yī + gè → yí ge","一 delante de 4.º tono pasa a 2.º"],["一本","yī + běn → yì běn","一 delante de 1.º, 2.º o 3.º pasa a 4.º"]]},
  {t:"tip",html:"<b>Dónde va la marca del tono:</b> sobre la <b>a</b> o la <b>e</b> si las hay; en <b>ou</b> sobre la o; si no, sobre la última vocal (<i>duì, liù</i>)."}
 ],
 quiz:[
  {q:"¿Qué tono tiene «mǎ»?",o:["1.º (alto)","2.º (sube)","3.º (baja y sube)","4.º (cae)"],a:2},
  {q:"¿Cómo se pronuncia 你好 en la práctica?",o:["nǐ hǎo","ní hǎo","nì hào","nī hāo"],a:1},
  {q:"¿Cómo se dice 不是?",o:["bù shì","bú shì","bǔ shì","bū shì"],a:1},
  {q:"«qī» (七) empieza por un sonido parecido a…",o:["la k española","una «ch» con aire","la q de «queso»"],a:1},
  {q:"¿Cuál de estos lleva el 4.º tono?",o:["mā","má","mǎ","mà"],a:3},
  {q:"En «xie» con 3.er tono, la marca va sobre…",o:["la i","la e","la x"],a:1}
 ]
},
{
 n:2, title:"Trazos y radicales", zh:"笔画和部首", goal:"Entender cómo se escriben los caracteres y reconocer sus piezas.",
 blocks:[
  {t:"p",html:"Los caracteres (汉字 <i>Hànzì</i>) se escriben con un número fijo de <b>trazos</b>, siempre en el mismo orden. Muchos caracteres combinan una parte de <b>significado</b> (el <b>radical</b>) y una parte de <b>sonido</b>. Por ejemplo 妈 mā = 女 (mujer) + 马 mǎ (sonido)."},
  {t:"strokes"},
  {t:"g",title:"Reglas del orden de trazos",html:"",items:[["十","shí","1. Horizontal antes que vertical"],["八","bā","2. Primero el trazo hacia la izquierda, luego hacia la derecha"],["三","sān","3. De arriba abajo"],["你","nǐ","4. De izquierda a derecha"],["国","guó","5. Primero el marco, luego el interior, y se cierra al final"],["小","xiǎo","6. El centro antes que los lados"]]},
  {t:"radicals"},
  {t:"tip",html:"En la sección <b>Caracteres</b> cada ficha muestra la animación del orden de trazos y un modo de práctica para que lo escribas tú con el ratón o el dedo."}
 ],
 quiz:[
  {q:"¿Qué significa el radical 氵?",o:["fuego","agua","persona","palabra"],a:1},
  {q:"El radical 亻 indica relación con…",o:["las personas","los árboles","la comida","el metal"],a:0},
  {q:"En 十, ¿qué trazo va primero?",o:["El vertical","El horizontal","Da igual"],a:1},
  {q:"讠 aparece en 说, 话, 语, 请... Significa:",o:["mano","corazón","palabra, hablar","agua"],a:2},
  {q:"En 国, ¿cuándo se cierra el marco?",o:["Al principio","Al final","En medio"],a:1}
 ]
},
{
 n:3, title:"Saludos y cortesía", zh:"你好！", goal:"Saludar, despedirte, dar las gracias y pedir perdón.",
 blocks:[
  {t:"ex",items:[["你好！","Nǐ hǎo!","¡Hola!"],["您好！","Nín hǎo!","¡Hola! (formal, 您 = usted)"],["你们好！","Nǐmen hǎo!","¡Hola a todos!"],["老师好！","Lǎoshī hǎo!","¡Hola, profesor!"]]},
  {t:"g",title:"Saludar: persona + 好",html:"Para saludar se dice <b>[persona] + 好</b>. Literalmente «tú bien».",items:[["早上好！","Zǎoshang hǎo!","¡Buenos días!"]]},
  {t:"table",head:["Situación","Dices","Te responden"],rows:[["Dar las gracias","谢谢！ xièxie","不客气。 bú kèqi (de nada)"],["Pedir perdón","对不起！ duìbuqǐ","没关系。 méi guānxi (no pasa nada)"],["Despedirse","再见！ zàijiàn","再见！ zàijiàn"],["Invitar a algo","请坐。 qǐng zuò","谢谢！ xièxie"],["Contestar al teléfono","喂？ wèi","喂，你好！"]]},
  {t:"g",title:"请 + verbo = «por favor, haz...»",html:"请 va <b>delante</b> del verbo: es una invitación amable.",items:[["请坐。","Qǐng zuò.","Siéntese, por favor."],["请喝茶。","Qǐng hē chá.","Tome té, por favor."],["请进。","Qǐng jìn.","Pase, por favor."]]},
  {t:"dialog",lines:[["A","你好！","Nǐ hǎo!","¡Hola!"],["B","你好！","Nǐ hǎo!","¡Hola!"],["A","请坐。","Qǐng zuò.","Siéntate, por favor."],["B","谢谢！","Xièxie!","¡Gracias!"],["A","不客气。","Bú kèqi.","De nada."],["B","对不起，我要走了。再见！","Duìbuqǐ, wǒ yào zǒu le. Zàijiàn!","Lo siento, me tengo que ir. ¡Adiós!"],["A","没关系。再见！","Méi guānxi. Zàijiàn!","No pasa nada. ¡Adiós!"]]}
 ],
 quiz:[
  {q:"Alguien te dice 谢谢. Respondes:",o:["对不起","不客气","再见","喂"],a:1},
  {q:"Alguien te dice 对不起. Respondes:",o:["没关系","谢谢","你好","请"],a:0},
  {q:"¿Qué significa 再见?",o:["hola","gracias","adiós","perdón"],a:2},
  {q:"«Siéntese, por favor» es:",o:["坐请","请坐","坐好","你坐请"],a:1},
  {q:"¿Qué dices al coger el teléfono?",o:["喂","好","吗","请"],a:0}
 ]
},
{
 n:4, title:"Yo soy… (pronombres y 是)", zh:"我是学生", goal:"Usar los pronombres, el verbo 是 y hacer preguntas de sí/no con 吗.",
 blocks:[
  {t:"table",head:["Singular","Plural (+ 们)"],rows:[["我 wǒ — yo","我们 wǒmen — nosotros"],["你 nǐ — tú","你们 nǐmen — vosotros"],["他 tā — él","他们 tāmen — ellos"],["她 tā — ella","她们 tāmen — ellas"]]},
  {t:"tip",html:"Los pronombres no cambian: 我 es «yo», «me» y «mí». Tampoco se conjugan los verbos: 我是, 你是, 他是... todo igual."},
  {t:"g",title:"A 是 B — «A es B»",html:"是 une dos sustantivos. <b>No</b> se usa con adjetivos (eso lo verás con 很).",items:[["我是学生。","Wǒ shì xuésheng.","Soy estudiante."],["她是老师。","Tā shì lǎoshī.","Ella es profesora."],["我们是中国人。","Wǒmen shì Zhōngguó rén.","Somos chinos."]]},
  {t:"g",title:"Negación: A 不是 B",html:"不 va <b>delante</b> del verbo. Ante 4.º tono se pronuncia <b>bú</b>.",items:[["我不是老师。","Wǒ bú shì lǎoshī.","No soy profesor."],["他不是医生。","Tā bú shì yīshēng.","Él no es médico."]]},
  {t:"g",title:"Pregunta de sí/no: frase + 吗？",html:"Añade 吗 al final de una afirmación y se convierte en pregunta. El orden de las palabras no cambia.",items:[["你是学生吗？","Nǐ shì xuésheng ma?","¿Eres estudiante?"],["是，我是学生。","Shì, wǒ shì xuésheng.","Sí, soy estudiante."],["不是，我是老师。","Bú shì, wǒ shì lǎoshī.","No, soy profesor."]]},
  {t:"tip",html:"En chino no hay una palabra para «sí» o «no» en general: se responde repitiendo el verbo. ¿你是学生吗？ → 是 (sí) / 不是 (no)."},
  {t:"dialog",lines:[["A","你是老师吗？","Nǐ shì lǎoshī ma?","¿Eres profesor?"],["B","不是，我是学生。你呢？","Bú shì, wǒ shì xuésheng. Nǐ ne?","No, soy estudiante. ¿Y tú?"],["A","我也是学生。","Wǒ yě shì xuésheng.","Yo también soy estudiante."],["B","她是老师吗？","Tā shì lǎoshī ma?","¿Ella es profesora?"],["A","是，她是我们的老师。","Shì, tā shì wǒmen de lǎoshī.","Sí, es nuestra profesora."]]}
 ],
 quiz:[
  {q:"«Nosotros» es:",o:["我们","你们","他们","她们"],a:0},
  {q:"Ordena: «No soy médico»",o:["我是不医生","我不是医生","不我是医生","我医生不是"],a:1},
  {q:"Convierte en pregunta: 他是老师。",o:["他是老师吗？","吗他是老师？","他吗是老师？","他是吗老师？"],a:0},
  {q:"¿Cómo se pronuncia 不 en 不是?",o:["bù","bú","bǔ","bū"],a:1},
  {q:"«Ella» se escribe:",o:["他","她","你","们"],a:1}
 ]
},
{
 n:5, title:"Presentarse", zh:"我叫……", goal:"Decir tu nombre y tu nacionalidad, y preguntárselos a otros.",
 blocks:[
  {t:"g",title:"Decir tu nombre: 我叫 + nombre",html:"叫 jiào = llamarse.",items:[["我叫安娜。","Wǒ jiào Ānnà.","Me llamo Ana."],["你叫什么名字？","Nǐ jiào shénme míngzi?","¿Cómo te llamas?"],["他叫什么？","Tā jiào shénme?","¿Cómo se llama él?"]]},
  {t:"g",title:"Preguntas con 什么 «qué»",html:"En chino la palabra interrogativa <b>se queda en el lugar</b> donde iría la respuesta. No lleva 吗.",items:[["这是什么？","Zhè shì shénme?","¿Qué es esto?"],["这是书。","Zhè shì shū.","Esto es un libro."],["你喝什么？","Nǐ hē shénme?","¿Qué bebes?"]]},
  {t:"g",title:"Nacionalidad: país + 人",html:"Para decir de dónde eres: <b>[país] + 人</b>. Pregunta: 你是哪国人？",items:[["我是西班牙人。","Wǒ shì Xībānyá rén.","Soy español/a."],["他是中国人。","Tā shì Zhōngguó rén.","Él es chino."],["你是哪国人？","Nǐ shì nǎ guó rén?","¿De qué país eres?"]]},
  {t:"table",head:["País","Persona"],rows:[["中国 Zhōngguó — China","中国人"],["西班牙 Xībānyá — España","西班牙人"],["墨西哥 Mòxīgē — México","墨西哥人"],["阿根廷 Āgēntíng — Argentina","阿根廷人"],["美国 Měiguó — EE. UU.","美国人"]]},
  {t:"g",title:"Adjetivos: sujeto + 很 + adjetivo",html:"Con adjetivos <b>no se usa 是</b>. Se pone 很 delante (a menudo sin el sentido fuerte de «muy»).",items:[["我很高兴。","Wǒ hěn gāoxìng.","Estoy contento."],["认识你很高兴。","Rènshi nǐ hěn gāoxìng.","Encantado de conocerte."],["❌ 我是高兴。","—","Incorrecto"]]},
  {t:"dialog",lines:[["A","你好！我叫王明。你叫什么名字？","Nǐ hǎo! Wǒ jiào Wáng Míng. Nǐ jiào shénme míngzi?","¡Hola! Me llamo Wang Ming. ¿Cómo te llamas?"],["B","我叫安娜。","Wǒ jiào Ānnà.","Me llamo Ana."],["A","你是哪国人？","Nǐ shì nǎ guó rén?","¿De qué país eres?"],["B","我是西班牙人。你是中国人吗？","Wǒ shì Xībānyá rén. Nǐ shì Zhōngguó rén ma?","Soy española. ¿Tú eres chino?"],["A","是。认识你很高兴！","Shì. Rènshi nǐ hěn gāoxìng!","Sí. ¡Encantado de conocerte!"],["B","认识你我也很高兴。","Rènshi nǐ wǒ yě hěn gāoxìng.","Yo también estoy encantada."]]}
 ],
 quiz:[
  {q:"«¿Cómo te llamas?»",o:["你叫什么名字？","你是什么吗？","什么你叫名字？","你名字吗？"],a:0},
  {q:"Elige la frase correcta:",o:["我是高兴。","我很高兴。","我高兴是。","很我高兴。"],a:1},
  {q:"«Soy chino» es:",o:["我中国。","我是中国人。","我人中国。","中国是我人。"],a:1},
  {q:"¿Qué falta? 你是___国人？",o:["什么","哪","吗","谁"],a:1},
  {q:"认识 significa:",o:["conocer a alguien","llamarse","estar contento","nombre"],a:0},
  {q:"¿Lleva 吗 una pregunta con 什么?",o:["Sí, siempre","No"],a:1}
 ]
},
{
 n:6, title:"Números y clasificadores", zh:"一、二、三", goal:"Contar hasta 99, preguntar cantidades y usar los clasificadores.",
 blocks:[
  {t:"table",head:["0–5","6–10"],rows:[["零 líng — 0","六 liù — 6"],["一 yī — 1","七 qī — 7"],["二 èr — 2","八 bā — 8"],["三 sān — 3","九 jiǔ — 9"],["四 sì — 4","十 shí — 10"],["五 wǔ — 5",""]]},
  {t:"g",title:"Del 11 al 99: como una suma",html:"十一 = 10+1 = <b>11</b>. 二十 = 2×10 = <b>20</b>. 二十五 = 2×10+5 = <b>25</b>.",items:[["十二","shí'èr","12"],["三十","sānshí","30"],["四十七","sìshíqī","47"],["九十九","jiǔshíjiǔ","99"]]},
  {t:"g",title:"Número + clasificador + sustantivo",html:"Entre el número y el sustantivo <b>siempre</b> va un clasificador (como «una <i>hoja</i> de papel»). El más común es <b>个 ge</b>.",items:[["一个人","yí ge rén","una persona"],["三本书","sān běn shū","tres libros"],["五块钱","wǔ kuài qián","cinco yuanes"],["这个苹果","zhège píngguǒ","esta manzana"]]},
  {t:"tip",html:"Para «dos» delante de un clasificador se usa <b>两 liǎng</b>, no 二: 两个人 (dos personas). 二 se usa al contar y en números: 十二, 二月."},
  {t:"g",title:"¿Cuántos? 几 y 多少",html:"<b>几 + clasificador</b> si esperas un número pequeño (menos de 10). <b>多少</b> para cualquier cantidad; puede ir sin clasificador.",items:[["你有几个朋友？","Nǐ yǒu jǐ ge péngyou?","¿Cuántos amigos tienes?"],["你们学校有多少学生？","Nǐmen xuéxiào yǒu duōshao xuésheng?","¿Cuántos alumnos tiene vuestra escuela?"],["多少钱？","Duōshao qián?","¿Cuánto cuesta?"]]},
  {t:"g",title:"La edad: 岁",html:"岁 funciona como clasificador; aquí no se usa 是.",items:[["你几岁了？","Nǐ jǐ suì le?","¿Cuántos años tienes? (a un niño)"],["你多大了？","Nǐ duō dà le?","¿Cuántos años tienes? (a un adulto)"],["我二十岁。","Wǒ èrshí suì.","Tengo 20 años."]]},
  {t:"g",title:"些 «algunos»",html:"这些 (estos), 那些 (esos), 一些 (algunos). No lleva número delante salvo 一.",items:[["这些书","zhèxiē shū","estos libros"],["我买了一些水果。","Wǒ mǎile yìxiē shuǐguǒ.","Compré algo de fruta."]]},
  {t:"dialog",lines:[["A","你女儿几岁了？","Nǐ nǚ'ér jǐ suì le?","¿Cuántos años tiene tu hija?"],["B","她七岁了。","Tā qī suì le.","Tiene siete años."],["A","她有几本书？","Tā yǒu jǐ běn shū?","¿Cuántos libros tiene?"],["B","她有十本书。","Tā yǒu shí běn shū.","Tiene diez libros."]]}
 ],
 quiz:[
  {q:"¿Cómo se escribe 35?",o:["三五十","三十五","五十三","三十十五"],a:1},
  {q:"«tres libros»",o:["三书","三个书","三本书","书三本"],a:2},
  {q:"«dos personas»",o:["二个人","两个人","二人个","两人"],a:1},
  {q:"Para preguntar el precio:",o:["几钱？","多少钱？","什么钱？","钱吗？"],a:1},
  {q:"«Tengo 8 años»",o:["我是八岁。","我八岁。","我有八岁。","八我岁。"],a:1},
  {q:"四十九 es:",o:["49","94","409","13"],a:0}
 ]
},
{
 n:7, title:"La familia y los demás", zh:"我的家", goal:"Hablar de tu familia, decir lo que tienes y expresar posesión con 的.",
 blocks:[
  {t:"g",title:"Posesión: A 的 B",html:"的 equivale a «de» pero al revés: <b>poseedor + 的 + cosa</b>.",items:[["我的书","wǒ de shū","mi libro"],["老师的电脑","lǎoshī de diànnǎo","el ordenador del profesor"],["这是谁的杯子？","Zhè shì shéi de bēizi?","¿De quién es este vaso?"]]},
  {t:"tip",html:"Con familiares y relaciones cercanas el 的 se suele omitir: 我妈妈 (mi madre), 我朋友 (mi amigo), 我家 (mi casa)."},
  {t:"g",title:"有 tener / 没有 no tener",html:"La negación de 有 es <b>siempre 没有</b> (nunca 不有).",items:[["我有一个儿子。","Wǒ yǒu yí ge érzi.","Tengo un hijo."],["她没有女儿。","Tā méiyǒu nǚ'ér.","Ella no tiene hijas."],["你有中国朋友吗？","Nǐ yǒu Zhōngguó péngyou ma?","¿Tienes amigos chinos?"]]},
  {t:"g",title:"和 «y» entre sustantivos",html:"和 une <b>sustantivos</b>, no frases ni verbos.",items:[["爸爸和妈妈","bàba hé māma","papá y mamá"],["我和你","wǒ hé nǐ","tú y yo"],["我家有爸爸、妈妈和我。","Wǒ jiā yǒu bàba, māma hé wǒ.","En mi familia están papá, mamá y yo."]]},
  {t:"table",head:["Persona","Pinyin","Significado"],rows:[["爸爸","bàba","papá"],["妈妈","māma","mamá"],["儿子","érzi","hijo"],["女儿","nǚ'ér","hija"],["老师","lǎoshī","profesor/a"],["学生","xuésheng","estudiante"],["同学","tóngxué","compañero de clase"],["朋友","péngyou","amigo/a"],["医生","yīshēng","médico/a"],["先生","xiānsheng","señor; marido"],["小姐","xiǎojiě","señorita"]]},
  {t:"tip",html:"Los apellidos van delante: 王先生 (Sr. Wang), 李老师 (profesor Li), 张小姐 (Srta. Zhang)."},
  {t:"dialog",lines:[["A","你家有几个人？","Nǐ jiā yǒu jǐ ge rén?","¿Cuántos sois en tu familia?"],["B","我家有四个人：爸爸、妈妈、我和我儿子。","Wǒ jiā yǒu sì ge rén: bàba, māma, wǒ hé wǒ érzi.","Somos cuatro: papá, mamá, yo y mi hijo."],["A","你爸爸做什么工作？","Nǐ bàba zuò shénme gōngzuò?","¿A qué se dedica tu padre?"],["B","他是医生。我妈妈是老师。","Tā shì yīshēng. Wǒ māma shì lǎoshī.","Es médico. Mi madre es profesora."]]}
 ],
 quiz:[
  {q:"«el libro del profesor»",o:["的老师书","书的老师","老师的书","老师书的"],a:2},
  {q:"«No tengo hijos»",o:["我不有儿子。","我没有儿子。","我有没儿子。","我儿子没。"],a:1},
  {q:"和 une…",o:["frases completas","sustantivos","verbos","adjetivos"],a:1},
  {q:"«Señor Wang»",o:["先生王","王先生","王的先生","先王生"],a:1},
  {q:"同学 significa:",o:["amigo","compañero de clase","profesor","hijo"],a:1}
 ]
},
{
 n:8, title:"Esto, eso y preguntas", zh:"这是什么？", goal:"Señalar cosas y preguntar quién, cuál, dónde y «¿y tú?».",
 blocks:[
  {t:"table",head:["Cerca","Lejos","Pregunta"],rows:[["这 zhè — este","那 nà — ese/aquel","哪 nǎ — ¿cuál?"],["这个 zhège — este (+ sust.)","那个 nàge — ese","哪个 nǎge — ¿cuál?"],["这儿 zhèr — aquí","那儿 nàr — allí","哪儿 nǎr — ¿dónde?"],["这些 zhèxiē — estos","那些 nàxiē — esos","哪些 nǎxiē — ¿cuáles?"]]},
  {t:"g",title:"这/那 + clasificador + sustantivo",html:"Igual que con los números: entre 这/那 y el sustantivo va un clasificador.",items:[["这个人是谁？","Zhège rén shì shéi?","¿Quién es esta persona?"],["那本书是我的。","Nà běn shū shì wǒ de.","Ese libro es mío."],["你要哪个？","Nǐ yào nǎge?","¿Cuál quieres?"]]},
  {t:"g",title:"谁 «quién»",html:"Como 什么, 谁 se queda en la posición de la respuesta.",items:[["他是谁？","Tā shì shéi?","¿Quién es él?"],["谁是你的老师？","Shéi shì nǐ de lǎoshī?","¿Quién es tu profesor?"]]},
  {t:"g",title:"呢: «¿y…?»",html:"<b>Sustantivo + 呢？</b> repite la pregunta anterior sobre otra persona o cosa.",items:[["我很好，你呢？","Wǒ hěn hǎo, nǐ ne?","Estoy bien, ¿y tú?"],["我是学生，他呢？","Wǒ shì xuésheng, tā ne?","Soy estudiante, ¿y él?"],["我的书呢？","Wǒ de shū ne?","¿Y mi libro? (¿dónde está?)"]]},
  {t:"g",title:"都 «todos»",html:"都 va <b>después del sujeto y antes del verbo</b>, nunca delante del sujeto.",items:[["我们都是学生。","Wǒmen dōu shì xuésheng.","Todos somos estudiantes."],["他们都不喝茶。","Tāmen dōu bù hē chá.","Ninguno de ellos bebe té."],["❌ 都我们是学生。","—","Incorrecto"]]},
  {t:"dialog",lines:[["A","那是谁？","Nà shì shéi?","¿Quién es esa?"],["B","那是我的同学。","Nà shì wǒ de tóngxué.","Es mi compañera."],["A","她是哪国人？","Tā shì nǎ guó rén?","¿De qué país es?"],["B","她是中国人。我们都是北京大学的学生。","Tā shì Zhōngguó rén. Wǒmen dōu shì Běijīng Dàxué de xuésheng.","Es china. Las dos estudiamos en la Universidad de Pekín."]]}
 ],
 quiz:[
  {q:"«¿Dónde?»",o:["哪个","哪儿","那儿","这儿"],a:1},
  {q:"Estoy bien, ¿y tú? → 我很好，你___？",o:["吗","呢","的","都"],a:1},
  {q:"Elige la frase correcta:",o:["都我们是老师。","我们是都老师。","我们都是老师。","我们是老师都。"],a:2},
  {q:"«este libro»",o:["这书","这本书","书这本","这个本书"],a:1},
  {q:"¿Qué significa 谁?",o:["qué","quién","cuál","dónde"],a:1}
 ]
},
{
 n:9, title:"Fechas y horas", zh:"今天几月几号？", goal:"Decir la fecha, los días de la semana y la hora.",
 blocks:[
  {t:"g",title:"Fecha: de lo grande a lo pequeño",html:"<b>年 año → 月 mes → 日/号 día → 星期 día de la semana</b>. Los meses son número + 月. 号 es oral; 日 se escribe.",items:[["二〇二六年十一月九日","èr líng èr liù nián shíyī yuè jiǔ rì","9 de noviembre de 2026"],["今天几月几号？","Jīntiān jǐ yuè jǐ hào?","¿Qué fecha es hoy?"],["五月一号","wǔ yuè yī hào","1 de mayo"]]},
  {t:"tip",html:"Los años se leen cifra a cifra: 2026 = 二〇二六 <i>èr líng èr liù</i> nián."},
  {t:"table",head:["Día","Pinyin","Significado"],rows:[["星期一","xīngqīyī","lunes"],["星期二","xīngqī'èr","martes"],["星期三","xīngqīsān","miércoles"],["星期四","xīngqīsì","jueves"],["星期五","xīngqīwǔ","viernes"],["星期六","xīngqīliù","sábado"],["星期日 / 星期天","xīngqīrì / xīngqītiān","domingo"]]},
  {t:"table",head:["Pasado","Presente","Futuro"],rows:[["昨天 zuótiān — ayer","今天 jīntiān — hoy","明天 míngtiān — mañana"],["去年 qùnián — el año pasado","今年 jīnnián — este año","明年 míngnián — el año que viene"]]},
  {t:"g",title:"La hora: 点 y 分",html:"<b>número + 点</b> = en punto; <b>+ número + 分</b> = minutos. 半 bàn = y media. Las partes del día van delante.",items:[["现在几点？","Xiànzài jǐ diǎn?","¿Qué hora es?"],["八点","bā diǎn","las 8"],["三点十分","sān diǎn shí fēn","las 3 y 10"],["下午两点半","xiàwǔ liǎng diǎn bàn","las 2 y media de la tarde"]]},
  {t:"tip",html:"Las 2 en punto son <b>两点 liǎng diǎn</b>, no 二点."},
  {t:"g",title:"¿Dónde va el tiempo en la frase?",html:"La expresión de tiempo va <b>delante del verbo</b>: después del sujeto o al principio. Nunca al final como en español.",items:[["我明天去北京。","Wǒ míngtiān qù Běijīng.","Mañana voy a Pekín."],["明天我去北京。","Míngtiān wǒ qù Běijīng.","Mañana voy a Pekín."],["我星期六上午九点去商店。","Wǒ xīngqīliù shàngwǔ jiǔ diǎn qù shāngdiàn.","El sábado a las 9 de la mañana voy a la tienda."]]},
  {t:"g",title:"…的时候 «cuando…»",html:"<b>[acción] + 的时候</b> = cuando. 什么时候 = ¿cuándo?",items:[["你什么时候回家？","Nǐ shénme shíhou huí jiā?","¿Cuándo vuelves a casa?"],["我吃饭的时候不看电视。","Wǒ chī fàn de shíhou bú kàn diànshì.","Cuando como no veo la tele."]]},
  {t:"dialog",lines:[["A","今天星期几？","Jīntiān xīngqī jǐ?","¿Qué día es hoy?"],["B","今天星期五。","Jīntiān xīngqīwǔ.","Hoy es viernes."],["A","明天你几点去学校？","Míngtiān nǐ jǐ diǎn qù xuéxiào?","¿A qué hora vas mañana a la escuela?"],["B","明天是星期六，我不去学校。","Míngtiān shì xīngqīliù, wǒ bú qù xuéxiào.","Mañana es sábado, no voy a la escuela."]]}
 ],
 quiz:[
  {q:"«miércoles»",o:["星期三","三星期","星期四","三月"],a:0},
  {q:"«Mañana voy a Pekín»",o:["我去北京明天。","我明天去北京。","去北京我明天。","我去明天北京。"],a:1},
  {q:"«las 2 en punto»",o:["二点","两点","二时","两分"],a:1},
  {q:"昨天 es:",o:["hoy","ayer","mañana","anteayer"],a:1},
  {q:"«3 de octubre» →",o:["三月十号","十月三号","十号三月","三号十月"],a:1},
  {q:"«¿Cuándo?»",o:["几点","什么时候","哪儿","多少"],a:1}
 ]
},
{
 n:10, title:"Lugares y posición", zh:"你在哪儿？", goal:"Decir dónde está algo o alguien y dónde haces las cosas.",
 blocks:[
  {t:"g",title:"在 como verbo: «estar en»",html:"<b>A + 在 + lugar</b>.",items:[["我在家。","Wǒ zài jiā.","Estoy en casa."],["你妈妈在哪儿？","Nǐ māma zài nǎr?","¿Dónde está tu madre?"],["医院在学校后面。","Yīyuàn zài xuéxiào hòumiàn.","El hospital está detrás de la escuela."]]},
  {t:"g",title:"在 como preposición: «hacer algo en un lugar»",html:"<b>sujeto + 在 + lugar + verbo</b>. El lugar va <b>antes</b> del verbo.",items:[["我在学校学习汉语。","Wǒ zài xuéxiào xuéxí Hànyǔ.","Estudio chino en la escuela."],["她在医院工作。","Tā zài yīyuàn gōngzuò.","Trabaja en el hospital."],["❌ 我工作在医院。","—","Incorrecto (salvo con 住: 我住在北京)"]]},
  {t:"g",title:"Posición: sustantivo + 上/下/里/前面/后面",html:"La palabra de posición va <b>detrás</b> del objeto de referencia.",items:[["桌子上","zhuōzi shang","sobre la mesa"],["椅子下","yǐzi xià","debajo de la silla"],["杯子里","bēizi li","dentro del vaso"],["商店前面","shāngdiàn qiánmiàn","delante de la tienda"],["家后面","jiā hòumiàn","detrás de casa"]]},
  {t:"g",title:"Lugar + 有 + cosa: «hay»",html:"Para decir «en tal sitio hay…» se empieza por el lugar.",items:[["桌子上有一本书。","Zhuōzi shang yǒu yì běn shū.","Hay un libro sobre la mesa."],["学校前面有一个饭馆。","Xuéxiào qiánmiàn yǒu yí ge fànguǎn.","Delante de la escuela hay un restaurante."]]},
  {t:"table",head:["Lugar","Pinyin","Significado"],rows:[["家","jiā","casa"],["学校","xuéxiào","escuela"],["饭馆","fànguǎn","restaurante"],["商店","shāngdiàn","tienda"],["医院","yīyuàn","hospital"],["火车站","huǒchēzhàn","estación de tren"],["北京","Běijīng","Pekín"],["中国","Zhōngguó","China"]]},
  {t:"dialog",lines:[["A","喂，你在哪儿？","Wèi, nǐ zài nǎr?","¿Diga? ¿Dónde estás?"],["B","我在火车站。你呢？","Wǒ zài huǒchēzhàn. Nǐ ne?","Estoy en la estación. ¿Y tú?"],["A","我在商店里。商店在火车站前面。","Wǒ zài shāngdiàn li. Shāngdiàn zài huǒchēzhàn qiánmiàn.","Estoy en la tienda. La tienda está delante de la estación."],["B","好，我现在去。","Hǎo, wǒ xiànzài qù.","Vale, voy ahora."]]}
 ],
 quiz:[
  {q:"«Trabajo en el hospital»",o:["我工作在医院。","我在医院工作。","在医院我工作是。","我医院在工作。"],a:1},
  {q:"«sobre la mesa»",o:["上桌子","桌子上","桌子下","在上桌子"],a:1},
  {q:"«Hay un gato en casa»",o:["有一只猫在家。","家里有一只猫。","猫有家里。","家有里猫。"],a:1},
  {q:"后面 significa:",o:["delante","detrás","dentro","encima"],a:1},
  {q:"«¿Dónde está la escuela?»",o:["学校在哪儿？","哪儿学校在？","学校是哪儿吗？","在哪儿学校？"],a:0}
 ]
},
{
 n:11, title:"Comer, beber y comprar", zh:"多少钱？", goal:"Pedir comida, decir lo que quieres y preguntar precios.",
 blocks:[
  {t:"g",title:"想 + verbo: «querer hacer»",html:"想 expresa un deseo. Negación: 不想.",items:[["我想喝茶。","Wǒ xiǎng hē chá.","Quiero beber té."],["你想吃什么？","Nǐ xiǎng chī shénme?","¿Qué quieres comer?"],["我不想去商店。","Wǒ bù xiǎng qù shāngdiàn.","No quiero ir a la tienda."]]},
  {t:"tip",html:"想 tiene otros dos sentidos: «pensar» (我想他是老师 — creo que es profesor) y «echar de menos» (我想妈妈 — echo de menos a mamá)."},
  {t:"g",title:"El dinero",html:"Moneda: 人民币 (RMB), unidad 元 yuán; en lenguaje oral <b>块 kuài</b>.",items:[["这个多少钱？","Zhège duōshao qián?","¿Cuánto cuesta esto?"],["十块。","Shí kuài.","10 yuanes."],["苹果多少钱一斤？","Píngguǒ duōshao qián yì jīn?","¿A cuánto está el medio kilo de manzanas?"]]},
  {t:"table",head:["Comida y bebida","Pinyin","Significado"],rows:[["水","shuǐ","agua"],["茶","chá","té"],["米饭","mǐfàn","arroz"],["菜","cài","plato; verdura"],["水果","shuǐguǒ","fruta"],["苹果","píngguǒ","manzana"],["杯子","bēizi","vaso, taza"]]},
  {t:"g",title:"买 + cosa / 去 + lugar + 买 + cosa",html:"Varios verbos seguidos se encadenan en orden lógico: primero vas, luego compras.",items:[["我去商店买东西。","Wǒ qù shāngdiàn mǎi dōngxi.","Voy a la tienda a comprar cosas."],["她想买一些衣服。","Tā xiǎng mǎi yìxiē yīfu.","Quiere comprar algo de ropa."]]},
  {t:"dialog",lines:[["服务员","你好！你们想吃什么？","Nǐ hǎo! Nǐmen xiǎng chī shénme?","¡Hola! ¿Qué quieren comer?"],["A","我想吃米饭和中国菜。","Wǒ xiǎng chī mǐfàn hé Zhōngguó cài.","Quiero arroz y comida china."],["服务员","你们想喝什么？","Nǐmen xiǎng hē shénme?","¿Qué quieren beber?"],["B","我们都喝茶。多少钱？","Wǒmen dōu hē chá. Duōshao qián?","Los dos tomamos té. ¿Cuánto es?"],["服务员","五十八块。","Wǔshíbā kuài.","58 yuanes."]]}
 ],
 quiz:[
  {q:"«Quiero beber agua»",o:["我想喝水。","我喝想水。","水我想喝。","我想水喝。"],a:0},
  {q:"«¿Cuánto cuesta?»",o:["几钱？","多少钱？","什么钱？","钱多少？"],a:1},
  {q:"苹果 es:",o:["fruta","manzana","arroz","té"],a:1},
  {q:"«Voy a la tienda a comprar cosas»",o:["我买东西去商店。","我去商店买东西。","我商店去买东西。","去商店我东西买。"],a:1},
  {q:"块 en «十块» significa:",o:["trozo","yuan","kilo","minuto"],a:1}
 ]
},
{
 n:12, title:"Actividades y capacidades", zh:"我会说汉语", goal:"Hablar de lo que sabes hacer, lo que puedes hacer y lo que estás haciendo.",
 blocks:[
  {t:"g",title:"会 «saber hacer» (habilidad aprendida)",html:"会 + verbo. Algo que aprendiste: un idioma, conducir, cocinar...",items:[["我会说汉语。","Wǒ huì shuō Hànyǔ.","Sé hablar chino."],["你会写汉字吗？","Nǐ huì xiě Hànzì ma?","¿Sabes escribir caracteres?"],["他不会开车。","Tā bú huì kāi chē.","No sabe conducir."]]},
  {t:"g",title:"能 «poder» (posibilidad o permiso)",html:"能 + verbo. Si las circunstancias lo permiten.",items:[["你明天能来吗？","Nǐ míngtiān néng lái ma?","¿Puedes venir mañana?"],["我今天不能去。","Wǒ jīntiān bù néng qù.","Hoy no puedo ir."]]},
  {t:"tip",html:"Diferencia clave: <b>我会游泳</b> (sé nadar) vs <b>我今天不能游泳</b> (hoy no puedo nadar, p. ej. estoy enfermo)."},
  {t:"g",title:"会 «ir a…» (probabilidad futura)",html:"会 también predice algo futuro.",items:[["明天会下雨。","Míngtiān huì xiàyǔ.","Mañana lloverá."],["他会来的。","Tā huì lái de.","Él vendrá (seguro)."]]},
  {t:"g",title:"在 + verbo: acción en curso",html:"(正)在 + verbo (+ 呢) = estar haciendo algo ahora.",items:[["我在看书。","Wǒ zài kàn shū.","Estoy leyendo."],["妈妈在做饭呢。","Māma zài zuò fàn ne.","Mamá está cocinando."],["他在打电话。","Tā zài dǎ diànhuà.","Está hablando por teléfono."]]},
  {t:"table",head:["Verbo","Pinyin","Significado"],rows:[["看","kàn","mirar, leer"],["看见","kànjiàn","ver (lograr ver)"],["听","tīng","escuchar"],["说话","shuōhuà","hablar"],["读","dú","leer (en voz alta)"],["写","xiě","escribir"],["学习","xuéxí","estudiar"],["工作","gōngzuò","trabajar"],["睡觉","shuìjiào","dormir"],["打电话","dǎ diànhuà","llamar por teléfono"],["做","zuò","hacer"]]},
  {t:"dialog",lines:[["A","你会说汉语吗？","Nǐ huì shuō Hànyǔ ma?","¿Sabes hablar chino?"],["B","我会说一点儿。","Wǒ huì shuō yìdiǎnr.","Sé hablar un poco."],["A","你会写汉字吗？","Nǐ huì xiě Hànzì ma?","¿Y escribir caracteres?"],["B","会写一些。我现在在学习。","Huì xiě yìxiē. Wǒ xiànzài zài xuéxí.","Sé escribir algunos. Ahora estoy estudiando."],["A","太好了！","Tài hǎo le!","¡Genial!"]]}
 ],
 quiz:[
  {q:"«Sé hablar chino» (lo he aprendido)",o:["我能说汉语。","我会说汉语。","我想说汉语。","我在说汉语。"],a:1},
  {q:"«Hoy no puedo venir» (tengo trabajo)",o:["我今天不会来。","我今天不能来。","我今天没来。","我不今天能来。"],a:1},
  {q:"«Estoy leyendo»",o:["我在看书。","我看书在。","我会看书。","我看了书。"],a:0},
  {q:"睡觉 significa:",o:["dormir","despertarse","trabajar","estudiar"],a:0},
  {q:"«Mañana lloverá»",o:["明天能下雨。","明天会下雨。","明天想下雨。","下雨明天会。"],a:1}
 ]
},
{
 n:13, title:"Ir, venir y moverse", zh:"我坐飞机去北京", goal:"Hablar de desplazamientos, medios de transporte y objetos de casa.",
 blocks:[
  {t:"g",title:"来 venir / 去 ir / 回 volver",html:"El lugar va justo después del verbo, sin preposición.",items:[["我去北京。","Wǒ qù Běijīng.","Voy a Pekín."],["你来我家吧。","Nǐ lái wǒ jiā ba.","Ven a mi casa."],["他回中国了。","Tā huí Zhōngguó le.","Ha vuelto a China."]]},
  {t:"g",title:"Medio de transporte: 坐 + vehículo + 去 + lugar",html:"坐 = sentarse; con vehículos: ir en. 开 = conducir.",items:[["我坐飞机去北京。","Wǒ zuò fēijī qù Běijīng.","Voy a Pekín en avión."],["我们坐出租车去吧。","Wǒmen zuò chūzūchē qù ba.","Vamos en taxi."],["她开车去医院。","Tā kāi chē qù yīyuàn.","Va al hospital en coche (conduciendo)."]]},
  {t:"g",title:"住在 + lugar «vivir en»",html:"Con 住 el lugar va <b>después</b>.",items:[["我住在北京。","Wǒ zhù zài Běijīng.","Vivo en Pekín."],["你住在哪儿？","Nǐ zhù zài nǎr?","¿Dónde vives?"]]},
  {t:"table",head:["Objeto","Pinyin","Significado"],rows:[["飞机","fēijī","avión"],["出租车","chūzūchē","taxi"],["电视","diànshì","televisión"],["电脑","diànnǎo","ordenador"],["电影","diànyǐng","película"],["桌子","zhuōzi","mesa"],["椅子","yǐzi","silla"],["猫","māo","gato"],["狗","gǒu","perro"]]},
  {t:"tip",html:"Fíjate en el carácter <b>电</b> (electricidad): 电视 tele, 电脑 ordenador («cerebro eléctrico»), 电影 película («sombra eléctrica»), 电话 teléfono («habla eléctrica»)."},
  {t:"dialog",lines:[["A","你什么时候回北京？","Nǐ shénme shíhou huí Běijīng?","¿Cuándo vuelves a Pekín?"],["B","下个月。我坐飞机回去。","Xià ge yuè. Wǒ zuò fēijī huíqu.","El mes que viene. Vuelvo en avión."],["A","你住在哪儿？","Nǐ zhù zài nǎr?","¿Dónde vives?"],["B","我住在学校后面。","Wǒ zhù zài xuéxiào hòumiàn.","Vivo detrás de la escuela."]]}
 ],
 quiz:[
  {q:"«Voy a Pekín en avión»",o:["我去北京坐飞机。","我坐飞机去北京。","飞机我坐去北京。","我坐去北京飞机。"],a:1},
  {q:"«Vivo en Pekín»",o:["我在北京住在。","我住在北京。","我北京住。","住我在北京。"],a:1},
  {q:"电脑 significa:",o:["televisión","teléfono","ordenador","película"],a:2},
  {q:"«volver a casa»",o:["来家","回家","去回家","家回"],a:1},
  {q:"开车 significa:",o:["abrir el coche","conducir","ir en taxi","comprar un coche"],a:1}
 ]
},
{
 n:14, title:"El tiempo y cómo son las cosas", zh:"今天天气怎么样？", goal:"Describir el tiempo y las cosas, y expresar gustos.",
 blocks:[
  {t:"g",title:"怎么样？ «¿Qué tal…?»",html:"Pide una opinión o descripción. Va al final.",items:[["今天天气怎么样？","Jīntiān tiānqì zěnmeyàng?","¿Qué tiempo hace hoy?"],["这个菜怎么样？","Zhège cài zěnmeyàng?","¿Qué tal este plato?"],["我们去看电影，怎么样？","Wǒmen qù kàn diànyǐng, zěnmeyàng?","Vamos al cine, ¿qué te parece?"]]},
  {t:"g",title:"太 + adjetivo + 了 «demasiado / ¡qué…!»",html:"Exclamación o exceso. 不太 + adj. = no muy.",items:[["太热了！","Tài rè le!","¡Qué calor!"],["这个杯子太小了。","Zhège bēizi tài xiǎo le.","Este vaso es demasiado pequeño."],["今天不太冷。","Jīntiān bú tài lěng.","Hoy no hace mucho frío."]]},
  {t:"g",title:"喜欢 / 爱 + sustantivo o verbo",html:"El sujeto es quien siente el gusto (al revés que «me gusta»).",items:[["我喜欢猫。","Wǒ xǐhuan māo.","Me gustan los gatos."],["她喜欢看电影。","Tā xǐhuan kàn diànyǐng.","Le gusta ver películas."],["我爱你。","Wǒ ài nǐ.","Te quiero."]]},
  {t:"table",head:["Adjetivo","Contrario"],rows:[["大 dà — grande","小 xiǎo — pequeño"],["多 duō — mucho","少 shǎo — poco"],["冷 lěng — frío","热 rè — calor"],["好 hǎo — bueno","不好 bù hǎo — malo"],["漂亮 piàoliang — bonito","—"],["高兴 gāoxìng — contento","—"]]},
  {t:"g",title:"一点儿 «un poco»",html:"Detrás del verbo, antes del sustantivo.",items:[["我会说一点儿汉语。","Wǒ huì shuō yìdiǎnr Hànyǔ.","Hablo un poco de chino."],["我想喝一点儿水。","Wǒ xiǎng hē yìdiǎnr shuǐ.","Quiero beber un poco de agua."]]},
  {t:"g",title:"下雨了 — el cambio de situación",html:"了 al final indica que algo <b>ha empezado</b>: ahora llueve (antes no).",items:[["下雨了。","Xià yǔ le.","Se ha puesto a llover."],["天气热了。","Tiānqì rè le.","Ya hace calor."]]},
  {t:"dialog",lines:[["A","北京今天天气怎么样？","Běijīng jīntiān tiānqì zěnmeyàng?","¿Qué tiempo hace hoy en Pekín?"],["B","太冷了！明天会下雨。","Tài lěng le! Míngtiān huì xiàyǔ.","¡Muchísimo frío! Mañana lloverá."],["A","你喜欢北京吗？","Nǐ xǐhuan Běijīng ma?","¿Te gusta Pekín?"],["B","很喜欢。北京很大，也很漂亮。","Hěn xǐhuan. Běijīng hěn dà, yě hěn piàoliang.","Mucho. Pekín es muy grande y muy bonito."]]}
 ],
 quiz:[
  {q:"«¡Qué calor!»",o:["很热了！","太热了！","热太了！","太了热！"],a:1},
  {q:"«¿Qué tal la película?»",o:["电影怎么样？","电影什么？","怎么样电影？","电影吗怎么样？"],a:0},
  {q:"Lo contrario de 多 es:",o:["大","小","少","好"],a:2},
  {q:"«Me gusta beber té»",o:["喝茶喜欢我。","我喜欢喝茶。","我喝茶喜欢。","喜欢我喝茶。"],a:1},
  {q:"下雨了 significa:",o:["llovió ayer","se ha puesto a llover","no llueve","lloverá"],a:1}
 ]
},
{
 n:15, title:"El pasado: 了 y 没", zh:"你吃饭了吗？", goal:"Hablar de acciones terminadas y negarlas, y preguntar cómo o por qué.",
 blocks:[
  {t:"g",title:"verbo + 了: acción completada",html:"En chino no hay tiempos verbales. 了 marca que la acción <b>se ha completado</b>.",items:[["我吃了。","Wǒ chī le.","Ya he comido."],["我买了三个苹果。","Wǒ mǎile sān ge píngguǒ.","He comprado tres manzanas."],["他昨天去北京了。","Tā zuótiān qù Běijīng le.","Ayer fue a Pekín."]]},
  {t:"g",title:"Pregunta: ¿…了吗？ / ¿…了没有？",html:"",items:[["你吃饭了吗？","Nǐ chī fàn le ma?","¿Has comido? (también es un saludo)"],["你看了没有？","Nǐ kànle méiyǒu?","¿Lo has visto o no?"]]},
  {t:"g",title:"Negación del pasado: 没 + verbo (¡sin 了!)",html:"Para decir que algo <b>no ocurrió</b> se usa 没(有) y se quita 了.",items:[["我没去学校。","Wǒ méi qù xuéxiào.","No fui a la escuela."],["他没看见我。","Tā méi kànjiàn wǒ.","No me vio."],["❌ 我没去了。","—","Incorrecto"]]},
  {t:"table",head:["","不 bù","没 méi"],rows:[["Uso","presente, futuro, costumbres, deseos","pasado (no ocurrió); con 有"],["Ejemplo","我不喝茶 (no tomo té)","我没喝茶 (no tomé té)"],["Con 有","❌ 不有","✅ 没有"],["Con 是","✅ 不是","❌ 没是"]]},
  {t:"g",title:"怎么 «cómo» y «por qué»",html:"怎么 + verbo = ¿cómo se hace? En tono de sorpresa = ¿cómo es que…?",items:[["这个字怎么读？","Zhège zì zěnme dú?","¿Cómo se lee este carácter?"],["你怎么去学校？","Nǐ zěnme qù xuéxiào?","¿Cómo vas a la escuela?"],["你怎么没来？","Nǐ zěnme méi lái?","¿Cómo es que no viniste?"]]},
  {t:"dialog",lines:[["A","你昨天怎么没来学校？","Nǐ zuótiān zěnme méi lái xuéxiào?","¿Por qué no viniste ayer a la escuela?"],["B","我去医院了。","Wǒ qù yīyuàn le.","Fui al hospital."],["A","医生怎么说？","Yīshēng zěnme shuō?","¿Qué dijo el médico?"],["B","没关系，我现在很好。","Méi guānxi, wǒ xiànzài hěn hǎo.","No es nada, ahora estoy bien."],["A","太好了！你吃饭了吗？","Tài hǎo le! Nǐ chī fàn le ma?","¡Genial! ¿Has comido?"],["B","还没吃。我们去饭馆吧！","Hái méi chī. Wǒmen qù fànguǎn ba!","Todavía no. ¡Vamos al restaurante!"]]}
 ],
 quiz:[
  {q:"«No fui a la tienda»",o:["我不去商店了。","我没去商店。","我没去商店了。","我去没商店。"],a:1},
  {q:"«He comprado dos libros»",o:["我买了两本书。","我了买两本书。","我买两本书没。","我没买两本书了。"],a:0},
  {q:"«No tomo café (nunca)»",o:["我没喝咖啡。","我不喝咖啡。","我喝没咖啡。","我不喝了咖啡。"],a:1},
  {q:"«¿Cómo se lee este carácter?»",o:["这个字什么读？","这个字怎么读？","怎么这个字读？","这个字读怎么？"],a:1},
  {q:"La negación de 有 es:",o:["不有","没有","不是","没是"],a:1},
  {q:"你吃饭了吗？ se usa también como…",o:["despedida","saludo informal","disculpa"],a:1}
 ]
}
];

// Radicales frecuentes en HSK 1
window.HSK_RADICALS = [
 ["亻","persona","你 他 们 作 住 做 候 什"],["口","boca","吃 喝 叫 吗 呢 哪 听 号"],["女","mujer","她 好 妈 姐"],["氵","agua","没 汉 漂"],["讠","palabra","说 话 语 请 谢 读 认 识 谁"],["木","árbol, madera","本 杯 校 椅 桌 机 样"],["日","sol, día","明 昨 时 星 是"],["月","luna / carne","朋 期 服 脑 有 能"],["饣","comida","饭 馆"],["扌","mano","打"],["宀","techo","家 客 字"],["艹","hierba","茶 菜 苹"],["钅","metal","钱 钟"],["犭","animal","猫 狗"],["心","corazón","想 怎"],["灬","fuego","点 热"],["阝","colina / ciudad","那 都 院"],["目","ojo","看 睡"]
];
