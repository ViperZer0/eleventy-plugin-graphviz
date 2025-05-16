# GraphViz Eleventy Plugin

The Eleventy plugin will read [DOT](https://graphviz.org/doc/info/lang.html) script files and 
build output files of your choosing as if they were content.

This is almost exclusively a very thin wrapper around [ts-graphviz](https://github.com/ts-graphviz/ts-graphviz)
to make it compatible with Eleventy out of the box. Pretty much all of the credit goes to them and their hard work,
as well as the incredible people behind [GraphViz](https://graphviz.org/).

## Getting Started

### Prerequisites

[GraphViz](https://graphviz.gitlab.io/) must be installed in order to produce the output files.
[Eleventy](https://www.11ty.dev/docs/) should also probably be installed, obviously.

### Installing

Install the plugin within your Eleventy repository

    npm install eleventy-plugin-graphviz --save

Add the plugin to your configuration file (likely `eleventy.config.js` or `.eleventy.js`)

    import graphVizPlugin from "eleventy-plugin-graphviz";

    export default function (eleventyConfig) {
        eleventyConfig.addPlugin(graphVizPlugin)
    };

Now create a file ending in `.dot` or `.gv` containing a DOT script.

    # content/test-graph.gv
    digraph example {
        node1 [
            label = "A",
        ]
        node2 [
            label = "B",
        ]
        node1 -> node2
        node2 -> node1
    }

By default this will create an output file at `_site/content/test-graph.png`.

You can embed this file inside your other template files. With Liquid/Markdown this is done like this

    # content/test-content.md
    Note that we have to go up one directory, by default content/test-content.md
    will generate its file at content/test-content/index.html.
    ![alt text](../test-graph.png)

You can also change the output file format in your eleventy config file.

    import graphVizPlugin from "eleventy-plugin-graphviz";

    export default function (eleventyConfig) {
        eleventyConfig.addPlugin(graphVizPlugin, { format: "svg" });
    }

Supported file formats are:
- PNG
- SVG
- JSON
- JPG
- PDF
- [XDOT](https://graphviz.org/docs/attr-types/xdot/)
- DOT
- [Plain](https://graphviz.org/docs/outputs/plain/)
- [DOT_JSON](https://graphviz.org/docs/outputs/json/)

## Contributing

## License

This project is licensed under the [GPL 3.0](LICENSE.md)
License - see the [LICENSE.md](LICENSE.md) file for details.
