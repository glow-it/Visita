export function abbrevateNumber(number) {
    const suffixes = ['', 'K', 'M', 'T'];
    let suffixNum = 0;
    
    while (number >= 1000) {
      suffixNum++;
      number = number / 1000;
    }
    
    return number.toFixed(1) + suffixes[suffixNum];
  }
  
