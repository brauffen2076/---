// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let userProfile = {
    height: null,
    weight: null,
    age: null,
    gender: 'male',
    diseases: [],
    saved: false,
    bmi: null
};

let selectedMeals = {
    breakfast: null,
    lunch: null,
    snack: null,
    dinner: null
};

let selectedProducts = [];
let currentSymptoms = '';
let currentTime = new Date().getHours();

// БАЗА ДАННЫХ ЗАБОЛЕВАНИЙ
const DISEASES_DB = {
    sibr: { 
        name: "СИБР", 
        icon: "🦠",
        restrictions: ["лактоза", "фруктоза", "фруктаны", "галактаны", "полиолы"],
        recommendations: "Низко-FODMAP диета, пробиотики, ферменты",
        nutrients: { fiber: "limited", fat: "low", protein: "normal" }
    },
    ibs: { 
        name: "СРК", 
        icon: "🌪️",
        restrictions: ["глютен", "молочное", "бобовые", "капуста", "лук", "чеснок"],
        recommendations: "Регулярное питание, исключение триггеров",
        nutrients: { fiber: "soluble", fat: "low", protein: "normal" }
    },
    pancreatitis: { 
        name: "Панкреатит", 
        icon: "🎯",
        restrictions: ["жирное", "жареное", "алкоголь", "наваристые бульоны"],
        recommendations: "Дробное питание 5-6 раз, низкожировая диета",
        nutrients: { fiber: "low", fat: "veryLow", protein: "high" }
    },
    gallbladder: { 
        name: "Желчный", 
        icon: "🌀",
        restrictions: ["жирное", "жареное", "яйца", "сдоба", "холодное"],
        recommendations: "Диета №5, теплая пища, желчегонные продукты",
        nutrients: { fiber: "normal", fat: "low", protein: "normal" }
    },
    gastritis: { 
        name: "Гастрит", 
        icon: "🔥",
        restrictions: ["острое", "кислое", "кофе", "шоколад", "цитрусовые"],
        recommendations: "Щадящая диета, теплая пища, исключение раздражителей",
        nutrients: { fiber: "cooked", fat: "normal", protein: "normal" }
    },
    celiac: { 
        name: "Целиакия", 
        icon: "🌾",
        restrictions: ["глютен", "пшеница", "рожь", "ячмень", "овес"],
        recommendations: "Строгая безглютеновая диета",
        nutrients: { fiber: "glutenFree", fat: "normal", protein: "normal" }
    },
    constipation: { 
        name: "Запор", 
        icon: "🐌",
        restrictions: ["белый хлеб", "рис", "манка", "крепкий чай"],
        recommendations: "Высокая клетчатка, обильное питье, чернослив",
        nutrients: { fiber: "high", fat: "normal", protein: "normal" }
    },
    diarrhea: { 
        name: "Диарея", 
        icon: "💧",
        restrictions: ["молочное", "клетчатка", "жирное", "бобовые"],
        recommendations: "Вяжущие продукты, регидратация, BRAT диета",
        nutrients: { fiber: "low", fat: "low", protein: "normal" }
    },
    gerd: { 
        name: "ГЭРБ", 
        icon: "⬆️",
        restrictions: ["кофе", "шоколад", "мята", "томаты", "жирное"],
        recommendations: "Дробное питание, не ложиться после еды",
        nutrients: { fiber: "normal", fat: "low", protein: "normal" }
    }
};

// РАСШИРЕННАЯ БАЗА ПРОДУКТОВ ПО НУТРИЕНТАМ (150+ продуктов)
const PRODUCTS_DATABASE = {
    protein: [
        {id: 'p1', name: 'Куриная грудка', icon: '🍗', protein: 31, carbs: 0, fat: 3.6, fiber: 0, calories: 165, category: 'Мясо птицы', type: 'Животный белок'},
        {id: 'p2', name: 'Индейка', icon: '🦃', protein: 29, carbs: 0, fat: 2.7, fiber: 0, calories: 135, category: 'Мясо птицы', type: 'Животный белок'},
        {id: 'p3', name: 'Говядина постная', icon: '🥩', protein: 26, carbs: 0, fat: 8, fiber: 0, calories: 180, category: 'Красное мясо', type: 'Животный белок'},
        {id: 'p4', name: 'Тунец консервированный', icon: '🐟', protein: 25, carbs: 0, fat: 1, fiber: 0, calories: 116, category: 'Рыба', type: 'Животный белок'},
        {id: 'p5', name: 'Лосось', icon: '🐠', protein: 22, carbs: 0, fat: 13, fiber: 0, calories: 206, category: 'Рыба', type: 'Животный белок'},
        {id: 'p6', name: 'Творог обезжиренный', icon: '🧀', protein: 18, carbs: 3, fat: 0.5, fiber: 0, calories: 90, category: 'Молочные', type: 'Животный белок'},
        {id: 'p7', name: 'Греческий йогурт', icon: '🥛', protein: 10, carbs: 4, fat: 0, fiber: 0, calories: 59, category: 'Молочные', type: 'Животный белок'},
        {id: 'p8', name: 'Яйца куриные', icon: '🥚', protein: 13, carbs: 1, fat: 11, fiber: 0, calories: 155, category: 'Яйца', type: 'Животный белок'},
        {id: 'p9', name: 'Креветки', icon: '🦐', protein: 24, carbs: 0, fat: 1, fiber: 0, calories: 106, category: 'Морепродукты', type: 'Животный белок'},
        {id: 'p10', name: 'Тофу', icon: '🧈', protein: 8, carbs: 2, fat: 4, fiber: 1, calories: 76, category: 'Растительные', type: 'Растительный белок'},
        {id: 'p11', name: 'Чечевица', icon: '🥣', protein: 9, carbs: 20, fat: 0.4, fiber: 8, calories: 116, category: 'Бобовые', type: 'Растительный белок'},
        {id: 'p12', name: 'Нут', icon: '🌰', protein: 8, carbs: 27, fat: 2, fiber: 8, calories: 164, category: 'Бобовые', type: 'Растительный белок'},
        {id: 'p13', name: 'Фасоль красная', icon: '🫘', protein: 8, carbs: 22, fat: 0.5, fiber: 6, calories: 127, category: 'Бобовые', type: 'Растительный белок'},
        {id: 'p14', name: 'Киноа', icon: '🌾', protein: 4, carbs: 21, fat: 2, fiber: 3, calories: 120, category: 'Крупы', type: 'Растительный белок'},
        {id: 'p15', name: 'Гречка', icon: '🥣', protein: 13, carbs: 71, fat: 3, fiber: 10, calories: 343, category: 'Крупы', type: 'Растительный белок'},
        {id: 'p16', name: 'Миндаль', icon: '🌰', protein: 21, carbs: 22, fat: 49, fiber: 12, calories: 579, category: 'Орехи', type: 'Растительный белок'},
        {id: 'p17', name: 'Тыквенные семечки', icon: '🎃', protein: 30, carbs: 11, fat: 49, fiber: 6, calories: 559, category: 'Семена', type: 'Растительный белок'},
        {id: 'p18', name: 'Семена чиа', icon: '✨', protein: 17, carbs: 42, fat: 31, fiber: 34, calories: 486, category: 'Семена', type: 'Растительный белок'},
        {id: 'p19', name: 'Спирулина', icon: '🌀', protein: 57, carbs: 24, fat: 7, fiber: 4, calories: 290, category: 'Водоросли', type: 'Растительный белок'},
        {id: 'p20', name: 'Протеиновый порошок', icon: '🥤', protein: 80, carbs: 5, fat: 3, fiber: 0, calories: 370, category: 'Добавки', type: 'Белковая добавка'}
    ],
    carbs: [
        {id: 'c1', name: 'Овсяные хлопья', icon: '🌾', protein: 13, carbs: 66, fat: 7, fiber: 10, calories: 389, category: 'Крупы', type: 'Сложные углеводы'},
        {id: 'c2', name: 'Киноа', icon: '🌾', protein: 4, carbs: 21, fat: 2, fiber: 3, calories: 120, category: 'Крупы', type: 'Сложные углеводы'},
        {id: 'c3', name: 'Бурый рис', icon: '🍚', protein: 8, carbs: 77, fat: 3, fiber: 4, calories: 370, category: 'Крупы', type: 'Сложные углеводы'},
        {id: 'c4', name: 'Гречка', icon: '🥣', protein: 13, carbs: 71, fat: 3, fiber: 10, calories: 343, category: 'Крупы', type: 'Сложные углеводы'},
        {id: 'c5', name: 'Булгур', icon: '🌾', protein: 12, carbs: 76, fat: 1, fiber: 18, calories: 342, category: 'Крупы', type: 'Сложные углеводы'},
        {id: 'c6', name: 'Картофель сладкий', icon: '🍠', protein: 2, carbs: 20, fat: 0.2, fiber: 3, calories: 86, category: 'Овощи', type: 'Сложные углеводы'},
        {id: 'c7', name: 'Картофель белый', icon: '🥔', protein: 2, carbs: 17, fat: 0.1, fiber: 2, calories: 77, category: 'Овощи', type: 'Сложные углеводы'},
        {id: 'c8', name: 'Батат', icon: '🍠', protein: 2, carbs: 20, fat: 0.2, fiber: 3, calories: 86, category: 'Овощи', type: 'Сложные углеводы'},
        {id: 'c9', name: 'Тыква', icon: '🎃', protein: 1, carbs: 7, fat: 0.1, fiber: 0.5, calories: 26, category: 'Овощи', type: 'Сложные углеводы'},
        {id: 'c10', name: 'Морковь', icon: '🥕', protein: 1, carbs: 10, fat: 0.2, fiber: 3, calories: 41, category: 'Овощи', type: 'Сложные углеводы'},
        {id: 'c11', name: 'Свекла', icon: '🍠', protein: 2, carbs: 10, fat: 0.2, fiber: 2, calories: 43, category: 'Овощи', type: 'Сложные углеводы'},
        {id: 'c12', name: 'Бананы', icon: '🍌', protein: 1, carbs: 23, fat: 0.3, fiber: 2, calories: 89, category: 'Фрукты', type: 'Фруктоза'},
        {id: 'c13', name: 'Яблоки', icon: '🍎', protein: 0.3, carbs: 14, fat: 0.2, fiber: 2, calories: 52, category: 'Фрукты', type: 'Фруктоза'},
        {id: 'c14', name: 'Груши', icon: '🍐', protein: 0.4, carbs: 15, fat: 0.1, fiber: 3, calories: 57, category: 'Фрукты', type: 'Фруктоза'},
        {id: 'c15', name: 'Виноград', icon: '🍇', protein: 0.6, carbs: 18, fat: 0.4, fiber: 1, calories: 69, category: 'Фрукты', type: 'Фруктоза'},
        {id: 'c16', name: 'Финики', icon: '🌴', protein: 2, carbs: 75, fat: 0.4, fiber: 8, calories: 282, category: 'Сухофрукты', type: 'Фруктоза'},
        {id: 'c17', name: 'Изюм', icon: '🍇', protein: 3, carbs: 79, fat: 0.5, fiber: 4, calories: 299, category: 'Сухофрукты', type: 'Фруктоза'},
        {id: 'c18', name: 'Чернослив', icon: '🍑', protein: 2, carbs: 64, fat: 0.4, fiber: 7, calories: 240, category: 'Сухофрукты', type: 'Фруктоза'},
        {id: 'c19', name: 'Курага', icon: '🍑', protein: 3, carbs: 63, fat: 0.5, fiber: 7, calories: 241, category: 'Сухофрукты', type: 'Фруктоза'},
        {id: 'c20', name: 'Хлеб цельнозерновой', icon: '🍞', protein: 13, carbs: 41, fat: 3, fiber: 7, calories: 247, category: 'Хлеб', type: 'Сложные углеводы'}
    ],
    fat: [
        {id: 'f1', name: 'Авокадо', icon: '🥑', protein: 2, carbs: 9, fat: 15, fiber: 7, calories: 160, category: 'Фрукты', type: 'Мононенасыщенные'},
        {id: 'f2', name: 'Оливковое масло', icon: '🫒', protein: 0, carbs: 0, fat: 100, fiber: 0, calories: 884, category: 'Масла', type: 'Мононенасыщенные'},
        {id: 'f3', name: 'Кокосовое масло', icon: '🥥', protein: 0, carbs: 0, fat: 100, fiber: 0, calories: 862, category: 'Масла', type: 'Насыщенные'},
        {id: 'f4', name: 'Масло авокадо', icon: '🥑', protein: 0, carbs: 0, fat: 100, fiber: 0, calories: 884, category: 'Масла', type: 'Мононенасыщенные'},
        {id: 'f5', name: 'Грецкие орехи', icon: '🌰', protein: 15, carbs: 14, fat: 65, fiber: 7, calories: 654, category: 'Орехи', type: 'Полиненасыщенные'},
        {id: 'f6', name: 'Миндаль', icon: '🌰', protein: 21, carbs: 22, fat: 49, fiber: 12, calories: 579, category: 'Орехи', type: 'Мононенасыщенные'},
        {id: 'f7', name: 'Кешью', icon: '🌰', protein: 18, carbs: 30, fat: 44, fiber: 3, calories: 553, category: 'Орехи', type: 'Мононенасыщенные'},
        {id: 'f8', name: 'Фундук', icon: '🌰', protein: 15, carbs: 17, fat: 61, fiber: 10, calories: 628, category: 'Орехи', type: 'Мононенасыщенные'},
        {id: 'f9', name: 'Пекан', icon: '🌰', protein: 9, carbs: 14, fat: 72, fiber: 10, calories: 691, category: 'Орехи', type: 'Мононенасыщенные'},
        {id: 'f10', name: 'Бразильские орехи', icon: '🌰', protein: 14, carbs: 12, fat: 66, fiber: 8, calories: 659, category: 'Орехи', type: 'Насыщенные'},
        {id: 'f11', name: 'Фисташки', icon: '🌰', protein: 21, carbs: 28, fat: 45, fiber: 10, calories: 562, category: 'Орехи', type: 'Мононенасыщенные'},
        {id: 'f12', name: 'Кедровые орехи', icon: '🌰', protein: 14, carbs: 13, fat: 68, fiber: 4, calories: 673, category: 'Орехи', type: 'Полиненасыщенные'},
        {id: 'f13', name: 'Семена чиа', icon: '✨', protein: 17, carbs: 42, fat: 31, fiber: 34, calories: 486, category: 'Семена', type: 'Омега-3'},
        {id: 'f14', name: 'Семена льна', icon: '🌾', protein: 18, carbs: 29, fat: 42, fiber: 27, calories: 534, category: 'Семена', type: 'Омега-3'},
        {id: 'f15', name: 'Семена конопли', icon: '🌱', protein: 31, carbs: 9, fat: 48, fiber: 4, calories: 553, category: 'Семена', type: 'Омега-3'},
        {id: 'f16', name: 'Тыквенные семечки', icon: '🎃', protein: 30, carbs: 11, fat: 49, fiber: 6, calories: 559, category: 'Семена', type: 'Омега-6'},
        {id: 'f17', name: 'Подсолнечные семечки', icon: '🌻', protein: 21, carbs: 20, fat: 51, fiber: 9, calories: 584, category: 'Семена', type: 'Омега-6'},
        {id: 'f18', name: 'Кунжут', icon: '⚫', protein: 18, carbs: 23, fat: 50, fiber: 12, calories: 573, category: 'Семена', type: 'Омега-6'},
        {id: 'f19', name: 'Арахисовая паста', icon: '🥜', protein: 25, carbs: 20, fat: 50, fiber: 6, calories: 588, category: 'Пасты', type: 'Мононенасыщенные'},
        {id: 'f20', name: 'Миндальная паста', icon: '🌰', protein: 21, carbs: 21, fat: 49, fiber: 10, calories: 614, category: 'Пасты', type: 'Мононенасыщенные'}
    ],
    fiber: [
        {id: 'fb1', name: 'Авокадо', icon: '🥑', protein: 2, carbs: 9, fat: 15, fiber: 7, calories: 160, category: 'Фрукты', type: 'Растворимая клетчатка'},
        {id: 'fb2', name: 'Малина', icon: '🍓', protein: 1, carbs: 12, fat: 0.7, fiber: 7, calories: 53, category: 'Ягоды', type: 'Растворимая клетчатка'},
        {id: 'fb3', name: 'Ежевика', icon: '🫐', protein: 2, carbs: 10, fat: 0.5, fiber: 5, calories: 43, category: 'Ягоды', type: 'Растворимая клетчатка'},
        {id: 'fb4', name: 'Черника', icon: '🫐', protein: 0.7, carbs: 14, fat: 0.3, fiber: 2, calories: 57, category: 'Ягоды', type: 'Растворимая клетчатка'},
        {id: 'fb5', name: 'Клубника', icon: '🍓', protein: 0.7, carbs: 8, fat: 0.3, fiber: 2, calories: 32, category: 'Ягоды', type: 'Растворимая клетчатка'},
        {id: 'fb6', name: 'Инжир свежий', icon: '🌿', protein: 0.8, carbs: 19, fat: 0.3, fiber: 3, calories: 74, category: 'Фрукты', type: 'Растворимая клетчатка'},
        {id: 'fb7', name: 'Груши', icon: '🍐', protein: 0.4, carbs: 15, fat: 0.1, fiber: 3, calories: 57, category: 'Фрукты', type: 'Растворимая клетчатка'},
        {id: 'fb8', name: 'Яблоки', icon: '🍎', protein: 0.3, carbs: 14, fat: 0.2, fiber: 2, calories: 52, category: 'Фрукты', type: 'Растворимая клетчатка'},
        {id: 'fb9', name: 'Апельсины', icon: '🍊', protein: 0.9, carbs: 12, fat: 0.1, fiber: 2, calories: 47, category: 'Фрукты', type: 'Растворимая клетчатка'},
        {id: 'fb10', name: 'Грейпфрут', icon: '🍈', protein: 0.8, carbs: 11, fat: 0.1, fiber: 2, calories: 42, category: 'Фрукты', type: 'Растворимая клетчатка'},
        {id: 'fb11', name: 'Киви', icon: '🥝', protein: 1.1, carbs: 15, fat: 0.5, fiber: 3, calories: 61, category: 'Фрукты', type: 'Растворимая клетчатка'},
        {id: 'fb12', name: 'Артишоки', icon: '🌿', protein: 3, carbs: 11, fat: 0.2, fiber: 5, calories: 47, category: 'Овощи', type: 'Инулин'},
        {id: 'fb13', name: 'Брокколи', icon: '🥦', protein: 2.8, carbs: 7, fat: 0.4, fiber: 3, calories: 34, category: 'Овощи', type: 'Нерастворимая клетчатка'},
        {id: 'fb14', name: 'Брюссельская капуста', icon: '🥬', protein: 3.4, carbs: 9, fat: 0.3, fiber: 4, calories: 43, category: 'Овощи', type: 'Нерастворимая клетчатка'},
        {id: 'fb15', name: 'Капуста белокочанная', icon: '🥬', protein: 1.3, carbs: 6, fat: 0.1, fiber: 2, calories: 25, category: 'Овощи', type: 'Нерастворимая клетчатка'},
        {id: 'fb16', name: 'Цветная капуста', icon: '🥦', protein: 1.9, carbs: 5, fat: 0.3, fiber: 2, calories: 25, category: 'Овощи', type: 'Нерастворимая клетчатка'},
        {id: 'fb17', name: 'Морковь', icon: '🥕', protein: 1, carbs: 10, fat: 0.2, fiber: 3, calories: 41, category: 'Овощи', type: 'Растворимая клетчатка'},
        {id: 'fb18', name: 'Свекла', icon: '🍠', protein: 2, carbs: 10, fat: 0.2, fiber: 2, calories: 43, category: 'Овощи', type: 'Растворимая клетчатка'},
        {id: 'fb19', name: 'Шпинат', icon: '🍃', protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2, calories: 23, category: 'Зелень', type: 'Нерастворимая клетчатка'},
        {id: 'fb20', name: 'Руккола', icon: '🌿', protein: 2.6, carbs: 3.7, fat: 0.7, fiber: 1.6, calories: 25, category: 'Зелень', type: 'Нерастворимая клетчатка'}
    ]
};

