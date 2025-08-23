export function splitSentence(sentence = "" , countSplit=1 ) {
	const words = sentence?.trim().split(' ');
	if (words.length === 0) return ["", ""];
  
	const allButLast = words.slice(0, - countSplit).join(' ');
	const lastWord = words[words.length - countSplit];
	return [allButLast, lastWord];
  }
  