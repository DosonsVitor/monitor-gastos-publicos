Papa.parse("https://raw.githubusercontent.com/DosonsVitor/monitor-gastos-publicos/dosons/CusteioSecretaria/custeio-secretaria.csv", {
    download: true,
    header: true,
    complete: function (results) {
        mostrar(results.data);
    }
});

function mostrar(dados) {
    dados.forEach(function (dado) { dado.CUSTEIO = dado.CUSTEIO.replace(/\./g, "").replace(/,/g, ".") });
    dados.forEach(function (dado) { dado.CUSTEIO = parseFloat(dado.CUSTEIO) });

    google.charts.load("current", { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Secretaria', 'Custeio', { role: 'style' }],
            [dados[0].DESCRICAO_UG, dados[0].CUSTEIO, '#DBA9DB'],
            [dados[1].DESCRICAO_UG, dados[1].CUSTEIO, '#DBC6A9'],
            [dados[2].DESCRICAO_UG, dados[2].CUSTEIO, '#BADBA9'],
            [dados[3].DESCRICAO_UG, dados[3].CUSTEIO, '#B4CCDB']
        ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2]);

        var options = {
            backgroundColor: "#fff",
            fontSize: 12,
            annotations: {
                textStyle: {
                    fontName: 'Times-Roman',
                    fontSize: 13,
                }
            },
            title: "Valor de custeio aplicado por secretaria de estado",
            width: "100%",
            height: "100%",
            bar: { groupWidth: "70%" },
            legend: { position: "none" },
        };

        var chart = new google.visualization.ColumnChart(document.querySelector(".content_custeio"));
        chart.draw(view, options);
    }
}