// РАСШИРЕННАЯ БАЗА БЛЮД (100+ позиций)
const generateMeals = (mealType, gender, count) => {
    const meals = [];
    const mealNames = {
        breakfast: {
            male: [
                "Протеиновый омлет с овощами", "Гречневая каша с ягодами", "Творожная запеканка",
                "Овсянка с орехами и медом", "Яичница с авокадо", "Сырники с ягодным соусом",
                "Смузи-боул с протеином", "Рисовая каша с тыквой", "Блинчики из овсяной муки",
                "Бутерброды с лососем и авокадо", "Запеканка из киноа", "Пудинг из чиа с фруктами",
                "Фриттата с зеленью", "Гранола с йогуртом", "Пшенная каша с сухофруктами",
                "Яйца пашот с тостами", "Творог с ягодами и семенами", "Гречка с молоком",
                "Омлет с грибами и сыром", "Мюсли домашние", "Лаваш с овощами и курицей",
                "Каша из полбы", "Запеченные яблоки с творогом", "Овсяные оладьи", "Сэндвич с индейкой"
            ],
            female: [
                "Чиа-пудинг с малиной", "Овсянка на миндальном молоке", "Творожный мусс с ягодами",
                "Смузи с шпинатом и бананом", "Авокадо-тост с яйцом", "Гречка с кокосовым молоком",
                "Ягодный смузи-боул", "Киноа с фруктами", "Блины из гречневой муки",
                "Тост с рикоттой и медом", "Запеканка из тыквы", "Пудинг из семян льна",
                "Омлет со шпинатом", "Йогурт с гранолой", "Рисовая каша с яблоком",
                "Яйца скрэмбл с овощами", "Творог с грушей и корицей", "Овсянка с какао",
                "Сырники с ванилью", "Мюсли с суперфудами", "Лаваш с авокадо и творогом",
                "Каша из амаранта", "Запеченная груша с орехами", "Овсяные маффины", "Сэндвич с лососем"
            ]
        },
        lunch: {
            male: [
                "Куриные котлеты с гречкой", "Стейк из лосося с овощами", "Индейка с булгуром",
                "Говядина с киноа", "Рыба на пару с рисом", "Куриный суп с лапшой",
                "Борщ с говядиной", "Суп-пюре из тыквы", "Рагу из индейки с овощами",
                "Запеченная рыба с картофелем", "Куриная грудка с салатом", "Тефтели с подливой",
                "Лазанья с мясом", "Плов с курицей", "Спагетти с морепродуктами",
                "Запеканка из картофеля и мяса", "Суп харчо", "Щи со сметаной",
                "Рыбные котлеты с пюре", "Куриные крылышки с овощами", "Мясо по-французски",
                "Стейк из тунца", "Уха из красной рыбы", "Курица в сливочном соусе", "Гуляш с гречкой"
            ],
            female: [
                "Салат с тунцом и авокадо", "Куриный суп-пюре", "Индейка с овощами на гриле",
                "Лосось с киноа", "Куриная грудка с брокколи", "Суп минестроне",
                "Борщ вегетарианский", "Суп-пюре из брокколи", "Рагу из овощей",
                "Рыба в фольге с лимоном", "Салат с курицей и овощами", "Тефтели из индейки",
                "Лазанья овощная", "Плов с нутом", "Паста с овощами",
                "Запеканка из цветной капусты", "Суп с фрикадельками", "Щи постные",
                "Рыбное суфле", "Куриные бедра с тыквой", "Мясо в горшочке",
                "Тунец на гриле", "Уха из белой рыбы", "Курица в йогуртовом соусе", "Рататуй"
            ]
        },
        snack: {
            male: [
                "Протеиновый коктейль", "Греческий йогурт с орехами", "Творог с медом",
                "Батончик протеиновый", "Яблоко с арахисовой пастой", "Смузи с бананом",
                "Ореховая смесь", "Сырные палочки", "Вареные яйца",
                "Хлебцы с авокадо", "Кефир с отрубями", "Фруктовый салат",
                "Овсяное печенье", "Сэндвич с курицей", "Роллы из лаваша",
                "Творожная масса с фруктами", "Запеченные яблоки", "Крекеры с сыром",
                "Салат из тунца", "Шейк с протеином", "Банан с миндальным маслом",
                "Сырники мини", "Йогурт с гранолой", "Орехи и сухофрукты", "Сэндвич с индейкой"
            ],
            female: [
                "Чиа-пудинг", "Йогурт с ягодами", "Творожок с фруктами",
                "Батончик злаковый", "Груша с миндальным маслом", "Смузи зеленый",
                "Смесь орехов", "Сырные шарики", "Яйца вкрутую",
                "Хлебцы с творогом", "Кефир с клетчаткой", "Салат из фруктов",
                "Овсяное печенье диетическое", "Сэндвич с авокадо", "Роллы овощные",
                "Творожный десерт", "Запеченная груша", "Крекеры с хумусом",
                "Салат из креветок", "Шейк белковый", "Яблоко с ореховой пастой",
                "Творожные шарики", "Йогурт с семенами", "Сухофрукты", "Сэндвич с лососем"
            ]
        },
        dinner: {
            male: [
                "Треска с овощами", "Куриные котлеты на пару", "Индейка с салатом",
                "Говядина тушеная", "Рыбное филе на гриле", "Куриный бульон",
                "Суп овощной легкий", "Рагу из кабачков", "Индейка с брокколи",
                "Запеченная рыба с лимоном", "Салат с курицей", "Тефтели паровые",
                "Лазанья овощная", "Плов легкий", "Паста с томатами",
                "Запеканка из капусты", "Суп-пюре из цветной капусты", "Щи легкие",
                "Рыба на пару", "Куриная грудка с цукини", "Мясо тушеное",
                "Тунец на пару", "Уха легкая", "Курица с овощами", "Овощное рагу"
            ],
            female: [
                "Салат с креветками", "Куриное филе на пару", "Индейка с салатом",
                "Лосось с овощами", "Рыбное суфле", "Бульон куриный",
                "Суп из брокколи", "Рагу из тыквы", "Индейка со спаржей",
                "Рыба в фольге", "Салат Цезарь легкий", "Тефтели из индейки",
                "Лазанья со шпинатом", "Плов овощной", "Паста с морепродуктами",
                "Запеканка из брокколи", "Суп-пюре из тыквы", "Щи зеленые",
                "Рыбные котлеты паровые", "Куриные грудки с цветной капустой", "Мясо в горшочке",
                "Тунец с овощами", "Уха из трески", "Курица с брокколи", "Овощное соте"
            ]
        }
    };

    const descriptions = {
        breakfast: "Идеальное начало дня",
        lunch: "Сбалансированный прием пищи",
        snack: "Энергетическая подзарядка",
        dinner: "Легкий ужин для восстановления"
    };

    const timeOptimals = {
        breakfast: "7:00-9:00",
        lunch: "13:00-15:00",
        snack: "16:00-17:00",
        dinner: "19:00-20:30"
    };

    for (let i = 1; i <= count; i++) {
        const nameList = mealNames[mealType][gender];
        const name = nameList[Math.min(i-1, nameList.length-1)];
        
        const protein = Math.floor(Math.random() * 20) + 10;
        const carbs = Math.floor(Math.random() * 40) + 20;
        const fat = Math.floor(Math.random() * 15) + 5;
        const fiber = Math.floor(Math.random() * 8) + 2;
        const calories = protein * 4 + carbs * 4 + fat * 9;
        
        meals.push({
            id: i,
            name: name,
            description: descriptions[mealType],
            calories: calories,
            protein: protein,
            carbs: carbs,
            fat: fat,
            fiber: fiber,
            sodium: Math.floor(Math.random() * 300) + 50,
            potassium: Math.floor(Math.random() * 500) + 200,
            magnesium: Math.floor(Math.random() * 100) + 30,
            zinc: (Math.random() * 3 + 1).toFixed(1),
            timeOptimal: timeOptimals[mealType],
            benefits: [
                "Сбалансированный состав нутриентов",
                "Подходит для здоровья ЖКТ",
                "Легкая усвояемость"
            ],
            philosophy: "Это блюдо создано с заботой о вашем пищеварении. Каждый ингредиент подобран для максимальной пользы и легкости усвоения.",
            tags: ["gentle", "healthy", mealType],
            ingredients: ["натуральные ингредиенты", "свежие продукты", "полезные добавки"]
        });
    }

    return meals;
};

