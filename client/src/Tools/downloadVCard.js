export default async function downloadVCard(name, number, logoURL) {
    let vCard = "BEGIN:VCARD\n" +
                "VERSION:3.0\n" +
                "N:" + name + "\n" +
                "TEL;TYPE=CELL:" + number + "\n";
    
   
    
    vCard += "END:VCARD";
    
    let filename = name + ".vcf";
    let uri = "data:text/vcard;charset=utf-8," + encodeURIComponent(vCard);
    
    let link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }