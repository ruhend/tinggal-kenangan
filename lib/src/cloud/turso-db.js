const options = {
  TURSO: {
    URL: 'libsql://XXXX' , // contoh: libsql://nama-db-kamu.turso.io
    TOKEN: 'eyXXXX-' // database token (BUKAN token organisasi)
  }
};
const backupTurso = async () => await socket.TursoDB.Backup(options, true);
const restoreTurso = async () => await socket.TursoDB.Restore(options);
if (backup_turso) {
  console.log('AutoBackup Turso Aktif');
  socket.TursoDB.AutoBackup(options);
};
module.exports = { backupTurso, restoreTurso };

/** Setup / Tutorial
  * https://turso.tech
  * tutorial kalian daftar ajh ke web nya itu ata ketik di google turso db setup nya mudah dan penyimpanan 5GB lumayan besar
  * kalo udh masuk dashboard kaya gini https://gachi.gay/UMl4DLlangsung create ajh
  * isi namanya bebas atau database ajh, dan lokasi nya juga bebas tapi di sarankan yang amerika karna cepet data center google
  * kalo udh di tab overview klik create token https://gachi.gay/Wdsw66
  * kalo udh https://gachi.gay/upnZRL langsung salin token nya dan url nya dan tempel di atas situ
  * nah nanti kan jadi nya seperti ini https://gachi.gay/EuZ4QJ klik ajh 
  * kalo udh kalian backup dari bot ketik .backup turso
  * kalian biaa lohat hasil kalo udh di backup https://gachi.gay/mRPs89
  * nyalain autobackup nya ketik di bot .on autobackup turso
  * Done !
**/  