const FOOD_DATABASE = {
    breakfast: {
        male: generateMeals('breakfast', 'male', 25),
        female: generateMeals('breakfast', 'female', 25)
    },
    lunch: {
        male: generateMeals('lunch', 'male', 25),
        female: generateMeals('lunch', 'female', 25)
    },
    snack: {
        male: generateMeals('snack', 'male', 25),
        female: generateMeals('snack', 'female', 25)
    },
    dinner: {
        male: generateMeals('dinner', 'male', 25),
        female: generateMeals('dinner', 'female', 25)
    }
};

// ДОМ ЭЛЕМЕНТЫ
const DOM = {
    // Профиль
    height: document.getElementById('height'),
    weight: document.getElementById('weight'),
    age: document.getElementById('age'),
    gender: document.getElementById('gender'),
    
    // Кнопки
    saveProfileBtn: document.getElementById('saveProfileBtn'),
    clearProfileBtn: document.getElementById('clearProfileBtn'),
    analyzeSymptomsBtn: document.getElementById('analyzeSymptomsBtn'),
    
    // Меню кнопки
    smartMenuBtn: document.getElementById('smartMenuBtn'),
    personalMenuBtn: document.getElementById('personalMenuBtn'),
    symptomMenuBtn: document.getElementById('symptomMenuBtn'),
    randomMenuBtn: document.getElementById('randomMenuBtn'),
    timeMenuBtn: document.getElementById('timeMenuBtn'),
    resetMenuBtn: document.getElementById('resetMenuBtn'),
    
    // Селекты
    breakfastSelect: document.getElementById('breakfastSelect'),
    lunchSelect: document.getElementById('lunchSelect'),
    snackSelect: document.getElementById('snackSelect'),
    dinnerSelect: document.getElementById('dinnerSelect'),
    
    // Очистка продуктов
    clearProductsBtn: document.getElementById('clearProductsBtn'),
    
    // Текстовые элементы
    symptomsInput: document.getElementById('symptomsInput'),
    symptomsAnalysis: document.getElementById('symptomsAnalysis'),
    aiMessage: document.getElementById('aiMessage'),
    currentTime: document.getElementById('currentTime'),
    lastUpdate: document.getElementById('lastUpdate'),
    
    // Прогресс
    progressValue: document.getElementById('progressValue'),
    progressFill: document.getElementById('progressFill'),
    
    // Тарелка
    proteinPercent: document.getElementById('proteinPercent'),
    carbsPercent: document.getElementById('carbsPercent'),
    fatPercent: document.getElementById('fatPercent'),
    fiberAmount: document.getElementById('fiberAmount'),
    
    // Загрузка и сообщения
    loadingOverlay: document.getElementById('loadingOverlay'),
    successMessage: document.getElementById('successMessage')
};

