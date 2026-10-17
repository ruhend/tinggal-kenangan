process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
require('./lib/settings.js')
global.socket = require('zp');
const chalk = require('chalk');
const {
   createSocket,
   connectionHandler
} = socket;
const {
   messageHandler,
   groupEventHandler
} = require('./handler.js');
const PORT = process?.env?.PORT || process?.env?.SERVER_PORT || 8080
const server = require('http').createServer((req, res) => {
   res.setHeader("Content-Type", "application/json");
   res.end(JSON.stringify(setting, null, 2))
});
let sock
let shuttingDown = false
async function main() {
   try {
      sock = await createSocket();
      await connectionHandler(sock);
      await sock.connect()
      groupEventHandler(sock);
      messageHandler(sock)
      if (sock.connection?.status) {
         if (sock.connection.status === 'open') {
            console.log(chalk.bgGreen.white.bold('\n🚀 [WA] BOT BERHASIL TERHUBUNG! \n'))
            console.log(sock.connection)
            await socket.notifRestart.handleRestartNotification(sock).catch((err) => {
               console.error(chalk.red('[RESTART NOTIF ERROR]:'), err?.message || err);
            })
         }
         if (sock.connection.status === 'close') {
            console.log(sock.connection)
            console.log(
               chalk.bgRed.black.bold('\n🚀 [WA] BOT BERHASIL TERPUTUS! \n'),
               chalk.yellow(`[WA] Koneksi terputus: ${sock.connection.reason ?? 'unknown'} (code: ${sock.connection.code ?? '-'})`)
            )
         }         
      };
      sock.isLogout = () => {
         console.log(sock?.connection ?? '', chalk.bgRed.white.bold('\n\n⚠️ [WA] Device di-logout dari HP. Perlu pairing ulang. \n'))
         require('child_process').exec(`rm -rf sessions`)
         setTimeout(() => {
            shutdown()
         }, 5000)
      }
   } catch (err) {
      console.error(
         chalk.red('[WA] Gagal connect awal:'),
         err?.stack || err?.message || err
      )
      await sock.disconnect()
      main()
   }
};
server.listen(PORT), console.log('server listen on port:', PORT);
async function shutdown() {
   if (shuttingDown) return;
   shuttingDown = true;
   if (sock) sock.__stopping = true;
   try {
      if (sock) await sock.disconnect()
   } catch (err) {
      console.error(
         err?.stack || err?.message || err
      );
   } finally {
      process.exit(0)
   }
}
main()