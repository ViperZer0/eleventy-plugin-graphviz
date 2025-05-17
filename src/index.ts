import { EleventyConfig } from "11ty.ts";
import { Format, Options, toStream } from 'ts-graphviz/adapter';

export interface PluginOptions
{
    // The file format to use. Defaults to "png", but can be any of:
    // - png
    // - svg
    // - json
    // - jpg
    // - pdf
    // - xdot
    // - dot
    // - plain
    // - dot_json
    format: Format,
    // Currently not used, this may change in the future.
    layout: null,
}

function defaultPluginOptions(): PluginOptions
{
    return {
        format: "png",
        layout: null,
    }
}

export default function graphVizPlugin(eleventyConfig: EleventyConfig, pluginOptions?: PluginOptions)
{
    // Instantiate pluginOptions if it wasn't already set.
    let _pluginOptions = pluginOptions;
    if (_pluginOptions === undefined)
    {
        _pluginOptions = defaultPluginOptions();
    }

    // Add gv as a template syntax/extension to process, ig?
    eleventyConfig.addTemplateFormats("gv");

    // Add .gv and .dot files to be processed.
    eleventyConfig.addExtension(["gv", "dot"], {
        compile: async function (inputContent: string) {
            console.log("InputContent: ", inputContent);
            let result = await renderGraphVizScript(inputContent, _pluginOptions.format);
            return async (data: object) => {
                return result.read() as Buffer
            }

        },
        outputFileExtension: _pluginOptions.format,
        getData: () => {
            // I don't know if this is appropriate here or not
            // but we do want to overwrite any sort of default layout because that HTML or whatever
            // gets inserted *into* the binary (if we're outputting as a png or other image format,
            // notably.) We could expose this to be configured by the user but I'm not sure if that's necessary
            // or not.
            return {
                layout: null
            };
        },
    });
}

async function renderGraphVizScript(dotScript: string, format: Format): Promise<NodeJS.ReadableStream>
{
    let options: Options = { format: format };
    return await toStream(dotScript, options);
}