// ИНИЦИАЛИЗАЦИЯ
function init() {
    setupEventListeners();
    updateCurrentTime();
    loadProfile();
    updateGenderUI();
    populateMealSelects();
    populateProductDatabase();
    updateProgress();
    updateCurrentMenu();
    updatePlateVisual();
    
    setInterval(updateCurrentTime, 60000);
    console.log('Приложение инициализировано');
}

// НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ
function setupEventListeners() {
    // Кнопки профиля
    DOM.saveProfileBtn.addEventListener('click', saveMedicalProfile);
    DOM.clearProfileBtn.addEventListener('click', clearProfile);
    
    // Анализ симптомов
    DOM.analyzeSymptomsBtn.addEventListener('click', analyzeSymptoms);
    
    // Кнопки меню
    DOM.smartMenuBtn.addEventListener('click', generateSmartMenu);
    DOM.personalMenuBtn.addEventListener('click', generatePersonalMenu);
    DOM.symptomMenuBtn.addEventListener('click', generateSymptomBasedMenu);
    DOM.randomMenuBtn.addEventListener('click', generateRandomMenu);
    DOM.timeMenuBtn.addEventListener('click', generateTimeBasedMenu);
    DOM.resetMenuBtn.addEventListener('click', resetMenu);
    
    // Селекты блюд
    DOM.breakfastSelect.addEventListener('change', () => selectMeal('breakfast'));
    DOM.lunchSelect.addEventListener('change', () => selectMeal('lunch'));
    DOM.snackSelect.addEventListener('change', () => selectMeal('snack'));
    DOM.dinnerSelect.addEventListener('change', () => selectMeal('dinner'));
    
    // Очистка продуктов
    DOM.clearProductsBtn.addEventListener('click', clearSelectedProducts);
    
    // Вкладки
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchTab(tab);
        });
    });
    
    // Вкладки нутриентов
    document.querySelectorAll('.nutrient-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const nutrient = btn.getAttribute('data-nutrient');
            switchNutrientTab(nutrient);
        });
    });
    
    // Заболевания
    document.querySelectorAll('.disease-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.type === 'checkbox') return;
            const checkbox = item.querySelector('.disease-checkbox');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                item.classList.toggle('selected', checkbox.checked);
            }
        });
    });
    
    // Чекбоксы заболеваний
    document.querySelectorAll('.disease-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const item = this.closest('.disease-item');
            item.classList.toggle('selected', this.checked);
        });
    });
}

