<script>
function crc16(payload){
  let crc = 0xFFFF;
  for (let c of payload){
    crc ^= c.charCodeAt(0)<<8;
    for(let i=0;i<8;i++)
      crc = (crc&0x8000)?(crc<<1)^0x1021:crc<<1;
  }
  return ("0000"+(crc&0xFFFF).toString(16).toUpperCase()).slice(-4);
}

function tag(id,val){
  return id + val.length.toString().padStart(2,'0') + val;
}

function khqr(amount,invoice){
  let s='';
  s+=tag('00','01');
  s+=tag('01','12'); // dynamic
  s+=tag('29', tag('00','ABA') + tag('01','1407908'));
  s+=tag('52','5399');
  s+=tag('53','840'); // USD
  s+=tag('54',amount);
  s+=tag('58','KH');
  s+=tag('59','LOK POEUY');
  s+=tag('62', tag('01',invoice));
  s+= '6304';
  return s + crc16(s);
}
</script>
