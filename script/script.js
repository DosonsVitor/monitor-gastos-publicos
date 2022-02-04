custeioSecretaria();
gerarTabela("https://raw.githubusercontent.com/DosonsVitor/monitor-gastos-publicos/dosons/script/MaioresBeneficiados/MaioresBeneficiados.csv", 'content_beneficiados');
gerarTabela("", 'content_municipio');



function custeioSecretaria()
{

    Papa.parse("https://raw.githubusercontent.com/DosonsVitor/monitor-gastos-publicos/dosons/script/CusteioSecretaria/custeio-secretaria.csv", {
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

            var chart = new google.visualization.ColumnChart(document.querySelector("#content_custeio"));
            chart.draw(view, options);
        }
    }
}

function gerarTabela(linkCsv, container)
{
    Papa.parse(linkCsv, {
        download: true,
        header: true,
        complete: function (results) {
            results.data.forEach(function (dado) { dado.TOTAL_PAGO = dado.TOTAL_PAGO.replace(/\./g, "").replace(/,/g, ".") });
            results.data.forEach(function (dado) { dado.TOTAL_PAGO = parseFloat(dado.TOTAL_PAGO) });

            results.data.sort((a, b) => b.TOTAL_PAGO - a.TOTAL_PAGO);

            console.log(results.data.slice(0, 10));
            mostrar(results.data);
        }
    });

    function mostrar(dados) {
        google.charts.load('current', { 'packages': ['table'] });
        google.charts.setOnLoadCallback(drawTable);

        function drawTable() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'NOME');
            data.addColumn('number', 'TOTAL PAGO');
            data.addRows([
                [dados[0].NOME_FAVORECIDO, dados[0].TOTAL_PAGO],
                [dados[1].NOME_FAVORECIDO, dados[1].TOTAL_PAGO],
                [dados[2].NOME_FAVORECIDO, dados[2].TOTAL_PAGO],
                [dados[3].NOME_FAVORECIDO, dados[3].TOTAL_PAGO],
                [dados[4].NOME_FAVORECIDO, dados[4].TOTAL_PAGO],
                [dados[5].NOME_FAVORECIDO, dados[5].TOTAL_PAGO],
                [dados[6].NOME_FAVORECIDO, dados[6].TOTAL_PAGO],
                [dados[7].NOME_FAVORECIDO, dados[7].TOTAL_PAGO],
                [dados[8].NOME_FAVORECIDO, dados[8].TOTAL_PAGO],
                [dados[9].NOME_FAVORECIDO, dados[9].TOTAL_PAGO]
            ]);

            var table = new google.visualization.Table(document.getElementById(container));

            table.draw(data, { showRowNumber: true, width: '90%', height: '80%' });
        }
    }
}