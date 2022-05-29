# Metagraph Viewer

Example (index.html):
```
<head>
    ...
    <!-- Подключаем библиотеку metagraph-viewer -->
    <script src="https://kirbmstu.github.io/metagraph-viewer/static/js/main.js"></script>
</head>
<body>
    ...
    <!-- Контейнер, куда будет вставлен просмотрщик -->
    <div id="container"></div>
    <script>
        // Данные о метаграфе в виде XML, нотация GraphML
        const graphXML = '<YOUR GRAPHML XML STRING>';

        // Быстрое создание и вставка просмотрщика метаграфов
        new MV({
            containerSelector: '#container',
            data: {
                type: MetagraphViewer.DataSourceKind.graphmlString,
                str: graphXML
            },
            mode: MV.Mode.library
        });
    </script>
</body>
```
