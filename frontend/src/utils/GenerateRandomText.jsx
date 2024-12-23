export default function GenerateRandomText(props) {
    const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
    const paragraphs = [];
  
    for (let p = 0; p < props.numParagraphs; p++) {
      const sentences = [];
  
      for (let i = 0; i < props.numSentencesPerParagraph; i++) {
        const numWords = Math.floor(Math.random() * 10) + 5;
        const sentenceWords = [];
  
        for (let j = 0; j < numWords; j++) {
          const randomIndex = Math.floor(Math.random() * words.length);
          sentenceWords.push(words[randomIndex]);
        }
  
        const sentence = sentenceWords.join(' ') + '.';
        sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
      }
  
      paragraphs.push(sentences.join(' '));
    }
  
    return paragraphs.join('\n\n');
  }