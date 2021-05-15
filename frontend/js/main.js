var main = new autoComplete({
    selector: '#search',
    minChars: 0,
    source: function (term, suggest) {
        var query = "match (a) where toLower(a.name) contains $term return a.name, labels(a)";

        var statements = [
            {
                "statement": query,
                "parameters": {
                    term: term.toLowerCase()
                },
                "resultDataContents": ["row"]
            }
        ];

        popoto.logger.info("AutoComplete ==> ");
        popoto.rest.post(
            {
                "statements": statements
            })
            .done(function (data) {
                console.log("wtf")
                console.log(data)
                var res = data.results[0].data.map(function (d) {
                    return d.row
                });
                suggest(res);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                console.error(xhr, textStatus, errorThrown);
                suggest([]);
            });
    },
    renderItem: function (item, search) {
        search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
        let re_rule = new RegExp("(" + search.split(' ').join('|') + ")", "gi");

        let name = item[0];
        let collection_name = item[1][0];
        if  (collection_name == null){
            return
        }
        let imagePath = `image/node/${collection_name.toLowerCase()}/${collection_name.toLowerCase()}.svg`
        console.log(imagePath)
        let search_entry = `<div class="autocomplete-suggestion" data-name="${name}"  data-collection="${collection_name}" data-search="${search}"> <img width="30px" height="45px" src="${imagePath}"> ${collection_name}: ${name.replace(re_rule, "<b>$1</b>")} </div>`;
        return search_entry
    },
    onSelect: function (e, term, item) {
        let name = item.getAttribute('data-name');
        let label = item.getAttribute('data-collection');

        popoto.graph.mainLabel = {
            label: label,
            value: {
                name: name
            }
        };
        popoto.tools.reset();
    }
});