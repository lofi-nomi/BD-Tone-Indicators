/**
 * @name ToneIndicators
 * @author NomadNaomie, Zuri
 * @description Displays the messages tone indicators under messages or by highlighting a tone tag will give you the defintion
 * @version 0.0.5
 * @authorId 188323207793606656, 746871249791221880
 * @authorLink https://twitter.com/NomadNaomie
 */

module.exports = (_ => {
    const config = {
        info: {
            name: 'ToneIndicators',
            author: 'NomadNaomie, Zuri',
            version: '0.0.5',
            description: 'Displays the messages tone indicators under messages or by highlighting a tone tag will give you the defintion',
        },
    };
    const tones = {
        '/j': ['joking', '#BFFCC6'],
        '/hj': ['half joking', '#D8FFD6'],
        '/g': ['genuine / genuine question', '#AFF8D8'],
        '/gen': ['genuine / genuine question', '#AFF8D8'],
        '/genq': ['genuine question', '#AFF8D8'],
        '/s': ['sarcastic / sarcasm', '#FFCBC1'],
        '/sarc': ['sarcastic / sarcasm', '#FFCBC1'],
        '/srs': ['serious', '#6EB5FF'],
        '/nsrs': ['not serious', '#F6A6FF'],
        '/lh': ['light hearted', '#ACE6FF'],
        '/ij': ['inside joke', '#E7FFAC'],
        '/ref': ['reference', '#AFCBFF'],
        '/t': ['teasing', '#FFFFD1'],
        '/nm': ['not mad', '#DCD3FF'],
        '/lu': ['a little upset', '#FFF5BA'],
        '/nf': ['not forced', '#DEFDE0'],
        '/nbh': ['nobody here', '#FCF7DE'],
        '/nsb': ['not subtweeting', '#DEF3FD'],
        '/nay': ['not at you', '#F0DEFD'],
        '/ay': ['at you', '#FDDFDF'],
        '/nbr': ['not being rude', '#9ADBB3'],
        '/ot': ['off topic', '#E7FFAC'],
        '/th': ['threat', '#FFABAB'],
        '/cb': ['clickbait', '#F3FFE3'],
        '/f': ['fake', '#85E3FF'],
        '/q': ['quote', '#D5AAFF'],
        '/l': ['lyrics', '#97A2FF'],
        '/ly': ['lyrics', '#97A2FF'],
        '/c': ['copypasta', '#DBFFD6'],
        '/m': ['metaphor / metaphorically', '#FBE4FF'],
        '/li': ['literal / literally', '#BED2FE'],
        '/rt': ['rhetorical question', '#A79AFF'],
        '/rh': ['rhetorical question', '#A79AFF'],
        '/hyp': ['hyperbole', '#F6F9FF'],
        '/p': ['platonic', '#B5CCFE'],
        '/r': ['romantic', '#FFCCF9'],
        '/a': ['alterous', '#C7D9FE'],
        '/sx': ['sexual intent', '#FF9CEE'],
        '/x': ['sexual intent', '#FF9CEE'],
        '/nsx': ['non-sexual intent', '#FFBEBC'],
        '/ns': ['non-sexual intent', '#FFBEBC'],
        '/nx': ['non-sexual intent', '#FFBEBC'],
        '/pc': ['positive connotation', '#84D3B2'],
        '/pos': ['positive connotation', '#84D3B2'],
        '/nc': ['negative connotation', '#FFCCBB'],
        '/neg': ['negative connotation', '#FFCCBB'],
        '/neu': ['neutral / neutral connotation', '#E3ECFF'],
    };

    if (!window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started)) {
        return class {
            load() {
                BdApi.alert('This plugin requires BDFDB', 'Download it here:\n\nhttps://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js');
            }
        };
    } else {
        return (([Plugin, BDFDB]) => {
            return class ToneIndicators extends Plugin {
                onLoad() {
                    this.patchedModules = {
                        after: {
                            Message: 'default',
                        },
                    };
                }

                onStart() {
                    this.forceUpdateAll();
                }

                onStop() {
                    this.forceUpdateAll();
                }

                forceUpdateAll() {
                    BDFDB.PatchUtils.forceAllUpdates(this);
                    BDFDB.MessageUtils.rerenderAll();
                }

                onMessageContextMenu(e) {
                    let selectedText = document.getSelection().toString().trim();
                    selectedText[0] == "/" ? selectedText = selectedText : selectedText = "/"+selectedText;
                    if (e.instance.props.message && selectedText && selectedText.toLowerCase() in tones) {
                        let item = [BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
                            label: "Tone Indicator",
                            id: "toneIndicator",
                            action: _ => {
                                BdApi.showToast(selectedText + " -  " + tones[selectedText.toLowerCase()][0]);
                            }
                        })]
                        if (item.length) {
                            let [children, index] = BDFDB.ContextMenuUtils.findItem(e.returnvalue, { id: "add-reaction", group: true });
                            children.push(item);
                        }
                    }
                }

                processMessage(e) {
                    let message;
                    for (let key in e.instance.props) {
                        if (!message) message = BDFDB.ObjectUtils.get(e.instance.props[key], 'props.message');
                        else break;
                    }
                    if (!message || !e.returnvalue) return;

                    (message.content.match(/(^\/+|(?<=\s)\/)\w{0,4}/g) || []).reverse().forEach(v => tones[v] && e.returnvalue.props.children.props.children.splice(3, 0, this.createTag(v, tones[v][0], tones[v][1], 'rgba(47, 49, 54, 0.5)')));
                }

                createTag(text, hover, textColor, background) {
                    return BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
                        text: hover,
                        note: 'The message context is ' + hover.replace(/\//g, 'or'),
                        tooltipConfig: {
                            type: 'bottom',
                            textColor: textColor,
                        },
                        children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.BotTag, {
                            style: {
                                backgroundColor: background,
                                color: textColor,
                                'font-family': 'Ginto Nord',
                                'margin-right': '4px',
                            },
                            tag: text,
                        }),
                    });
                }
            };
        })(window.BDFDB_Global.PluginUtils.buildPlugin(config));
    }
})();
