function crc16(payload){
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4,'0');
}

function tag(id, value){
  return id + value.length.toString().padStart(2,'0') + value;
}

function khqr(amount, invoice){
  let p = '';
  p += tag('00','01');
  p += tag('01','12'); // dynamic
  p += tag('29',
        tag('00','ABA') +
        tag('01','1407908')
      );
  p += tag('52','5399');
  p += tag('53','840'); // USD
  p += tag('54',amount);
  p += tag('58','KH');
  p += tag('59','BARDS');
  p += tag('62', tag('01',invoice));
  p += '6304';
  return p + crc16(p);
}