// ФУНКЦИИ ПРОФИЛЯ
function saveMedicalProfile() {
    const height = parseInt(DOM.height.value);
    const weight = parseInt(DOM.weight.value);
    const age = parseInt(DOM.age.value);
    const gender = DOM.gender.value;
    
    if (!height || !weight || !age) {
        showSuccessMessage('⚠️ Заполните все поля профиля');
        return;
    }
    
    const selectedDiseases = [];
    document.querySelectorAll('.disease-checkbox:checked').forEach(checkbox => {
        selectedDiseases.push(checkbox.value);
    });
    
    userProfile.height = height;
    userProfile.weight = weight;
    userProfile.age = age;
    userProfile.gender = gender;
    userProfile.diseases = selectedDiseases;
    userProfile.saved = true;
    
    if (height && weight) {
        const heightInMeters = height / 100;
        userProfile.bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    
    showSuccessMessage('✅ Профиль успешно сохранен!');
    updateGenderUI();
    updateProgress();
    populateMealSelects();
    
    localStorage.setItem('gastroProfile', JSON.stringify(userProfile));
}

function clearProfile() {
    DOM.height.value = '';
    DOM.weight.value = '';
    DOM.age.value = '';
    DOM.gender.value = 'male';
    
    document.querySelectorAll('.disease-checkbox').forEach(checkbox => {
        checkbox.checked = false;
        const item = checkbox.closest('.disease-item');
        if (item) item.classList.remove('selected');
    });
    
    userProfile = {
        height: null,
        weight: null,
        age: null,
        gender: 'male',
        diseases: [],
        saved: false,
        bmi: null
    };
    
    showSuccessMessage('Профиль очищен');
    updateProgress();
    localStorage.removeItem('gastroProfile');
}

function loadProfile() {
    const saved = localStorage.getItem('gastroProfile');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            userProfile = { ...userProfile, ...parsed };
            
            if (userProfile.height) DOM.height.value = userProfile.height;
            if (userProfile.weight) DOM.weight.value = userProfile.weight;
            if (userProfile.age) DOM.age.value = userProfile.age;
            if (userProfile.gender) DOM.gender.value = userProfile.gender;
            
            userProfile.diseases.forEach(disease => {
                const checkbox = document.getElementById(disease);
                if (checkbox) {
                    checkbox.checked = true;
                    const item = checkbox.closest('.disease-item');
                    if (item) item.classList.add('selected');
                }
            });
            
            console.log('Профиль загружен из localStorage');
        } catch (e) {
            console.error('Ошибка загрузки профиля:', e);
        }
    }
}

// ФУНКЦИИ ВКЛАДОК
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const tabElement = document.getElementById(tabName + 'Tab');
    if (tabElement) {
        tabElement.classList