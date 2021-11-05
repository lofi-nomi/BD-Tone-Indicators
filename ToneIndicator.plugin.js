/**
 * @name ToneIndicators
 * @author NomadNaomie
 * @description Highlighting a tone tag will give you the defintion
 * @version 0.0.2
 * @authorId 188323207793606656
 * @authorLink https://twitter.com/NomadNaomie
 */


module.exports = (_ => {
	const config = {
		"info": {
			"name": "ToneIndicators",
			"author": "NomadNaomie",
			"version": "0.0.2",
			"description": "Highlighting a tone tag will give you the defintion"
		},

	};
    const tones={
        "j":"joking",
        "hj":"half joking",
        "s":"sarcastic / sarcasm",
        "sarc":"sarcastic / sarcasm",
        "srs":"serious",
        "nsrs":"not serious",
        "lh":"light hearted",
        "g":"genuine / genuine question",
        "gen":"genuine / genuine question",
        "ij":"inside joke",
        "ref":"reference",
        "t":"teasing",
        "nm":"not mad",
        "lu":"a little upset",
        "nf":"not forced",
        "nbh":"nobody here",
        "nsb":"not subtweeting",
        "nay":"not at you",
        "ay":"at you",
        "nbr":"not being rude",
        "ot":"off topic",
        "th":"threat",
        "cb":"clickbait",
        "f":"fake",
        "q":"quote",
        "l":"lyrics",
        "ly":"lyrics",
        "c":"copypasta",
        "m":"metaphor / metaphorically",
        "li":"literal / literally",
        "rt":"rhetorical question",
        "rh":"rhetorical question",
        "hyp":"hyperbole",
        "p":"platonic",
        "r":"romantic",
        "a":"alterous",
        "sx":"sexual intent",
        "x":"sexual intent",
        "nsx":"non-sexual intent",
        "ns":"non-sexual intent",
        "pc":"positive connotation",
        "pos":"positive connotation",
        "nc":"negative connotation",
        "neg":"negative connotation",
        "neu":"neutral / neutral connotation"
    }
    if (!window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started)){
        return class {
            load() {
                BdApi.alert("This plugin requires BDFDB"," Download it here: \nhttps://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js");
            }
        }
    }else{
	return (([Plugin, BDFDB]) => {
		return class ToneIndicators extends Plugin {
			onLoad () {}
			onStop () {}
			onMessageContextMenu (e) {
                let selectedText = document.getSelection().toString().trim();
                selectedText = selectedText.replace("/","");
				if (e.instance.props.message && selectedText && selectedText.toLowerCase() in tones) {
                    let item = [BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
							label: "Tone Indicator",
							id: "toneIndicator",
                            action: _ => {
								BdApi.showToast("/"+selectedText  + " -  " +tones[selectedText.toLowerCase()]);
							}
						})]
					if (item.length) {
						let [children, index] = BDFDB.ContextMenuUtils.findItem(e.returnvalue, {id: "add-reaction", group: true});
						children.push(item);
					}
				}
			}
		};
	})(window.BDFDB_Global.PluginUtils.buildPlugin(config));
}})();
