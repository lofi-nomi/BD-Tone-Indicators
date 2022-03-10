/**
 * @name ToneIndicators
 * @author NomadNaomie, Zuri
 * @description Displays the messages tone indicators under messages or by highlighting a tone tag will give you the defintion
 * @version 1.0.6
 * @source https://github.com/NomadNaomie/BD-Tone-Indicators
 * @updateUrl https://raw.githubusercontent.com/NomadNaomie/BD-Tone-Indicators/main/ToneIndicator.plugin.js
 * @authorId 188323207793606656, 746871249791221880
 * @authorLink https://twitter.com/NomadNaomie
 */

const { exit } = require("process");

module.exports = (_ => {
    const config = {
        info: {
            name: 'ToneIndicators',
            authors: [
                {
                    name: 'NomadNaomie',
                    discord_id: '188323207793606656',
                    github_username: 'NomadNaomie',
                    twitter_username: 'NomadNaomie',
                },
                {
                    name: 'Zuri',
                    discord_id: '746871249791221880',
                    github_username: 'Zuriix',
                }
            ],
            version: '1.0.7',
            description: 'Displays the messages tone indicators under messages or by highlighting a tone tag will give you the defintion',
            github: 'https://github.com/NomadNaomie/BD-Tone-Indicators',
            github_raw: 'https://raw.githubusercontent.com/NomadNaomie/BD-Tone-Indicators/main/ToneIndicator.plugin.js'
        },
    };
    const toneList = { '/j': ['joking', '#BFFCC6'], '/hj': ['half joking', '#D8FFD6'], '/g': ['genuine / genuine question', '#AFF8D8'], '/gen': ['genuine / genuine question', '#AFF8D8'], '/genq': ['genuine question', '#AFF8D8'], '/s': ['sarcastic / sarcasm', '#FFCBC1'], '/sarc': ['sarcastic / sarcasm', '#FFCBC1'], '/srs': ['serious', '#6EB5FF'], '/nsrs': ['not serious', '#F6A6FF'], '/lh': ['light hearted', '#ACE6FF'], '/ij': ['inside joke', '#E7FFAC'], '/ref': ['reference', '#AFCBFF'], '/t': ['teasing', '#FFFFD1'], '/nm': ['not mad', '#DCD3FF'], '/lu': ['a little upset', '#FFF5BA'], '/nf': ['not forced', '#DEFDE0'], '/nbh': ['nobody here', '#FCF7DE'], '/nsb': ['not subtweeting', '#DEF3FD'], '/nay': ['not at you', '#F0DEFD'], '/ay': ['at you', '#FDDFDF'], '/nbr': ['not being rude', '#9ADBB3'], '/ot': ['off topic', '#E7FFAC'], '/th': ['threat', '#FFABAB'], '/cb': ['clickbait', '#F3FFE3'], '/f': ['fake', '#85E3FF'], '/q': ['quote', '#D5AAFF'], '/l': ['lyrics', '#97A2FF'], '/ly': ['lyrics', '#97A2FF'], '/c': ['copypasta', '#DBFFD6'], '/m': ['metaphor / metaphorically', '#FBE4FF'], '/li': ['literal / literally', '#BED2FE'], '/rt': ['rhetorical question', '#A79AFF'], '/rh': ['rhetorical question', '#A79AFF'], '/hyp': ['hyperbole', '#F6F9FF'], '/p': ['platonic', '#B5CCFE'], '/r': ['romantic', '#FFCCF9'], '/a': ['alterous', '#C7D9FE'], '/sx': ['sexual intent', '#FF9CEE'], '/x': ['sexual intent', '#FF9CEE'], '/nsx': ['non-sexual intent', '#FFBEBC'], '/ns': ['non-sexual intent', '#FFBEBC'], '/nx': ['non-sexual intent', '#FFBEBC'], '/pc': ['positive connotation', '#84D3B2'], '/pos': ['positive connotation', '#84D3B2'], '/nc': ['negative connotation', '#FFCCBB'], '/neg': ['negative connotation', '#FFCCBB'], '/neu': ['neutral / neutral connotation', '#E3ECFF'] };

    if (!global.ZeresPluginLibrary) {
        return class {
            load() {
                BdApi.showConfirmationModal(
                    "Zere's Library Missing",
                    `Either Click Download Now to install it or manually install it. `,
                    {
                        confirmText: "Automatically Install", cancelText: "Cancel", onConfirm: () => {
                            require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",
                                async (error, result, body) => {
                                    !error && result.statusCode == 200 && body
                                        ? require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body,
                                            _ => BdApi.showToast("Finished downloading Zere's Plugin Library", { type: "success" }))
                                        : BdApi.showToast("Failed to download Zere's Plugin Library", { type: "error" });
                                });
                        }
                    });
            }
        };
    } else {
        return (([Plugin, zlib]) => {
            const { WebpackModules, Patcher, ContextMenu, } = zlib;
            return class ToneIndicators extends Plugin {
                onLoad() {
                }

                onStart() {
                    this.onStop();
                    this.patchContextMenus();
                    this.patchMessages();

                }
                onStop() {
                    Patcher.unpatchAll();
                }
                patchContextMenus() {
                    ContextMenu.getDiscordMenu("MessageContextMenu").then(menu => {
                        Patcher.after(menu, "default", (_, [props], ret) => {
                            let selectedText = document.getSelection().toString().trim();
                            selectedText = selectedText.match((/^[^\/]/g, '/')) ? selectedText : "/" + selectedText;
                            if (!(selectedText && selectedText.toLowerCase() in toneList)) { return; }
                            ret.props.children.push(ContextMenu.buildMenuItem({ type: "separator" }))
                            ret.props.children.push(ContextMenu.buildMenuItem({
                                label: "Tone Indicator", action: () => {
                                    BdApi.showToast(selectedText + " -  " + toneList[selectedText.toLowerCase()][0]);
                                }
                            }));
                        });
                    });
                }
                patchMessages() {
                    const MessageContent = WebpackModules.find(m => m.type && m.type.displayName === 'MessageContent');
                    const ToolTip = WebpackModules.getByProps("TooltipContainer").TooltipContainer
                    Patcher.after(MessageContent, "type", (_, [props], ret) => {
                        if (!props.message.content || !props.message.content.includes('/')) return;
                        if (ret.props.children[0].filter(n => typeof n == "string").length == 0) return;
                        let temp = ret.props.children[0];
                        ret.props.children[0] = temp.map(content => {
                            if (!content) return;
                            let current = 0;
                            return content.split(' ').map(word => {
                                current++
                                let currentWord = current == 1 ? word : " " + word,
                                    tone = toneList[word];
                                return tone ? BdApi.React.createElement("span", {
                                    style: { color: tone[1], display: "inline-block" },
                                    children: BdApi.React.createElement(ToolTip, { text: `${word} - ${tone[0]}` }, currentWord)
                                }) : currentWord;
                            })
                        })
                    })
                }
            };
        })(global.ZeresPluginLibrary.buildPlugin(config));
    }
})();


