export default async function downloadVCard(name, number, logoURL) {
    let vCard = "BEGIN:VCARD\n" +
                "VERSION:3.0\n" +
                "N:" + name + "\n" +
                "TEL;TYPE=CELL:" + number + "\n";
    
    if (logoURL) {
      let response = await fetch(logoURL);
      let blob = await response.blob();
      
      let reader = new FileReader();
      reader.onloadend = function() {
        let data = reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
        vCard += "PHOTO;ENCODING=BASE64;TYPE=JPEG:\n" + data + "\n";
      };
      reader.readAsDataURL(blob);
    }
    
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