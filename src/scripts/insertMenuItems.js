let list = [
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Margarita", "description" :
            {"es" : "Tomate, mozzarella y orégano.",
        "ca" : "Tomàquet, mozzarella i orenga.",
        "en": "Tomato, mozzarella and oregano."},
        "price" : 950},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Júlia", "description" :
            {"es" : "Tomate, mozzarella y jamón York.",
            "ca" : "Tomàquet, mozzarella i pernil dolç.",
            "en": "Tomato, mozzarella and York ham."},
        "price" : 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Alba", "description" :
            {"es" : "Tomate, mozzarella y beicon",
            "ca" : "Tomàquet, mozzarella i bacó",
            "en": "Tomato, mozzarella and bacon"},
        "price" : 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Peperoni", "description" :
            {"es" : "Tomate, mozzarella y peperoni",
            "ca" : "Tomàquet, mozzarella i peperoni",
            "en": "Tomato, mozzarella and pepperoni"},
        "price" : 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Rufus", "description" :
            {"es" : "cheddar y champiñones",
            "ca" : "Cheddar i xampinyons",
            "en": "cheddar and mushrooms"},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Aida", "description" :
            {"es" : "Tomate, mozzarella, atún y cebolla.",
            "ca" : "Tomàquet, mozzarella, tonyina i ceba.",
            "en": "Tomato, mozzarella, tuna and onion."},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Hot dog", "description" :
            {"es" : "Tomate, mozzarella y Frankfurt.",
            "ca" : "Tomàquet, mozzarella i Frankfurt.",
            "en": "Tomato, mozzarella and Frankfurt."},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Rebbq", "description" :
            {"es" : "tomàquet, mozzarella salsa barbacoa I bacó.",
            "ca" : "Tomàquet, mozzarella salsa barbacoa I bacó.",
            "en": "tomàquet, mozzarella barbecue sauce I bacó."},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Frontera", "description" :
            {"es" : "Tomate, mozzarellaj piña y jamón York",
            "ca" : "Tomàquet, mozzarellaj pinya i pernil dolç",
            "en": "Tomato, pineapple mozzarellaj and York ham"},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Laia", "description" :
            {"es" : "Tomate, mozzarella, calabacin, champiñones y pimiento rojo",
            "ca" : "Tomàquet, mozzarella, carbassó, xampinyons i pebrot vermell",
            "en": "Tomato, mozzarella, zucchini, mushrooms and red pepper"},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Surt de casa", "description" :
            {"es" : "Tomate, mozzarella, atún y beicon.",
            "ca" : "Tomàquet, mozzarella, tonyina i bacó.",
            "en": "Tomato, mozzarella, tuna and bacon."},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza M'és igual", "description" :
            {"es" : "Tomate, mozzarella, beicon y champiñones.",
            "ca" : "Tomàquet, mozzarella, bacó i xampinyons.",
            "en": "Tomato, mozzarella, bacon and mushrooms."},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Belén", "description" :
            {"es" : "Tomate, mozzarella, cheddar, gouda, gorgonzola.",
            "ca" : "Tomàquet, mozzarella, cheddar, gouda, gorgonzola.",
            "en": "Tomato, mozzarella, cheddar, gouda, gorgonzola."},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Anna", "description" :
            {"es" : "Tomate, mozzarella, polloy champiñones",
            "ca" : "Tomàquet, mozzarella, polloy xampinyons",
            "en": "Tomato, mozzarella, chicken and mushrooms"},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza No sóc ningú", "description" :
            {"es" : "Tomate, mozzarella, bbq y pollo.",
            "ca" : "Tomàquet, mozzarella, bbq i pollastre.",
            "en": "Tomato, mozzarella, bbq and chicken."},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Mcda", "description" :
            {"es" : "Tomate, mozzarella, carne picada, cebolla y pimiento rojo.",
            "ca" : "Tomàquet, mozzarella, carn picada, ceba i pebrot vermell.",
            "en": "Tomato, mozzarella, minced meat, onion and red pepper."},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Azahara", "description" :
            {"es" : "Tomate, mozzarella, espinacas, queso de cabra y cebolla",
            "ca" : "Tomàquet, mozzarella, espinacs, formatge de cabra i ceba",
            "en": "Tomato, mozzarella, spinach, goat cheese and onion"},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Adri Punky", "description" :
            {"es" : "beicon queso de cabra y cebolla.",
            "ca" : "Bacó formatge de cabra i ceba.",
            "en": "bacon goat cheese and onion."},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Sylvestris", "description" :
            {"es" : "Tomate, mozzarella, berenjena, calabacin, pimiento rojo y cebolla.",
            "ca" : "Tomàquet, mozzarella, albergínia, carbassó, pebrot vermell i ceba.",
            "en": "Tomato, mozzarella, aubergine, zucchini, red pepper and onion."},
        "price": 1090},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Ingrid", "description" :
            {"es" : "Tomate, mozzarella, tomate fresco, berenjena y queso de cabra.",
            "ca" : "Tomàquet, mozzarella, tomàquet fresc, albergínia i formatge de cabra.",
            "en": "Tomato, mozzarella, fresh tomato, aubergine and goat cheese."},
        "price": 1360},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Cordia", "description" :
            {"es" : "salsa carbonara, mozzarella, beicon, champiñones, cebolla.",
            "ca" : "Salsa carbonara, mozzarella, bacó, xampinyons, ceba.",
            "en": "Carbonara sauce, mozzarella, bacon, mushrooms, onion."},
        "price": 1360},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Arnau", "description" :
            {"es" : "Tomate, mozzarella, beicon, pollo, carne picada, cebolla, maíz",
            "ca" : "Tomàquet, mozzarella, bacó, pollastre, carn picada, ceba, blat de moro",
            "en": "Tomato, mozzarella, bacon, chicken, minced meat, onion, corn"},
        "price": 1360},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Mar", "description" :
            {"es" : "mozzarella, salsa bbq, pollo, carne picada, cebolla y pimiento rojo, maiz",
            "ca" : "Mozzarella, salsa bbq, pollastre, carn picada, ceba i pebrot vermell, blat de moro",
            "en": "mozzarella, bbq sauce, chicken, minced meat, onion and red pepper, corn"},
        "price": 1360},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Fes Un Mos", "description" :
            {"es" : "Tomate, mozzarella, butifarra fresca, jamón serrano, pimiento rojo",
            "ca" : "Tomàquet, mozzarella, botifarra fresca, pernil serrà, pebrot vermell",
            "en": "Tomato, mozzarella, fresh sausage, Serrano ham, red pepper"},
        "price": 1360},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Marina", "description" :
            {"es" : "Tomate, mozzarella, cangrejo, atún",
            "ca" : "Tomàquet, mozzarella, cranc, tonyina",
            "en": "Tomato, mozzarella, crab, tuna"},
        "price": 1360},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Margarita", "description" :
            {"es" : "Tomate, mozzarella y orégano.",
            "ca" : "Tomàquet, mozzarella i orenga.",
            "en": "Tomato, mozzarella and oregano."},
        "price" : 1750},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Júlia", "description" :
            {"es" : "Tomate, mozzarella y jamón York.",
            "ca" : "Tomàquet, mozzarella i pernil dolç.",
            "en": "Tomato, mozzarella and York ham."},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Alba", "description" :
            {"es" : "Tomate, mozzarella y beicon",
            "ca" : "Tomàquet, mozzarella i bacó",
            "en": "Tomato, mozzarella and bacon"},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Peperoni", "description" :
            {"es" : "Tomate, mozzarella y peperoni.",
            "ca" : "Tomàquet, mozzarella i peperoni.",
            "en": "Tomato, mozzarella and pepperoni."},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Rufus", "description" :
            {"es" : "Tomate, mozzarella, cheddar y champiñones.",
            "ca" : "Tomàquet, mozzarella, cheddar i xampinyons.",
            "en": "Tomato, mozzarella, cheddar and mushrooms."},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Aida", "description" :
            {"es" : "Tomate, mozzarella, atún y cebolla",
            "ca" : "Tomàquet, mozzarella, tonyina i ceba",
            "en": "Tomato, mozzarella, tuna and onion"},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Hot dog", "description" :
            {"es" : "Tomate, mozzarella y Frankfurt.",
            "ca" : "Tomàquet, mozzarella i Frankfurt.",
            "en": "Tomato, mozzarella and Frankfurt."},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Rebbq", "description" :
            {"es" : "Tomate, mozzarella salsa barbacoa y beicon.",
            "ca" : "Tomàquet, mozzarella salsa barbacoa i bacó.",
            "en" : "Tomato, mozzarella barbecue sauce and bacon."},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Frontera", "description" :
            {"es" : "Tomate, mozzarella, pifia y jam6n York.",
            "ca" : "Tomàquet, mozzarella, pífia i jam6n York.",
            "en": "Tomato, mozzarella, pineapple and York ham."},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Laia", "description" :
            {"es" : "calabacin, champiñones y pimiento rojo",
            "ca" : "Carbassó, xampinyons i pebrot vermell",
            "en": "zucchini, mushrooms and red pepper"},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Surt de casa", "description" :
            {"es" : "Tomate, mozzarella, atún y beicon",
            "ca" : "Tomàquet, mozzarella, tonyina i bacó",
            "en": "Tomato, mozzarella, tuna and bacon"},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar M'és igual", "description" :
            {"es" : "Tomate, mozzarella, beicon y champiñones.",
            "ca" : "Tomàquet, mozzarella, bacó i xampinyons.",
            "en": "Tomato, mozzarella, bacon and mushrooms."},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Belén", "description" :
            {"es" : "Tomate, mozzarella, cheddar, gouda, gorgonzola",
            "ca" : "Tomàquet, mozzarella, cheddar, gouda, gorgonzola",
            "en": "Tomato, mozzarella, cheddar, gouda, gorgonzola"},
        "price" : 1820},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Anna", "description" :
            {"es" : "Tomate, mozzarella, pollo y champiñones",
            "ca" : "Tomàquet, mozzarella, pollastre i xampinyons",
            "en": "Tomato, mozzarella, chicken and mushrooms"},
        "price" : 1920},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar No sóc ningú", "description" :
            {"es" : "Tomate, mozzarella, bbq y pollo",
            "ca" : "Tomàquet, mozzarella, bbq i pollastre",
            "en": "Tomato, mozzarella, bbq and chicken"},
        "price" : 1920},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Mcda", "description" :
            {"es" : "Tomate, mozzarella, carne picada, cebolla y pimiento rojo",
            "ca" : "Tomàquet, mozzarella, carn picada, ceba i pebrot vermell",
            "en": "Tomato, mozzarella, minced meat, onion and red pepper"},
        "price" : 1920},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Azahara", "description" :
            {"es" : "espinacas, queso de cabra y cebolla.",
            "ca" : "Espinacs, formatge de cabra i ceba.",
            "en": "spinach, goat cheese and onion."},
        "price" : 1920},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Adri Punky", "description" :
            {"es" : "Tomate, mozzarella, beicon, queso de cabra y cebolla",
            "ca" : "Tomàquet, mozzarella, bacó, formatge de cabra i ceba",
            "en": "Tomato, mozzarella, bacon, goat cheese and onion"},
        "price" : 1920},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Sylvestris", "description" :
            {"es" : "Tomate, mozzarella, berenjena, calabacin, pimiento rojo y cebolla.",
            "ca" : "Tomàquet, mozzarella, albergínia, carbassó, pebrot vermell i ceba.",
            "en": "Tomato, mozzarella, aubergine, zucchini, red pepper and onion."},
        "price" : 1920},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Ingrid", "description" :
            {"es" : "Tomate, mozzarella, tomate fresco, berenjena y queso de cabra",
            "ca" : "Tomàquet, mozzarella, tomàquet fresc, albergínia i formatge de cabra",
            "en": "Tomato, mozzarella, fresh tomato, aubergine and goat cheese"},
        "price" : 2100},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Cordia", "description" :
            {"es" : "Salsa carbonara, mozzarella, beicon, champiñones, cebolla.",
            "ca" : "Salsa carbonara, mozzarella, bacó, xampinyons, ceba.",
            "en": "Carbonara sauce, mozzarella, bacon, mushrooms, onion."},
        "price" : 2100},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Arnau", "description" :
            {"es" : "Tomate, mozzarella, beicon, pollo, carne picada, cebolla, maíz",
            "ca" : "Tomàquet, mozzarella, bacó, pollastre, carn picada, ceba, blat de moro",
            "en": "Tomato, mozzarella, bacon, chicken, minced meat, onion, corn"},
        "price" : 2100},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Mar", "description" :
            {"es" : "Tomate, mozzarella, salsa bbq, pollo, carne picada, cebolla y pimiento rojo, maiz.",
            "ca" : "Tomàquet, mozzarella, salsa bbq, pollastre, carn picada, ceba i pebrot vermell, blat de moro.",
            "en": "Tomato, mozzarella, bbq sauce, chicken, minced meat, onion and red pepper, corn."},
        "price" : 2100},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Fes Un Mos", "description" :
            {"es" : "Tomate, mozzarella, butifarra fresca, jamón serrano, pimiento rojo.",
            "ca" : "Tomàquet, mozzarella, botifarra fresca, pernil serrà, pebrot vermell.",
            "en": "Tomato, mozzarella, fresh sausage, Serrano ham, red pepper."},
        "price" : 2100},
    {"category": "food", "subCategory" : "pizza", "title" : "Pizza Familiar Marina", "description" :
            {"es" : "Tomate, mozzarella, cangrejo, atún, gambas",
            "ca" : "Tomàquet, mozzarella, cranc, tonyina, gambes",
            "en": "Tomato, mozzarella, crab, tuna, prawns"},
        "price" : 2100},

    {"title": "Café solo"
        , "description" : {
            "es" : "Café solo",
            "en" : "Espresso",
            "ca" : "Cafè espresso",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 120, "subCategory" : "coffe"},

    {"title": "Café solo descafeinado de sobre"
        , "description" : {
            "es" : "Café solo descafeinado de sobre",
            "en" : "Envelope decaffeinated coffee",
            "ca" : "Cafè descafeinat de sobre",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 120, "subCategory" : "coffe"},

    {"title": "Café solo con hielo"
        , "description" : {
            "es" : "Cafe solo con hielo",
            "en" : "Black coffee with ice",
            "ca" : "Cafè amb gel",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 130, "subCategory" : "coffe"},
    {"title": "Café cortado"
        , "description" : {
            "es" : "Café cortado",
            "en" : "Espresso with a dash of milk",
            "ca" : "Tallat",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 130, "subCategory" : "coffe"},
    {"title": "Café cortado descafeinado de sobre"
        , "description" : {
            "es" : "Café cortado descafeinado de sobre",
            "en" : "Decaffeinated coffe with a dash of milk",
            "ca" : "Tallat descafeinat de sobre",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 130, "subCategory" : "coffe"},
    {"title": "Café cortado +hielo"
        , "description" : {
            "es" : "Café cortado +hielo",
            "en" : "Cut coffee + ice",
            "ca" : "Tallat amb gel",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 140, "subCategory" : "coffe"},
    {"title": "Café con leche"
        , "description" : {
            "es" : "Café con leche",
            "en" : "Latte",
            "ca" : "Cafè amb llet",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 140, "subCategory" : "coffe"},
    {"title": "Café con leche descafeinado de sobre"
        , "description" : {
            "es" : "Café con leche descafeinado de sobre",
            "en" : "Decaffeinated coffee with milk from sachet",
            "ca" : "Cafè amb llet descafeinat de sobre",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 140, "subCategory" : "coffe"},
    {"title": "Café con leche +hielo"
        , "description" : {
            "es" : "Café con leche y hielo",
            "en" : "Latte with ice",
            "ca" : "Cafè amb llet i gel",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 155, "subCategory" : "coffe"},
    {"title": "Café con leche grande"
        , "description" : {
            "es" : "Café con leche grande",
            "en" : "Latte large",
            "ca" : "Cafè amb llet gran",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 160, "subCategory" : "coffe"},
    {"title": "Café con leche grande descafe. sobre"
        , "description" : {
            "es" : "Café con leche grande descafeinado de sobre",
            "en" : "Large late decaffeinated",
            "ca" : "Cafè amb llet gran descafeinat de sobre",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 160, "subCategory" : "coffe"},
    {"title": "Café con leche grande +hielo"
        , "description" : {
            "es" : "Café con leche grande con hielo",
            "en" : "Large latte with ice",
            "ca" : "Cafè amb llet gran amb gel",
        },
        "category" : "drink",
        "priority" : 3
        , "price" : 175, "subCategory" : "coffe"},

    {"title" : "Té verde",
        "description" : {
            "es" : "Té verde",
            "ca" : "Te verd",
            "en" : "Green Tea",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Té verde sencha con cerezas",
        "description" : {
            "es" : "Té verde sencha con cerezas",
            "ca" : "Te verd sencha amb cireres",
            "en" : "Sencha green tea with cherries",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Té verde crema catalana",
        "description" : {
            "es" : "Té verde crema catalana",
            "ca" : "Te verd crema catalana",
            "en" : "Catalan cream green tea",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Té rojo pu-erh",
        "description" : {
            "es" : "Té rojo pu-erh",
            "ca" : "Te vermell pu-erh",
            "en" : "Pu-erh red tea",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Té rojo cuerpo del deseo",
        "description" : {
            "es" : "Té rojo cuerpo del deseo",
            "ca" : "Te vermell cos de desig",
            "en" : "Desire Body Red Tea",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Té negro chocolate y menta",
        "description" : {
            "es" : "Té negro chocolate y menta",
            "ca" : "Te negre xocolata i menta",
            "en" : "Chocolate and mint black tea",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Té negro ceylan",
        "description" : {
            "es" : "Té negro ceylan",
            "ca" : "Te negre Ceylan",
            "en" : "Ceylan black tea",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Menta",
        "description" : {
            "es" : "Menta",
            "ca" : "Menta",
            "en" : "Mint",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Camomila",
        "description" : {
            "es" : "Camomila",
            "ca" : "Camamilla",
            "en" : "Camomile",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Digesti",
        "description" : {
            "es" : "Digesti",
            "ca" : "Digestiu",
            "en" : "Digesti",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Frutas del bosque",
        "description" : {
            "es" : "Frutas del bosque",
            "ca" : "Fruites de bosc",
            "en" : "Berries",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Rooibos relax",
        "description" : {
            "es" : "Rooibos relax",
            "ca" : "rooibos relax",
            "en" : "Rooibos relax",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,

    },
    {"title" : "Rooibos Copacabana",
        "description" : {
            "es" : "Rooibos Copacabana",
            "ca" : "Rooibos Copacabana",
            "en" : "Rooibos Copacabana",
        },
        "category" : "drink",
        "subCategory" : "tea",
        "price" : 145,
        "priority" : 5,
    },
    {"title":"Estrella damm caña pequeña", "price" : 160, "category" : "drink", "subCategory": "tap", "priority" : 1},
    {"title":"Estrella damm limón pequeña", "price" : 160, "category" : "drink", "subCategory": "tap", "priority" : 1},
    {"title":"Estrella damm vaso mediano", "price" : 200, "category" : "drink", "subCategory": "tap", "priority" : 1},
    {"title":"Estrella damm limón vaso mediano", "price" : 200, "category" : "drink", "subCategory": "tap", "priority" : 1},
    {"title":"Estrella damm jarra", "price" : 300, "category" : "drink", "subCategory": "tap", "priority" : 1},
    {"title":"Estrella damm limón jarra", "price" : 300, "category" : "drink", "subCategory": "tap", "priority" : 1},
    {"title":"Estrella damm", "price" : 200, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Daura sin gluten", "price" : 220, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Voll damm", "price" : 220, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Daura doble Malta sin gluten", "price" : 250, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Free damm sin alcohol sin gluten", "price" : 200, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Complot ipa", "price" : 300, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Coronita", "price" : 250, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Desperados", "price" : 250, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Desperados mojito", "price" : 250, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Heineken", "price" : 250, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Alhambra especial", "price" : 200, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Alhambra 1925", "price" : 250, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"1906 reserva", "price" : 250, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"1906 red vintage", "price" : 250, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Sister scoth ale", "price" : 300, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Cerdos voladores", "price" : 300, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Big bear (gluten free)", "price" : 300, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Ninña Barbuda", "price" : 350, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Guiness draufht", "price" : 300, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Guiness export", "price" : 350, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Judas", "price" : 300, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Delirium tremens", "price" :350, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Punk ipa", "price" : 300, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Cherie (cereza)", "price" : 350, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Beltzebuth", "price" : 350, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Beltzebuth roja", "price" : 350, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Beltzebuth rosa", "price" : 350, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Gulden Draak", "price" : 350, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"666", "price" : 350, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Duvel", "price" : 350, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Franziskaner weissbier", "price" : 300, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Franziskaner dunkel", "price" : 300, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Franziskaner alkohofrei sin alcohol", "price" : 300, "category" : "drink", "subCategory": "beer", "priority" : 2},
    {"title":"Chimay azul", "price" : 350, "category" : "drink", "subCategory": "beer", "priority" : 2},
];

const requestModule = require('request')

for (let item in list) {
    requestModule.post({url: 'http://localhost:3005/api/v1/menu/6426e2738cc988c49526c433', form: list[item]}, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });
}
