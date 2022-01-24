let governo = [
{total_valor: 4576971.97, id: 12350153000148 , prefeitura: "PREF MUNI AGUA BRANCA"}, {total_valor: 5688917.96, id: 12227351000119, prefeitura: "PREF MUNI ANADIA"}, {total_valor: 85487180.10, id: 12198693000158, prefeitura: "PREF MUNI ARAPIRACA"}
];

governo.sort((x,y) => y.total_valor - x.total_valor);

console.log(governo);
