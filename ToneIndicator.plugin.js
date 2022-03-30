/**
 * @name ToneIndicators
 * @author NomadNaomie, Zuri
 * @description Displays the messages tone indicators or by highlighting a tone tag will give you the defintion
 * @version 1.1.3
 * @source https://github.com/NomadNaomie/BD-Tone-Indicators
 * @updateUrl https://raw.githubusercontent.com/NomadNaomie/BD-Tone-Indicators/main/ToneIndicator.plugin.js
 * @authorId 188323207793606656, 746871249791221880
 * @authorLink https://twitter.com/NomadNaomie
 */

 module.exports = (_ => {
    const toneMap = {
        "/j": { "name": "joking", "colors": ['#BFFCC6', '#0d7a1a']},
        "/hj": { "name": "half joking", "colors": ['#D8FFD6', '#0d7a1a']},
        "/srs": { "name": "serious", "colors": ['#6EB5FF', '#29629e']},
        "/nsrs": { "name": "not serious'", "colors": ['#F6A6FF', '#a639b3']},
        "/lh": { "name": "light hearted", "colors": ['#ACE6FF', '#217ca3']},
        "/ij": { "name": "inside joke", "colors": ['#E7FFAC', '#6d9114']},
        "/ref": { "name": "reference", "colors": ['#AFCBFF', '#144091']},
        "/t": { "name": "teasing", "colors": ['#FFFFD1', '##c7c710']},
        "/nm": { "name": "not mad", "colors": ['#DCD3FF', '#3d1bc2']},
        "/lu": { "name": "a little upset", "colors": ['#FFF5BA', '#8f7c0b']},
        "/nf": { "name": "not forced", "colors": ['#DEFDE0', '#089611']},
        "/nbh": { "name": "nobody here", "colors": ['#FCF7DE', '#7a6600']},
        "/nsb": { "name": "not subtweeting", "colors": ['#DEF3FD', '#00405e']},
        "/nay": { "name": "not at you", "colors": ['#F0DEFD', '#7a02d1']},
        "/ay": { "name": "at you", "colors": ['#FDDFDF', '#8c0707']},
        "/nbr": { "name": "not being rude", "colors": ['#9ADBB3', '#048a38']},
        "/ot": { "name": "off-topic", "colors": ['#E7FFAC', '#476108']},
        "/th": { "name": "threat", "colors": ['#FFABAB', '#b50e0e']},
        "/cb": { "name": "clickbait", "colors": ['#F3FFE3', '#569106']},
        "/f": { "name": "fake", "colors": ['#85E3FF', '#066480']},
        "/q": { "name": "quote", "colors": ['#D5AAFF', '##3b086e']},
        "/c": { "name": "copypasta", "colors": ['#DBFFD6', '#1f8c0f']},
        "/m": { "name": "metaphor / metaphorically", "colors": ['#FBE4FF', '#750987']},
        "/li": { "name": "literal / literally", "colors": ['#BED2FE', '#0a328a']},
        "/hyp": { "name": "hyperbole", "colors": ['#F6F9FF', '#2a3c5e']},
        "/p": { "name": "platonic", "colors": ['#B5CCFE', '#2260e6']},
        "/r": { "name": "romantic", "colors": ['#FFCCF9', '#bf19ac']},
        "/a": { "name": "alterous", "colors": ['#C7D9FE', '#1458e3']},
        "/neu": { "name": "neutral / neutral connotation", "colors": ['#E3ECFF', '#315ab0']},

        "/g": { "name": "genuine / genuine question", "colors": ['#AFF8D8', '#089c5b']},
        "/gen": { "name": "genuine / genuine question", "colors": ['#AFF8D8', '#089c5b']},
        "/genq": { "name": "genuine / genuine question", "colors": ['#AFF8D8', '#089c5b']},

        "/s": { "name": "sarcastic / sarcasm", "colors": ['#FFCBC1', '#cf3d21']},
        "/sarc": { "name": "sarcastic / sarcasm", "colors": ['#FFCBC1', '#cf3d21']},

        "/l": { "name": "lyrics", "colors": ['#97A2FF', '#0e1873']},
        "/ly": { "name": "lyrics", "colors": ['#97A2FF', '#0e1873']},

        "/rt": { "name": "rhetorical question", "colors": ['#A79AFF', '#1c099c']},
        "/rh": { "name": "rhetorical question", "colors": ['#A79AFF', '#1c099c']},

        "/sx": { "name": "sexual intent", "colors": ['#FF9CEE', '#780b65']},
        "/x": { "name": "sexual intent", "colors": ['#FF9CEE', '#780b65']},

        "/nsx": { "name": "non-sexual intent", "colors": ['#FFBEBC', '#7a201d']},
        "/ns": { "name": "non-sexual intent", "colors": ['#FFBEBC', '#7a201d']},
        "/nx": { "name": "non-sexual intent", "colors": ['#FFBEBC', '#7a201d']},

        "/pc": { "name": "positive connotation", "colors": ['#84D3B2', '#0e9e62']},
        "/pos": { "name": "positive connotation", "colors": ['#84D3B2', '#0e9e62']},
        "/nc": { "name": "negative connotation", "colors": ['#FFCCBB', '#87452f']},
        "/neg": { "name": "negative connotation", "colors": ['#FFCCBB', '#87452f']},
    }
    const config = {
        info: {
            name: 'ToneIndicators',
            authors: [
                {name: 'NomadNaomie', discord_id: '188323207793606656', github_username: 'NomadNaomie', twitter_username: 'NomadNaomie'},
                {name: 'Zuri', discord_id: '746871249791221880', github_username: 'Zuriix', website: "https://zuriix.github.io/"}
            ],
            version: '1.1.2',
            description: 'Displays the messages tone indicators or by highlighting a tone tag will give you the defintion',
            github_raw: 'https://raw.githubusercontent.com/NomadNaomie/BD-Tone-Indicators/main/ToneIndicator.plugin.js',
            github: 'https://github.com/NomadNaomie/BD-Tone-Indicators'
        },
        changelog: [


            /* Added Changlog*/
            // {
            //   title: "Added", type: "added",
            //    items: ["Fixed message patching", "Fixed Multiline & Content issues",]
            // },


            /* Removed Changelog*/
            // {
            //     title: "Removed", type: "fixed",
            //     items: []
            // },


            /* Fixed Changelog*/
            {
                title: "Changed", type: "fixed",
                items: ["Fixed an issue where links that were on multiple lines would get forced onto a single line"]
            }


        ],
        defaultConfig: [


            /* Background settings */
        { 
            type: 'category', id: 'background', name: 'Background settings', collapsible: true, shown: false,
            settings: [
                { type: "switch", id: "disabled", name: "Remove Background Color", note: "Removes the background color from indicators in messages.", value: false },
                { type: "slider", id: "transparency", name: "Background Transparency", note: "Changes the transparency of the indicators background color.", value: 10 }
            ]
        }, 


            /* Tooltip settings */
        {
            type: 'category', id: 'tooltip', name: 'Tooltip settings', collapsible: true, shown: false,
            settings: [
                { type: "switch", id: "bottom", name: "Display tooltip under message", note: "Displays tooltip under the message instead of above it.", value: true }
            ]
        },


            /* Indicator settings */
        {
            type: 'category', id: 'tonecolor', name: 'Tone colour settings', collapsible: true, shown: false,
            settings: [
                { type: "switch", id: "lightmode", name: "Light Mode", note: "Changes the tone indicators to use a light color scheme.", value: false },
                { type: "switch", id: "autochange", name: "Automatic Mode", note: "Changes the tone indicators depending on the current color scheme.", value: true }
            ]
        },
    ]
};

    

    if (!global.ZeresPluginLibrary) {
        return class { load() { BdApi.showConfirmationModal("Zere's Library Missing", "Either Click Download Now to install it or manually install it. ", { confirmText: "Automatically Install", cancelText: "Cancel", onConfirm: () => { require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async(error, result, body) => {!error && result.statusCode == 200 && body ? require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, _ => BdApi.showToast("Finished downloading Zere's Plugin Library", { type: "success" })) : BdApi.showToast("Failed to download Zere's Plugin Library", { type: "error" }) }) } }) } };
    } else {
        return (([Plugin, Zlib]) => {
            const { WebpackModules, ContextMenu } = Zlib;
            return class ToneIndicators extends Plugin {


                generateBackgroundColor(r,e){let n="0x"+r.substring(1);return"rgba("+[n>>16&255,n>>8&255,255&n].join(",")+`,${e})`}
                getTone(t) {if(!t)return;let e=toneMap[t.toLowerCase()];if(!e)return{isTag:!1,text:t};let o=document.getElementsByClassName("theme-dark").length>0;this.settings.tonecolor.lightmode=!o;let n=this.settings.tonecolor.autochange?o?e.colors[0]:e.colors[1]:this.settings.tonecolor.lightmode?e.colors[1]:e.colors[0],i={isTag:!0,text:t,description:e.name,tag:BdApi.React.createElement("span",{style:this.settings.background.disabled?{display:"inline-block",color:n}:{"background-color":this.generateBackgroundColor(n,this.settings.background.transparency/100||.1),color:n,display:"inline-block","font-size":"12px","font-weight":"bold","border-radius":"6px","padding-left":"3px","padding-right":"3px","margin-left":"4px"},children:BdApi.React.createElement(WebpackModules.getByProps("TooltipContainer").TooltipContainer,{position:this.settings.tooltip.bottom?"bottom":"top",text:`${e.name}`},t)})};return i}
                
                getSettingsPanel() { const panel = this.buildSettingsPanel(); return panel.getElement(); }
                onStop() { BdApi.Patcher.unpatchAll("ToneIndicator"); }
                onStart() { this.onStop(); this.patchMessageContent(); this.patchContextMenu(); }

                patchMessageContent() {
                    const MessageContent = WebpackModules.find(e => e.type && "MessageContent" === e.type.displayName);
                    BdApi.Patcher.after("ToneIndicator", MessageContent, "type", (_, [props], ret) => {
                        if (props.message.content && props.message.content.includes("/") && props.message && ret) {
                            if (!ret.props.children[0]) return;
                            ret.props.children[0] = ret.props.children[0].map(child => 
                                typeof child == "string" && child.trim() != "" ? child.split("\n").map(line => {
                                let current = 0, compile = [];
                                return line.split(" ").forEach(word => {
                                    if (0 === word.length) return word; 
                                    current++;
                                    let splitChar = line.split(" ").length === current ? "\n" : " ", tone = this.getTone(word);
                                    compile.push(tone.isTag ? tone.tag : tone.text), compile.push(splitChar)
                                }), compile
                            }) : child)
                        }
                    })
                }

                patchContextMenu() {
                    ContextMenu.getDiscordMenu("MessageContextMenu").then(menu => {
                        BdApi.Patcher.after("ToneIndicator", menu, "default", (_, [props], ret) => {
                            let textSelection = document.getSelection().toString().trim();
                            if(!textSelection) return;
                            textSelection = textSelection.match("/") ? textSelection : "/" + textSelection;
                            let tone = this.getTone(textSelection.toLowerCase());
                            typeof tone != "string" && ret.props.children.push(ContextMenu.buildMenuItem({
                                type: "separator"
                            }), ContextMenu.buildMenuItem({
                                label: "Tone Indicator",
                                action: () => BdApi.showToast(`${tone.text} - ${tone.description}`)
                            }))
                        })
                    })
                }

            }
        })(global.ZeresPluginLibrary.buildPlugin(config));
    }
})();

/*
  _,-=._              /|_/|
  `-.}   `=._,.-=-._.,  @ @._,
     `._ _,-.   )      _,.-'
        `    G.m-"^m`m'        
*/
