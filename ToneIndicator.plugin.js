/**
 * @name ToneIndicators
 * @author NomadNaomie, Zuri
 * @description Displays the messages tone indicators or by highlighting a tone tag will give you the defintion
 * @version 1.1.0
 * @source https://github.com/NomadNaomie/BD-Tone-Indicators
 * @updateUrl https://raw.githubusercontent.com/NomadNaomie/BD-Tone-Indicators/main/ToneIndicator.plugin.js
 * @authorId 188323207793606656, 746871249791221880
 * @authorLink https://twitter.com/NomadNaomie
 */

 module.exports = (_ => {
    const config = {
        info: {
            name: 'ToneIndicators',
            authors: [{
                    name: 'NomadNaomie',
                    discord_id: '188323207793606656',
                    github_username: 'NomadNaomie',
                    twitter_username: 'NomadNaomie',
                },
                {
                    name: 'Zuri',
                    discord_id: '746871249791221880',
                    github_username: 'Zuriix',
                    website: "https://zuriix.github.io/"
                }
            ],
            version: '1.1.0',
            description: 'Displays the messages tone indicators or by highlighting a tone tag will give you the defintion',
            github_raw: 'https://raw.githubusercontent.com/NomadNaomie/BD-Tone-Indicators/main/ToneIndicator.plugin.js',
            github: 'https://github.com/NomadNaomie/BD-Tone-Indicators'
        },
        changelog: [{
                title: "Added",
                type: "added",
                items: ["Added a changelog!?", "Added some smancy new settings!", "Added a new lightmode toggle for better visibility!"]
            },
            {
                title: "Removed",
                type: "fixed",
                items: ["Cute foxes. (I'm kidding, they're still here.. somewhere.)"]
            }
        ],
        defaultConfig: [{
            type: 'category',
            id: 'background',
            name: 'Background settings',
            collapsible: true,
            shown: false,
            settings: [{
                    type: "switch",
                    id: "disabled",
                    name: "Remove Background Color",
                    note: "Removes the background color from indicators in messages.",
                    value: false,
                },
                {
                    type: "slider",
                    id: "transparency",
                    name: "Background Transparency",
                    note: "Changes the transparency of the indicators background color.",
                    value: 10,
                }
            ]
        }, {
            type: 'category',
            id: 'tooltip',
            name: 'Tooltip settings',
            collapsible: true,
            shown: false,
            settings: [{
                type: "switch",
                id: "bottom",
                name: "Display tooltip under message",
                note: "Displays tooltip under the message instead of above it.",
                value: true,
            }]
        },{
            type: 'category',
            id: 'tonecolor',
            name: 'Tone colour settings',
            collapsible: true,
            shown: false,
            settings: [{
                type: "switch",
                id: "lightmode",
                name: "Light Mode",
                note: "Changes the tone indicators to use a light color scheme.",
                value: false,
            }]
        }],
    };
    const toneList = { '/j': ['joking', '#BFFCC6', '#0d7a1a'], '/hj': ['half joking', '#D8FFD6','#0d7a1a'], '/g': ['genuine / genuine question', '#AFF8D8','#089c5b'], '/gen': ['genuine / genuine question', '#AFF8D8','#089c5b'], '/genq': ['genuine question', '#AFF8D8','#089c5b'], '/s': ['sarcastic / sarcasm', '#FFCBC1','#cf3d21'], '/sarc': ['sarcastic / sarcasm', '#FFCBC1','#cf3d21'], '/srs': ['serious', '#6EB5FF','#29629e'], '/nsrs': ['not serious', '#F6A6FF',"#a639b3"], '/lh': ['light hearted', '#ACE6FF','#217ca3'], '/ij': ['inside joke', '#E7FFAC', '#6d9114'], '/ref': ['reference', '#AFCBFF','#144091'], '/t': ['teasing', '#FFFFD1','##c7c710'], '/nm': ['not mad', '#DCD3FF','#3d1bc2'], '/lu': ['a little upset', '#FFF5BA','#8f7c0b'], '/nf': ['not forced', '#DEFDE0','#089611'], '/nbh': ['nobody here', '#FCF7DE','#7a6600'], '/nsb': ['not subtweeting', '#DEF3FD','#00405e'], '/nay': ['not at you', '#F0DEFD','#7a02d1'], '/ay': ['at you', '#FDDFDF','#8c0707'], '/nbr': ['not being rude', '#9ADBB3','#048a38'], '/ot': ['off topic', '#E7FFAC','#476108'], '/th': ['threat', '#FFABAB','#b50e0e'], '/cb': ['clickbait', '#F3FFE3','#569106'], '/f': ['fake', '#85E3FF','#066480'], '/q': ['quote', '#D5AAFF','##3b086e'], '/l': ['lyrics', '#97A2FF','#0e1873'], '/ly': ['lyrics', '#97A2FF','#0e1873'], '/c': ['copypasta', '#DBFFD6','#1f8c0f'], '/m': ['metaphor / metaphorically', '#FBE4FF','#750987'], '/li': ['literal / literally', '#BED2FE','#0a328a'], '/rt': ['rhetorical question', '#A79AFF','#1c099c'], '/rh': ['rhetorical question', '#A79AFF','#1c099c'], '/hyp': ['hyperbole', '#F6F9FF','#2a3c5e'], '/p': ['platonic', '#B5CCFE','#2260e6'], '/r': ['romantic', '#FFCCF9','#bf19ac'], '/a': ['alterous', '#C7D9FE','#1458e3'], '/sx': ['sexual intent', '#FF9CEE','#780b65'], '/x': ['sexual intent', '#FF9CEE','#780b65'], '/nsx': ['non-sexual intent', '#FFBEBC','#7a201d'], '/ns': ['non-sexual intent', '#FFBEBC','#7a201d'], '/nx': ['non-sexual intent', '#FFBEBC','#7a201d'], '/pc': ['positive connotation', '#84D3B2','#0e9e62'], '/pos': ['positive connotation', '#84D3B2','#0e9e62'], '/nc': ['negative connotation', '#FFCCBB','#87452f'], '/neg': ['negative connotation', '#FFCCBB','#87452f'], '/neu': ['neutral / neutral connotation', '#E3ECFF','#315ab0'] };

    if (!global.ZeresPluginLibrary) {
        return class { load() { BdApi.showConfirmationModal("Zere's Library Missing", "Either Click Download Now to install it or manually install it. ", { confirmText: "Automatically Install", cancelText: "Cancel", onConfirm: () => { require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async(error, result, body) => {!error && result.statusCode == 200 && body ? require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, _ => BdApi.showToast("Finished downloading Zere's Plugin Library", { type: "success" })) : BdApi.showToast("Failed to download Zere's Plugin Library", { type: "error" }) }) } }) } };
    } else {
        return (([Plugin, Zlib]) => {
            const { WebpackModules, Patcher, ContextMenu, Logger: { error: Error } } = Zlib;
            return class ToneIndicators extends Plugin {

                getSettingsPanel() { const panel = this.buildSettingsPanel(); return panel.getElement(); }
                generateBackgroundColor(hex, alpha = "0.5") {let bg = '0x' + hex.substring(1); return 'rgba(' + [(bg >> 16) & 255, (bg >> 8) & 255, bg & 255].join(',') + `,${alpha})`; }

                onLoad() {};
                onStart() { this.onStop(), this.patchContextMenus(), this.patchMessages(); }
                onStop() { Patcher.unpatchAll(); }


                patchContextMenus() {
                    ContextMenu.getDiscordMenu("MessageContextMenu").then(menu => {
                        Patcher.after(menu, "default", (_, [props], ret) => {
                            let selectedText = document.getSelection().toString().trim();
                            selectedText = selectedText.match((/^[^\/]/g, '/')) ? selectedText : "/" + selectedText;
                            if (!(selectedText && selectedText.toLowerCase() in toneList)) return;
                            ret.props.children.push(ContextMenu.buildMenuItem({ type: "separator" }))
                            ret.props.children.push(ContextMenu.buildMenuItem({
                                label: "Tone Indicator",
                                action: () => {
                                    BdApi.showToast(selectedText.toLowerCase() + " -  " + toneList[selectedText.toLowerCase()][0]);
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
                            if (!content) return Error("Something went wrong! oh noez~");
                            let current = 0;
                            return content.split(' ').map(word => {
                                current++
                                let currentWord = current == 1 ? word : " " + word;
                                let tone = toneList[word.toLowerCase()];
                                return tone ? BdApi.React.createElement("span", {
                                    style:
                                        !this.settings.background.disabled ? ({ "background-color": this.generateBackgroundColor(this.settings.tonecolor.lightmode ? tone[2] : tone[1], this.settings.background.transparency / 100 || 0.1), "color": this.settings.tonecolor.lightmode ? tone[2] : tone[1], "display": "inline-block", "font-size": "12px", "font-weight": "bold", "border-radius": "6px", "padding-left": "3px", "padding-right": "3px", "margin-left": "4px" }) : ({ "display": "inline-block", "color": this.settings.tonecolor.lightmode ? tone[2] : tone[1] }),
                                    children: BdApi.React.createElement(ToolTip, { "position": this.settings.tooltip.bottom ? "bottom" : "top", "text": `${word.toLowerCase()} - ${tone[0]}` }, currentWord)
                                }) : currentWord;
                            })
                        })
                    })
                }

            }
        })(global.ZeresPluginLibrary.buildPlugin(config));
    }
})();