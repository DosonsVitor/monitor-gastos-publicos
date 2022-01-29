const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)


const initialColors = {
    fundo: getStyle(html, "--fundo"),
    fundoInterno: getStyle(html, "--fundo-interno"),
    inicioColor: getStyle(html, "--inicio-color"),
    custeioColor: getStyle(html, "--custeio-color"),
    beneficiadosColor: getStyle(html, "--beneficiados-color"),
    municipioColor: getStyle(html, "--municipio-color"),
    devsColor: getStyle(html, "--devs-color"),

    inicioIcon: getStyle(html, "--inicio-icon"),
    custeioIcon: getStyle(html, "--custeio-icon"),
    beneficiadosIcon: getStyle(html, "--beneficiados-icon"),
    municipioIcon: getStyle(html, "--municipio-icon"),
    devsIcon: getStyle(html, "--devs-icon")
}

const darkMode = {
    fundo: "#222222",
    fundoInterno: "#333333",
    inicioColor: "#8800c7",
    custeioColor: "#a44cd3",
    beneficiadosColor: "#e090df",
    municipioColor: "#fbbede",
    devsColor: "#d90077",

    inicioIcon: "url('../img/dark/home.png')",
    custeioIcon:  "url('../img/dark/bar-chart.png')",
    beneficiadosIcon: "url('../img/dark/money.png')",
    municipioIcon: "url('../img/dark/money2.png')",
    devsIcon: "url('../img/dark/light.png')"
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key])
    )
}


checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})