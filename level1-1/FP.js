
/**
 * Replace Name of city on new text "название города (Х место в ТОП-10 самых крупных городов Украины, население УУУУУУ человек)".
 * @param {*} csv text of csv
 * @returns new text
 */
function parseText(csv) {
    let cities = csv.split("\n").filter(l => /^(\d{2}.\d{2},){2}([а-яА-ЯЇїІіЄєҐґ]+ ?){1,2},\d+,?$/.test(l))
        .map(element => {
            let object = {};
            [object.x, object.y, object.name, object.population] = element.split(",")
            return object;
        }).sort((a, b) => b.population - a.population).slice(0, 10)
        .reduce((target, item, currentIndex) => {
            target[item.name] = { population: item.population, rating: ++currentIndex }
            return target
        }, {});
    //   console.log(cities );


    return text => text.replace(new RegExp(Object.keys(cities).join("|"), "g"), city =>
        `${city} (${cities[city].rating} место в ТОП-10 самых крупных городов Украины, население ${cities[city].population} человек)`);

};
//----------------------tets-----------------------------------------------
let csv = `44.38,34.33,Алушта,3140040,\n49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575\n49.54,28.49,Бердичіва,8447575,
44.38,34.33,Алуштав,314403,\n49.46,30.17,Білая Церква,2001,
49.54,28.49,Бердичйййів,575\n49.54,28.49,Берд,8475,
44.38,34.33,Алуштавввввв,314403000,\n49.46,30.17,Білаяп Церква,299001,
44.38,34.33,Алуштавввв,31\n49.46,30.17,Білаяпк Церква,29900,\n #некоммен`
const fun = parseText(csv);
let str = 'Алушта і Біла Церква';
console.log(fun(str));
