const fs = require('fs')

let content = fs.readFileSync(__dirname + '/test.scss', 'utf8'),
	loaderResult = content

const grandParentSelectorRegex = /(\^&)/gm,
	  textChunkWithGrandSelectorRegex = /\.[\s\d\wа-я-А-Я]+{[\s\d\wа-я-А-Я%.\/{}@()&#_:;,!-']+\^&/gm,
	  extraClassesRegex = /[\/]*\.[\s\d\w.}&#_:;-]+{[\s\d\a\/-z.&#_:;!-]+}/mg,
	  grandParentClassRegex = /\.[\D]{1}[\w-]*[\s]*{/mg


const grandParentSelectors = content.match(grandParentSelectorRegex)

//Если в коде найденны селекторы блока
if (grandParentSelectors) {
	
	grandParentSelectors.forEach(() => {
		const textChunkWithGrandSelector = loaderResult.match(textChunkWithGrandSelectorRegex) ? loaderResult.match(textChunkWithGrandSelectorRegex)[0] : null


		
		if (textChunkWithGrandSelector) {
			let textChunkOnlyWithGrandSelector = textChunkWithGrandSelector,

				//Найти лишние классы, которые мешают найти родительский
				extraClasses = textChunkOnlyWithGrandSelector.match(extraClassesRegex),
				hasTextChunkExtraClasses = Array.isArray(extraClasses) && extraClasses.length > 0

			if (hasTextChunkExtraClasses) {

				for (let i = 0;;) {

					extraClasses.forEach(chunkForRemove => {
						textChunkOnlyWithGrandSelector = textChunkOnlyWithGrandSelector.replace(chunkForRemove, '')
					})

					extraClasses = textChunkOnlyWithGrandSelector.match(/[\/]*\.[\s\d\w.}&#_:;-]+{[\s\d\a\/-z.&#_:;!-]+}/mg)
					hasTextChunkExtraClasses = Array.isArray(extraClasses) && extraClasses.length > 0

					if (hasTextChunkExtraClasses === false) {
						break;
					}
				}



			}

			const elementGrandParent = textChunkOnlyWithGrandSelector.match(grandParentClassRegex).pop().replace('{', '').trim()

			loaderResult = loaderResult.replace(/(\^&)/, elementGrandParent)
		}

	})

}
