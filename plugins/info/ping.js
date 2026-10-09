const os = require('os');
const promises = require('fs/promises');
exports.default = {
   tags: 'info',
   help: ['runtime', 'ping', 'uptime'],
   command: ['runtime', 'ping', 'p', 'rt', 'uptime'],
   start: async (m) => {
      const { Upload, Download } = await Utils.statistic()
      const sessions = await Utils.sessions()
      const runtime = await Utils.runtime()
      const mem = process.memoryUsage();
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const cpus = os.cpus();
      const cpuCores = cpus.length;
      const load = os.loadavg();
      let swapTotal = 'N/A',
         swapUsed = 'N/A',
         swapFree = 'N/A',
         swapUsagePercent = '0%';
      try {
         const swapData = await promises.readFile('/proc/meminfo', 'utf8');
         const totalKB = parseInt(
            swapData.match(/SwapTotal:\s+(\d+)/)?.[1] || 0
         );
         const freeKB = parseInt(swapData.match(/SwapFree:\s+(\d+)/)?.[1] || 0);
         const usedKB = totalKB - freeKB;
         swapTotal = socket.formatBytes(totalKB * 1024);
         swapUsed = socket.formatBytes(usedKB * 1024);
         swapFree = socket.formatBytes(freeKB * 1024);
         swapUsagePercent =
            totalKB > 0 ? ((usedKB / totalKB) * 100).toFixed(1) + '%' : '0%';
      } catch {}

      const cpuBreakdown = cpus.map((cpu, i) =>
         `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n` +
         Object.keys(cpu.times).map(type =>
            `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / Object.values(cpu.times).reduce((a, b) => a + b, 0)).toFixed(2)}%`
         ).join('\n')
      ).join('\n\n');

      m.reply(`
〔 𝙎𝙩𝙖𝙩𝙪𝙨 𝘽𝙤𝙩 〕
◦ Bot Aktif Selama :
  ${clockStringPing(runtime)}
  
◦ Statistic Usage Network Bot :
  📤 Upload: ${Upload}
  📥 Download: ${Download}
  
◦ Sessions: ${sessions}
◦ Platform : ${os.platform()} (${os.arch()})
◦ Dir : ${process.cwd()}
◦ Node.js  : ${process.version}

𝙈𝙚𝙢𝙤𝙧𝙮 𝙐𝙨𝙖𝙜𝙚 (𝙉𝙤𝙙𝙚.𝙟𝙨)
◦ *rss*              : ${socket.formatBytes(mem.rss)}
◦ *heapTotal*   : ${socket.formatBytes(mem.heapTotal)}
◦ *heapUsed*   : ${socket.formatBytes(mem.heapUsed)}
◦ *external*       : ${socket.formatBytes(mem.external)}
◦ *arrayBuffers*: ${socket.formatBytes(mem.arrayBuffers)}
${readMore()}
𝙎𝙮𝙨𝙩𝙚𝙢 𝙈𝙚𝙢𝙤𝙧𝙮
◦ Total RAM : ${socket.formatBytes(totalMem)}
◦ Used RAM  : ${socket.formatBytes(totalMem - freeMem)}
◦ Free RAM  : ${socket.formatBytes(freeMem)}

𝙎𝙬𝙖𝙥 𝙈𝙚𝙢𝙤𝙧𝙮
◦ Total Swap : ${swapTotal}
◦ Used Swap  : ${swapUsed}
◦ Free Swap  : ${swapFree}
◦ Usage      : ${swapUsagePercent}

𝘾𝙋𝙐 𝙄𝙣𝙛𝙤
◦ Cores        : ${cpuCores}
◦ Load Average : ${load.map((l) => l.toFixed(2)).join(', ')}
◦ Usage (est.) : ${((load[0] / cpuCores) * 100).toFixed(1)}%

_CPU Core(s) Usage (${cpuCores} Core CPU)_

${cpuBreakdown}`.trim());
   }
}
function clockStringPing(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [`${d}`, ' Hari ☀\n  ', `${h}`, ' Jam ⏰\n  ', `${m}`, ' Menit 🕰\n  ', `${s}`, ' Detik ⏳'].map(v => v.toString().padStart(2, 0)).join('')
};